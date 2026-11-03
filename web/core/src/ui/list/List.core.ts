import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  createCoreListProps,
  type IAltCoreListProps,
} from '~core/ui/list/models/types'
import { AltCoreListTagName as tagName } from '~shared/constants'
import { booleanConverter } from '~core/utils/converters'
import { withLocator } from '~core/utils/locator'

import AltCoreListVarsCss from '~core/ui/list/css/List.vars.css?inline'
import AltCoreListScopedCss from '~core/ui/list/css/List.scoped.css?inline'

const { separator } = createCoreListProps()

/**
 * A vertical list of `alt-core-list-item` rows.
 *
 * The host has `role="list"`; name it with `aria-label` when the context does not.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreList
  extends LitElement
  implements IAltCoreListProps {
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) separator: IAltCoreListProps['separator'] = separator

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreListVarsCss)}
      ${unsafeCSS(AltCoreListScopedCss)}
    `,
  ]

  connectedCallback() {
    super.connectedCallback()

    if (!this.hasAttribute('role')) this.setAttribute('role', 'list')
  }

  protected render() {
    return html`
      <div class=${this.baseClass}>
        <slot></slot>
      </div>
    `
  }
}
