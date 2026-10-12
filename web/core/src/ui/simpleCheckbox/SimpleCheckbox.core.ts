import { html, LitElement, css, unsafeCSS, nothing } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { unsafeSVG } from 'lit/directives/unsafe-svg.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import {
  createCoreSimpleCheckboxProps,
  SimpleCheckboxCheckedEvent,
  type IYCoreSimpleCheckboxProps,
} from './models/types'
import { YCoreSimpleCheckboxTagName as tagName } from '~shared/constants'
import { yCheck } from '~shared/icons'

import YCoreSimpleCheckboxVarsCSS from '~core/ui/simpleCheckbox/css/SimpleCheckbox.vars.css?inline'
import YCoreSimpleCheckboxScopedCSS from '~core/ui/simpleCheckbox/css/SimpleCheckbox.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { size, checked, indeterminate, disabled, error, hovered } = { ...createCoreSimpleCheckboxProps() }

@customElement(tagName)
@withLocator(tagName)
export class YCoreSimpleCheckbox extends LitElement implements IYCoreSimpleCheckboxProps {
  @property({ type: String, reflect: true }) size: IYCoreSimpleCheckboxProps['size'] = size
  @property({ type: Boolean, reflect: true }) checked: IYCoreSimpleCheckboxProps['checked'] = checked
  @property({ type: Boolean, reflect: true }) indeterminate: IYCoreSimpleCheckboxProps['indeterminate'] = indeterminate
  @property({ type: Boolean, reflect: true }) error: IYCoreSimpleCheckboxProps['error'] = error
  @property({ type: Boolean }) disabled: IYCoreSimpleCheckboxProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true }) hovered: IYCoreSimpleCheckboxProps['hovered'] = hovered

  @bubblingEvent(
    SimpleCheckboxCheckedEvent,
    { name: 'checked' },
  )
  private _checked!: TDispatcher<SimpleCheckboxCheckedEvent>

  private readonly baseClass = tagName

  private get checkboxClasses() {
    const STATUS = `${this.baseClass}_status`

    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_error`]: Boolean(this.error),
      [`${this.baseClass}_hovered`]: Boolean(this.hovered),
      [`${STATUS}_checked`]: Boolean(this.checked && !this.indeterminate),
      [`${STATUS}_indeterminate`]: Boolean(this.indeterminate),
    }
  }

  static readonly styles = [
    css`${unsafeCSS(YCoreSimpleCheckboxVarsCSS)}`,
    css`${unsafeCSS(YCoreSimpleCheckboxScopedCSS)}`,
  ]

  private renderCheckedIcon() {
    return html`
      <div class="${this.baseClass}__icon ${this.baseClass}__icon-checked">
        ${unsafeSVG(yCheck.data)}
      </div>
    `
  }

  private renderIconIndeterminate() {
    return html`<span class="${this.baseClass}__icon ${this.baseClass}__icon-indeterminate"></span>`
  }

  private renderIcon() {
    if (this.indeterminate) {
      return this.renderIconIndeterminate()
    }
    if (this.checked) {
      return this.renderCheckedIcon()
    }
    return nothing
  }

  private handleClick = (event: MouseEvent) => {
    if (this.disabled) return

    event.stopPropagation()

    this._checked({ detail: { checked: !this.checked } })
  }


  protected render() {
    return html`
      <button
        class=${classMap(this.checkboxClasses)}
        role="checkbox"
        type="button"
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <div class=${`${this.baseClass}__body`}>
          ${this.renderIcon()}
        </div>
      </button>
    `
  }
}
