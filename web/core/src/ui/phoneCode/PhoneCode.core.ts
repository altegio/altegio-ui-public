import { css, html, LitElement, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import { YCorePhoneCodeTagName as tagName } from '~shared/constants'
import {
  createCorePhoneCodeExternalProps,
  ICON_SIZES, TEXT_SIZES,
  type IYCorePhoneCodeProps,
} from '~core/ui/phoneCode/models/types'
import type { EYCoreTextSize } from '~core/ui/text/models/types'
import { EYCoreTextVariant } from '~core/ui/text/models/types'

import { interceptEvents } from '~core/utils/event-interceptor'
import '~core/ui/text'
import { renderIcon } from '~core/renderers'
import { yChevronDown } from '~shared/icons'

import YCorePhoneCodeScopedCSS from '~core/ui/phoneCode/css/PhoneCode.scoped.css?inline'
import YCorePhoneCodeVarsCSS from '~core/ui/phoneCode/css/PhoneCode.vars.css?inline'

import { disabledContextCreated, readonlyContextCreated, sizeContextCreated } from '~core/ui/fieldWrapper/providers'
import { withLocator } from '~core/utils/locator'

const { code, disabled, readonly, size } = createCorePhoneCodeExternalProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCorePhoneCode extends LitElement implements IYCorePhoneCodeProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IYCorePhoneCodeProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCorePhoneCodeProps['size'] = size
  @consume({ context: readonlyContextCreated, subscribe: true })
  @property({ type: Boolean }) readonly: IYCorePhoneCodeProps['readonly'] = readonly
  @property({ type: String }) code: IYCorePhoneCodeProps['code'] = code

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCorePhoneCodeVarsCSS)}
      ${unsafeCSS(YCorePhoneCodeScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_readonly`]: Boolean(this.readonly),
      [`${this.baseClass}_size_${this.size}`]: true,
    }
  }

  private get iconSize() {
    if (!this.size) return ICON_SIZES.small

    return ICON_SIZES[this.size]
  }

  private get textSize(): EYCoreTextSize {
    if (!this.size) return TEXT_SIZES.small

    return TEXT_SIZES[this.size]
  }


  protected render(): unknown {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <y-core-text 
          .size=${this.textSize} 
          .variant=${this.disabled ? EYCoreTextVariant.TERTIARY : EYCoreTextVariant.PRIMARY}
        >
            +${this.code}
        </y-core-text>
        <div class="${this.baseClass}__icon-container">
          ${renderIcon({ icon: yChevronDown, size: this.iconSize })}
        </div>
      </div>
    `
  }
}
