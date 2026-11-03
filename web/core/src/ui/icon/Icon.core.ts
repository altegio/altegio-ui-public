import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { createCoreIconExternalProps, type IAltCoreIconExternalProps } from './models/types'
import { AltCoreIconTagName as tagName } from '~shared/constants'

import AltCoreIconScopedCSS from '~core/ui/icon/css/Icon.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { size, accessibleName } = createCoreIconExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreIcon extends LitElement implements IAltCoreIconExternalProps {
  @property({ type: Object }) icon!: IAltCoreIconExternalProps['icon']
  @property({ type: String, reflect: true }) size: IAltCoreIconExternalProps['size'] = size
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreIconExternalProps['accessibleName'] = accessibleName

  private readonly baseClass = tagName

  static readonly styles = [css`${unsafeCSS(AltCoreIconScopedCSS)}`]


  protected render() {
    return html`
      <div
        style="width: ${this.size}; height: ${this.size};"
        class=${this.baseClass}
        role=${ifDefined(this.accessibleName ? 'img' : undefined)}
        aria-label=${ifDefined(this.accessibleName || undefined)}
        aria-hidden=${ifDefined(this.accessibleName ? undefined : 'true')}
        .innerHTML=${this.icon.data}
      ></div>
    `
  }
}
