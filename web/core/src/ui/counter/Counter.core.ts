import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { YCoreCounterTagName as tagName } from '~shared/constants'
import { type IYCoreCounterProps, createCoreCounterProps } from '~core/ui/counter/models/types'
import YCoreCounterVarsCSS from '~core/ui/counter/css/Counter.vars.css?inline'
import YCoreCounterScopedCSS from '~core/ui/counter/css/Counter.scoped.css?inline'
import { interceptEvents } from '~core/utils/event-interceptor'
import { withLocator } from '~core/utils/locator'

const { size, disabled, variant, value, withPlusSign, locator } = createCoreCounterProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class YCoreCounter extends LitElement implements IYCoreCounterProps {
  @property({ type: String, attribute: 'locator' }) locator: IYCoreCounterProps['locator'] = locator
  @property({ type: String }) size: IYCoreCounterProps['size'] = size
  @property({ type: String }) variant: IYCoreCounterProps['variant'] = variant
  @property({ type: Boolean }) disabled: IYCoreCounterProps['disabled'] = disabled
  @property({ type: Boolean, attribute: 'with-plus-sign' }) withPlusSign: IYCoreCounterProps['withPlusSign'] = withPlusSign
  @property({ type: Number }) value: IYCoreCounterProps['value'] = value

  private readonly baseClass = tagName
  private readonly minValue = 0
  private readonly maxValue = 999

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
    css`${unsafeCSS(YCoreCounterVarsCSS)}`,
    css`${unsafeCSS(YCoreCounterScopedCSS)}`,
  ]

  protected render() {
    return html`
      <span
        class=${classMap(this.computedClasses)}
      > ${this.computedValue} </span>
    `
  }
}
