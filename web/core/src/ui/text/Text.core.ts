import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { createCoreTextProps, type IYCoreTextProps } from './models/types'
import { YCoreTextTagName as tagName } from '~shared/constants'

import YCoreTextScopedCss from '~core/ui/text/css/Text.scoped.css?inline'
import YCoreTextVarsCss from '~core/ui/text/css/Text.vars.css?inline'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { size, variant, ellipsis, lineclamp, locator } = createCoreTextProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreText extends LitElement implements IYCoreTextProps {
  @property({ type: String, reflect: true }) size: IYCoreTextProps['size'] = size
  @property({ type: String, reflect: true }) variant: IYCoreTextProps['variant'] = variant
  @property({ type: Boolean }) ellipsis: IYCoreTextProps['ellipsis'] = ellipsis
  @property({ type: Number }) lineclamp: IYCoreTextProps['lineclamp'] = lineclamp
  @property({ type: String }) locator: IYCoreTextProps['locator'] = locator

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreTextVarsCss)}
      ${unsafeCSS(YCoreTextScopedCss)}
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
    defineCustomElement(tagName, YCoreText)
  }

  protected render() {
    return html`
      <span class=${classMap(this.computedClasses)} style=${this.computedLineclamp}>
        <slot></slot>
      </span>
    `
  }
}
