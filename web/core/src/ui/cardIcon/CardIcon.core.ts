import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import { createCoreCardIconProps, type IYCoreCardIconProps } from '~core/ui/cardIcon/models/types'
import { YCoreCardIconTagName as tagName } from '~shared/constants'
import { EYSizes } from '~shared/types/global'
import { sizeContextCreated, disabledContextCreated } from '~core/ui/cardWrapper/providers'
import { EYCoreColorIconSize, type IYCoreColorIconExternalProps } from '~core/ui/colorIcon/models/types'

import YCardIconVarsCss from '~core/ui/cardIcon/css/CardIcon.vars.css?inline'
import YCardIconScopedCss from '~core/ui/cardIcon/css/CardIcon.scoped.css?inline'

import '~core/ui/colorIcon'
import { withLocator } from '~core/utils/locator'

const { size, variant, disabled } = createCoreCardIconProps()

const mapSizeToIconSize: Record<NonNullable<IYCoreCardIconProps['size']>, NonNullable<IYCoreColorIconExternalProps['size']>> = {
  [EYSizes.SMALL]: EYCoreColorIconSize.X_32,
  [EYSizes.MEDIUM]: EYCoreColorIconSize.X_48,
  [EYSizes.LARGE]: EYCoreColorIconSize.X_64,
}

@customElement(tagName)
@withLocator(tagName)
export class YCoreCardIcon
  extends LitElement
  implements IYCoreCardIconProps {
  @property({ type: Object }) icon!: IYCoreCardIconProps['icon']
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCoreCardIconProps['size'] = size
  @property({ type: String, reflect: true }) variant: IYCoreCardIconProps['variant'] = variant
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IYCoreCardIconProps['disabled'] = disabled

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCardIconVarsCss)}
      ${unsafeCSS(YCardIconScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
    }
  }

  private get computedSize() {
    return this.size ?? EYSizes.MEDIUM
  }

  private get computedIconSize() {
    return mapSizeToIconSize[this.computedSize]
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <y-core-color-icon
          .icon=${this.icon}
          .size=${this.computedIconSize}
          .variant=${this.variant}
          .disabled=${this.disabled}
        >
        </y-core-color-icon>
      </div>
    `
  }
}
