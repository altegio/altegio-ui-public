import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { provide } from '@lit/context'

import {
  createCoreTabPanelsProps,
  type IAltCoreTabPanelsProps,
} from '~core/ui/tabPanels/models/types'
import { tabPanelsValueContextCreated } from '~core/ui/tabPanels/context'
import { AltCoreTabPanelsTagName as tagName } from '~shared/constants'
import { withLocator } from '~core/utils/locator'

import AltCoreTabPanelsVarsCss from '~core/ui/tabPanels/css/TabPanels.vars.css?inline'
import AltCoreTabPanelsScopedCss from '~core/ui/tabPanels/css/TabPanels.scoped.css?inline'

const { value } = createCoreTabPanelsProps()

/**
 * Shows the `alt-core-tab-panel` whose `name` equals `value` and hides the others.
 *
 * The panels stay in the DOM, so their content keeps its state while hidden.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreTabPanels
  extends LitElement
  implements IAltCoreTabPanelsProps {
  @provide({ context: tabPanelsValueContextCreated })
  @property() value: IAltCoreTabPanelsProps['value'] = value

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTabPanelsVarsCss)}
      ${unsafeCSS(AltCoreTabPanelsScopedCss)}
    `,
  ]

  protected render() {
    return html`
      <div class=${this.baseClass}>
        <slot></slot>
      </div>
    `
  }
}
