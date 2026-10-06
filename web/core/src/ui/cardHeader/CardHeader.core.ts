import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import { createCoreCardHeaderProps, type IYCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'
import { YCoreCardHeaderTagName as tagName } from '~shared/constants'

import { disabledContextCreated, sizeContextCreated } from '~core/ui/cardWrapper/providers'
import { renderIcon, renderTag } from '~core/renderers'

import YCardHeaderVarsCss from '~core/ui/cardHeader/css/CardHeader.vars.css?inline'
import YCardHeaderScopedCss from '~core/ui/cardHeader/css/CardHeader.scoped.css?inline'

import { EYSizes } from '~shared/types/global'
import type { TYCoreTagSize } from '~core/ui/tag/models/types'
import type { TYCoreTextVariant } from '~core/ui/text/models/types'
import { EYCoreTextSize, EYCoreTextVariant, type TYCoreTextSize } from '~core/ui/text/models/types'

import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { disabled, size, headerText, tagText, tagVariant, headerIcon } = createCoreCardHeaderProps()

const mapSizeToTextSize: Record<NonNullable<IYCoreCardHeaderProps['size']>, TYCoreTextSize> = {
  [EYSizes.SMALL]: EYCoreTextSize.H4_SEMIBOLD,
  [EYSizes.MEDIUM]: EYCoreTextSize.H3_SEMIBOLD,
  [EYSizes.LARGE]: EYCoreTextSize.H2_SEMIBOLD,
}

const mapSizeToTagSize: Record<NonNullable<IYCoreCardHeaderProps['size']>, TYCoreTagSize> = {
  [EYSizes.SMALL]: EYSizes.SMALL,
  [EYSizes.MEDIUM]: EYSizes.MEDIUM,
  [EYSizes.LARGE]: EYSizes.MEDIUM,
}

@customElement(tagName)
@withLocator(tagName)
export class YCoreCardHeader
  extends LitElement
  implements IYCoreCardHeaderProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IYCoreCardHeaderProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IYCoreCardHeaderProps['size'] = size
  @property({ type: String, attribute: 'header-text' }) headerText: IYCoreCardHeaderProps['headerText'] = headerText
  @property({ type: String, attribute: 'tag-text' }) tagText: IYCoreCardHeaderProps['tagText'] = tagText
  @property({ type: String, attribute: 'tag-variant' }) tagVariant: IYCoreCardHeaderProps['tagVariant'] = tagVariant
  @property({ type: Object, attribute: 'header-icon' }) headerIcon: IYCoreCardHeaderProps['headerIcon'] = headerIcon

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCardHeaderVarsCss)}
      ${unsafeCSS(YCardHeaderScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get computedSize() {
    return this.size ?? EYSizes.MEDIUM
  }

  private get computedTextSize() {
    return mapSizeToTextSize[this.computedSize]
  }

  private get computedTextVariant(): TYCoreTextVariant {
    if (this.disabled) return EYCoreTextVariant.TERTIARY

    return EYCoreTextVariant.PRIMARY
  }

  private get computedTagSize() {
    return mapSizeToTagSize[this.computedSize]
  }

  protected renderCardTitle() {
    if (!this.headerText) return nothing

    return html`
      <y-core-text
        .size=${this.computedTextSize}
        .variant=${this.computedTextVariant}
        class=${`${this.baseClass}__title`}
      >
        ${this.headerText}
      </y-core-text>
    `
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${this.renderCardTitle()}

        ${renderTag({
          text: this.tagText,
          variant: this.tagVariant,
          size: this.computedTagSize,
          disabled: this.disabled,
        })}

        ${renderIcon({
          icon: this.headerIcon,
          size: '16px',
        })}
      </div>
    `
  }
}
