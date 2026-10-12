import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  createCoreAnnotationProps,
  type IYCoreAnnotationProps,
} from '~core/ui/annotation/models/types'
import { YCoreAnnotationTagName as tagName } from '~shared/constants'

import { EYCoreTextVariant, EYCoreTextSize } from '~core/ui/text/models/types/external'
import '~core/ui/text'
import { classMap } from 'lit/directives/class-map.js'

import YCoreAnnotationVarsCss from '~core/ui/annotation/css/Annotation.vars.css?inline'
import YCoreAnnotationScopedCss from '~core/ui/annotation/css/Annotation.scoped.css?inline'
import { YCoreText } from '~core/ui/text'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { disabled, text } = createCoreAnnotationProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreAnnotation extends LitElement implements IYCoreAnnotationProps {
  @property({ type: String }) text: IYCoreAnnotationProps['text'] = text
  @property({ type: Boolean }) disabled: IYCoreAnnotationProps['disabled'] = disabled

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreAnnotationVarsCss)}
      ${unsafeCSS(YCoreAnnotationScopedCss)}
    `,
  ]

  private readonly baseClass = tagName
  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
    }
  }


  protected firstUpdated(): void {
    defineCustomElement(tagName, YCoreText)
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <y-core-text
          size=${EYCoreTextSize.A2_REGULAR}
          variant=${this.disabled ? EYCoreTextVariant.TERTIARY : EYCoreTextVariant.SECONDARY}
        >
          <slot name="annotation">
            ${this.text}
          </slot>
        </y-core-text>
      </div>
    `
  }
}
