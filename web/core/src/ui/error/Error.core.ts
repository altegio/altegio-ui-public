import { LitElement, html, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import { AltCoreErrorTagName as tagName } from '~shared/constants'
import {
  createCoreErrorExternalProps,
  type IAltCoreErrorExternalProps,
} from '~core/ui/error/models/types/external'
import AltCoreErrorVarsCSS from '~core/ui/error/css/Error.vars.css?inline'
import AltCoreErrorScopedCSS from '~core/ui/error/css/Error.scoped.css?inline'

import { EAltCoreTextVariant, EAltCoreTextSize } from '~core/ui/text/models/types/external'
import '~core/ui/text'
import { withLocator } from '~core/utils/locator'

const { errors, locator } = createCoreErrorExternalProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreError extends LitElement implements IAltCoreErrorExternalProps {
  @property({ type: Array }) errors: IAltCoreErrorExternalProps['errors'] = errors
  @property({ type: String }) locator: IAltCoreErrorExternalProps['locator'] = locator

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreErrorVarsCSS)}
      ${unsafeCSS(AltCoreErrorScopedCSS)}
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
      <alt-core-text
        size=${EAltCoreTextSize.A2_REGULAR}
        variant=${EAltCoreTextVariant.NEGATIVE}
      >
        ${this.renderErrors()}
      </alt-core-text>
    `
  }
}
