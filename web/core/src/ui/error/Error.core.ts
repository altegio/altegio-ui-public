import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { YCoreErrorTagName as tagName } from '~shared/constants'
import {
  createCoreErrorExternalProps,
  type IYCoreErrorExternalProps,
} from '~core/ui/error/models/types/external'
import YCoreErrorVarsCSS from '~core/ui/error/css/Error.vars.css?inline'
import YCoreErrorScopedCSS from '~core/ui/error/css/Error.scoped.css?inline'

import { EYCoreTextVariant, EYCoreTextSize } from '~core/ui/text/models/types/external'
import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { errors, locator } = createCoreErrorExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreError extends LitElement implements IYCoreErrorExternalProps {
  @property({ type: Array }) errors: IYCoreErrorExternalProps['errors'] = errors
  @property({ type: String }) locator: IYCoreErrorExternalProps['locator'] = locator

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreErrorVarsCSS)}
      ${unsafeCSS(YCoreErrorScopedCSS)}
    `,
  ]

  private renderErrors() {
    if (!this.errors?.length) return nothing

    if (this.errors.length === 1) {
      return html`${this.errors[0]}`
    }

    const errorsItems = this.errors.map((error) => html`<li class="${this.baseClass}__list-item">${error}</li>`)

    return html`
      <ul class="${this.baseClass}__list">
        ${errorsItems}
      </ul>
    `
  }

  protected render() {
    return html`
      <y-core-text
        size=${EYCoreTextSize.A2_REGULAR}
        variant=${EYCoreTextVariant.NEGATIVE}
      >
        ${this.renderErrors()}
      </y-core-text>
    `
  }
}
