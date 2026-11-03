import { LitElement, html, css, nothing, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  createCoreBreadcrumbsItemProps,
  type IAltCoreBreadcrumbsItemProps,
} from '~core/ui/breadcrumbsItem/models/types'
import { AltCoreBreadcrumbsItemTagName as tagName } from '~shared/constants'
import { altChevronRight } from '~shared/icons'
import { renderIcon } from '~core/renderers'
import { booleanConverter } from '~core/utils/converters'
import { withLocator } from '~core/utils/locator'

import AltCoreBreadcrumbsItemVarsCss from '~core/ui/breadcrumbsItem/css/BreadcrumbsItem.vars.css?inline'
import AltCoreBreadcrumbsItemScopedCss from '~core/ui/breadcrumbsItem/css/BreadcrumbsItem.scoped.css?inline'

const { href, target, current, first, implicitCurrent } = createCoreBreadcrumbsItemProps()

/**
 * One page of `alt-core-breadcrumbs`: a link with `href`, plain text without it.
 *
 * The host is a `listitem`. The default slot holds the page name. Navigate in a single-page app
 * by listening to `click` on the item and calling `preventDefault()`.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreBreadcrumbsItem
  extends LitElement
  implements IAltCoreBreadcrumbsItemProps {
  @property({ type: String }) href: IAltCoreBreadcrumbsItemProps['href'] = href
  @property({ type: String }) target: IAltCoreBreadcrumbsItemProps['target'] = target
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) current: IAltCoreBreadcrumbsItemProps['current'] = current
  @property({ type: Boolean, attribute: false }) first: IAltCoreBreadcrumbsItemProps['first'] = first
  @property({ type: Boolean, attribute: false }) implicitCurrent: IAltCoreBreadcrumbsItemProps['implicitCurrent'] = implicitCurrent

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreBreadcrumbsItemVarsCss)}
      ${unsafeCSS(AltCoreBreadcrumbsItemScopedCss)}
    `,
  ]

  private get isCurrent() {
    return Boolean(this.current) || this.implicitCurrent
  }

  connectedCallback() {
    super.connectedCallback()

    if (!this.hasAttribute('role')) this.setAttribute('role', 'listitem')
  }

  protected updated(changedProperties: PropertyValues<this>) {
    // The breadcrumbs pick the implicit current page again when an item becomes or stops being current
    if (changedProperties.has('current') && changedProperties.get('current') !== undefined) {
      this.dispatchEvent(new Event('breadcrumbs-item-change', { bubbles: true }))
    }
  }

  private renderSeparator() {
    if (this.first) return nothing

    return html`<span class="${this.baseClass}__separator" aria-hidden="true">${renderIcon({ icon: altChevronRight, size: '16px' })}</span>`
  }

  private renderLabel() {
    const ariaCurrent = this.isCurrent ? 'page' : undefined

    if (!this.href) {
      return html`<span class="${this.baseClass}__label" aria-current=${ifDefined(ariaCurrent)}><slot></slot></span>`
    }

    return html`
      <a
        class="${this.baseClass}__label ${this.baseClass}__link"
        href=${this.href}
        target=${ifDefined(this.target)}
        aria-current=${ifDefined(ariaCurrent)}
      ><slot></slot></a>
    `
  }

  protected render() {
    return html`
      <span class=${this.baseClass}>
        ${this.renderSeparator()}
        ${this.renderLabel()}
      </span>
    `
  }
}
