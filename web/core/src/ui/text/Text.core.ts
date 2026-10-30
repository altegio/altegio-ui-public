import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { createCoreTextProps, type IAltCoreTextProps } from './models/types'
import { AltCoreTextTagName as tagName } from '~shared/constants'

import AltCoreTextScopedCss from '~core/ui/text/css/Text.scoped.css?inline'
import AltCoreTextVarsCss from '~core/ui/text/css/Text.vars.css?inline'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { size, variant, ellipsis, lineclamp, locator } = createCoreTextProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreText extends LitElement implements IAltCoreTextProps {
  @property({ type: String, reflect: true }) size: IAltCoreTextProps['size'] = size
  @property({ type: String, reflect: true }) variant: IAltCoreTextProps['variant'] = variant
  @property({ type: Boolean }) ellipsis: IAltCoreTextProps['ellipsis'] = ellipsis
  @property({ type: Number }) lineclamp: IAltCoreTextProps['lineclamp'] = lineclamp
  @property({ type: String }) locator: IAltCoreTextProps['locator'] = locator

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreTextVarsCss)}
      ${unsafeCSS(AltCoreTextScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_variant_${this.variant}`]: Boolean(this.variant),
      [`${this.baseClass}_ellipsis`]: Boolean(this.ellipsis),
    }
  }

  private get computedLineclamp() {
    return this.lineclamp ? `-webkit-line-clamp: ${this.lineclamp};` : ''
  }

  protected firstUpdated(): void {
    defineCustomElement(tagName, AltCoreText)
  }

  protected render() {
    return html`
      <span class=${classMap(this.computedClasses)} style=${this.computedLineclamp}>
        <slot></slot>
      </span>
    `
  }
}
