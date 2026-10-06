import type { PropertyValues } from 'lit'
import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'

import { ClickEvent } from './models/types/events'

import {
  createCoreSegmentControlProps,
  type IYCoreSegmentControlProps,
} from './models/types'
import { YCoreSegmentControlTagName as tagName } from '~shared/constants'

import '~core/ui/segmentOption'

import YCoreSegmentControlVarsCss from '~core/ui/segmentControl/css/SegmentControl.vars.css?inline'
import YCoreSegmentControlScopedCss from '~core/ui/segmentControl/css/SegmentControl.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { options, size, value, manual } = createCoreSegmentControlProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreSegmentControl extends LitElement implements IYCoreSegmentControlProps {
  @property({ type: Array }) options: IYCoreSegmentControlProps['options'] = options
  @property({ type: String, reflect: true }) size: IYCoreSegmentControlProps['size'] = size
  @property({ type: String, attribute: 'value', reflect: true }) value: IYCoreSegmentControlProps['value'] = value
  @property({ type: Boolean, attribute: 'manual', reflect: true }) manual: IYCoreSegmentControlProps['manual'] = manual

  @bubblingEvent(
    ClickEvent,
    { name: 'click' },
  )
  private _click!: TDispatcher<ClickEvent>

  @state()
  private _activeSegmentValue: string | null = this.options?.[0]?.value || null

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreSegmentControlVarsCss)}
      ${unsafeCSS(YCoreSegmentControlScopedCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: Boolean(this.size),
    }
  }

  private handleClick = (el: ClickEvent) => {
    el.stopPropagation()
    el.preventDefault()

    const value = el.detail.value

    if (!this.manual) this._activeSegmentValue = value

    this._click({ detail: { value } })
  }

  private setDefaultActiveSegment = () => {
    if (!this.options || this.options.length === 0) return

    const selectedOption = this.options.find((option) => option.value === this._activeSegmentValue)

    if (!this._activeSegmentValue || !selectedOption) {
      this._activeSegmentValue = this.options[0].value
    }
  }

  protected renderList() {
    if (!this.options) return null

    return repeat(
      this.options,
      (option) => option.value,
      (option) => html`
        <y-core-segment-option
          size=${ifDefined(this.size)}
          value=${option.value}
          .icon=${option.icon}
          .active=${option.value === this._activeSegmentValue}
          .disabled=${option.disabled}
          data-locator=segment_option_${option.value}
          class="${this.baseClass}__segment"
          @click-option=${this.handleClick}
        >
          ${option.text}
        </y-core-segment-option>
      `,
    )
  }


  protected willUpdate(changedProperties: PropertyValues) {
    super.willUpdate(changedProperties)

    if (changedProperties.has('value') && this.manual) {
      this._activeSegmentValue = this.value || null
    }

    if (changedProperties.has('options')) {
      this.setDefaultActiveSegment()
    }
  }

  protected render() {
    if (!options) return nothing

    return html`
      <div 
        class=${classMap(this.computedClasses)}
        @click=${(event: Event) => { event.stopPropagation() }}
      >
        ${this.renderList()}
      </div>
    `
  }
}
