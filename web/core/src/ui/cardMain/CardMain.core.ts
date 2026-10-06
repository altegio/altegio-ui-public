import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { consume, provide } from '@lit/context'

import { createCoreCardMainProps, type IYCoreCardMainProps } from '~core/ui/cardMain/models/types'
import { YCoreCardMainTagName as tagName } from '~shared/constants'

import { disabledContextCreated, sizeContextCreated } from '~core/ui/cardWrapper/providers'
import { booleanConverter } from '~core/utils/converters'

import YCardMainVarsCss from '~core/ui/cardMain/css/CardMain.vars.css?inline'
import YCardMainScopedCss from '~core/ui/cardMain/css/CardMain.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { disabled, size, hideSpaceLeft, hideSpaceRight, hasAnnotation } = createCoreCardMainProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreCardMain
  extends LitElement
  implements IYCoreCardMainProps {
  @consume({ context: disabledContextCreated, subscribe: true })
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IYCoreCardMainProps['disabled'] = disabled
  @consume({ context: sizeContextCreated, subscribe: true })
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IYCoreCardMainProps['size'] = size
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'hide-space-left' }) hideSpaceLeft: IYCoreCardMainProps['hideSpaceLeft'] = hideSpaceLeft
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'hide-space-right' }) hideSpaceRight: IYCoreCardMainProps['hideSpaceRight'] = hideSpaceRight
  @property({ type: Boolean, reflect: true, converter: booleanConverter, attribute: 'has-annotation' }) hasAnnotation: IYCoreCardMainProps['hasAnnotation'] = hasAnnotation

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCardMainVarsCss)}
      ${unsafeCSS(YCardMainScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_hide-space-left`]: Boolean(this.hideSpaceLeft),
      [`${this.baseClass}_hide-space-right`]: Boolean(this.hideSpaceRight),
      [`${this.baseClass}_has-annotation`]: Boolean(this.hasAnnotation),
    }
  }


  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <slot></slot>
      </div>
    `
  }
}
