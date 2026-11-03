import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { styleMap } from 'lit/directives/style-map.js'

import {
  createCoreLinearProgressProps,
  type IAltCoreLinearProgressProps,
} from '~core/ui/linearProgress/models/types'
import { AltCoreLinearProgressTagName as tagName } from '~shared/constants'
import { booleanConverter } from '~core/utils/converters'
import { withLocator } from '~core/utils/locator'

import AltCoreLinearProgressVarsCss from '~core/ui/linearProgress/css/LinearProgress.vars.css?inline'
import AltCoreLinearProgressScopedCss from '~core/ui/linearProgress/css/LinearProgress.scoped.css?inline'

const { value, max, indeterminate, size, variant, accessibleName, valueText } = createCoreLinearProgressProps()

/** Sets an attribute, or removes it for an empty value */
const toggleAttribute = (element: HTMLElement, name: string, attributeValue: string | undefined) => {
  if (attributeValue === undefined || attributeValue === '') element.removeAttribute(name)
  else element.setAttribute(name, attributeValue)
}

/**
 * A horizontal bar that shows how far a task has progressed, or that it is running when the amount is unknown.
 *
 * The host is a WAI-ARIA `progressbar`. Name it with `accessibleName`, or with `aria-label` / `aria-labelledby` on the host.
 * An indeterminate bar has no `aria-valuenow`.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreLinearProgress
  extends LitElement
  implements IAltCoreLinearProgressProps {
  @property({ type: Number }) value: IAltCoreLinearProgressProps['value'] = value
  @property({ type: Number }) max: IAltCoreLinearProgressProps['max'] = max
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) indeterminate: IAltCoreLinearProgressProps['indeterminate'] = indeterminate
  @property({ type: String, reflect: true }) size: IAltCoreLinearProgressProps['size'] = size
  @property({ type: String, reflect: true }) variant: IAltCoreLinearProgressProps['variant'] = variant
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreLinearProgressProps['accessibleName'] = accessibleName
  @property({ type: String, attribute: 'value-text' }) valueText: IAltCoreLinearProgressProps['valueText'] = valueText

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreLinearProgressVarsCss)}
      ${unsafeCSS(AltCoreLinearProgressScopedCss)}
    `,
  ]

  /** A positive maximum; anything else falls back to 100 */
  private get computedMax() {
    return Number.isFinite(this.max) && this.max > 0 ? this.max : max
  }

  /** The value kept between 0 and the maximum */
  private get computedValue() {
    return Math.min(Math.max(Number.isFinite(this.value) ? this.value : 0, 0), this.computedMax)
  }

  connectedCallback() {
    super.connectedCallback()

    if (!this.hasAttribute('role')) this.setAttribute('role', 'progressbar')
  }

  protected updated(changedProperties: PropertyValues<this>) {
    super.updated(changedProperties)

    this.setAttribute('aria-valuemin', '0')
    this.setAttribute('aria-valuemax', String(this.computedMax))
    toggleAttribute(this, 'aria-valuenow', this.indeterminate ? undefined : String(this.computedValue))
    toggleAttribute(this, 'aria-valuetext', this.indeterminate ? undefined : this.valueText)

    if (changedProperties.has('accessibleName')) toggleAttribute(this, 'aria-label', this.accessibleName)
  }

  protected render() {
    const fill = this.indeterminate ? {} : { width: `${this.computedValue / this.computedMax * 100}%` }

    return html`
      <div class=${this.baseClass}>
        <div class="${this.baseClass}__bar" style=${styleMap(fill)}></div>
      </div>
    `
  }
}
