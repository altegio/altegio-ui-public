import { LitElement, html, css, nothing, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { ifDefined } from 'lit/directives/if-defined.js'
import { repeat } from 'lit/directives/repeat.js'

import {
  createCoreStepperProps,
  EAltCoreStepperOrientation,
  StepperChangeEvent,
  type IAltCoreStepperProps,
} from '~core/ui/stepper/models/types'
import type { AltCoreStep } from '~core/ui/step'
import { AltCoreStepperTagName as tagName, AltCoreStepTagName } from '~shared/constants'
import { altCheck, altWarningAlert } from '~shared/icons'
import { renderIcon } from '~core/renderers'
import { booleanConverter } from '~core/utils/converters'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { withLocator } from '~core/utils/locator'
import { getElementMessage } from '~core/i18n'

import AltCoreStepperVarsCss from '~core/ui/stepper/css/Stepper.vars.css?inline'
import AltCoreStepperScopedCss from '~core/ui/stepper/css/Stepper.scoped.css?inline'

const { value, orientation, headerNav, accessibleName } = createCoreStepperProps()

const isSameStep = (step: AltCoreStep, name: IAltCoreStepperProps['value']) => name !== undefined && step.name !== undefined && String(step.name) === String(name)

/**
 * A wizard: the header lists the `alt-core-step` children in order and the current step's content shows below
 * (or beside it, `orientation="vertical"`).
 *
 * The header is an ordered list named "Steps" (`accessibleName`). The current step has `aria-current="step"`,
 * and done and failed steps say so to screen readers. With `headerNav`, the headers of steps that are not
 * disabled are buttons that open the step. `next()` and `previous()` move to the neighbouring enabled step.
 * `change` fires with `{ value }` whenever the user or these methods change the step.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreStepper
  extends LitElement
  implements IAltCoreStepperProps {
  @property() value: IAltCoreStepperProps['value'] = value
  @property({ type: String, reflect: true }) orientation: IAltCoreStepperProps['orientation'] = orientation
  @property({ type: Boolean, attribute: 'header-nav', converter: booleanConverter }) headerNav: IAltCoreStepperProps['headerNav'] = headerNav
  @property({ type: String, attribute: 'accessible-name' }) accessibleName: IAltCoreStepperProps['accessibleName'] = accessibleName

  @state() private steps: AltCoreStep[] = []

  @bubblingEvent(StepperChangeEvent, { name: 'change' })
  protected _change!: TDispatcher<StepperChangeEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreStepperVarsCss)}
      ${unsafeCSS(AltCoreStepperScopedCss)}
    `,
  ]

  /** The step named by `value`, or else the first step */
  private get activeStep(): AltCoreStep | undefined {
    return this.steps.find((step) => isSameStep(step, this.value)) ?? this.steps.at(0)
  }

  /** Opens the next step that is not disabled */
  next() {
    this.moveBy(1)
  }

  /** Opens the previous step that is not disabled */
  previous() {
    this.moveBy(-1)
  }

  private moveBy(step: 1 | -1) {
    const { activeStep } = this
    const start = activeStep ? this.steps.indexOf(activeStep) : -1
    const target = (step > 0 ? this.steps.slice(start + 1) : this.steps.slice(0, Math.max(start, 0)).reverse())
      .find((candidate) => !candidate.disabled)

    if (target) this.select(target)
  }

  private select(step: AltCoreStep) {
    if (step.name === undefined || step.disabled || step === this.activeStep) return

    this.value = step.name
    this._change({ detail: { value: step.name } })
  }

  private collectSteps = () => {
    this.steps = Array.from(this.querySelectorAll<AltCoreStep>(AltCoreStepTagName))
      .filter((step) => step.closest(tagName) === this)
  }

  private handleStepChange = (event: Event) => {
    if ((event.target as Element).closest(tagName) !== this) return

    this.requestUpdate()
  }

  connectedCallback() {
    super.connectedCallback()

    this.addEventListener('step-change', this.handleStepChange)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.removeEventListener('step-change', this.handleStepChange)
  }

  protected updated() {
    const { activeStep } = this

    for (const step of this.steps) step.active = step === activeStep
  }

  private getStateText(step: AltCoreStep) {
    if (step.error) return getElementMessage('stepError', this)
    if (step.done) return getElementMessage('stepDone', this)
    if (step.disabled) return getElementMessage('stepDisabled', this)

    return ''
  }

  private renderIndicator(step: AltCoreStep, index: number) {
    let content: unknown = index + 1
    if (step.error) content = renderIcon({ icon: altWarningAlert, size: '16px' })
    else if (step.done) content = renderIcon({ icon: altCheck, size: '16px' })

    return html`<span class="${this.baseClass}__indicator" aria-hidden="true">${content}</span>`
  }

  private renderHeaderContent(step: AltCoreStep, index: number) {
    const stateText = this.getStateText(step)

    return html`
      ${this.renderIndicator(step, index)}
      <span class="${this.baseClass}__text">
        <span class="${this.baseClass}__title">${step.title}</span>
        ${step.caption ? html`<span class="${this.baseClass}__caption">${step.caption}</span>` : nothing}
        ${stateText ? html`<span class="${this.baseClass}__state">${stateText}</span>` : nothing}
      </span>
    `
  }

  private renderHeaderItem(step: AltCoreStep, index: number) {
    const isActive = step === this.activeStep
    const classes = {
      [`${this.baseClass}__item`]: true,
      [`${this.baseClass}__item_active`]: isActive,
      [`${this.baseClass}__item_done`]: Boolean(step.done) && !step.error,
      [`${this.baseClass}__item_error`]: Boolean(step.error),
      [`${this.baseClass}__item_disabled`]: Boolean(step.disabled),
    }
    const isNavigable = this.headerNav && !step.disabled

    return html`
      <li class=${classMap(classes)} aria-current=${ifDefined(isActive ? 'step' : undefined)}>
        ${isNavigable
          ? html`<button type="button" class="${this.baseClass}__header-button" @click=${() => { this.select(step) }}>${this.renderHeaderContent(step, index)}</button>`
          : html`<span class="${this.baseClass}__header-button">${this.renderHeaderContent(step, index)}</span>`}
      </li>
    `
  }

  protected render() {
    const classes = {
      [this.baseClass]: true,
      [`${this.baseClass}_vertical`]: this.orientation === EAltCoreStepperOrientation.VERTICAL,
    }

    return html`
      <div class=${classMap(classes)}>
        <ol class="${this.baseClass}__header" aria-label=${this.accessibleName || getElementMessage('steps', this)}>
          ${repeat(this.steps, (step) => step, (step, index) => this.renderHeaderItem(step, index))}
        </ol>

        <div class="${this.baseClass}__content">
          <slot @slotchange=${this.collectSteps}></slot>
        </div>
      </div>
    `
  }
}
