import { LitElement, css, html, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { provide } from '@lit/context'

import { AltCoreRadioButtonGroupTagName as tagName } from '~shared/constants'
import {
  createCoreRadioButtonGroupProps,
  type IAltCoreRadioButtonGroupProps,
} from '~core/ui/radioButtonGroup/models/types'

import AltCoreRadioButtonGroupScopedCss from '~core/ui/radioButtonGroup/css/RadioButtonGroup.scoped.css?inline'
import AltCoreRadioButtonGroupVarsCss from '~core/ui/radioButtonGroup/css/RadioButtonGroup.vars.css?inline'
import { alignmentContextCreated, groupValueContextCreated, sizeContextCreated } from './providers'
import { preventAndStopEvent } from '~shared/utils'
import type { TDispatcher } from '~core/utils/event-decorator'
import {
  bubblingEvent,
} from '~core/utils/event-decorator'
import { RadioButtonGroupChangeEvent } from './models/types'
import { renderLabel } from '~core/renderers'
import classMapToString from '~core/utils/classMapToString'
import { withLocator } from '~core/utils/locator'

const { value, size, alignment, direction, labelText, labelTooltipText, labelDebounce, labelTooltipActive } = createCoreRadioButtonGroupProps()

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

  connectedCallback() {
    super.connectedCallback()


    this.addEventListener('checked', this.handleValueChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener('checked', this.handleValueChange)
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
          className: classMapToString(this.computedLabelClasses),
        })}
        <div class=${classMap(this.computedWrapperClasses)}>
          <slot></slot>
        </div>
      </div>
    `
  }
}
