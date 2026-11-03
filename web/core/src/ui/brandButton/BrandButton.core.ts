import { html, LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { renderIcon } from '~core/renderers'
import {
  type IAltCoreBrandButtonProps,
  EAltCoreBrandButtonVariant,
  createCoreBrandButtonProps,
} from './models/types'
import { EAltSizes } from '~shared/types/global'
import { altWhatsApp } from '~shared/icons'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'
import { AltCoreBrandButtonTagName as tagName } from '~shared/constants'
import {
  EAltCoreLoaderVariant,
} from '~core/ui/loader/models/types'

import '~core/ui/simpleButton'

import BrandButtonVarsCSS from '~core/ui/brandButton/css/BrandButton.vars.css?inline'
import { withLocator } from '~core/utils/locator'

const BRAND_CONFIG = {
  [EAltCoreBrandButtonVariant.WhatsApp]: {
    icon: altWhatsApp,
    variant: EAltCoreSimpleButtonVariant.PRIMARY,
    loaderVariant: EAltCoreLoaderVariant.WHITE,
  },
}

const ICON_SIZES = {
  [EAltSizes.SMALL]: '18px',
  [EAltSizes.MEDIUM]: '20px',
  [EAltSizes.LARGE]: '22px',
}

const { variant, size, loading, disabled, text }: IAltCoreBrandButtonProps = createCoreBrandButtonProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreBrandButton extends LitElement implements IAltCoreBrandButtonProps {
  @property({ type: String }) variant: IAltCoreBrandButtonProps['variant'] = variant
  @property({ type: String }) size: IAltCoreBrandButtonProps['size'] = size
  @property({ type: Boolean }) disabled: IAltCoreBrandButtonProps['disabled'] = disabled
  @property({ type: Boolean }) loading: IAltCoreBrandButtonProps['loading'] = loading
  @property({ type: String }) text: IAltCoreBrandButtonProps['text'] = text

  render() {
    const config = BRAND_CONFIG[this.variant]
    const iconSize = ICON_SIZES[this.size ?? EAltSizes.SMALL]

    return html`
      <alt-core-simple-button
        .size=${this.size}
        .disabled=${this.disabled}
        .loading=${this.loading}
        .variant=${config.variant}
        .hostStyles=${BrandButtonVarsCSS}
        .loaderVariant=${config.loaderVariant}
        data-variant=${this.variant}
      >
        ${renderIcon({ icon: config.icon, size: iconSize })}
        ${this.text}
      </alt-core-simple-button>
    `
  }

  static readonly styles = [css`${unsafeCSS(BrandButtonVarsCSS)}`]
}
