import { html, LitElement, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import {
  createCoreSimpleRadioButtonProps,
  type IAltCoreSimpleRadioButtonProps,
} from '~core/ui/simpleRadioButton/models/types'
import { SimpleRadioButtonCheckedEvent } from './models/types/events'
import { AltCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'

import AltCoreSimpleRadioButtonVarsCSS from '~core/ui/simpleRadioButton/css/SimpleRadioButton.vars.css?inline'
import AltCoreSimpleRadioButtonScopedCSS from '~core/ui/simpleRadioButton/css/SimpleRadioButton.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { size, checked, disabled, name, error, hovered, accessibleName, accessibleDescription, tabStop } = { ...createCoreSimpleRadioButtonProps() }

@customElement(tagName)
@withLocator(tagName)
export class AltCoreSimpleRadioButton extends LitElement implements IAltCoreSimpleRadioButtonProps {
  @property({ type: String, reflect: true }) size: IAltCoreSimpleRadioButtonProps['size'] = size
  @property({ type: Boolean, reflect: true }) checked: IAltCoreSimpleRadioButtonProps['checked'] = checked
  @property({ type: Boolean, reflect: true }) error: IAltCoreSimpleRadioButtonProps['error'] = error
  @property({ type: Boolean }) disabled: IAltCoreSimpleRadioButtonProps['disabled'] = disabled
  @property({ type: String }) name: IAltCoreSimpleRadioButtonProps['name'] = name
  @property({ type: Boolean, reflect: true }) hovered: IAltCoreSimpleRadioButtonProps['hovered'] = hovered
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreSimpleRadioButtonProps['accessibleName'] = accessibleName
  @property({ type: String, attribute: false }) accessibleDescription: IAltCoreSimpleRadioButtonProps['accessibleDescription'] = accessibleDescription
  @property({ type: Boolean, attribute: false }) tabStop: IAltCoreSimpleRadioButtonProps['tabStop'] = tabStop

  static readonly shadowRootOptions: ShadowRootInit = {
    ...LitElement.shadowRootOptions,
    delegatesFocus: true,
  }

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
    css`${unsafeCSS(AltCoreSimpleRadioButtonVarsCSS)}`,
    css`${unsafeCSS(AltCoreSimpleRadioButtonScopedCSS)}`,
  ]


  private get controlTabIndex() {
    return this.tabStop === false
      ? '-1'
      : '0'
  }

  private get ariaInvalidValue() {
    return this.error
      ? 'true'
      : undefined
  }

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
        tabindex=${this.controlTabIndex}
        aria-checked=${this.checked ? 'true' : 'false'}
        aria-label=${ifDefined(this.accessibleName || undefined)}
        aria-description=${ifDefined(this.accessibleDescription || undefined)}
        aria-invalid=${ifDefined(this.ariaInvalidValue)}
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
