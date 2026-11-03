import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { consume } from '@lit/context'

import {
  createCoreTabPanelProps,
  type IAltCoreTabPanelProps,
} from '~core/ui/tabPanel/models/types'
import { tabPanelsValueContextCreated } from '~core/ui/tabPanels/context'
import type { TAltCoreTabPanelName } from '~core/ui/tabPanels/models/types'
import { AltCoreTabPanelTagName as tagName } from '~shared/constants'
import { withLocator } from '~core/utils/locator'

import AltCoreTabPanelVarsCss from '~core/ui/tabPanel/css/TabPanel.vars.css?inline'
import AltCoreTabPanelScopedCss from '~core/ui/tabPanel/css/TabPanel.scoped.css?inline'

const { name, label, labelledby } = createCoreTabPanelProps()

const setOrRemoveAttribute = (element: HTMLElement, attribute: string, value: string | undefined) => {
  if (value) {
    element.setAttribute(attribute, value)
  } else {
    element.removeAttribute(attribute)
  }
}

/**
 * A panel of `alt-core-tab-panels`, shown while its `name` equals the panels' `value`.
 *
 * The host is the `tabpanel`: name it with `labelledby` (the id of its tab) or `label`.
 * The visible panel is focusable, so keyboard users can reach content without focusable elements.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreTabPanel
  extends LitElement
  implements IAltCoreTabPanelProps {
  @property() name: IAltCoreTabPanelProps['name'] = name
  @property({ type: String }) label: IAltCoreTabPanelProps['label'] = label
  @property({ type: String }) labelledby: IAltCoreTabPanelProps['labelledby'] = labelledby

  @consume({ context: tabPanelsValueContextCreated, subscribe: true })
  @state() private panelsValue: TAltCoreTabPanelName | undefined

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTabPanelVarsCss)}
      ${unsafeCSS(AltCoreTabPanelScopedCss)}
    `,
  ]

  /**
   * Whether the panel is shown
   */
  get active() {
    return this.name !== undefined && this.panelsValue !== undefined && String(this.name) === String(this.panelsValue)
  }

  connectedCallback() {
    super.connectedCallback()

    if (!this.hasAttribute('role')) this.setAttribute('role', 'tabpanel')
  }

  protected updated() {
    const { active } = this

    this.toggleAttribute('active', active)
    setOrRemoveAttribute(this, 'tabindex', active ? '0' : undefined)
    setOrRemoveAttribute(this, 'aria-label', this.label)
    setOrRemoveAttribute(this, 'aria-labelledby', this.labelledby)
  }

  protected render() {
    return html`
      <div class=${this.baseClass}>
        <slot></slot>
      </div>
    `
  }
}
