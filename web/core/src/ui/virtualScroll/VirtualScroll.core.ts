import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { styleMap } from 'lit/directives/style-map.js'

import {
  createCoreVirtualScrollProps,
  VirtualScrollRangeChangeEvent,
  type IAltCoreVirtualScrollProps,
  type IAltCoreVirtualScrollRange,
} from '~core/ui/virtualScroll/models/types'
import { AltCoreVirtualScrollTagName as tagName } from '~shared/constants'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { withLocator } from '~core/utils/locator'
import { getScrollBehavior } from '~core/utils/a11y/motion'

import AltCoreVirtualScrollVarsCss from '~core/ui/virtualScroll/css/VirtualScroll.vars.css?inline'
import AltCoreVirtualScrollScopedCss from '~core/ui/virtualScroll/css/VirtualScroll.scoped.css?inline'

const { itemCount, itemSize, overscan, accessibleName } = createCoreVirtualScrollProps()

/**
 * A scrolling list that renders only the items in view, for thousands of rows of the same height.
 *
 * The component keeps the scroll height of `itemCount` items of `itemSize` pixels and fires `range-change`
 * with `{ start, end }` whenever another slice comes into view (plus `overscan` items on each side).
 * Render exactly the items from `start` to `end` into the default slot, each `itemSize` pixels high;
 * the Vue and Angular wrappers do this for you. Give the host a `height` or `max-height`.
 *
 * The slot sits in a `list` (named by `accessibleName`): give each item `role="listitem"`, `aria-posinset`
 * and `aria-setsize`, so screen readers announce "item 51 of 1000". The viewport is a tab stop when it scrolls.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreVirtualScroll
  extends LitElement
  implements IAltCoreVirtualScrollProps {
  @property({ type: Number, attribute: 'item-count' }) itemCount: IAltCoreVirtualScrollProps['itemCount'] = itemCount
  @property({ type: Number, attribute: 'item-size' }) itemSize: IAltCoreVirtualScrollProps['itemSize'] = itemSize
  @property({ type: Number }) overscan: IAltCoreVirtualScrollProps['overscan'] = overscan
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreVirtualScrollProps['accessibleName'] = accessibleName

  @state() private range: IAltCoreVirtualScrollRange = { start: 0, end: 0 }
  @state() private isScrollable = false

  @query('[part="viewport"]') private viewport!: HTMLDivElement

  @bubblingEvent(VirtualScrollRangeChangeEvent, { name: 'range-change' })
  protected _rangeChange!: TDispatcher<VirtualScrollRangeChangeEvent>

  private readonly baseClass = tagName

  private readonly resizeObserver = new ResizeObserver(() => { this.updateRange() })

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreVirtualScrollVarsCss)}
      ${unsafeCSS(AltCoreVirtualScrollScopedCss)}
    `,
  ]

  /** Index of the first item to render */
  get start() {
    return this.range.start
  }

  /** Index after the last item to render */
  get end() {
    return this.range.end
  }

  private get computedItemSize() {
    return Number.isFinite(this.itemSize) && this.itemSize > 0 ? this.itemSize : itemSize
  }

  private get computedItemCount() {
    return Number.isFinite(this.itemCount) && this.itemCount > 0 ? Math.floor(this.itemCount) : 0
  }

  /**
   * Scrolls an item into view
   * @param index - Index of the item
   * @param behavior - `smooth` (instant with reduced motion) or `auto`
   */
  scrollToIndex(index: number, behavior: ScrollBehavior = 'auto') {
    const target = Math.min(Math.max(index, 0), Math.max(this.computedItemCount - 1, 0))

    this.viewport.scrollTo({ top: target * this.computedItemSize, behavior: getScrollBehavior(behavior) })
  }

  private updateRange() {
    const { scrollTop, clientHeight } = this.viewport
    const size = this.computedItemSize
    const count = this.computedItemCount
    const overscanCount = Math.max(Math.floor(this.overscan), 0)
    const start = Math.max(Math.floor(scrollTop / size) - overscanCount, 0)
    const end = Math.min(Math.ceil((scrollTop + clientHeight) / size) + overscanCount, count)

    this.isScrollable = count * size > clientHeight
    if (start === this.range.start && end === this.range.end) return

    this.range = { start, end }
    this._rangeChange({ detail: { start, end } })
  }

  private handleScroll = () => {
    this.updateRange()
  }

  protected firstUpdated() {
    this.resizeObserver.observe(this.viewport)
  }

  protected updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('itemCount') || changedProperties.has('itemSize') || changedProperties.has('overscan')) {
      this.updateRange()
    }
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.hasUpdated) this.resizeObserver.observe(this.viewport)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.resizeObserver.disconnect()
  }

  protected render() {
    const size = this.computedItemSize

    return html`
      <div
        part="viewport"
        class=${this.baseClass}
        tabindex=${ifDefined(this.isScrollable ? 0 : undefined)}
        @scroll=${this.handleScroll}
      >
        <div class="${this.baseClass}__spacer" style=${styleMap({ height: `${this.computedItemCount * size}px` })}>
          <div
            class="${this.baseClass}__items"
            role="list"
            aria-label=${ifDefined(this.accessibleName || undefined)}
            style=${styleMap({ transform: `translateY(${this.range.start * size}px)` })}
          >
            <slot></slot>
          </div>
        </div>
      </div>
    `
  }
}
