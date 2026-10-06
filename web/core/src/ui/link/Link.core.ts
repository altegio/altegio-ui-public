import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'

import { booleanConverter } from '~core/utils/converters'

import YCoreLinkScopedCSS from '~core/ui/link/css/Link.scoped.css?inline'
import YCoreLinkVarsCSS from '~core/ui/link/css/Link.vars.css?inline'

import { YCoreLinkTagName as tagName } from '~shared/constants'
import { createCoreLinkProps, type IYCoreLinkProps } from '~core/ui/link/models/types'
import { withLocator } from '~core/utils/locator'

const { href, target, textWrap } = createCoreLinkProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreLink extends LitElement implements IYCoreLinkProps {
  @property({ type: String }) href: IYCoreLinkProps['href'] = href
  @property({ type: String }) target: IYCoreLinkProps['target'] = target
  @property({ type: Boolean, converter: booleanConverter, attribute: 'text-wrap' }) textWrap: IYCoreLinkProps['textWrap'] = textWrap

  private readonly baseClass = tagName

  static readonly styles = [
    css`${unsafeCSS(YCoreLinkVarsCSS)}`,
    css`${unsafeCSS(YCoreLinkScopedCSS)}`,
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
