import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { createCoreTooltipProps, type IYCoreTooltipProps } from '~core/ui/tooltip/models/types'
import { YCoreTooltipTagName as tagName, YCoreTipTagName } from '~shared/constants'

import YCoreTooltipVarsCSS from '~core/ui/tooltip/css/Tooltip.vars.css?inline'
import YCoreTooltipScopedCSS from '~core/ui/tooltip/css/Tooltip.scoped.css?inline'

import type { IYCoreTipProps } from '~core/ui/tip/models/types'
import '~core/ui/tip/Tip.core'

import { EYCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import { defineCustomElement } from '~web/shared/utils/components'
import { YCoreTip } from '~core/ui/tip/Tip.core'
import { withLocator } from '~core/utils/locator'

const { text, disabled, placement, type } = createCoreTooltipProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreTooltip extends LitElement implements IYCoreTooltipProps {
  @property({ type: String }) text: IYCoreTooltipProps['text'] = text
  @property({ type: String }) placement: IYCoreTipProps['placement'] = placement
  @property({ type: Boolean }) disabled: IYCoreTipProps['disabled'] = disabled
  @property({ type: String }) type: IYCoreTipProps['type'] = type

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTooltipVarsCSS)}
      ${unsafeCSS(YCoreTooltipScopedCSS)}
    `,
  ]


  protected firstUpdated(): void {
    defineCustomElement(tagName, YCoreTooltip)
    defineCustomElement(YCoreTipTagName, YCoreTip)
  }

  protected render() {
    return html`
      <y-core-tip
        .disabled=${this.disabled}
        .placement=${this.placement}
        .trigger=${EYCoreDropdownTrigger.HOVER}
        class=${this.baseClass}
      >
        <slot slot="activator" name="activator"></slot>

        <div slot="content" class="${this.baseClass}__content">
          <slot name="content">
            <span>${this.text}</span>
          </slot>
        </div>
      </y-core-tip>
    `
  }
}
