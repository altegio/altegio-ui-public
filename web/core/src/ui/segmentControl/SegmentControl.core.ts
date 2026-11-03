import type { PropertyValues } from 'lit'
import { css, html, LitElement, nothing, unsafeCSS } from 'lit'
import { customElement, property, queryAll, state } from 'lit/decorators.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { classMap } from 'lit/directives/class-map.js'
import { repeat } from 'lit/directives/repeat.js'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'

import { ClickEvent } from './models/types/events'

import {
  createCoreSegmentControlProps,
  type IAltCoreSegmentControlProps,
} from './models/types'
import { AltCoreSegmentControlTagName as tagName } from '~shared/constants'

import '~core/ui/segmentOption'
import type { AltCoreSegmentOption } from '~core/ui/segmentOption'

import AltCoreSegmentControlVarsCss from '~core/ui/segmentControl/css/SegmentControl.vars.css?inline'
import AltCoreSegmentControlScopedCss from '~core/ui/segmentControl/css/SegmentControl.scoped.css?inline'
import { withLocator } from '~core/utils/locator'
import { first } from 'radash'
import { getInlineKey } from '~core/utils/a11y/direction'

const { options, size, value, manual, accessibleName } = createCoreSegmentControlProps()

/** Keys that move to the next or previous enabled option and select it */
const STEP_KEYS: Partial<Record<string, number>> = {
  ArrowRight: 1,
  ArrowDown: 1,
  ArrowLeft: -1,
  ArrowUp: -1,
}

@customElement(tagName)
@withLocator(tagName)
export class AltCoreSegmentControl extends LitElement implements IAltCoreSegmentControlProps {
  @property({ type: Array }) options: IAltCoreSegmentControlProps['options'] = options
  @property({ type: String, reflect: true }) size: IAltCoreSegmentControlProps['size'] = size
  @property({ type: String, attribute: 'value', reflect: true }) value: IAltCoreSegmentControlProps['value'] = value
  @property({ type: Boolean, attribute: 'manual', reflect: true }) manual: IAltCoreSegmentControlProps['manual'] = manual
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreSegmentControlProps['accessibleName'] = accessibleName

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
      ${unsafeCSS(AltCoreSegmentControlVarsCss)}
      ${unsafeCSS(AltCoreSegmentControlScopedCss)}
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

    this.selectSegment(el.detail.value)
  }

  private selectSegment(value: string) {
    if (!this.manual) this._activeSegmentValue = value

    this._click({ detail: { value } })
  }

  private get enabledOptions() {
    return this.options?.filter((option) => !option.disabled) ?? []
  }

  /** Value of the option that Tab reaches: the active one, or the first enabled one */
  private get tabStopValue() {
    const enabledOptions = this.enabledOptions

    const tabStop = enabledOptions.find((option) => option.value === this._activeSegmentValue) ?? first(enabledOptions)

    return tabStop?.value
  }

  @queryAll(`.${tagName}__segment`)
  private segmentElements!: NodeListOf<AltCoreSegmentOption>

  private get segments() {
    return Array.from(this.segmentElements)
  }

  /** Index among the enabled options of the option that an event comes from, -1 when none */
  private getEnabledOptionIndex(event: Event) {
    const value = this.segments.find((segment) => event.composedPath().includes(segment))?.value

    return this.enabledOptions.findIndex((option) => option.value === value)
  }

  /** Arrow keys move focus to the next or previous enabled option and select it, wrapping around; Space selects the focused option */
  private handleKeydown = (event: KeyboardEvent) => {
    const step = event.key === ' ' ? 0 : STEP_KEYS[getInlineKey(event.key, this)]
    if (step === undefined) return

    const enabledOptions = this.enabledOptions
    const current = this.getEnabledOptionIndex(event)
    if (current === -1) return

    event.preventDefault()

    const next = enabledOptions[(current + step + enabledOptions.length) % enabledOptions.length]
    this.segments.find((segment) => segment.value === next.value)?.focus()

    if (next.value !== this._activeSegmentValue) this.selectSegment(next.value)
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
        <alt-core-segment-option
          role="radio"
          aria-checked=${option.value === this._activeSegmentValue ? 'true' : 'false'}
          aria-disabled=${option.disabled ? 'true' : 'false'}
          aria-label=${option.accessibleName || nothing}
          tabindex=${option.value === this.tabStopValue ? '0' : '-1'}
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
        </alt-core-segment-option>
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
        role="radiogroup"
        aria-label=${this.accessibleName || nothing}
        @click=${(event: Event) => { event.stopPropagation() }}
        @keydown=${this.handleKeydown}
      >
        ${this.renderList()}
      </div>
    `
  }
}
