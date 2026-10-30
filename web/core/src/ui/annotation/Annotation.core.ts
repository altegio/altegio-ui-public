import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  createCoreAnnotationProps,
  type IAltCoreAnnotationProps,
} from '~core/ui/annotation/models/types'
import { AltCoreAnnotationTagName as tagName } from '~shared/constants'

import { EAltCoreTextVariant, EAltCoreTextSize } from '~core/ui/text/models/types/external'
import '~core/ui/text'
import { classMap } from 'lit/directives/class-map.js'

import AltCoreAnnotationVarsCss from '~core/ui/annotation/css/Annotation.vars.css?inline'
import AltCoreAnnotationScopedCss from '~core/ui/annotation/css/Annotation.scoped.css?inline'
import { AltCoreText } from '~core/ui/text'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { disabled, text } = createCoreAnnotationProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreAnnotation extends LitElement implements IAltCoreAnnotationProps {
  @property({ type: String }) text: IAltCoreAnnotationProps['text'] = text
  @property({ type: Boolean }) disabled: IAltCoreAnnotationProps['disabled'] = disabled

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreAnnotationVarsCss)}
      ${unsafeCSS(AltCoreAnnotationScopedCss)}
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
    defineCustomElement(tagName, AltCoreText)
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <alt-core-text
          size=${EAltCoreTextSize.A2_REGULAR}
          variant=${this.disabled ? EAltCoreTextVariant.TERTIARY : EAltCoreTextVariant.SECONDARY}
        >
          <slot name="annotation">
            ${this.text}
          </slot>
        </alt-core-text>
      </div>
    `
  }
}
