import { html, LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { YCoreSimpleToggleTagName as tagName } from '~shared/constants'
import { createCoreSimpleToggleProps, type IYCoreSimpleToggleProps } from './models/types'
import { SimpleToggleCheckedEvent } from './models/types/events'
import YCoreSimpleToggleVarsCSS from '~core/ui/simpleToggle/css/SimpleToggle.vars.css?inline'
import YCoreSimpleToggleScopedCSS from '~core/ui/simpleToggle/css/SimpleToggle.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { checked, disabled, size, hovered } = createCoreSimpleToggleProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreSimpleToggle extends LitElement implements IYCoreSimpleToggleProps {
  @property({ type: Boolean }) disabled: IYCoreSimpleToggleProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true }) checked: IYCoreSimpleToggleProps['checked'] = checked
  @property({ type: Boolean }) hovered: IYCoreSimpleToggleProps['hovered'] = hovered
  @property({ type: String }) size: IYCoreSimpleToggleProps['size'] = size

  @bubblingEvent(
    SimpleToggleCheckedEvent,
    { name: 'checked' },
  )
  private _checked!: TDispatcher<SimpleToggleCheckedEvent>

  private readonly baseClass = tagName

  private get toggleClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_checked`]: Boolean(this.checked),
      [`${this.baseClass}_hovered`]: Boolean(this.hovered),
      [`${this.baseClass}_size_${this.size}`]: true,
    }
  }

  static readonly styles = [
    css`${unsafeCSS(YCoreSimpleToggleVarsCSS)}`,
    css`${unsafeCSS(YCoreSimpleToggleScopedCSS)}`,
  ]

  private handleClick = () => {
    if (this.disabled) return

    this._checked({ detail: { checked: !this.checked } })
  }


  protected render() {
    return html`
      <button
        class=${classMap(this.toggleClasses)}
        @click=${this.handleClick}
        role="switch"
        type="button"
        ?disabled=${this.disabled}
      >
        <span class=${`${this.baseClass}__switch-thumb`}></span>
      </button>
    `
  }
}
