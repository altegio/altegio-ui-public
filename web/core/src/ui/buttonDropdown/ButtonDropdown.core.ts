import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property, query, queryAll, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'
import type { PropertyValues } from 'lit'

import { interceptEvents } from '~core/utils/event-interceptor'
import { bubblingEvent } from '~core/utils/event-decorator'
import { booleanConverter } from '~core/utils/converters'
import type { TDispatcher } from '~core/utils/event-decorator'

import { altChevronUp, altChevronDown, altPlus } from '~shared/icons'
import { AltCoreButtonDropdownTagName as tagName, AltCoreDropdownCellTagName } from '~shared/constants'

import '~core/ui/dropdown'
import '~core/ui/dropdownCell'
import '~core/ui/dropdownList'
import '~core/ui/button'

import { EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import type { IDropdownListItem } from '~shared/types/global'

import {
  createCoreButtonDropdownProps,
  type IAltCoreButtonDropdownProps,
  ItemClickEvent,
  VisibleEvent,
} from '~core/ui/buttonDropdown/models/types'

import {
  EAltCoreButtonDropdownIconTypes,
  type IAltCoreButtonDropdownIconsSet,
} from '~core/ui/buttonDropdown/models/types/internal'

import AltButtonDropdownScopedCss from '~core/ui/buttonDropdown/css/ButtonDropdown.scoped.css?inline'
import { withLocator } from '~core/utils/locator'
import { hasSlotContent } from '~core/utils/lit-slots'
import { getFocusTarget, whenRendered } from '~core/utils/a11y/focus-target'

const {
  disabled,
  loading,
  fullWidth,
  isOpen,
  autoClose,
  variant,
  size,
  label,
  alignment,
  iconType,
  items,
} = createCoreButtonDropdownProps()

/** An item with `disabled: true` is shown in the menu but cannot be picked */
const isDisabledItem = (item: IDropdownListItem) => item.disabled === true

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreButtonDropdown extends LitElement implements IAltCoreButtonDropdownProps {
  @property({ type: Boolean }) disabled: IAltCoreButtonDropdownProps['disabled'] = disabled
  @property({ type: Boolean }) loading: IAltCoreButtonDropdownProps['loading'] = loading
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: IAltCoreButtonDropdownProps['fullWidth'] = fullWidth
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'is-open' }) isOpen: IAltCoreButtonDropdownProps['isOpen'] = isOpen
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'auto-close' }) autoClose: IAltCoreButtonDropdownProps['autoClose'] = autoClose
  @property({ type: String }) variant: IAltCoreButtonDropdownProps['variant'] = variant
  @property({ type: String }) size: IAltCoreButtonDropdownProps['size'] = size
  @property({ type: String }) label: IAltCoreButtonDropdownProps['label'] = label
  @property({ type: String }) alignment: IAltCoreButtonDropdownProps['alignment'] = alignment
  @property({ type: String, attribute: 'icon-type' }) iconType: IAltCoreButtonDropdownProps['iconType'] = iconType
  @property({ type: Array }) items: IAltCoreButtonDropdownProps['items'] = items

  @state() private isDropdownOpened = false
  @state() private hasCustomContent = false

  @queryAll(`.${tagName}__menu-item`) private menuItems!: NodeListOf<HTMLElement>
  @query('slot[name="activator"]') private activatorSlot?: HTMLSlotElement

  /** Item that takes focus once the menu opens from the keyboard */
  private focusOnOpen: 'first' | 'last' | undefined
  private menuTypeahead = ''
  private menuTypeaheadTimeout?: ReturnType<typeof setTimeout>

  @bubblingEvent(
    ItemClickEvent,
    { name: 'item-click' },
  )
  private _itemClick!: TDispatcher<ItemClickEvent>

  @bubblingEvent(
    VisibleEvent,
    { name: 'change-visible' },
  )
  private _visible!: TDispatcher<VisibleEvent>

  private readonly baseClass = tagName
  private readonly baseDropdownClass = `${tagName}__dropdown`
  private readonly offsetOptions = { mainAxis: 4 }

  static readonly styles = [
    css`
      ${unsafeCSS(AltButtonDropdownScopedCss)}
    `,
  ]

  private get computedIconsSet(): IAltCoreButtonDropdownIconsSet {
    let leftIcon = undefined
    let rightIcon = undefined

    if (this.iconType === EAltCoreButtonDropdownIconTypes.LEFT) {
      leftIcon = altPlus
    } else {
      rightIcon = this.isDropdownOpened ? altChevronUp : altChevronDown
    }

    return { leftIcon, rightIcon }
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_full-width`]: Boolean(this.fullWidth),
    }
  }

  protected updated(changedProperties: PropertyValues): void {
    if (changedProperties.has('isOpen')) {
      this.isDropdownOpened = this.isOpen ?? false
    }

    this.describeActivator()
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    clearTimeout(this.menuTypeaheadTimeout)
  }

  private closeDropdown = () => {
    this.isDropdownOpened = false
  }

  /** The items form a menu: https://www.w3.org/WAI/ARIA/apg/patterns/menu-button/ */
  private get isMenu() {
    return !this.hasCustomContent && Boolean(this.items?.length)
  }

  private get menuItemList() {
    return Array.from(this.menuItems)
  }

  private focusMenuItem(index: number) {
    const items = this.menuItemList
    if (!items.length) return

    items[(index + items.length) % items.length].focus()
  }

  private get focusedMenuItemIndex() {
    return this.menuItemList.findIndex((item) => item.matches(':focus'))
  }

  /** Keys on the activator: arrow keys open the menu on its first or last item */
  private readonly activatorKeyHandlers: Partial<Record<string, 'first' | 'last'>> = {
    ArrowDown: 'first',
    ArrowUp: 'last',
  }

  private handleActivatorKeydown = (event: KeyboardEvent) => {
    const focusOnOpen = this.activatorKeyHandlers[event.key]
    if (!focusOnOpen || !this.isMenu || this.disabled) return

    event.preventDefault()
    this.openMenu(focusOnOpen)
  }

  /** Enter and Space click the activator button: a click without a mouse press opens the menu on its first item */
  private handleActivatorClick = (event: MouseEvent) => {
    if (event.detail === 0 && this.isMenu && !this.isDropdownOpened) this.focusOnOpen = 'first'
  }

  private openMenu(focusOnOpen: 'first' | 'last') {
    if (this.isDropdownOpened) {
      this.focusMenuItem(focusOnOpen === 'first' ? 0 : -1)
      return
    }

    this.focusOnOpen = focusOnOpen
    this.isDropdownOpened = true
  }

  private readonly menuKeyHandlers: Partial<Record<string, (current: number) => void>> = {
    ArrowDown: (current) => { this.focusMenuItem(current + 1) },
    ArrowUp: (current) => { this.focusMenuItem(current - 1) },
    Home: () => { this.focusMenuItem(0) },
    End: () => { this.focusMenuItem(-1) },
    Enter: (current) => { this.menuItemList[current]?.click() },
    ' ': (current) => { this.menuItemList[current]?.click() },
  }

  private handleMenuKeydown = (event: KeyboardEvent) => {
    if (event.key === 'Tab') {
      this.closeDropdown()
      return
    }

    const handler = this.menuKeyHandlers[event.key]
    if (handler) {
      event.preventDefault()
      handler(this.focusedMenuItemIndex)
      return
    }

    this.handleMenuTypeahead(event)
  }

  /** Typing a character moves focus to the next item that starts with the typed text */
  private handleMenuTypeahead(event: KeyboardEvent) {
    if (event.key.length !== 1 || event.ctrlKey || event.metaKey || event.altKey) return

    clearTimeout(this.menuTypeaheadTimeout)
    this.menuTypeahead += event.key.toLowerCase()
    this.menuTypeaheadTimeout = setTimeout(() => { this.menuTypeahead = '' }, 500)

    const index = this.findMenuItemIndex(this.menuTypeahead)
    if (index !== -1) this.focusMenuItem(index)
  }

  /** A single character searches from the next item, so that repeating it cycles through items */
  private findMenuItemIndex(text: string) {
    const items = this.menuItemList
    const current = this.focusedMenuItemIndex
    const start = text.length === 1 ? current + 1 : Math.max(current, 0)
    const ordered = [...items.slice(start), ...items.slice(0, start)]
    const match = ordered.find((item) => item.textContent.trim().toLowerCase().startsWith(text))

    return match ? items.indexOf(match) : -1
  }

  /** The activator states that it opens a menu, on the element that takes focus */
  private describeActivator = () => {
    const activators = this.activatorSlot?.assignedElements({ flatten: true }) ?? []

    for (const activator of activators) {
      void whenRendered(activator).then(() => {
        const target = getFocusTarget(activator)

        if (this.isMenu) {
          target.setAttribute('aria-haspopup', 'menu')
          target.setAttribute('aria-expanded', String(this.isDropdownOpened))
        } else {
          target.removeAttribute('aria-haspopup')
          target.removeAttribute('aria-expanded')
        }
      })
    }
  }

  private handleContentSlotChange = (event: Event) => {
    this.hasCustomContent = hasSlotContent(event.target as HTMLSlotElement)
  }

  /** Picking an item from the keyboard returns focus to the activator, as the menu closes */
  private focusActivator() {
    const activator = this.activatorSlot?.assignedElements({ flatten: true })[0]
    if (activator) (getFocusTarget(activator) as HTMLElement).focus()
  }

  private handleItemClick = (event: ItemClickEvent, item: IDropdownListItem) => {
    event.stopPropagation()
    // A disabled item stays in the menu and takes focus, but picking it does nothing
    if (isDisabledItem(item)) return

    const hasFocusInside = this.focusedMenuItemIndex !== -1
    this.closeDropdown()
    if (hasFocusInside) this.focusActivator()

    this._itemClick({ detail: { item } })
  }

  private handleDropdownContentClick = (event: Event) => {
    if (!this.autoClose) return

    event.stopPropagation()

    this.closeDropdown()
  }

  private handleClickOutside = (event: VisibleEvent) => {
    event.stopPropagation()
  }

  private handleChangeVisible = (event: VisibleEvent) => {
    event.stopPropagation()

    this.isDropdownOpened = event.detail.value

    this._visible({ detail: event.detail })

    const { focusOnOpen } = this
    this.focusOnOpen = undefined
    if (!event.detail.value || !focusOnOpen) return

    void this.updateComplete.then(() => {
      requestAnimationFrame(() => { this.focusMenuItem(focusOnOpen === 'first' ? 0 : -1) })
    })
  }

  protected renderDropdownList() {
    if (!this.items) return nothing

    return repeat(
      this.items,
      (item) => item.id,
      (item) => html`
        <alt-core-dropdown-cell
          role="menuitem"
          tabindex="-1"
          aria-disabled=${ifDefined(isDisabledItem(item) ? 'true' : undefined)}
          locator=${`${AltCoreDropdownCellTagName}_${item.id}`}
          class=${classMap({
            [this.baseDropdownClass]: true,
            [`${this.baseClass}__menu-item`]: true,
            [`${this.baseClass}__menu-item_disabled`]: isDisabledItem(item),
          })}
          @click=${(event: ItemClickEvent) => {
            this.handleItemClick(event, item)
          }}
        >
          <div slot="content" class=${`${this.baseDropdownClass}-content`}>
            <div slot="label" class=${`${this.baseDropdownClass}-label`} title=${String(item.label)}>
              ${item.label}
            </div>
          </div>
        </alt-core-dropdown-cell>
      `,
    )
  }

  protected renderDropdownContent() {
    return html`
      <alt-core-dropdown-list .managedScroll=${this.isMenu}>
        <div
          slot="list"
          role=${ifDefined(this.isMenu ? 'menu' : undefined)}
          aria-label=${ifDefined(this.isMenu && this.label || undefined)}
          @keydown=${this.handleMenuKeydown}
        >
          <slot
            name="content"
            @click=${this.handleDropdownContentClick}
            @slotchange=${this.handleContentSlotChange}
          >
            ${this.renderDropdownList()}
          </slot>
        </div>
      </alt-core-dropdown-list>`
  }


  protected render() {
    return html`
      <alt-core-dropdown
        class=${classMap(this.computedClasses)}
        .offset=${this.offsetOptions}
        .trigger=${EAltCoreDropdownTrigger.CLICK}
        .isOpen=${this.isDropdownOpened}
        inline
        @click-outside=${this.handleClickOutside}
        @change-visible=${this.handleChangeVisible}
      >
        <slot
          slot="activator"
          name="activator"
          @keydown=${this.handleActivatorKeydown}
          @click=${this.handleActivatorClick}
          @slotchange=${this.describeActivator}
        >
          <alt-core-button
            class="${this.baseClass}__button"
            label=${ifDefined(this.label)}
            variant=${ifDefined(this.variant)}
            size=${ifDefined(this.size)}
            alignment=${ifDefined(this.alignment)}
            .disabled=${this.disabled}
            .loading=${this.loading}
            .fullWidth=${this.fullWidth}
            .iconLeft=${this.computedIconsSet.leftIcon}
            .iconRight=${this.computedIconsSet.rightIcon}
          >
          </alt-core-button>
        </slot>

        <div slot="content">
          ${this.renderDropdownContent()}
        </div>
      </alt-core-dropdown>
    `
  }
}
