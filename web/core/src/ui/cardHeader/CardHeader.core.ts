import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume } from '@lit/context'

import { createCoreCardHeaderProps, type IAltCoreCardHeaderProps } from '~core/ui/cardHeader/models/types'
import { AltCoreCardHeaderTagName as tagName } from '~shared/constants'

import { disabledContextCreated, sizeContextCreated } from '~core/ui/cardWrapper/providers'
import { renderIcon, renderTag } from '~core/renderers'

import AltCardHeaderVarsCss from '~core/ui/cardHeader/css/CardHeader.vars.css?inline'
import AltCardHeaderScopedCss from '~core/ui/cardHeader/css/CardHeader.scoped.css?inline'

import { EAltSizes } from '~shared/types/global'
import type { TAltCoreTagSize } from '~core/ui/tag/models/types'
import type { TAltCoreTextVariant } from '~core/ui/text/models/types'
import { EAltCoreTextSize, EAltCoreTextVariant, type TAltCoreTextSize } from '~core/ui/text/models/types'

import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { disabled, size, headerText, tagText, tagVariant, headerIcon } = createCoreCardHeaderProps()

const mapSizeToTextSize: Record<NonNullable<IAltCoreCardHeaderProps['size']>, TAltCoreTextSize> = {
  [EAltSizes.SMALL]: EAltCoreTextSize.H4_SEMIBOLD,
  [EAltSizes.MEDIUM]: EAltCoreTextSize.H3_SEMIBOLD,
  [EAltSizes.LARGE]: EAltCoreTextSize.H2_SEMIBOLD,
}

const mapSizeToTagSize: Record<NonNullable<IAltCoreCardHeaderProps['size']>, TAltCoreTagSize> = {
  [EAltSizes.SMALL]: EAltSizes.SMALL,
  [EAltSizes.MEDIUM]: EAltSizes.MEDIUM,
  [EAltSizes.LARGE]: EAltSizes.MEDIUM,
}

@customElement(tagName)
@withLocator(tagName)
export class AltCoreCardHeader
  extends LitElement
  implements IAltCoreCardHeaderProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @property({ type: Boolean }) disabled: IAltCoreCardHeaderProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @property({ type: String, reflect: true }) size: IAltCoreCardHeaderProps['size'] = size
  @property({ type: String, attribute: 'header-text' }) headerText: IAltCoreCardHeaderProps['headerText'] = headerText
  @property({ type: String, attribute: 'tag-text' }) tagText: IAltCoreCardHeaderProps['tagText'] = tagText
  @property({ type: String, attribute: 'tag-variant' }) tagVariant: IAltCoreCardHeaderProps['tagVariant'] = tagVariant
  @property({ type: Object, attribute: 'header-icon' }) headerIcon: IAltCoreCardHeaderProps['headerIcon'] = headerIcon

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCardHeaderVarsCss)}
      ${unsafeCSS(AltCardHeaderScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }

  private get computedSize() {
    return this.size ?? EAltSizes.MEDIUM
  }

  private get computedTextSize() {
    return mapSizeToTextSize[this.computedSize]
  }

  private get computedTextVariant(): TAltCoreTextVariant {
    if (this.disabled) return EAltCoreTextVariant.TERTIARY

    return EAltCoreTextVariant.PRIMARY
  }

  private get computedTagSize() {
    return mapSizeToTagSize[this.computedSize]
  }

  protected renderCardTitle() {
    if (!this.headerText) return nothing

    return html`
      <alt-core-text
        .size=${this.computedTextSize}
        .variant=${this.computedTextVariant}
        class=${`${this.baseClass}__title`}
      >
        ${this.headerText}
      </alt-core-text>
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
