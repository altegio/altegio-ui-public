import { LitElement, css, html, nothing, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { AltCoreCounterTagName as tagName } from '~shared/constants'
import { type IAltCoreCounterProps, createCoreCounterProps } from '~core/ui/counter/models/types'
import AltCoreCounterVarsCSS from '~core/ui/counter/css/Counter.vars.css?inline'
import AltCoreCounterScopedCSS from '~core/ui/counter/css/Counter.scoped.css?inline'
import { interceptEvents } from '~core/utils/event-interceptor'
import { withLocator } from '~core/utils/locator'

const { size, disabled, variant, value, withPlusSign, max, accessibleName, locator } = createCoreCounterProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreCounter extends LitElement implements IAltCoreCounterProps {
  @property({ type: String, attribute: 'locator' }) locator: IAltCoreCounterProps['locator'] = locator
  @property({ type: String }) size: IAltCoreCounterProps['size'] = size
  @property({ type: String }) variant: IAltCoreCounterProps['variant'] = variant
  @property({ type: Boolean }) disabled: IAltCoreCounterProps['disabled'] = disabled
  @property({ type: Boolean, attribute: 'with-plus-sign' }) withPlusSign: IAltCoreCounterProps['withPlusSign'] = withPlusSign
  @property({ type: Number }) value: IAltCoreCounterProps['value'] = value
  @property({ type: Number }) max: IAltCoreCounterProps['max'] = max
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreCounterProps['accessibleName'] = accessibleName

  private readonly baseClass = tagName
  private readonly minValue = 0

  /** Largest number shown; a larger value shows as "999+" */
  private get maxValue() {
    return Number.isFinite(this.max) && this.max >= 0 ? Math.trunc(this.max) : max
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_variant_${this.variant}`]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
    }
  }

  private get isOverflowed() {
    return this.value > this.maxValue
  }

  private get isNegative() {
    return this.value < this.minValue
  }


  private get positiveValue() {
    return this.withPlusSign ? `+${Math.trunc(this.value)}` : Math.trunc(this.value)
  }

  private get computedValue() {
    return this.isNegative
      ? this.minValue
      : this.isOverflowed
        ? `${this.maxValue}+`
        : this.positiveValue
  }

  static readonly styles = [
    css`${unsafeCSS(AltCoreCounterVarsCSS)}`,
    css`${unsafeCSS(AltCoreCounterScopedCSS)}`,
  ]

  /** With an accessible name, screen readers hear it instead of the bare number, for example "3 unread messages" */
  private renderAccessibleName() {
    if (!this.accessibleName) return nothing

    return html`<span class="${this.baseClass}__accessible-name">${this.accessibleName}</span>`
  }

  protected render() {
    return html`
      <span
        class=${classMap(this.computedClasses)}
        aria-hidden=${ifDefined(this.accessibleName ? 'true' : undefined)}
      > ${this.computedValue} </span>${this.renderAccessibleName()}
    `
  }
}
