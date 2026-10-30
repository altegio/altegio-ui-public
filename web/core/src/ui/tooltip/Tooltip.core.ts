import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

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

const { text, disabled, placement, type } = createCoreTooltipProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreTooltip extends LitElement implements IAltCoreTooltipProps {
  @property({ type: String }) text: IAltCoreTooltipProps['text'] = text
  @property({ type: String }) placement: IAltCoreTipProps['placement'] = placement
  @property({ type: Boolean }) disabled: IAltCoreTipProps['disabled'] = disabled
  @property({ type: String }) type: IAltCoreTipProps['type'] = type

  private readonly baseClass = tagName

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

  protected render() {
    return html`
      <alt-core-tip
        .disabled=${this.disabled}
        .placement=${this.placement}
        .trigger=${EAltCoreDropdownTrigger.HOVER}
        class=${this.baseClass}
      >
        <slot slot="activator" name="activator"></slot>

        <div slot="content" class="${this.baseClass}__content">
          <slot name="content">
            <span>${this.text}</span>
          </slot>
        </div>
      </alt-core-tip>
    `
  }
}
