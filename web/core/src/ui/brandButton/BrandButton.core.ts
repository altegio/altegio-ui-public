import { html, LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { renderIcon } from '~core/renderers'
import {
  type IYCoreBrandButtonProps,
  EYCoreBrandButtonVariant,
  createCoreBrandButtonProps,
} from './models/types'
import { EYSizes } from '~shared/types/global'
import { yWhatsApp } from '~shared/icons'
import { EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types'
import { YCoreBrandButtonTagName as tagName } from '~shared/constants'
import {
  EYCoreLoaderVariant,
} from '~core/ui/loader/models/types'

import '~core/ui/simpleButton'

import BrandButtonVarsCSS from '~core/ui/brandButton/css/BrandButton.vars.css?inline'
import { withLocator } from '~core/utils/locator'

const BRAND_CONFIG = {
  [EYCoreBrandButtonVariant.WhatsApp]: {
    icon: yWhatsApp,
    variant: EYCoreSimpleButtonVariant.PRIMARY,
    loaderVariant: EYCoreLoaderVariant.WHITE,
  },
}

const ICON_SIZES = {
  [EYSizes.SMALL]: '18px',
  [EYSizes.MEDIUM]: '20px',
  [EYSizes.LARGE]: '22px',
}

const { variant, size, loading, disabled, text }: IYCoreBrandButtonProps = createCoreBrandButtonProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreBrandButton extends LitElement implements IYCoreBrandButtonProps {
  @property({ type: String }) variant: IYCoreBrandButtonProps['variant'] = variant
  @property({ type: String }) size: IYCoreBrandButtonProps['size'] = size
  @property({ type: Boolean }) disabled: IYCoreBrandButtonProps['disabled'] = disabled
  @property({ type: Boolean }) loading: IYCoreBrandButtonProps['loading'] = loading
  @property({ type: String }) text: IYCoreBrandButtonProps['text'] = text

  render() {
    const config = BRAND_CONFIG[this.variant]
    const iconSize = ICON_SIZES[this.size ?? EYSizes.SMALL]

    return html`
      <y-core-simple-button
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
      </y-core-simple-button>
    `
  }

  static readonly styles = [css`${unsafeCSS(BrandButtonVarsCSS)}`]
}
