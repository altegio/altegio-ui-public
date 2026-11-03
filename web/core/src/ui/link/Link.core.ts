import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import { booleanConverter } from '~core/utils/converters'

import AltCoreLinkScopedCSS from '~core/ui/link/css/Link.scoped.css?inline'
import AltCoreLinkVarsCSS from '~core/ui/link/css/Link.vars.css?inline'

import { AltCoreLinkTagName as tagName } from '~shared/constants'
import { createCoreLinkProps, type IAltCoreLinkProps } from '~core/ui/link/models/types'
import { withLocator } from '~core/utils/locator'

const { href, target, textWrap } = createCoreLinkProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreLink extends LitElement implements IAltCoreLinkProps {
  @property({ type: String }) href: IAltCoreLinkProps['href'] = href
  @property({ type: String }) target: IAltCoreLinkProps['target'] = target
  @property({ type: Boolean, converter: booleanConverter, attribute: 'text-wrap' }) textWrap: IAltCoreLinkProps['textWrap'] = textWrap

  private readonly baseClass = tagName

  static readonly styles = [
    css`${unsafeCSS(AltCoreLinkVarsCSS)}`,
    css`${unsafeCSS(AltCoreLinkScopedCSS)}`,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_text-wrap`]: Boolean(this.textWrap),
    }
  }


  protected render() {
    return html`
      <a
        class=${classMap(this.computedClasses)}
        href=${ifDefined(this.href)}
        target=${ifDefined(this.target)}
      >
        <slot class="${this.baseClass}__text"></slot>
      </a>
    `
  }
}
