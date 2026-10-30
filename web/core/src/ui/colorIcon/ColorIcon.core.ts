import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreColorIconProps,
  EAltCoreColorIconSize,
  type IAltCoreColorIconProps,
} from '~core/ui/colorIcon/models/types'
import {
  AltCoreColorIconTagName as tagName,
} from '~shared/constants'

import AltCoreColorIconVarsCSS from '~core/ui/colorIcon/css/ColorIcon.vars.css?inline'
import AltCoreColorIconScopedCSS from '~core/ui/colorIcon/css/ColorIcon.scoped.css?inline'
import { renderIcon } from '~core/renderers'
import { SIZES } from '~tokens/index'
import { withLocator } from '~core/utils/locator'

const { size, variant, disabled } = createCoreColorIconProps()

const mapSizeToIconSize: Record<NonNullable<IAltCoreColorIconProps['size']>, string> = {
  [EAltCoreColorIconSize.X_24]: String(SIZES.spacing_3_x.cssValue),
  [EAltCoreColorIconSize.X_32]: String(SIZES.spacing_4_x.cssValue),
  [EAltCoreColorIconSize.X_40]: String(SIZES.spacing_5_x.cssValue),
  [EAltCoreColorIconSize.X_48]: String(SIZES.spacing_6_x.cssValue),
  [EAltCoreColorIconSize.X_64]: String(SIZES.spacing_10_x.cssValue),
}

@customElement(tagName)
@withLocator(tagName)
export class AltCoreColorIcon
  extends LitElement
  implements IAltCoreColorIconProps {
  @property({ type: Object }) icon!: IAltCoreColorIconProps['icon']
  @property({ type: String, reflect: true }) size: IAltCoreColorIconProps['size'] = size
  @property({ type: String, reflect: true }) variant: IAltCoreColorIconProps['variant'] = variant
  @property({ type: Boolean, reflect: true }) disabled: IAltCoreColorIconProps['disabled'] = disabled

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreColorIconVarsCSS)}
      ${unsafeCSS(AltCoreColorIconScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_variant_${this.variant}`]: true,
    }
  }

  private get computedSize() {
    return this.size ?? EAltCoreColorIconSize.X_24
  }

  private get computedIconSize() {
    return mapSizeToIconSize[this.computedSize]
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${renderIcon({ icon: this.icon, size: this.computedIconSize })}
      </div>
    `
  }
}
