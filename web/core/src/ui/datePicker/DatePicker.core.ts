import { html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { Maskito, maskitoTransform } from '@maskito/core'
import { maskitoDateOptionsGenerator, maskitoDateRangeOptionsGenerator, type MaskitoDateParams } from '@maskito/kit'
import { autoPlacement as autoPlacementMiddleware } from '@floating-ui/dom'
import { provide } from '@lit/context'

import { disabledContextCreated, readonlyContextCreated, errorContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import {
  createCoreDatePickerProps,
  type IAltCoreDatePickerProps,
  type IAltCoreDatePickerExternalProps,
  PickEvent,
} from '~core/ui/datePicker/models/types'
import {
  AltCoreDatePickerTagName as tagName,
  AltCoreFieldInputTagName,
  AltCoreCalendarTagName,
} from '~shared/constants'
import { altCalendar2, altClose } from '~shared/icons'

import { type AltCoreFieldInput } from '~core/ui/fieldInput'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldInput'
import '~core/ui/fieldIcon'
import '~core/ui/calendar'
import '~core/ui/dropdown'
import '~core/ui/dropdownList'

import type { InputEvent } from '~core/ui/fieldInput/models/types/events'
import type { AltCoreCalendar } from '~core/ui/calendar'
import { booleanConverter } from '~core/utils/converters'
import { hasSlotContent } from '~core/utils/lit-slots'
import type { SelectEvent, RangeStartEvent } from '~core/ui/calendar/models/types/events'
import { renderLabel, renderError, renderAnnotation } from '~core/renderers'
import classMapToString from '~core/utils/classMapToString'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { parseDate, formatDate, FORMAT_DATE_DMY, getDefaultMinDate, getDefaultMaxDate } from '~shared/utils/dateTime'

import { EAltCoreDropdownPlacement, EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'

import AltCoreDatePickerVarsCSS from '~core/ui/datePicker/css/DatePicker.vars.css?inline'
import AltCoreDatePickerScopedCSS from '~core/ui/datePicker/css/DatePicker.scoped.css?inline'

import { LocalizedElement } from '~core/i18n/LocalizedElement'
import { withLocator } from '~core/utils/locator'

const {
  isRange,
  labelText,
  labelTooltipText,
  labelDebounce,
  annotationText,
  disabled,
  name,
  placeholder,
  readonly,
  required,
  size,
  error,
  errors,
  minDate,
  maxDate,
  date,
  calendarHeaderSelectors,
} = createCoreDatePickerProps()

const RANGE_SEPARATOR = ' - '

@customElement(tagName)
@withLocator(tagName)
export class AltCoreDatePicker
  extends LocalizedElement
  implements IAltCoreDatePickerProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCoreDatePickerExternalProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IAltCoreDatePickerExternalProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IAltCoreDatePickerExternalProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCoreDatePickerExternalProps['size'] = size
  @property({ type: String }) date: IAltCoreDatePickerExternalProps['date'] = date
  @property({ type: String }) name: IAltCoreDatePickerExternalProps['name'] = name
  @property({ type: String }) placeholder: IAltCoreDatePickerExternalProps['placeholder'] = placeholder
  @property({ type: Boolean, reflect: true }) required: IAltCoreDatePickerExternalProps['required'] = required
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreDatePickerExternalProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreDatePickerExternalProps['labelTooltipText'] = labelTooltipText
  @property({ type: Number, attribute: 'label-debounce' }) labelDebounce: IAltCoreDatePickerExternalProps['labelDebounce'] = labelDebounce
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreDatePickerExternalProps['annotationText'] = annotationText
  @property({ type: Array }) errors: IAltCoreDatePickerExternalProps['errors'] = errors
  @property({ type: Boolean, attribute: 'is-range' }) isRange: IAltCoreDatePickerExternalProps['isRange'] = isRange
  @property({ type: Boolean, attribute: 'calendar-header-selectors' }) calendarHeaderSelectors: IAltCoreDatePickerExternalProps['calendarHeaderSelectors'] = calendarHeaderSelectors
  @property({ type: String, attribute: 'min-date' }) minDate: IAltCoreDatePickerExternalProps['minDate'] = minDate
  @property({ type: String, attribute: 'max-date' }) maxDate: IAltCoreDatePickerExternalProps['maxDate'] = maxDate

  @state() private isOpened = false
  @state() private hasAnnotationSlot = false

  @query(AltCoreFieldInputTagName) public readonly fieldInput?: AltCoreFieldInput
  @query(AltCoreCalendarTagName) public readonly calendar?: AltCoreCalendar

  @bubblingEvent(
    PickEvent,
    { name: 'pick' },
  )
  _pick!: TDispatcher<PickEvent>

  private maskInstance?: Maskito

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreDatePickerVarsCSS)}
      ${unsafeCSS(AltCoreDatePickerScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }
  private get computedLabelClasses() {
    return { [`${this.baseClass}__label`]: true }
  }
  private get computedAnnotationClasses() {
    return {
      [`${this.baseClass}__annotation`]: true,
      [`${this.baseClass}__annotation_hide`]: !this.hasAnnotation,
    }
  }
  private get computedFieldWrapperClasses() {
    return { [`${this.baseClass}__field-wrapper`]: true }
  }
  private get computedDisabledOrReadonly() {
    return this.disabled || this.readonly
  }
  private get hasAnnotation() {
    return this.annotationText || this.hasAnnotationSlot
  }

  private get dropdownMiddlewares() {
    const allowedPlacements = [EAltCoreDropdownPlacement.BOTTOM, EAltCoreDropdownPlacement.TOP]

    return [autoPlacementMiddleware({ allowedPlacements })]
  }

  private get computedMinDate() {
    return this.minDate ? parseDate(this.minDate) : getDefaultMinDate()
  }

  private get computedMaxDate() {
    return this.maxDate ? parseDate(this.maxDate) : getDefaultMaxDate()
  }

  private get fieldMaskOptions() {
    const params: MaskitoDateParams = {
      mode: FORMAT_DATE_DMY.toLowerCase() as MaskitoDateParams['mode'],
      min: this.computedMinDate.toDate(),
      max: this.computedMaxDate.toDate(),
    }

    return this.isRange
      ? maskitoDateRangeOptionsGenerator({ ...params, rangeSeparator: RANGE_SEPARATOR })
      : maskitoDateOptionsGenerator(params)
  }

  private get isDeleteIcon() {
    return Boolean(this.date && !this.disabled && !this.readonly)
  }

  private get maskedValue() {
    if (this.isRange && Array.isArray(this.date)) {
      return maskitoTransform(this.date.map((date) => formatDate(parseDate(date), FORMAT_DATE_DMY)).join(RANGE_SEPARATOR), this.fieldMaskOptions)
    }

    const dateString = this.date && typeof this.date === 'string'
      ? formatDate(parseDate(this.date), FORMAT_DATE_DMY)
      : ''

    return maskitoTransform(dateString, this.fieldMaskOptions)
  }

  private handleSlotAnnotationChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  private applyMask() {
    const { inputElement } = this.fieldInput ?? {}
    if (!inputElement) return

    this.destroyMask()

    this.maskInstance = new Maskito(
      inputElement,
      this.fieldMaskOptions,
    )
  }

  private destroyMask() {
    if (!this.maskInstance) return

    this.maskInstance.destroy()
  }

  private updateFieldInputValue = (value?: string) => {
    if (!this.fieldInput?.inputElement) return

    this.fieldInput.inputElement.value = value ?? ''
  }

  private handleCalendarRangeStart = (event: RangeStartEvent): void => {
    const newValue = formatDate(parseDate(event.detail.value), FORMAT_DATE_DMY) + RANGE_SEPARATOR

    this.updateFieldInputValue(newValue)
  }

  private handleCalendarDateSelect = (event: SelectEvent): void => {
    this.date = event.detail.value

    this._pick({ detail: { value: this.date } })

    if (this.isRange) return

    this.fieldInput?.inputElement?.blur()
  }

  private handleFocus = (): void => {
    if (this.disabled || this.readonly) return

    this.isOpened = true
  }

  private handleBlur = (): void => {
    if (this.disabled || this.readonly) return

    this.isOpened = false

    this.updateFieldInputValue(this.maskedValue)
    this.calendar?.updateDate(this.date)
  }

  private handleRangeInput = (value: string): void => {
    const [startDate, endDate] = value.split(RANGE_SEPARATOR)

    if (!startDate || !endDate) return

    const parsedStartDate = parseDate(startDate)
    const parsedEndDate = parseDate(endDate)

    const isStartDateValid = parsedStartDate.isValid()
    const isEndDateValid = parsedEndDate.isValid()

    if (!isStartDateValid || !isEndDateValid) return

    if (parseDate(endDate).isBefore(parseDate(startDate), 'date')) {
      this.date = [endDate, startDate]

      this._pick({ detail: { value: this.date } })

      return
    }

    this.date = [startDate, endDate]

    this._pick({ detail: { value: this.date } })
  }

  private handleInput = (event: InputEvent): void => {
    const value = maskitoTransform(event.detail.value, this.fieldMaskOptions)

    requestAnimationFrame(() => {
      this.updateFieldInputValue(value)
    })

    if (this.isRange) {
      this.handleRangeInput(value)

      return
    }

    const isValueValid = parseDate(value).isValid()

    if (!isValueValid) return

    this.date = value

    this._pick({ detail: { value: this.date } })
  }

  private handleIconMouseDown = (event: Event): void => {
    event.preventDefault()

    if (!this.fieldInput?.inputElement) return

    if (this.fieldInput.focused && !this.isDeleteIcon) {
      this.fieldInput.inputElement.blur()

      return
    }

    this.fieldInput.inputElement.focus()
  }

  private handleIconClick = (): void => {
    if (!this.isDeleteIcon) {
      return
    }

    this.date = ''

    this._pick({ detail: { value: this.date } })
    this.calendar?.updateDate(this.date)
  }

  private handleCalendarMouseDown = (event: MouseEvent) => {
    event.preventDefault()
  }

  private handleLabelClick = () => {
    this.fieldInput?.inputElement?.focus()
  }

  private handleLabelMouseDown = (event: Event) => {
    if (this.isOpened) {
      event.preventDefault()
    }
  }

  private handleFieldInputRender = () => {
    this.applyMask()
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    this.destroyMask()
  }

  protected renderDropdownActivator() {
    return html`
      <alt-core-field-wrapper
        slot="activator"
        .disabled=${this.disabled}
        .readonly=${this.readonly}
        .error=${Boolean(this.errors?.length) || this.error}
        .size=${this.size}
        class=${classMap(this.computedFieldWrapperClasses)}
        @blur=${this.handleBlur}
        @focus=${this.handleFocus}
      >
        <alt-core-field-input
          .value=${this.maskedValue}
          .name=${this.name}
          .placeholder=${this.placeholder}
          .required=${this.required}
          .autofocus=${this.autofocus}
          .hideSpaceRight=${true}
          autocomplete="off"
          @input=${this.handleInput}
          @render=${this.handleFieldInputRender}
        ></alt-core-field-input>
        <alt-core-field-icon
          .icon=${this.isDeleteIcon ? altClose : altCalendar2}
          .clickable=${true}
          @mousedown=${this.handleIconMouseDown}
          @click=${this.handleIconClick}
        ></alt-core-field-icon>
      </alt-core-field-wrapper>
    `
  }

  protected renderDropdownContent() {
    if (!this.isOpened) return nothing

    return html`
      <alt-core-dropdown-list ?no-max-height=${true}>
        <div slot="list" class="${this.baseClass}__calendar" @mousedown=${this.handleCalendarMouseDown}>
          <alt-core-calendar
            .locale=${this.locale}
            .date=${this.date}
            .isRange=${this.isRange}
            .headerSelectors=${this.calendarHeaderSelectors}
            .minDate=${formatDate(this.computedMinDate)}
            .maxDate=${formatDate(this.computedMaxDate)}
            @select=${this.handleCalendarDateSelect}
            @range-start=${this.handleCalendarRangeStart}
          >
          </alt-core-calendar>
        </div>
      </alt-core-dropdown-list>
    `
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${renderLabel({
          text: this.labelText,
          tooltipText: this.labelTooltipText,
          debounce: this.labelDebounce,
          tooltipActive: !this.disabled,
          required: this.required,
          disabled: this.computedDisabledOrReadonly,
          handleMouseDown: this.handleLabelMouseDown,
          handleClick: this.handleLabelClick,
          className: classMapToString(this.computedLabelClasses),
        })}
        <alt-core-dropdown
          .isOpen=${this.isOpened}
          .trigger=${EAltCoreDropdownTrigger.MANUAL}
          .placement=${EAltCoreDropdownPlacement.BOTTOM_START}
          .offset=${{ mainAxis: 4 }}
          .middlewares=${this.dropdownMiddlewares}
          .disabled=${this.disabled || this.readonly}
        >
          ${this.renderDropdownActivator()}

          <div slot="content" class="${this.baseClass}__dropdown-content">
            ${this.renderDropdownContent()}
          </div>
        </alt-core-dropdown>
        ${renderAnnotation({
          text: this.annotationText,
          disabled: this.computedDisabledOrReadonly,
          className: classMapToString(this.computedAnnotationClasses),
          handleSlotAnnotationChange: this.handleSlotAnnotationChange,
        })}
        ${renderError({ errors: this.errors })}
      </div>
    `
  }
}
