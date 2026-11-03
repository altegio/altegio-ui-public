import { LitElement, css, html, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'
import { provide } from '@lit/context'

import { AltCoreRadioButtonGroupTagName as tagName, AltCoreRadioButtonTagName } from '~shared/constants'
import {
  createCoreRadioButtonGroupProps,
  type IAltCoreRadioButtonGroupProps,
} from '~core/ui/radioButtonGroup/models/types'

import AltCoreRadioButtonGroupScopedCss from '~core/ui/radioButtonGroup/css/RadioButtonGroup.scoped.css?inline'
import AltCoreRadioButtonGroupVarsCss from '~core/ui/radioButtonGroup/css/RadioButtonGroup.vars.css?inline'
import { alignmentContextCreated, groupValueContextCreated, requiredContextCreated, sizeContextCreated, tabStopValueContextCreated } from './providers'
import { RadioButtonCheckedEvent } from '~core/ui/radioButton/models/types'
import type { AltCoreRadioButton } from '~core/ui/radioButton'
import { preventAndStopEvent } from '~shared/utils'
import type { TDispatcher } from '~core/utils/event-decorator'
import {
  bubblingEvent,
} from '~core/utils/event-decorator'
import { RadioButtonGroupChangeEvent } from './models/types'
import { renderLabel } from '~core/renderers'
import classMapToString from '~core/utils/classMapToString'
import { withLocator } from '~core/utils/locator'
import { first } from 'radash'
import { getInlineKey } from '~core/utils/a11y/direction'

const { value, size, alignment, direction, labelText, labelTooltipText, labelDebounce, labelTooltipActive, accessibleName, required } = createCoreRadioButtonGroupProps()

const NEXT_KEYS = ['ArrowDown', 'ArrowRight']
const PREVIOUS_KEYS = ['ArrowUp', 'ArrowLeft']

@customElement(tagName)
@withLocator(tagName)
export class AltCoreRadioButtonGroup
  extends LitElement
  implements IAltCoreRadioButtonGroupProps {
  @provide({ context: groupValueContextCreated })
  @property({ type: String })
  value: IAltCoreRadioButtonGroupProps['value'] = value
  @provide({ context: alignmentContextCreated })
  @property({ type: String })
  alignment: IAltCoreRadioButtonGroupProps['alignment'] = alignment
  @provide({ context: sizeContextCreated })
  @property({ type: String })
  size: IAltCoreRadioButtonGroupProps['size'] = size
  @property({ type: String })
  direction: IAltCoreRadioButtonGroupProps['direction'] = direction
  @property({ type: String, reflect: true, attribute: 'label-text' }) labelText: IAltCoreRadioButtonGroupProps['labelText'] = labelText
  @property({ type: String, reflect: true, attribute: 'label-tooltip-text' }) labelTooltipText: IAltCoreRadioButtonGroupProps['labelTooltipText'] = labelTooltipText
  @property({ type: Number, reflect: true, attribute: 'label-debounce' }) labelDebounce: IAltCoreRadioButtonGroupProps['labelDebounce'] = labelDebounce
  @property({ type: Boolean, reflect: true, attribute: 'label-tooltip-active' }) labelTooltipActive: IAltCoreRadioButtonGroupProps['labelTooltipActive'] = labelTooltipActive
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreRadioButtonGroupProps['accessibleName'] = accessibleName
  @provide({ context: requiredContextCreated })
  @property({ type: Boolean, reflect: true }) required: IAltCoreRadioButtonGroupProps['required'] = required

  @provide({ context: tabStopValueContextCreated })
  @state() protected tabStopValue: IAltCoreRadioButtonGroupProps['value'] = undefined

  @bubblingEvent(RadioButtonGroupChangeEvent, { name: 'change' })
  private _checked!: TDispatcher<RadioButtonGroupChangeEvent>

  private handleValueChange = (event: Event) => {
    preventAndStopEvent(event)

    const customEvent = event as RadioButtonGroupChangeEvent
    const checked = customEvent.detail.value

    if (checked !== undefined) {
      this.value = checked

      this._checked({ detail: { value: this.value } })
    }
  }

  private get radioButtons() {
    return Array.from(this.querySelectorAll<AltCoreRadioButton>(AltCoreRadioButtonTagName))
  }

  private get enabledRadioButtons() {
    return this.radioButtons.filter((radioButton) => !radioButton.isDisabled)
  }

  /** Keeps one radio button in the tab order: the checked one, or the first enabled one */
  private updateTabStop = () => {
    const enabled = this.enabledRadioButtons
    const tabStop = enabled.find((radioButton) => radioButton.value === this.value) ?? first(enabled)

    this.tabStopValue = tabStop?.value
  }

  /** Arrow keys move focus to the next or previous enabled radio button and check it, wrapping around */
  private handleKeydown = (event: KeyboardEvent) => {
    const key = getInlineKey(event.key, this)
    const step = NEXT_KEYS.includes(key)
      ? 1
      : PREVIOUS_KEYS.includes(key)
        ? -1
        : 0
    if (!step) return

    const radioButtons = this.enabledRadioButtons
    const current = radioButtons.findIndex((radioButton) => event.composedPath().includes(radioButton))
    if (current === -1) return

    event.preventDefault()

    const next = radioButtons[(current + step + radioButtons.length) % radioButtons.length]
    next.focus()
    next.dispatchEvent(new RadioButtonCheckedEvent('checked', {
      bubbles: true,
      composed: true,
      detail: { checked: true, value: next.value },
    }))
  }

  connectedCallback() {
    super.connectedCallback()


    this.addEventListener('checked', this.handleValueChange)
    this.addEventListener('keydown', this.handleKeydown)
    this.addEventListener('focusin', this.updateTabStop)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener('checked', this.handleValueChange)
    this.removeEventListener('keydown', this.handleKeydown)
    this.removeEventListener('focusin', this.updateTabStop)
  }

  protected willUpdate(changedProperties: PropertyValues<this>) {
    if (changedProperties.has('value')) {
      this.updateTabStop()
    }
  }

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreRadioButtonGroupVarsCss)}
      ${unsafeCSS(AltCoreRadioButtonGroupScopedCss)}
    `,
  ]

  private get computedClasses() {
    return { [this.baseClass]: true }
  }
  private get computedLabelClasses() {
    return { [`${this.baseClass}__label`]: true }
  }
  private get computedWrapperClasses() {
    return {
      [`${this.baseClass}__wrapper`]: true,
      [`${this.baseClass}__wrapper_direction_${this.direction}`]: true,
    }
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        ${renderLabel({
          text: this.labelText,
          tooltipText: this.labelTooltipText,
          tooltipActive: this.labelTooltipActive,
          debounce: this.labelDebounce,
          required: this.required,
          className: classMapToString(this.computedLabelClasses),
        })}
        <div
          class=${classMap(this.computedWrapperClasses)}
          role="radiogroup"
          aria-required=${this.required ? 'true' : 'false'}
          aria-label=${ifDefined(this.accessibleName || this.labelText || undefined)}
        >
          <slot @slotchange=${this.updateTabStop}></slot>
        </div>
      </div>
    `
  }
}
