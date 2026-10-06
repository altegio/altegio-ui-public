import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  YCoreChipTagName as tagName,
} from '~shared/constants'

import {
  createCoreChipProps,
  type IYCoreChipProps,
} from './models/types'

import YCoreChipVarsCSS from '~core/ui/chip/css/Chip.vars.css?inline'
import YCoreChipScopedCSS from '~core/ui/chip/css/Chip.scoped.css?inline'

import '~core/ui/text'
import '~core/ui/icon'

import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'
import { EYSizes } from '~shared/types/global'
import type { IYCoreIconExternalProps } from '~core/ui/icon/models/types'
import { interceptEvents } from '~core/utils/event-interceptor'
import { withLocator } from '~core/utils/locator'

const { labelText, iconLeft, size, active, disabled } = createCoreChipProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreChip extends LitElement implements IYCoreChipProps {
  @property({ type: String, attribute: 'label-text' }) labelText: IYCoreChipProps['labelText'] = labelText
  @property({ type: Object, attribute: 'icon-left' }) iconLeft: IYCoreChipProps['iconLeft'] = iconLeft
  @property({ type: String }) size: IYCoreChipProps['size'] = size
  @property({ type: Boolean }) active: IYCoreChipProps['active'] = active
  @property({ type: Boolean }) disabled: IYCoreChipProps['disabled'] = disabled

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreChipVarsCSS)}
      ${unsafeCSS(YCoreChipScopedCSS)}
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

  private get textSize(): EYCoreTextSize {
    if (this.size === EYSizes.LARGE) return EYCoreTextSize.P1_REGULAR

    return EYCoreTextSize.A2_REGULAR
  }

  private get textVariant(): EYCoreTextVariant {
    if (this.disabled) return EYCoreTextVariant.TERTIARY

    return EYCoreTextVariant.PRIMARY
  }

  private get iconSize(): IYCoreIconExternalProps['size'] {
    if (this.size === EYSizes.LARGE) return '24px'

    return '16px'
  }

  protected renderLeftIcon() {
    return this.iconLeft
      ? html`
        <y-core-icon
          .icon=${this.iconLeft}
          .size=${this.iconSize}
        ></y-core-icon>`
      : nothing
  }


  protected render() {
    return html`
      <div
        class=${classMap(this.computedClasses)}
      >

        ${this.renderLeftIcon()}

        <y-core-text
          class="${this.baseClass}__text"
          size=${this.textSize}
          variant=${this.textVariant}
        >
          ${this.labelText}
        </y-core-text>
      </div>
    `
  }
}
