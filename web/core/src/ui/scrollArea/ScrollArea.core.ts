import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, query, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  createCoreScrollAreaProps,
  ScrollAreaScrollEvent,
  type IAltCoreScrollAreaPosition,
  type IAltCoreScrollAreaProps,
  type TAltCoreScrollAxis,
} from '~core/ui/scrollArea/models/types'
import { AltCoreScrollAreaTagName as tagName } from '~shared/constants'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { withLocator } from '~core/utils/locator'
import { getScrollBehavior } from '~core/utils/a11y/motion'

import AltCoreScrollAreaVarsCss from '~core/ui/scrollArea/css/ScrollArea.vars.css?inline'
import AltCoreScrollAreaScopedCss from '~core/ui/scrollArea/css/ScrollArea.scoped.css?inline'

const { orientation, accessibleName } = createCoreScrollAreaProps()

const toRatio = (offset: number, range: number) => range > 0 ? Math.min(Math.max(offset / range, 0), 1) : 0

/**
 * A scrolling container with thin scrollbars. Give the host a `height` or `max-height`.
 *
 * Native scrolling stays: wheel, touch, keyboard and assistive technologies work as usual. When the content
 * overflows, the viewport becomes a tab stop so keyboard users can scroll content without focusable elements;
 * with `accessibleName` it is a named `region`. `scroll-change` reports the position, and the methods read
 * or set it (smooth scrolling turns instant for users who prefer reduced motion).
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreScrollArea
  extends LitElement
  implements IAltCoreScrollAreaProps {
  @property({ type: String, reflect: true }) orientation: IAltCoreScrollAreaProps['orientation'] = orientation
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreScrollAreaProps['accessibleName'] = accessibleName

  @state() private isScrollable = false

  @query('[part="viewport"]') private viewport!: HTMLDivElement

  @bubblingEvent(ScrollAreaScrollEvent, { name: 'scroll-change' })
  protected _scrollChange!: TDispatcher<ScrollAreaScrollEvent>

  private readonly baseClass = tagName

  private readonly resizeObserver = new ResizeObserver(() => { this.updateScrollable() })

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreScrollAreaVarsCss)}
      ${unsafeCSS(AltCoreScrollAreaScopedCss)}
    `,
  ]

  /** Current position, in pixels and as a share of the scroll range */
  getScrollPosition(): IAltCoreScrollAreaPosition {
    const { scrollTop, scrollLeft, scrollHeight, scrollWidth, clientHeight, clientWidth } = this.viewport

    return {
      top: scrollTop,
      left: Math.abs(scrollLeft),
      topRatio: toRatio(scrollTop, scrollHeight - clientHeight),
      leftRatio: toRatio(Math.abs(scrollLeft), scrollWidth - clientWidth),
    }
  }

  /**
   * Scrolls one axis to an offset in pixels
   * @param axis - `vertical` or `horizontal`
   * @param offset - Distance from the top or the start edge
   * @param behavior - `smooth` (instant with reduced motion) or `auto`
   */
  setScrollPosition(axis: TAltCoreScrollAxis, offset: number, behavior: ScrollBehavior = 'auto') {
    this.viewport.scrollTo({ [axis === 'vertical' ? 'top' : 'left']: offset, behavior: getScrollBehavior(behavior) })
  }

  /**
   * Scrolls one axis to a share of its scroll range
   * @param axis - `vertical` or `horizontal`
   * @param ratio - From 0 (start) to 1 (end)
   * @param behavior - `smooth` (instant with reduced motion) or `auto`
   */
  setScrollPercentage(axis: TAltCoreScrollAxis, ratio: number, behavior: ScrollBehavior = 'auto') {
    const { scrollHeight, scrollWidth, clientHeight, clientWidth } = this.viewport
    const range = axis === 'vertical' ? scrollHeight - clientHeight : scrollWidth - clientWidth

    this.setScrollPosition(axis, Math.min(Math.max(ratio, 0), 1) * range, behavior)
  }

  private updateScrollable() {
    const { scrollHeight, scrollWidth, clientHeight, clientWidth } = this.viewport
    const scrollsVertically = this.orientation !== 'horizontal' && scrollHeight > clientHeight
    const scrollsHorizontally = this.orientation !== 'vertical' && scrollWidth > clientWidth

    this.isScrollable = scrollsVertically || scrollsHorizontally
  }

  private handleScroll = () => {
    this._scrollChange({ detail: this.getScrollPosition() })
  }

  private handleSlotChange = (event: Event) => {
    for (const element of (event.target as HTMLSlotElement).assignedElements()) this.resizeObserver.observe(element)
    this.updateScrollable()
  }

  protected firstUpdated() {
    this.resizeObserver.observe(this.viewport)
  }

  protected updated(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('orientation')) this.updateScrollable()
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.resizeObserver.disconnect()
  }

  connectedCallback() {
    super.connectedCallback()

    if (this.hasUpdated) this.resizeObserver.observe(this.viewport)
  }

  protected render() {
    return html`
      <div
        part="viewport"
        class=${this.baseClass}
        role=${ifDefined(this.accessibleName ? 'region' : undefined)}
        aria-label=${ifDefined(this.accessibleName || undefined)}
        tabindex=${ifDefined(this.isScrollable ? 0 : undefined)}
        @scroll=${this.handleScroll}
      >
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `
  }
}
