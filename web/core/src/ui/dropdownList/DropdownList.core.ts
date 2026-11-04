import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { styleMap } from 'lit/directives/style-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { ItemClickEvent } from '~core/ui/dropdownList/models/types/events'

import {
  createCoreDropdownListProps,
  type IAltCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'
import {
  AltCoreDropdownListTagName as tagName,
  AltCoreDropdownCellTagName,
} from '~shared/constants'

import type { IDropdownListItem } from '~shared/types/global'

import AltCoreDropdownListVarsCSS from '~core/ui/dropdownList/css/DropdownList.vars.css?inline'
import AltCoreDropdownListScopedCSS from '~core/ui/dropdownList/css/DropdownList.scoped.css?inline'

import '~core/ui/dropdownCell'
import { withLocator } from '~core/utils/locator'

const { items, itemLabel, minWidth, noMaxHeight } = createCoreDropdownListProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreDropdownList
  extends LitElement
  implements IAltCoreDropdownListProps {
  @property({ type: Array }) items: IAltCoreDropdownListProps['items'] = items
  @property({ type: String, attribute: 'item-label' }) itemLabel: IAltCoreDropdownListProps['itemLabel'] = itemLabel
  @property({ type: String, attribute: 'min-width' }) minWidth: IAltCoreDropdownListProps['minWidth'] = minWidth
  @property({ type: Boolean, attribute: 'no-max-height' }) noMaxHeight: IAltCoreDropdownListProps['noMaxHeight'] = noMaxHeight

  /**
   * Whether the owner keeps keyboard focus elsewhere and scrolls the active item into view, as a combobox does
   * with `aria-activedescendant`: the list then adds no tab stop of its own when it scrolls
   */
  @property({ attribute: false }) managedScroll = false

  @state() private isScrollable = false

  @query(`.${tagName}`) private scrollContainer?: HTMLElement

  // Content can grow without resizing the container once it reaches its max height, so slotted content is observed too
  private readonly resizeObserver = new ResizeObserver(() => { this.updateScrollable() })

  @bubblingEvent(
    ItemClickEvent,
    { name: 'item-click' },
  )
  _itemClick!: TDispatcher<ItemClickEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreDropdownListVarsCSS)}
      ${unsafeCSS(AltCoreDropdownListScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_no-max-height`]: Boolean(this.noMaxHeight),
      [`${this.baseClass}_managed-scroll`]: this.managedScroll,
      'alt-scrollbar': true,
    }
  }

  private get computedStyles() {
    return { minWidth: this.minWidth }
  }

  /** A list that scrolls takes keyboard focus, so that arrow keys can scroll it */
  private get scrollTabIndex() {
    return this.isScrollable && !this.managedScroll ? 0 : undefined
  }

  private updateScrollable() {
    const container = this.scrollContainer
    if (!container) return

    this.isScrollable = container.scrollHeight > container.clientHeight
  }

  private observeContent = () => {
    const container = this.scrollContainer
    if (!container) return

    this.resizeObserver.disconnect()
    this.resizeObserver.observe(container)
    for (const slot of Array.from(container.querySelectorAll('slot'))) {
      for (const element of slot.assignedElements({ flatten: true })) this.resizeObserver.observe(element)
    }
    this.updateScrollable()
  }

  protected firstUpdated() {
    this.observeContent()
  }

  protected updated() {
    this.updateScrollable()
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.hasUpdated) this.observeContent()
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.resizeObserver.disconnect()
  }

  private handleListItemClick = (event: Event, item: IDropdownListItem) => {
    event.stopPropagation()

    this._itemClick({ detail: { item } })
  }

  protected renderList() {
    if (!this.items || !itemLabel) return null

    return repeat(
      this.items,
      (item) => item.id,
      (item) => html`
        <alt-core-dropdown-cell
          locator=${`${AltCoreDropdownCellTagName}_${item.id}`}
          @click=${(event: Event) => {
            this.handleListItemClick(event, item)
          }}
        >
          <div slot="label">
            ${item[this.itemLabel || itemLabel]}
          </div>
        </alt-core-dropdown-cell>
      `,
    )
  }


  protected render() {
    return html`
      <div
        class=${classMap(this.computedClasses)}
        style=${styleMap(this.computedStyles)}
        tabindex=${ifDefined(this.scrollTabIndex)}
      >
        <slot name="top" @slotchange=${this.observeContent}></slot>

        <slot name="list" @slotchange=${this.observeContent}>
          ${this.renderList()}
        </slot>

        <slot name="bottom" @slotchange=${this.observeContent}></slot>
      </div>
    `
  }
}
