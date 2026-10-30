import { html, LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import { type TDispatcher, bubblingEvent } from '~core/utils/event-decorator'
import { AltCoreSimpleToggleTagName as tagName } from '~shared/constants'
import { createCoreSimpleToggleProps, type IAltCoreSimpleToggleProps } from './models/types'
import { SimpleToggleCheckedEvent } from './models/types/events'
import AltCoreSimpleToggleVarsCSS from '~core/ui/simpleToggle/css/SimpleToggle.vars.css?inline'
import AltCoreSimpleToggleScopedCSS from '~core/ui/simpleToggle/css/SimpleToggle.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { checked, disabled, size, hovered } = createCoreSimpleToggleProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreSimpleToggle extends LitElement implements IAltCoreSimpleToggleProps {
  @property({ type: Boolean }) disabled: IAltCoreSimpleToggleProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true }) checked: IAltCoreSimpleToggleProps['checked'] = checked
  @property({ type: Boolean }) hovered: IAltCoreSimpleToggleProps['hovered'] = hovered
  @property({ type: String }) size: IAltCoreSimpleToggleProps['size'] = size

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
    css`${unsafeCSS(AltCoreSimpleToggleVarsCSS)}`,
    css`${unsafeCSS(AltCoreSimpleToggleScopedCSS)}`,
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
