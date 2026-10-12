import { html, LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import {
  createCoreSimpleRadioButtonProps,
  type IYCoreSimpleRadioButtonProps,
} from '~core/ui/simpleRadioButton/models/types'
import { SimpleRadioButtonCheckedEvent } from './models/types/events'
import { YCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'

import YCoreSimpleRadioButtonVarsCSS from '~core/ui/simpleRadioButton/css/SimpleRadioButton.vars.css?inline'
import YCoreSimpleRadioButtonScopedCSS from '~core/ui/simpleRadioButton/css/SimpleRadioButton.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { size, checked, disabled, name, error, hovered } = { ...createCoreSimpleRadioButtonProps() }

@customElement(tagName)
@withLocator(tagName)
export class YCoreSimpleRadioButton extends LitElement implements IYCoreSimpleRadioButtonProps {
  @property({ type: String, reflect: true }) size: IYCoreSimpleRadioButtonProps['size'] = size
  @property({ type: Boolean, reflect: true }) checked: IYCoreSimpleRadioButtonProps['checked'] = checked
  @property({ type: Boolean, reflect: true }) error: IYCoreSimpleRadioButtonProps['error'] = error
  @property({ type: Boolean }) disabled: IYCoreSimpleRadioButtonProps['disabled'] = disabled
  @property({ type: String }) name: IYCoreSimpleRadioButtonProps['name'] = name
  @property({ type: Boolean, reflect: true }) hovered: IYCoreSimpleRadioButtonProps['hovered'] = hovered

  @bubblingEvent(
    SimpleRadioButtonCheckedEvent,
    { name: 'checked' },
  )
  private _checked!: TDispatcher<SimpleRadioButtonCheckedEvent>

  private readonly baseClass = tagName

  private get radioButtonClasses() {
    const STATUS = `${this.baseClass}_status`

    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_error`]: Boolean(this.error),
      [`${this.baseClass}_hovered`]: Boolean(this.hovered),
      [`${STATUS}_checked`]: Boolean(this.checked),
    }
  }

  static readonly styles = [
    css`${unsafeCSS(YCoreSimpleRadioButtonVarsCSS)}`,
    css`${unsafeCSS(YCoreSimpleRadioButtonScopedCSS)}`,
  ]


  private handleClick = (event: MouseEvent) => {
    if (this.disabled) return
    event.stopPropagation()

    if (!this.checked) {
      this._checked({ detail: { checked: true } })
    }
  }


  protected render() {
    return html`
      <button
        class=${classMap(this.radioButtonClasses)}
        role="radio"
        type="button"
        .name=${this.name || ''}
        ?disabled=${this.disabled}
        @click=${this.handleClick}
      >
        <div class=${`${this.baseClass}__body`}>
        </div>
      </button>
    `
  }
}
