import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  createCoreBreadcrumbsProps,
  type IAltCoreBreadcrumbsProps,
} from '~core/ui/breadcrumbs/models/types'
import { AltCoreBreadcrumbsItemTagName, AltCoreBreadcrumbsTagName as tagName } from '~shared/constants'
import type { AltCoreBreadcrumbsItem } from '~core/ui/breadcrumbsItem'
import { withLocator } from '~core/utils/locator'
import { getElementMessage } from '~core/i18n'

import AltCoreBreadcrumbsVarsCss from '~core/ui/breadcrumbs/css/Breadcrumbs.vars.css?inline'
import AltCoreBreadcrumbsScopedCss from '~core/ui/breadcrumbs/css/Breadcrumbs.scoped.css?inline'

const { accessibleName } = createCoreBreadcrumbsProps()

/**
 * The trail of pages that leads to the current one: a WAI-ARIA breadcrumb.
 *
 * The host is a `navigation` landmark named "Breadcrumb" (or `accessibleName`) that holds a list of
 * `alt-core-breadcrumbs-item`. The current page has `aria-current="page"`: the item marked `current`,
 * or else the last item. The separators are hidden from assistive technologies.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreBreadcrumbs
  extends LitElement
  implements IAltCoreBreadcrumbsProps {
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreBreadcrumbsProps['accessibleName'] = accessibleName

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreBreadcrumbsVarsCss)}
      ${unsafeCSS(AltCoreBreadcrumbsScopedCss)}
    `,
  ]

  /** Items in order, also inside the elements that framework wrappers render around them */
  private get items() {
    return Array.from(this.querySelectorAll<AltCoreBreadcrumbsItem>(AltCoreBreadcrumbsItemTagName))
  }

  /** The first item has no separator; the last one is the current page unless another item says so */
  private handleSlotChange = () => {
    const { items } = this
    const hasCurrent = items.some((item) => item.current)

    items.forEach((item, index) => {
      item.first = index === 0
      item.implicitCurrent = !hasCurrent && index === items.length - 1
    })
  }

  connectedCallback() {
    super.connectedCallback()

    if (!this.hasAttribute('role')) this.setAttribute('role', 'navigation')
    this.addEventListener('breadcrumbs-item-change', this.handleSlotChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener('breadcrumbs-item-change', this.handleSlotChange)
  }

  protected updated() {
    this.setAttribute('aria-label', this.accessibleName || getElementMessage('breadcrumb', this))
  }

  protected render() {
    return html`
      <div class=${this.baseClass} role="list">
        <slot @slotchange=${this.handleSlotChange}></slot>
      </div>
    `
  }
}
