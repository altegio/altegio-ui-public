import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import { createCoreCardIconProps, type IAltCoreCardIconProps } from '~core/ui/cardIcon/models/types'
import { AltCoreCardIconTagName as tagName } from '~shared/constants'
import { EAltSizes } from '~shared/types/global'
import { sizeContextCreated, disabledContextCreated } from '~core/ui/cardWrapper/providers'
import { EAltCoreColorIconSize, type IAltCoreColorIconExternalProps } from '~core/ui/colorIcon/models/types'

import AltCardIconVarsCss from '~core/ui/cardIcon/css/CardIcon.vars.css?inline'
import AltCardIconScopedCss from '~core/ui/cardIcon/css/CardIcon.scoped.css?inline'

import '~core/ui/colorIcon'
import { withLocator } from '~core/utils/locator'

const { size, variant, disabled } = createCoreCardIconProps()

const mapSizeToIconSize: Record<NonNullable<IAltCoreCardIconProps['size']>, NonNullable<IAltCoreColorIconExternalProps['size']>> = {
  [EAltSizes.SMALL]: EAltCoreColorIconSize.X_32,
  [EAltSizes.MEDIUM]: EAltCoreColorIconSize.X_48,
  [EAltSizes.LARGE]: EAltCoreColorIconSize.X_64,
}

@customElement(tagName)
@withLocator(tagName)
export class AltCoreCardIcon
  extends LitElement
  implements IAltCoreCardIconProps {
  @property({ type: Object }) icon!: IAltCoreCardIconProps['icon']
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreCardIconProps['size'] = size
  @property({ type: String, reflect: true }) variant: IAltCoreCardIconProps['variant'] = variant
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IAltCoreCardIconProps['disabled'] = disabled

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCardIconVarsCss)}
      ${unsafeCSS(AltCardIconScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
    }
  }

  private get computedSize() {
    return this.size ?? EAltSizes.MEDIUM
  }

  private get computedIconSize() {
    return mapSizeToIconSize[this.computedSize]
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <alt-core-color-icon
          .icon=${this.icon}
          .size=${this.computedIconSize}
          .variant=${this.variant}
          .disabled=${this.disabled}
        >
        </alt-core-color-icon>
      </div>
    `
  }
}
