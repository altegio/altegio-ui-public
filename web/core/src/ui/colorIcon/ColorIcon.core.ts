import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreColorIconProps,
  EYCoreColorIconSize,
  type IYCoreColorIconProps,
} from '~core/ui/colorIcon/models/types'
import {
  YCoreColorIconTagName as tagName,
} from '~shared/constants'

import YCoreColorIconVarsCSS from '~core/ui/colorIcon/css/ColorIcon.vars.css?inline'
import YCoreColorIconScopedCSS from '~core/ui/colorIcon/css/ColorIcon.scoped.css?inline'
import { renderIcon } from '~core/renderers'
import { SIZES } from '~tokens/index'
import { withLocator } from '~core/utils/locator'

const { size, variant, disabled } = createCoreColorIconProps()

const mapSizeToIconSize: Record<NonNullable<IYCoreColorIconProps['size']>, string> = {
  [EYCoreColorIconSize.X_24]: String(SIZES.spacing_3_x.cssValue),
  [EYCoreColorIconSize.X_32]: String(SIZES.spacing_4_x.cssValue),
  [EYCoreColorIconSize.X_40]: String(SIZES.spacing_5_x.cssValue),
  [EYCoreColorIconSize.X_48]: String(SIZES.spacing_6_x.cssValue),
  [EYCoreColorIconSize.X_64]: String(SIZES.spacing_10_x.cssValue),
}

@customElement(tagName)
@withLocator(tagName)
export class YCoreColorIcon
  extends LitElement
  implements IYCoreColorIconProps {
  @property({ type: Object }) icon!: IYCoreColorIconProps['icon']
  @property({ type: String, reflect: true }) size: IYCoreColorIconProps['size'] = size
  @property({ type: String, reflect: true }) variant: IYCoreColorIconProps['variant'] = variant
  @property({ type: Boolean, reflect: true }) disabled: IYCoreColorIconProps['disabled'] = disabled

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreColorIconVarsCSS)}
      ${unsafeCSS(YCoreColorIconScopedCSS)}
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
    return this.size ?? EYCoreColorIconSize.X_24
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
