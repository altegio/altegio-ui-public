import { html, LitElement, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'
import { provide } from '@lit/context'
import { autoPlacement as autoPlacementMiddleware } from '@floating-ui/dom'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { interceptEvents } from '~core/utils/event-interceptor'

import {
  YCoreSelectFieldTagName as tagName,
  YCoreDropdownCellTagName,
  YCoreFieldInputTagName,
} from '~shared/constants'
import {
  type IYCoreSelectListItem,
  type TItemValue,
  type TYCoreSelectFieldItemValue,
  type IYCoreSelectFieldExternalProps,
  createCoreSelectFieldExternalProps,
  isValueEqualListItem,
  SelectEvent, FocusEvent, BlurEvent, InputEvent,
  type VisibleEvent,
} from '~core/ui/selectField/models/types'
import YCoreSelectFieldVarsCSS from '~core/ui/selectField/css/SelectField.vars.css?inline'
import YCoreSelectFieldScopedCSS from '~core/ui/selectField/css/SelectField.scoped.css?inline'

import { disabledContextCreated, readonlyContextCreated, errorContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'

import type { YCoreFieldInput } from '~core/ui/fieldInput'

import '~core/ui/fieldWrapper'
import '~core/ui/fieldInput'
import '~core/ui/fieldIcon'
import '~core/ui/fieldAvatar'
import '~core/ui/avatar'
import '~core/ui/tag'
import '~core/ui/dropdown'
import '~core/ui/dropdownList'
import '~core/ui/dropdownCell'

import { yChevronDown, yCheck } from '~shared/icons'
import { renderIcon, renderLabel, renderError, renderAnnotation } from '~core/renderers'
import classMapToString from '~core/utils/classMapToString'
import { hasSlotContent } from '~core/utils/lit-slots'
import { booleanConverter } from '~core/utils/converters'

import { EYCoreDropdownPlacement, EYCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import { withLocator } from '~core/utils/locator'

const { value, name, placeholder, autofocus, disabled, readonly, error, errors, size, required, labelText, labelTooltipText, annotationText, labelDebounce, isMapOptions, items, itemLabel, itemValue, isCustomFilter, isFilterable, filterValue, filterCallback } = createCoreSelectFieldExternalProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreSelectField extends LitElement {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IYCoreSelectFieldExternalProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IYCoreSelectFieldExternalProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IYCoreSelectFieldExternalProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IYCoreSelectFieldExternalProps['size'] = size

  @property({ type: Object }) value: IYCoreSelectFieldExternalProps['value'] = value
  @property({ type: String, attribute: 'filter-value' }) filterValue: IYCoreSelectFieldExternalProps['filterValue'] = filterValue
  @property({ type: String }) name: IYCoreSelectFieldExternalProps['name'] = name
  @property({ type: String }) placeholder: IYCoreSelectFieldExternalProps['placeholder'] = placeholder
  @property({ type: Boolean, reflect: true }) autofocus: NonNullable<IYCoreSelectFieldExternalProps['autofocus']> = Boolean(autofocus)
  @property({ type: Boolean, reflect: true }) required: IYCoreSelectFieldExternalProps['required'] = required
  @property({ type: Array }) errors: IYCoreSelectFieldExternalProps['errors'] = errors
  @property({ type: Number, attribute: 'label-debounce' }) labelDebounce: IYCoreSelectFieldExternalProps['labelDebounce'] = labelDebounce
  @property({ type: Boolean, attribute: 'is-map-options' }) isMapOptions: IYCoreSelectFieldExternalProps['isMapOptions'] = isMapOptions
  @property({ type: String, attribute: 'label-text' }) labelText: IYCoreSelectFieldExternalProps['labelText'] = labelText
  @property({ type: String, attribute: 'label-tooltip-text' }) labelTooltipText: IYCoreSelectFieldExternalProps['labelTooltipText'] = labelTooltipText
  @property({ type: String, attribute: 'annotation-text' }) annotationText: IYCoreSelectFieldExternalProps['annotationText'] = annotationText
  @property({ type: Array }) items: NonNullable<IYCoreSelectFieldExternalProps['items']> = items ?? []
  @property({ type: String, attribute: 'item-label' }) itemLabel: NonNullable<IYCoreSelectFieldExternalProps['itemLabel']> = String(itemLabel)
  @property({ type: String, attribute: 'item-value' }) itemValue: NonNullable<IYCoreSelectFieldExternalProps['itemValue']> = String(itemValue)
  @property({ type: Boolean, attribute: 'is-custom-filter' }) isCustomFilter: IYCoreSelectFieldExternalProps['isCustomFilter'] = isCustomFilter
  @property({ type: Boolean, attribute: 'is-filterable' }) isFilterable: IYCoreSelectFieldExternalProps['isFilterable'] = isFilterable
  @property({ attribute: 'filter-callback' }) filterCallback: IYCoreSelectFieldExternalProps['filterCallback'] = filterCallback

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

  @query(YCoreFieldInputTagName) public readonly fieldInput?: YCoreFieldInput

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
      ${unsafeCSS(YCoreSelectFieldVarsCSS)}
      ${unsafeCSS(YCoreSelectFieldScopedCSS)}
    `,
  ]

  private get selectedItemByValue(): IYCoreSelectListItem | undefined {
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
    const allowedPlacements = [EYCoreDropdownPlacement.BOTTOM, EYCoreDropdownPlacement.TOP]

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

  private hasAvatarState = (item: IYCoreSelectListItem | undefined) => {
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

  private isValueEqualListItem(value: TYCoreSelectFieldItemValue): value is IYCoreSelectListItem {
    return isValueEqualListItem(
      value,
      this.isMapOptions,
    )
  }

  private findItemByValue(value: IYCoreSelectListItem[TItemValue]): IYCoreSelectListItem | undefined {
    return this.items.find((item) => item[this.itemValue] === value)
  }

  private isItemSelected(item: IYCoreSelectListItem): boolean {
    if (!this.selectedItemByValue) return false


    return this.selectedItemByValue[this.itemValue] === item[this.itemValue]
  }

  private getValueFromItem = (item: IYCoreSelectListItem): IYCoreSelectFieldExternalProps['value'] => {
    this.changeDropdownVisible(false)
    this.setFilterValue(String(item[this.itemLabel]))

    const value = this.isMapOptions ? item[this.itemValue] : item

    return value as IYCoreSelectFieldExternalProps['value']
  }

  private handleSelect = (item: IYCoreSelectListItem) => (event: Event) => {
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
      // Ищем в shadowRoot, так как элементы рендерятся там
      const selectedItemElement = this.shadowRoot?.querySelector<HTMLElement>(`[locator="${YCoreDropdownCellTagName}_${this.selectedItemByValue?.id}"]`)

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
    // Если дропдаун только что открылся по фокусу, не закрываем его.
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

    // Если дропдаун только что открылся по фокусу, не закрываем его
    const diffTimeBetweenFocusAndClick = event.timeStamp - this.lastFocusTime
    if (this.isOpened && diffTimeBetweenFocusAndClick < 150) return

    this.isOpened = event.detail.value
  }


  private defaultItemsFilter = (items: IYCoreSelectListItem[], value: string) => {
    return items.filter((item) => String(item[this.itemLabel])
      .toLowerCase()
      .includes(value.toLowerCase()))
  }


  connectedCallback() {
    super.connectedCallback()


    if (!this.value || !this.selectedItemByValue) return

    this.filterValue = String(this.selectedItemByValue[this.itemLabel])
  }

  protected renderFieldAvatar(item: IYCoreSelectListItem | undefined) {
    if (!this.hasAvatarState(item)) return nothing

    return html`
      <y-core-field-avatar
        .photo=${item?.img}
        .icon=${item?.icon}
        .initials=${item?.initials}
      ></y-core-field-avatar>
    `
  }

  protected renderItemAvatar(item: IYCoreSelectListItem | undefined) {
    if (!this.hasAvatarState(item)) return nothing

    return html`
      <y-core-avatar
        .photo=${item?.img}
        .icon=${item?.icon}
        .initials=${item?.initials}
        .size=${this.size}
      ></y-core-avatar>
    `
  }

  protected renderDropdownList() {
    const dropdownItems = this.isFilterable ? this.filteredItems : this.items

    return repeat(
      dropdownItems,
      (item) => item.id,
      (item) => html`
        <y-core-dropdown-cell
          locator=${`${YCoreDropdownCellTagName}_${item.id}`}
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
              ? renderIcon({ icon: yCheck, size: '16px' })
              : nothing}
          </div>
        </y-core-dropdown-cell>
      `,
    )
  }

  protected renderDropdownActivator() {
    return html`
      <y-core-field-wrapper
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
        <y-core-field-input
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
        ></y-core-field-input>
        ${!this.readonly
          ? html`
            <y-core-field-icon
              .icon=${yChevronDown}
              hoverable
              class=${classMap(this.computedArrowIconClasses)}
            ></y-core-field-icon>
          `
          : nothing
        }
      </y-core-field-wrapper>
    `
  }

  protected renderDropdownContent() {
    return html`
      <y-core-dropdown-list>
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
      </y-core-dropdown-list>`
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
        <y-core-dropdown
          .isOpen=${this.isDropdownOpened}
          .placement=${EYCoreDropdownPlacement.BOTTOM}
          .trigger=${EYCoreDropdownTrigger.MANUAL}
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
        </y-core-dropdown>
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
