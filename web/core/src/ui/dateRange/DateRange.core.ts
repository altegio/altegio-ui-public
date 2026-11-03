import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'

import {
  DateRangeChangeEvent,
  createCoreDateRangeProps,
  type IAltCoreDateRangeProps,
  type IAltCoreDateRangeValue,
} from '~core/ui/dateRange/models/types'
import type { IAltCoreDatePickerExternalProps, PickEvent } from '~core/ui/datePicker/models/types'
import type { AltCoreDatePicker } from '~core/ui/datePicker'
import { AltCoreDatePickerTagName, AltCoreDateRangeTagName as tagName } from '~shared/constants'
import { toIsoDate } from '~shared/utils/dateTime'
import { booleanConverter } from '~core/utils/converters'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { withLocator } from '~core/utils/locator'
import { FormAssociated, getNativeValidity } from '~core/utils/a11y/form-associated'

import '~core/ui/datePicker'

import AltCoreDateRangeVarsCss from '~core/ui/dateRange/css/DateRange.vars.css?inline'
import AltCoreDateRangeScopedCss from '~core/ui/dateRange/css/DateRange.scoped.css?inline'

const {
  from,
  to,
  placeholder,
  required,
  disabled,
  readonly,
  error,
  errors,
  size,
  minDate,
  maxDate,
  labelText,
  labelTooltipText,
  labelDebounce,
  annotationText,
  calendarHeaderSelectors,
  locale,
} = createCoreDateRangeProps()

/**
 * A field for a period: a masked `DD.MM.YYYY - DD.MM.YYYY` input with a range calendar.
 *
 * `from` and `to` are `YYYY-MM-DD` strings. The `change` event reports both as `YYYY-MM-DD` or `null`:
 * after both dates are picked or typed, and with two `null` values when the field is cleared.
 * In a form, the field submits `from` and `to` as two values under its `name`.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreDateRange
  extends FormAssociated(LitElement)
  implements IAltCoreDateRangeProps {
  @property({ type: String }) from: IAltCoreDateRangeProps['from'] = from
  @property({ type: String }) to: IAltCoreDateRangeProps['to'] = to
  @property({ type: String }) placeholder: IAltCoreDateRangeProps['placeholder'] = placeholder
  @property({ type: Boolean, converter: booleanConverter }) required: IAltCoreDateRangeProps['required'] = required
  @property({ type: Boolean, converter: booleanConverter }) disabled: IAltCoreDateRangeProps['disabled'] = disabled
  @property({ type: Boolean, converter: booleanConverter }) readonly: IAltCoreDateRangeProps['readonly'] = readonly
  @property({ type: Boolean, converter: booleanConverter }) error: IAltCoreDateRangeProps['error'] = error
  @property({ type: Array }) errors: IAltCoreDateRangeProps['errors'] = errors
  @property({ type: String }) size: IAltCoreDateRangeProps['size'] = size
  @property({ type: String, attribute: 'min-date' }) minDate: IAltCoreDateRangeProps['minDate'] = minDate
  @property({ type: String, attribute: 'max-date' }) maxDate: IAltCoreDateRangeProps['maxDate'] = maxDate
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreDateRangeProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreDateRangeProps['labelTooltipText'] = labelTooltipText
  @property({ type: Number, attribute: 'label-debounce' }) labelDebounce: IAltCoreDateRangeProps['labelDebounce'] = labelDebounce
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreDateRangeProps['annotationText'] = annotationText
  @property({ type: Boolean, attribute: 'calendar-header-selectors', converter: booleanConverter }) calendarHeaderSelectors: IAltCoreDateRangeProps['calendarHeaderSelectors'] = calendarHeaderSelectors
  @property({ type: Object, attribute: false }) locale: IAltCoreDateRangeProps['locale'] = locale

  // Recreated only when the range changes, so re-renders do not reset a range the user is picking
  @state() private pickerDate: IAltCoreDatePickerExternalProps['date'] = ''

  @bubblingEvent(DateRangeChangeEvent, { name: 'change' })
  protected _change!: TDispatcher<DateRangeChangeEvent>

  @query(AltCoreDatePickerTagName) private readonly datePicker?: AltCoreDatePicker

  private defaultRange: IAltCoreDateRangeValue = { from: null, to: null }

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreDateRangeVarsCss)}
      ${unsafeCSS(AltCoreDateRangeScopedCss)}
    `,
  ]

  private get formDates() {
    return [this.from, this.to].map(toIsoDate).filter((isoDate) => isoDate !== null)
  }

  /** `from` and `to` as two values under the field's `name` */
  protected get formValue() {
    const formData = new FormData()
    for (const isoDate of this.formDates) formData.append(this.name ?? '', isoDate)

    return formData
  }

  protected get formValidity() {
    return getNativeValidity(
      { required: this.required, readonly: this.readonly },
      { value: this.formDates.length === 2 ? this.formDates.join(' - ') : '' },
      this.datePicker?.fieldInput?.inputElement,
    )
  }

  protected resetFormControl() {
    const { from: defaultFrom, to: defaultTo } = this.defaultRange
    if (toIsoDate(this.from) === defaultFrom && toIsoDate(this.to) === defaultTo) return

    this.from = defaultFrom ?? undefined
    this.to = defaultTo ?? undefined
    this._change({ detail: { ...this.defaultRange } })
  }

  protected firstUpdated() {
    this.defaultRange = { from: toIsoDate(this.from), to: toIsoDate(this.to) }
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('from') || changedProperties.has('to')) {
      this.pickerDate = this.from && this.to ? [this.from, this.to] : ''
    }
  }

  private handlePick = (event: PickEvent) => {
    // The inner event would leak out of the shadow root next to `change`
    event.stopPropagation()

    const { value } = event.detail
    const [rangeFrom, rangeTo] = Array.isArray(value) ? value : []
    const detail: IAltCoreDateRangeValue = {
      from: toIsoDate(rangeFrom),
      to: toIsoDate(rangeTo),
    }

    // The range is the form value, also when no framework writes `change` back
    this.from = detail.from ?? undefined
    this.to = detail.to ?? undefined
    this._change({ detail })
  }

  protected render() {
    return html`
      <alt-core-date-picker
        class=${this.baseClass}
        is-range
        .date=${this.pickerDate}
        .name=${this.name}
        .placeholder=${this.placeholder}
        .required=${this.required}
        .disabled=${this.disabled}
        .readonly=${this.readonly}
        .error=${this.error}
        .errors=${this.withValidationError(this.errors)}
        .size=${this.size}
        .minDate=${this.minDate}
        .maxDate=${this.maxDate}
        .labelText=${this.labelText}
        .labelTooltipText=${this.labelTooltipText}
        .labelDebounce=${this.labelDebounce}
        .annotationText=${this.annotationText}
        .calendarHeaderSelectors=${this.calendarHeaderSelectors}
        .locale=${this.locale}
        .autofocus=${this.autofocus}
        @pick=${this.handlePick}
      ></alt-core-date-picker>
    `
  }
}
