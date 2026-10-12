import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { createCoreIconExternalProps, type IYCoreIconExternalProps } from './models/types'
import { YCoreIconTagName as tagName } from '~shared/constants'

import YCoreIconScopedCSS from '~core/ui/icon/css/Icon.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { size } = createCoreIconExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreIcon extends LitElement implements IYCoreIconExternalProps {
  @property({ type: Object }) icon!: IYCoreIconExternalProps['icon']
  @property({ type: String, reflect: true }) size: IYCoreIconExternalProps['size'] = size

  private readonly baseClass = tagName

  static readonly styles = [css`${unsafeCSS(YCoreIconScopedCSS)}`]


  protected render() {
    return html`
      <div
        style="width: ${this.size}; height: ${this.size};"
        class=${this.baseClass}
        .innerHTML=${this.icon.data}
      ></div>
    `
  }
}
