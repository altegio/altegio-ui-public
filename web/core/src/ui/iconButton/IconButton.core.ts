import { css, LitElement, unsafeCSS } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { renderIcon } from '~core/renderers'

import {
  createCoreIconButtonProps,
  type IYCoreIconButtonProps,
} from '~core/ui/iconButton/models/types'
import { EYSizes } from '~shared/types/global'
import { YCoreIconButtonTagName as tagName } from '~shared/constants'

import YCoreIconButtonScopedCSS from '~core/ui/iconButton/css/IconButton.scoped.css?inline'
import YCoreIconButtonVarsCSS from '~core/ui/iconButton/css/IconButton.vars.css?inline'

import '~core/ui/simpleButton'

import { interceptEvents } from '~core/utils/event-interceptor'
import { booleanConverter } from '~core/utils/converters'
import { withLocator } from '~core/utils/locator'

const { disabled, href, icon, loading, size, variant, target, fullWidth } = createCoreIconButtonProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreIconButton extends LitElement implements IYCoreIconButtonProps {
  @property({ type: String }) size: IYCoreIconButtonProps['size'] = size
  @property({ type: String }) variant: IYCoreIconButtonProps['variant'] = variant
  @property({ type: Boolean }) disabled: IYCoreIconButtonProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) loading: IYCoreIconButtonProps['loading'] = loading
  @property({ type: String }) href: IYCoreIconButtonProps['href'] = href
  @property({ type: String }) target: IYCoreIconButtonProps['target'] = target
  @property({ type: Object }) icon: IYCoreIconButtonProps['icon'] = icon
  @property({ type: Boolean, attribute: 'full-width' }) fullWidth: IYCoreIconButtonProps['fullWidth'] = fullWidth

  private readonly baseClass = tagName

  static readonly styles = [
    css`${unsafeCSS(YCoreIconButtonVarsCSS)}`,
    css`${unsafeCSS(YCoreIconButtonScopedCSS)}`,
  ]

  private get computedIconSize() {
    return this.size === EYSizes.LARGE
      ? '24px'
      : '16px'
  }


  protected render() {
    return html`
      <y-core-simple-button
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
        variant=${ifDefined(this.variant)}
        size=${ifDefined(this.size)}
        .disabled=${this.disabled}
        .loading=${this.loading}
        .fullWidth=${this.fullWidth}
        .hostStyles=${YCoreIconButtonVarsCSS}
        class=${this.baseClass}
      >
        ${renderIcon({ icon: this.icon, size: this.computedIconSize })}
      </y-core-simple-button>
    `
  }
}
