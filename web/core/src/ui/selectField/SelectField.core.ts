import { html, LitElement, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'
import { provide } from '@lit/context'
import { autoPlacement as autoPlacementMiddleware } from '@floating-ui/dom'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { interceptEvents } from '~core/utils/event-interceptor'

import {
  AltCoreSelectFieldTagName as tagName,
  AltCoreDropdownCellTagName,
  AltCoreFieldInputTagName,
} from '~shared/constants'
import {
  type IAltCoreSelectListItem,
  type TItemValue,
  type TAltCoreSelectFieldItemValue,
  type IAltCoreSelectFieldExternalProps,
  createCoreSelectFieldExternalProps,
  isValueEqualListItem,
  SelectEvent, FocusEvent, BlurEvent, InputEvent,
  type VisibleEvent,
} from '~core/ui/selectField/models/types'
import AltCoreSelectFieldVarsCSS from '~core/ui/selectField/css/SelectField.vars.css?inline'
import AltCoreSelectFieldScopedCSS from '~core/ui/selectField/css/SelectField.scoped.css?inline'

import { disabledContextCreated, readonlyContextCreated, errorContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'

import type { AltCoreFieldInput } from '~core/ui/fieldInput'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldInput'
import '~core/ui/fieldIcon'
import '~core/ui/fieldAvatar'
import '~core/ui/avatar'
import '~core/ui/tag'
import '~core/ui/dropdown'
import '~core/ui/dropdownList'
import '~core/ui/dropdownCell'

import { altChevronDown, altCheck } from '~shared/icons'
import { renderIcon, renderLabel, renderError, renderAnnotation } from '~core/renderers'
import classMapToString from '~core/utils/classMapToString'
import { hasSlotContent } from '~core/utils/lit-slots'
import { booleanConverter } from '~core/utils/converters'

import { EAltCoreDropdownPlacement, EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import { withLocator } from '~core/utils/locator'

const { value, name, placeholder, autofocus, disabled, readonly, error, errors, size, required, labelText, labelTooltipText, annotationText, labelDebounce, isMapOptions, items, itemLabel, itemValue, isCustomFilter, isFilterable, filterValue, filterCallback } = createCoreSelectFieldExternalProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreSelectField extends LitElement {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCoreSelectFieldExternalProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IAltCoreSelectFieldExternalProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IAltCoreSelectFieldExternalProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCoreSelectFieldExternalProps['size'] = size

  @property({ type: Object }) value: IAltCoreSelectFieldExternalProps['value'] = value
  @property({ type: String, attribute: 'filter-value' }) filterValue: IAltCoreSelectFieldExternalProps['filterValue'] = filterValue
  @property({ type: String }) name: IAltCoreSelectFieldExternalProps['name'] = name
  @property({ type: String }) placeholder: IAltCoreSelectFieldExternalProps['placeholder'] = placeholder
  @property({ type: Boolean, reflect: true }) autofocus: NonNullable<IAltCoreSelectFieldExternalProps['autofocus']> = Boolean(autofocus)
  @property({ type: Boolean, reflect: true }) required: IAltCoreSelectFieldExternalProps['required'] = required
  @property({ type: Array }) errors: IAltCoreSelectFieldExternalProps['errors'] = errors
  @property({ type: Number, attribute: 'label-debounce' }) labelDebounce: IAltCoreSelectFieldExternalProps['labelDebounce'] = labelDebounce
  @property({ type: Boolean, attribute: 'is-map-options' }) isMapOptions: IAltCoreSelectFieldExternalProps['isMapOptions'] = isMapOptions
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreSelectFieldExternalProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreSelectFieldExternalProps['labelTooltipText'] = labelTooltipText
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IAltCoreSelectFieldExternalProps['annotationText'] = annotationText
  @property({ type: Array }) items: NonNullable<IAltCoreSelectFieldExternalProps['items']> = items ?? []
  @property({ type: String, attribute: 'item-label' }) itemLabel: NonNullable<IAltCoreSelectFieldExternalProps['itemLabel']> = String(itemLabel)
  @property({ type: String, attribute: 'item-value' }) itemValue: NonNullable<IAltCoreSelectFieldExternalProps['itemValue']> = String(itemValue)
  @property({ type: Boolean, attribute: 'is-custom-filter' }) isCustomFilter: IAltCoreSelectFieldExternalProps['isCustomFilter'] = isCustomFilter
  @property({ type: Boolean, attribute: 'is-filterable' }) isFilterable: IAltCoreSelectFieldExternalProps['isFilterable'] = isFilterable
  @property({ attribute: 'filter-callback' }) filterCallback: IAltCoreSelectFieldExternalProps['filterCallback'] = filterCallback

  @bubblingEvent(
    FocusEvent,
    { name: 'focus' },
  )
  _focus!: TDispatcher<FocusEvent>

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

  @bubblingEvent(
    BlurEvent,
    { name: 'blur' },
  )
  _blur!: TDispatcher<BlurEvent>

  @query(AltCoreFieldInputTagName) public readonly fieldInput?: AltCoreFieldInput

  @state() private isOpened = false
  @state() private hasAnnotationSlot = false
  @state() private hasBeforeSlot = false
  @state() private lastFocusTime = 0

  private readonly baseClass = tagName
  private readonly baseDropdownActivatorClass = `${this.baseClass}__activator`
  private readonly baseDropdownContentClass = `${this.baseClass}__content`
  private readonly baseDropdownListItemClass = `${this.baseClass}__list-item`
  private readonly baseDropdownListItemsClass = `${this.baseClass}__list-items`
  private readonly baseAnnotationClass = `${this.baseClass}__annotation`
  private readonly baseArrowIconClass = `${this.baseClass}__arrow-icon`
  private readonly baseInputClass = `${this.baseClass}__input`

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreSelectFieldVarsCSS)}
      ${unsafeCSS(AltCoreSelectFieldScopedCSS)}
    `,
  ]

  private get selectedItemByValue(): IAltCoreSelectListItem | undefined {
    if (this.value === undefined) {
      return undefined
    }

    if (this.isValueEqualListItem(this.value)) {
      return this.value
    }

    return this.findItemByValue(this.value)
  }

  private get inputValue(): string {
    if (this.isFilterable && this.isOpened) {
      return this.filterValue
    }

    return this.selectedItemByValue ? String(this.selectedItemByValue[this.itemLabel]) : ''
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_focused`]: this.isOpened,
      [`${this.baseClass}_size_${this.size}`]: true,
    }
  }
  private get computedLabelClasses() {
    return { [`${this.baseClass}__label`]: true }
  }
  private get computedAnnotationClasses() {
    return {
      [this.baseAnnotationClass]: true,
      [`${this.baseAnnotationClass}_hidden`]: !this.hasAnnotation,
    }
  }
  private get computedActivatorClasses() {
    return {
      [this.baseDropdownActivatorClass]: true,
      [`${this.baseDropdownActivatorClass}_readonly`]: Boolean(this.readonly),
      [`${this.baseDropdownActivatorClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseDropdownActivatorClass}_hide-before`]: !this.hasBeforeSlot,
    }
  }
  private get computedArrowIconClasses() {
    return {
      [this.baseArrowIconClass]: true,
      [`${this.baseArrowIconClass}_rotated`]: this.isOpened,
    }
  }
  private get computedInputClasses() {
    return {
      [this.baseInputClass]: true,
      [`${this.baseInputClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseInputClass}_readonly`]: Boolean(this.readonly),
    }
  }

  private get computedDisabledOrReadonly() {
    return this.disabled || this.readonly
  }
  private get isDropdownOpened() {
    if (this.computedDisabledOrReadonly) return false

    return this.isOpened
  }

  private get hasAnnotation() {
    return this.annotationText || this.hasAnnotationSlot
  }

  private get dropdownMiddlewares() {
    const allowedPlacements = [EAltCoreDropdownPlacement.BOTTOM, EAltCoreDropdownPlacement.TOP]

    return [autoPlacementMiddleware({ allowedPlacements })]
  }

  private get filteredItems() {
    if (this.filterValue.length === 0 || this.isCustomFilter) return this.items

    if (this.filterValue === this.selectedItemByValue?.[this.itemLabel]) return this.items

    const filterFn = this.filterCallback ?? this.defaultItemsFilter

    return filterFn(
      this.items,
      this.filterValue,
    )
  }

  private hasAvatarState = (item: IAltCoreSelectListItem | undefined) => {
    if (!item) return false

    return Boolean(item.img || item.icon || item.initials)
  }

  private handleSlotBeforeChange = (e: Event) => {
    const target = e.target as HTMLSlotElement

    this.hasBeforeSlot = hasSlotContent(target)
  }

  private handleSlotAnnotationChange = (e: Event) => {
    const target = e.target as HTMLSlotElement

    this.hasAnnotationSlot = hasSlotContent(target)
  }

  private setFilterValue(label: string) {
    this.filterValue = label
  }

  private isValueEqualListItem(value: TAltCoreSelectFieldItemValue): value is IAltCoreSelectListItem {
    return isValueEqualListItem(
      value,
      this.isMapOptions,
    )
  }

  private findItemByValue(value: IAltCoreSelectListItem[TItemValue]): IAltCoreSelectListItem | undefined {
    return this.items.find((item) => item[this.itemValue] === value)
  }

  private isItemSelected(item: IAltCoreSelectListItem): boolean {
    if (!this.selectedItemByValue) return false


    return this.selectedItemByValue[this.itemValue] === item[this.itemValue]
  }

  private getValueFromItem = (item: IAltCoreSelectListItem): IAltCoreSelectFieldExternalProps['value'] => {
    this.changeDropdownVisible(false)
    this.setFilterValue(String(item[this.itemLabel]))

    const value = this.isMapOptions ? item[this.itemValue] : item

    return value as IAltCoreSelectFieldExternalProps['value']
  }

  private handleSelect = (item: IAltCoreSelectListItem) => (event: Event) => {
    if (this.computedDisabledOrReadonly || !event.currentTarget) return

    event.stopPropagation()

    const value = this.getValueFromItem(item)

    this.value = value
    this._select({ detail: { value, item, event } })
    this.changeDropdownVisible(false)
  }

  private scrollToSelectedItem = () => {
    if (!this.selectedItemByValue) return

    const tryScroll = () => {
      // Look in the shadowRoot because the items are rendered there
      // The locator changes with the selected item, so a static @query cannot represent it.
      // eslint-disable-next-line lit/prefer-query-decorators
      const selectedItemElement = this.shadowRoot?.querySelector<HTMLElement>(`[locator="${AltCoreDropdownCellTagName}_${this.selectedItemByValue?.id}"]`)

      if (selectedItemElement) {
        selectedItemElement.scrollIntoView({
          behavior: 'smooth',
          block: 'nearest',
          inline: 'nearest',
        })
      }
    }

    requestAnimationFrame(tryScroll)
  }

  private changeDropdownVisible = (value: boolean) => {
    if (this.computedDisabledOrReadonly || !this.fieldInput?.inputElement) return

    if (this.isFilterable) {
      this.setFilterValue('')
    }

    this.isOpened = value

    if (this.isOpened) {
      this.fieldInput.inputElement.focus()
      this.scrollToSelectedItem()
    } else {
      this.fieldInput.inputElement.blur()
    }
  }

  private handleBlur = (event: BlurEvent) => {
    if (this.computedDisabledOrReadonly) return

    this._blur({ detail: { event } })
  }

  private handleLabelClick = () => {
    this.fieldInput?.inputElement?.focus()
  }

  private handleFocus = (event: FocusEvent) => {
    if (this.computedDisabledOrReadonly) return

    this.lastFocusTime = event.timeStamp
    this.changeDropdownVisible(true)

    this._focus({ detail: { event } })
  }

  private handleClick = (event: Event) => {
    if (this.computedDisabledOrReadonly) return
    // Ignore a click that arrives right after the focus that opened the dropdown, so it does not close it again
    const diffTimeBetweenFocusAndClick = event.timeStamp - this.lastFocusTime
    if (this.isOpened && diffTimeBetweenFocusAndClick < 150) return

    this.changeDropdownVisible(!this.isOpened)
  }

  private handleInput = (event: InputEvent) => {
    event.stopPropagation()

    if (this.disabled || this.readonly) return

    if (!this.isCustomFilter) {
      this.setFilterValue(event.detail.value)
      return
    }

    this._input({ detail: { value: event.detail.value, event } })
  }

  private handleClickOutside = (event: VisibleEvent) => {
    event.stopPropagation()

    if (this.computedDisabledOrReadonly) return

    // Ignore a click that arrives right after the focus that opened the dropdown, so it does not close it again
    const diffTimeBetweenFocusAndClick = event.timeStamp - this.lastFocusTime
    if (this.isOpened && diffTimeBetweenFocusAndClick < 150) return

    this.isOpened = event.detail.value
  }


  private defaultItemsFilter = (items: IAltCoreSelectListItem[], value: string) => {
    return items.filter((item) => String(item[this.itemLabel])
      .toLowerCase()
      .includes(value.toLowerCase()))
  }


  connectedCallback() {
    super.connectedCallback()


    if (!this.value || !this.selectedItemByValue) return

    this.filterValue = String(this.selectedItemByValue[this.itemLabel])
  }

  protected renderFieldAvatar(item: IAltCoreSelectListItem | undefined) {
    if (!this.hasAvatarState(item)) return nothing

    return html`
      <alt-core-field-avatar
        .photo=${item?.img}
        .icon=${item?.icon}
        .initials=${item?.initials}
      ></alt-core-field-avatar>
    `
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
            <div slot="label" class=${`${this.baseDropdownListItemClass}__label`} title=${String(item[this.itemLabel])}>
              ${item[this.itemLabel]}
            </div>
          </div>
          
          <div slot="append" class=${`${this.baseDropdownListItemClass}__append`}>
            ${this.isItemSelected(item)
              ? renderIcon({ icon: altCheck, size: '16px' })
              : nothing}
          </div>
        </alt-core-dropdown-cell>
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
        <slot
          name="before"
          @slotchange=${this.handleSlotBeforeChange}
        ></slot>
        ${this.renderFieldAvatar(this.selectedItemByValue)}
        <alt-core-field-input
          .value=${this.inputValue}
          .name=${this.name}
          .placeholder=${this.placeholder}
          .required=${this.required}
          .readonly=${!this.isFilterable}
          .autofocus=${this.autofocus}
          .hideSpaceLeft=${this.hasAvatarState(this.selectedItemByValue) || this.hasBeforeSlot}
          .hideSpaceRight=${!this.readonly}
          class=${classMapToString(this.computedInputClasses)}
          @input=${this.handleInput}
          @focus=${this.handleFocus}
          @blur=${this.handleBlur}
        ></alt-core-field-input>
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
          .isOpen=${this.isDropdownOpened}
          .placement=${EAltCoreDropdownPlacement.BOTTOM}
          .trigger=${EAltCoreDropdownTrigger.MANUAL}
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
