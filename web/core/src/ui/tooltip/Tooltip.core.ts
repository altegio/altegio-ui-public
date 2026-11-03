import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, query } from 'lit/decorators.js'

import { createCoreTooltipProps, type IAltCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { AltCoreTooltipTagName as tagName, AltCoreTipTagName } from '~shared/constants'

import AltCoreTooltipVarsCSS from '~core/ui/tooltip/css/Tooltip.vars.css?inline'
import AltCoreTooltipScopedCSS from '~core/ui/tooltip/css/Tooltip.scoped.css?inline'

import type { IAltCoreTipProps } from '~core/ui/tip/models/types'
import '~core/ui/tip/Tip.core'

import { EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import { defineCustomElement } from '~web/shared/utils/components'
import { AltCoreTip } from '~core/ui/tip/Tip.core'
import { withLocator } from '~core/utils/locator'
import { getFocusTarget, whenRendered } from '~core/utils/a11y/focus-target'

const { text, disabled, placement, type } = createCoreTooltipProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreTooltip extends LitElement implements IAltCoreTooltipProps {
  @property({ type: String }) text: IAltCoreTooltipProps['text'] = text
  @property({ type: String }) placement: IAltCoreTipProps['placement'] = placement
  @property({ type: Boolean }) disabled: IAltCoreTipProps['disabled'] = disabled
  @property({ type: String }) type: IAltCoreTipProps['type'] = type

  @query('slot[name="activator"]') private activatorSlot?: HTMLSlotElement

  private readonly baseClass = tagName

  /** Activator elements that carry the tooltip text as their accessible description */
  private readonly describedElements = new Set<Element>()

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTooltipVarsCSS)}
      ${unsafeCSS(AltCoreTooltipScopedCSS)}
    `,
  ]


  protected firstUpdated(): void {
    defineCustomElement(tagName, AltCoreTooltip)
    defineCustomElement(AltCoreTipTagName, AltCoreTip)
  }

  protected updated() {
    this.describeActivator()
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.describedElements.forEach((element) => { element.removeAttribute('aria-description') })
    this.describedElements.clear()
  }

  /**
   * Screen readers announce the tooltip text as the description of the activator.
   * The tooltip lives in shadow DOM, which `aria-describedby` cannot reach, so the text is copied.
   * A custom element activator, such as a button component, gets it on the element inside it that takes focus.
   * An activator with its own `aria-description` keeps it.
   */
  private describeActivator = () => {
    const activators = this.activatorSlot?.assignedElements({ flatten: true }) ?? []

    void Promise.all(activators.map(whenRendered)).then(() => {
      this.applyDescription(activators.map(getFocusTarget))
    })
  }

  private applyDescription(targets: Element[]) {
    const description = this.disabled ? '' : this.text

    this.describedElements.forEach((element) => {
      if (targets.includes(element) && description) return

      element.removeAttribute('aria-description')
      this.describedElements.delete(element)
    })

    if (!description) return

    targets
      .filter((element) => this.describedElements.has(element) || !element.hasAttribute('aria-description'))
      .forEach((element) => {
        element.setAttribute('aria-description', description)
        this.describedElements.add(element)
      })
  }

  protected render() {
    return html`
      <alt-core-tip
        .disabled=${this.disabled}
        .placement=${this.placement}
        .trigger=${EAltCoreDropdownTrigger.HOVER}
        class=${this.baseClass}
      >
        <slot slot="activator" name="activator" @slotchange=${this.describeActivator}></slot>

        <div slot="content" class="${this.baseClass}__content" role="tooltip">
          <slot name="content">
            <span>${this.text}</span>
          </slot>
        </div>
      </alt-core-tip>
    `
  }
}
