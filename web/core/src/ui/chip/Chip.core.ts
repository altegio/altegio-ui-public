import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  AltCoreChipTagName as tagName,
} from '~shared/constants'

import {
  createCoreChipProps,
  type IAltCoreChipProps,
} from './models/types'

import AltCoreChipVarsCSS from '~core/ui/chip/css/Chip.vars.css?inline'
import AltCoreChipScopedCSS from '~core/ui/chip/css/Chip.scoped.css?inline'

import '~core/ui/text'
import '~core/ui/icon'

import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types'
import { EAltSizes } from '~shared/types/global'
import type { IAltCoreIconExternalProps } from '~core/ui/icon/models/types'
import { interceptEvents } from '~core/utils/event-interceptor'
import { withLocator } from '~core/utils/locator'

const { labelText, iconLeft, size, active, disabled } = createCoreChipProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreChip extends LitElement implements IAltCoreChipProps {
  @property({ type: String, attribute: 'label-text' }) labelText: IAltCoreChipProps['labelText'] = labelText
  @property({ type: Object, attribute: 'icon-left' }) iconLeft: IAltCoreChipProps['iconLeft'] = iconLeft
  @property({ type: String }) size: IAltCoreChipProps['size'] = size
  @property({ type: Boolean }) active: IAltCoreChipProps['active'] = active
  @property({ type: Boolean }) disabled: IAltCoreChipProps['disabled'] = disabled

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreChipVarsCSS)}
      ${unsafeCSS(AltCoreChipScopedCSS)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
      [`${this.baseClass}_active`]: Boolean(this.active),
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
    }
  }

  private get textSize(): EAltCoreTextSize {
    if (this.size === EAltSizes.LARGE) return EAltCoreTextSize.P1_REGULAR

    return EAltCoreTextSize.A2_REGULAR
  }

  private get textVariant(): EAltCoreTextVariant {
    if (this.disabled) return EAltCoreTextVariant.TERTIARY

    return EAltCoreTextVariant.PRIMARY
  }

  private get iconSize(): IAltCoreIconExternalProps['size'] {
    if (this.size === EAltSizes.LARGE) return '24px'

    return '16px'
  }

  protected renderLeftIcon() {
    return this.iconLeft
      ? html`
        <alt-core-icon
          .icon=${this.iconLeft}
          .size=${this.iconSize}
        ></alt-core-icon>`
      : nothing
  }


  protected render() {
    return html`
      <div
        class=${classMap(this.computedClasses)}
      >

        ${this.renderLeftIcon()}

        <alt-core-text
          class="${this.baseClass}__text"
          size=${this.textSize}
          variant=${this.textVariant}
        >
          ${this.labelText}
        </alt-core-text>
      </div>
    `
  }
}
