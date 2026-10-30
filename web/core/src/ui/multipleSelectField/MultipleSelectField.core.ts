import { html, LitElement, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { interceptEvents } from '~core/utils/event-interceptor'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'
import { provide } from '@lit/context'

import { autoPlacement as autoPlacementMiddleware } from '@floating-ui/dom'

import {
  AltCoreMultipleSelectFieldTagName as tagName,
  AltCoreFieldWrapperTagName,
  AltCoreFieldInputTagName,
  AltCoreDropdownCellTagName,
} from '~shared/constants'

import {
  type IAltCoreMultipleSelectFieldProps,
  createCoreMultipleSelectFieldProps,
  isMultipleValueEqualListItems,
  isValueEqualListItem,
  SelectEvent,
  FocusEvent,
  BlurEvent,
  InputEvent,
  type VisibleEvent,
} from './models/types'
import AltCoreMultipleSelectFieldVarsCSS from '~core/ui/multipleSelectField/css/MultipleSelectField.vars.css?inline'
import AltCoreMultipleSelectFieldScopedCSS from '~core/ui/multipleSelectField/css/MultipleSelectField.scoped.css?inline'

import { disabledContextCreated, readonlyContextCreated, errorContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'

import type { AltCoreFieldWrapper } from '~core/ui/fieldWrapper'
import type { AltCoreFieldInput } from '~core/ui/fieldInput'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldInput'
import '~core/ui/fieldIcon'
import '~core/ui/avatar'

import '~core/ui/dropdown'
import '~core/ui/dropdownList'
import '~core/ui/dropdownCell'
import '~core/ui/simpleChip'

import { altChevronDown, altCheck } from '~shared/icons'
import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { renderIcon, renderLabel, renderError, renderAnnotation } from '~core/renderers'
import { booleanConverter } from '~core/utils/converters'
import classMapToString from '~core/utils/classMapToString'

import type { KeydownEvent } from '~core/ui/fieldInput/models/types/events'
import type { IAltCoreSelectListItem, TItemValue, TAltCoreSelectFieldItemValue } from '~core/ui/selectField/models/types/external'
import type { ClickIconEmitEvent } from '~core/ui/simpleChip/models/types'
import { EAltCoreDropdownPlacement, EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import { EAltCoreSimpleChipVariant } from '~core/ui/simpleChip/models/types'
import { hasSlotContent } from '~core/utils/lit-slots'
import { EAltSizes } from '~shared/types/global'
import { withLocator } from '~core/utils/locator'

const { value, name, placeholder, autofocus, disabled, readonly, error, errors, size, required, labelText, labelTooltipText, annotationText, labelDebounce, isMapOptions, items, itemLabel, itemValue, isCustomFilter, isFilterable, filterValue, filterCallback } = createCoreMultipleSelectFieldProps()

const BACKSPACE_KEY = 'Backspace'
const MIN_INPUT_WIDTH = 4
const CLICK_OUTSIDE_DELAY = 150

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreMultipleSelectField extends LitElement implements IAltCoreMultipleSelectFieldProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCoreMultipleSelectFieldProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IAltCoreMultipleSelectFieldProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IAltCoreMultipleSelectFieldProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCoreMultipleSelectFieldProps['size'] = size

  @property({ type: Array }) value: IAltCoreMultipleSelectFieldProps['value'] = value
  @property({ type: String, attribute: 'filter-value' }) filterValue: IAltCoreMultipleSelectFieldProps['filterValue'] = filterValue
  @property({ type: String }) name: IAltCoreMultipleSelectFieldProps['name'] = name
  @property({ type: String }) placeholder: IAltCoreMultipleSelectFieldProps['placeholder'] = placeholder
  @property({ type: Boolean, reflect: true }) autofocus: NonNullable<IAltCoreMultipleSelectFieldProps['autofocus']> = Boolean(autofocus)
  @property({ type: Boolean, reflect: true }) required: IAltCoreMultipleSelectFieldProps['required'] = required
  @property({ type: Array }) errors: IAltCoreMultipleSelectFieldProps['errors'] = errors
  @property({ type: Number, attribute: 'label-debounce' }) labelDebounce: IAltCoreMultipleSelectFieldProps['labelDebounce'] = labelDebounce
  @property({ type: Boolean, attribute: 'is-map-options' }) isMapOptions: IAltCoreMultipleSelectFieldProps['isMapOptions'] = isMapOptions
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreMultipleSelectFieldProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreMultipleSelectFieldProps['labelTooltipText'] = labelTooltipText
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreMultipleSelectFieldProps['annotationText'] = annotationText
  @property({ type: Array }) items: NonNullable<IAltCoreMultipleSelectFieldProps['items']> = items ?? []
  @property({ type: String, attribute: 'item-label' }) itemLabel: NonNullable<IAltCoreMultipleSelectFieldProps['itemLabel']> = String(itemLabel)
  @property({ type: String, attribute: 'item-value' }) itemValue: NonNullable<IAltCoreMultipleSelectFieldProps['itemValue']> = String(itemValue)
  @property({ type: Boolean, attribute: 'is-custom-filter' }) isCustomFilter: IAltCoreMultipleSelectFieldProps['isCustomFilter'] = isCustomFilter
  @property({ type: Boolean, attribute: 'is-filterable' }) isFilterable: IAltCoreMultipleSelectFieldProps['isFilterable'] = isFilterable
  @property({ attribute: 'filter-callback' }) filterCallback: IAltCoreMultipleSelectFieldProps['filterCallback'] = filterCallback

  @bubblingEvent(
    FocusEvent,
    { name: 'focus' },
  )
  _focus!: TDispatcher<FocusEvent>

  @bubblingEvent(
    BlurEvent,
    { name: 'blur' },
  )
  _blur!: TDispatcher<BlurEvent>

  @bubblingEvent(
    SelectEvent,
    { name: 'select' },
  )
  _select!: TDispatcher<SelectEvent>

  @bubblingEvent(
    InputEvent,
    { name: 'input' },
  )
  _input!: TDispatcher<InputEvent>

  @state() private isOpened = false
  @state() private hasAnnotationSlot = false
  @state() private lastFocusTime = 0

  @query(AltCoreFieldWrapperTagName) public readonly fieldWrapper?: AltCoreFieldWrapper
  @query(AltCoreFieldInputTagName) public readonly fieldInput?: AltCoreFieldInput

  private readonly baseClass = tagName
  private readonly baseDropdownActivatorClass = `${this.baseClass}__activator`
  private readonly baseDropdownContentClass = `${this.baseClass}__content`
  private readonly baseDropdownListItemsClass = `${this.baseClass}__list-items`
  private readonly baseDropdownListItemClass = `${this.baseClass}__list-item`
  private readonly baseAnnotationClass = `${this.baseClass}__annotation`
  private readonly baseChipClass = `${this.baseClass}__chip`
  private readonly baseChipWrapperClass = `${this.baseClass}__chip-wrapper`
  private readonly baseInputClass = `${this.baseClass}__input`
  private readonly baseInputOverlayClass = `${this.baseClass}__input-overlay`
  private readonly baseArrowIconClass = `${this.baseClass}__arrow-icon`

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_focused`]: this.isOpened,
    }
  }
  private get computedLabelClasses() {
    return { [`${this.baseClass}__label`]: true }
  }
  private get computedAnnotationClasses() {
    return {
      [this.baseAnnotationClass]: true,
      [`${this.baseAnnotationClass}_hidden`]: Boolean(!this.hasAnnotation),
    }
  }
  private get computedChipClasses() {
    return {
      [this.baseChipClass]: true,
      [`${this.baseChipClass}_size_${this.size}`]: true,
      [`${this.baseChipClass}_readonly`]: Boolean(this.readonly),
    }
  }
  private get computedInputClasses() {
    return {
      [this.baseInputClass]: true,
      [`${this.baseInputClass}_has-selected-values`]: this.hasSelectedValues,
    }
  }

  private get computedActivatorClasses() {
    return {
      [this.baseDropdownActivatorClass]: true,
      [`${this.baseDropdownActivatorClass}_readonly`]: Boolean(this.readonly),
    }
  }
  private get computedChipWrapperClasses() {
    return {
      [this.baseChipWrapperClass]: true,
      [`${this.baseChipWrapperClass}_size_${this.size}`]: true,
      [`${this.baseChipWrapperClass}_no-selected-values`]: !this.hasSelectedValues,
    }
  }

  private get computedArrowIconClasses() {
    return {
      [this.baseArrowIconClass]: true,
      [`${this.baseArrowIconClass}_rotated`]: this.isOpened,
    }
  }

  private get computedDisabledOrReadonly() {
    return this.disabled || this.readonly
  }

  private get hasAnnotation() {
    return Boolean(this.annotationText) || this.hasAnnotationSlot
  }

  private get filteredItems() {
    if (this.isCustomFilter) return this.items

    const filterFn = this.filterCallback ?? this.defaultItemsFilter

    return filterFn(this.items, this.filterValue)
  }

  private get hasSelectedValues() {
    return this.selectedItemsByValue.length > 0
  }

  private get selectedItemsByValue(): NonNullable<IAltCoreSelectListItem[]> {
    if (!Array.isArray(this.value)) {
      return []
    }

    if (isMultipleValueEqualListItems(
      this.value,
      this.isMapOptions,
    )) {
      return this.value
    }

    return this.value.map((valueElement) => this.findItemByValue(valueElement))
      .filter((el) => el !== undefined)
  }

  private get dropdownMiddlewares() {
    const allowedPlacements = [EAltCoreDropdownPlacement.BOTTOM, EAltCoreDropdownPlacement.TOP]

    return [autoPlacementMiddleware({ allowedPlacements })]
  }

  private getTextWidth(text: string): number {
    const canvas = document.createElement('canvas')
    const context = canvas.getContext('2d')
    if (!context || !this.fieldInput?.inputElement) return MIN_INPUT_WIDTH

    const computedStyle = window.getComputedStyle(this.fieldInput.inputElement)
    context.font = computedStyle.font
    const inputElementPaddingX = parseInt(computedStyle.paddingLeft) + parseInt(computedStyle.paddingRight)

    return Math.ceil(Math.max(MIN_INPUT_WIDTH, context.measureText(text).width) + inputElementPaddingX)
  }

  private get computedInputStyles() {
    if (!this.filterValue) return ''

    const width = this.getTextWidth(this.filterValue)
    return `max-width: ${width}px`
  }

  private hasAvatarState = (item: IAltCoreSelectListItem | undefined) => {
    if (!item) return false

    return Boolean(item.img || item.icon || item.initials)
  }

  private handleSlotAnnotationChange = (event: Event) => {
    event.stopPropagation()

    const target = event.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  private findItemByValue(value: IAltCoreSelectListItem[TItemValue]): IAltCoreSelectListItem | undefined {
    return this.items.find((item) => item[this.itemValue] === value)
  }

  private isValueEqualListItem(value: TAltCoreSelectFieldItemValue): value is IAltCoreSelectListItem {
    return isValueEqualListItem(
      value,
      this.isMapOptions,
    )
  }

  private setOrDeleteItemFromValue(item: IAltCoreSelectListItem) {
    const currentValue = this.value ?? []

    const filteredValues = currentValue.filter((el) => {
      if (this.isValueEqualListItem(el)) {
        return el[this.itemValue] !== item[this.itemValue]
      }

      return el !== item[this.itemValue]
    })

    if (filteredValues.length === currentValue.length) {
      filteredValues.push(item)
    }

    return filteredValues
  }

  private blurFieldInput = () => {
    this.fieldInput?.inputElement?.blur()
    this.fieldWrapper?.blur()
  }

  private deleteItemFromValue = (item: IAltCoreSelectListItem) => (event: ClickIconEmitEvent) => {
    if (this.readonly || !this.value) return

    event.detail.stopPropagation()

    const itemValue = item[this.itemValue]

    this.value = this.value.filter((element) => {
      if (this.isValueEqualListItem(element)) {
        return element[this.itemValue] !== itemValue
      }

      return element !== itemValue
    })

    this._select({ detail: { value: this.value } })

    if (this.value.length === 0 && !this.isOpened) {
      this.blurFieldInput()
    }
  }

  private handleSelect = (item: IAltCoreSelectListItem) => (event: PointerEvent) => {
    event.stopPropagation()

    if (this.computedDisabledOrReadonly || !event.currentTarget) return

    this.value = this.setOrDeleteItemFromValue(item)

    this.filterValue = ''

    this.fieldInput?.inputElement?.focus()

    this._select({ detail: { value: this.value } })
  }

  private changeDropdownVisible(value: boolean) {
    if (this.computedDisabledOrReadonly || !this.fieldInput?.inputElement) return

    this.isOpened = value

    if (this.isOpened) {
      this.fieldInput.inputElement.focus()
    } else {
      this.fieldInput.inputElement.blur()
    }
  }

  private handleLabelClick = () => {
    this.fieldInput?.inputElement?.focus()
  }

  private handleBlur = () => {
    if (this.computedDisabledOrReadonly) return

    this._blur()
  }

  private handleFocus = (event: FocusEvent) => {
    if (this.computedDisabledOrReadonly) return

    this.lastFocusTime = event.timeStamp
    this.changeDropdownVisible(true)

    this._focus()
  }

  private handleClick = (event: Event) => {
    if (this.computedDisabledOrReadonly) return

    // Ignore a click that arrives right after the focus that opened the dropdown, so it does not close it again
    const diffTimeBetweenFocusAndClick = event.timeStamp - this.lastFocusTime
    if (this.isOpened && diffTimeBetweenFocusAndClick < CLICK_OUTSIDE_DELAY) return

    this.changeDropdownVisible(!this.isOpened)
  }

  private handleKeydown = (event: KeydownEvent) => {
    event.stopPropagation()

    if (event.detail.code !== BACKSPACE_KEY || this.filterValue.length > 0) return

    if (this.value) {
      this.value = this.value.slice(0, -1)
      this._select({ detail: { value: this.value } })
    }
  }

  private handleInput = (event: InputEvent) => {
    event.stopPropagation()

    if (this.computedDisabledOrReadonly) return

    if (!this.isCustomFilter) {
      this.filterValue = event.detail.value
    }

    this._input({ detail: { value: event.detail.value, event } })
  }

  private handleClickOutside = (event: VisibleEvent) => {
    event.stopPropagation()

    if (this.computedDisabledOrReadonly) return

    // Ignore a click that arrives right after the focus that opened the dropdown, so it does not close it again
    const diffTimeBetweenFocusAndClick = event.timeStamp - this.lastFocusTime
    if (this.isOpened && diffTimeBetweenFocusAndClick < CLICK_OUTSIDE_DELAY) return

    this.isOpened = event.detail.value
  }

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreMultipleSelectFieldVarsCSS)}
      ${unsafeCSS(AltCoreMultipleSelectFieldScopedCSS)}
    `,
  ]

  private defaultItemsFilter = (items: IAltCoreSelectListItem[], value: string) => {
    return items.filter((item) => String(item[this.itemLabel]).toLowerCase()
      .includes(value.toLowerCase()))
  }

  private handleInputOverlayClick = () => {
    if (this.isOpened) {
      this.changeDropdownVisible(false)
    } else {
      this.fieldInput?.inputElement?.focus()
    }
  }

  private handleChipClick = (event: Event) => {
    event.stopPropagation()
  }

  protected renderItemAvatar(item: IAltCoreSelectListItem | undefined) {
    if (!this.hasAvatarState(item)) return nothing

    return html`
      <alt-core-avatar
        .photo=${item?.img}
        .icon=${item?.icon}
        .initials=${item?.initials}
        .size=${this.size}
      ></alt-core-avatar>
    `
  }

  protected renderDropdownList() {
    const dropdownItems = this.isFilterable ? this.filteredItems : this.items

    return repeat(
      dropdownItems,
      (item) => item.id,
      (item) => html`
        <alt-core-dropdown-cell
          locator=${`${AltCoreDropdownCellTagName}_${item.id}`}
          @click=${this.handleSelect(item)}
          class=${this.baseDropdownListItemClass}
        >
          <div slot="prepend" class=${`${this.baseDropdownListItemClass}__prepend`}>
            ${this.renderItemAvatar(item)}
          </div>

          <div slot="content" class=${`${this.baseDropdownListItemClass}__content`}>
            <div title=${String(item[this.itemLabel])} class=${`${this.baseDropdownListItemClass}__label`}>
              ${item[this.itemLabel]}
            </div>
          </div>

          <div slot="append" class=${`${this.baseDropdownListItemClass}__append`}>
            ${this.selectedItemsByValue.some((el) => String(el[this.itemValue]) === String(item[this.itemValue]))
              ? renderIcon({ icon: altCheck, size: '16px' })
              : nothing
            }
          </div>
        </alt-core-dropdown-cell>
      `,
    )
  }

  protected renderMultipleValues() {
    if (!this.hasSelectedValues) return null

    return repeat(
      this.selectedItemsByValue,
      (item) => item.id,
      (item) => html`
        <alt-core-simple-chip
          variant=${EAltCoreSimpleChipVariant.MUTED} 
          class=${classMap(this.computedChipClasses)}
          .size=${this.size === 'large' ? EAltSizes.MEDIUM : EAltSizes.SMALL}
          .disabled=${this.disabled}
          .readonly=${this.readonly}
          @click-icon=${this.deleteItemFromValue(item)}
          @click=${this.handleChipClick}
        >${item[this.itemLabel]}</alt-core-simple-chip>
      `,
    )
  }

  protected renderDropdownActivator() {
    return html`
      <alt-core-field-wrapper
        .disabled=${this.disabled}
        .readonly=${this.readonly}
        .error=${Boolean(this.errors?.length) || this.error}
        .size=${this.size}
        clickable
        @click=${this.handleClick}

      >
        <div class=${classMap(this.computedChipWrapperClasses)}>
          ${this.renderMultipleValues()}
          <alt-core-field-input
            .value=${this.filterValue}
            .name=${this.name}
            .placeholder=${this.hasSelectedValues ? undefined : this.placeholder}
            .required=${this.required}
            .readonly=${!this.isFilterable}
            .autofocus=${this.autofocus}
            .hideSpaceLeft=${this.hasSelectedValues}
            .hideSpaceRight=${!this.readonly}
            class=${classMapToString(this.computedInputClasses)}
            style=${this.computedInputStyles}
            @input=${this.handleInput}
            @keydown=${this.handleKeydown}
            @focus=${this.handleFocus}
            @blur=${this.handleBlur}
          ></alt-core-field-input>
          <div
            class=${this.baseInputOverlayClass}
            @click=${this.handleInputOverlayClick}
          ></div>
        </div>
        ${!this.readonly
          ? html`
            <alt-core-field-icon
              .icon=${altChevronDown}
              hoverable
              class=${classMap(this.computedArrowIconClasses)}
            ></alt-core-field-icon>
          `
          : nothing
        }
      </alt-core-field-wrapper>
    `
  }

  protected renderDropdownContent() {
    return html`
      <alt-core-dropdown-list>
        ${html`
          <slot name="dropdown-list-top" slot="top">
          </slot>
        `}

        <div class=${this.baseDropdownListItemsClass} slot="list">
          <slot name="list">
            ${this.renderDropdownList()}
          </slot>
        </div>

        ${html`
          <slot name="dropdown-list-bottom" slot="bottom">
          </slot>
        `}
      </alt-core-dropdown-list>`
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
          handleClick: this.handleLabelClick,
          className: classMapToString(this.computedLabelClasses),
        })}
        <alt-core-dropdown
          .isOpen=${this.isOpened}
          .trigger=${EAltCoreDropdownTrigger.MANUAL}
          .placement=${EAltCoreDropdownPlacement.BOTTOM_START}
          .middlewares=${this.dropdownMiddlewares}
          strict-width
          @click-outside=${this.handleClickOutside}
        >
          <div slot="activator" class=${classMap(this.computedActivatorClasses)}>
              ${this.renderDropdownActivator()}
          </div>
        
          <div slot="content" class=${this.baseDropdownContentClass}>
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
