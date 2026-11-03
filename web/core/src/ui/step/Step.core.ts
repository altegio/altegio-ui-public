import { LitElement, html, css, unsafeCSS, type PropertyValues } from 'lit'
import { customElement, property } from 'lit/decorators.js'

import {
  createCoreStepProps,
  type IAltCoreStepProps,
} from '~core/ui/step/models/types'
import { AltCoreStepTagName as tagName } from '~shared/constants'
import { booleanConverter } from '~core/utils/converters'
import { withLocator } from '~core/utils/locator'

import AltCoreStepVarsCss from '~core/ui/step/css/Step.vars.css?inline'
import AltCoreStepScopedCss from '~core/ui/step/css/Step.scoped.css?inline'

const { name, title, caption, done, error, disabled, active } = createCoreStepProps()

/** Properties that the stepper shows in its header */
const HEADER_PROPERTIES = ['name', 'title', 'caption', 'done', 'error', 'disabled'] as const

/**
 * One step of `alt-core-stepper`. The stepper shows its title, caption and state in the header,
 * and its content while it is the current step.
 *
 * The host is a `group` named by the title.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreStep
  extends LitElement
  implements IAltCoreStepProps {
  @property() name: IAltCoreStepProps['name'] = name
  @property({ type: String }) title: IAltCoreStepProps['title'] = title
  @property({ type: String }) caption: IAltCoreStepProps['caption'] = caption
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) done: IAltCoreStepProps['done'] = done
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IAltCoreStepProps['error'] = error
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) disabled: IAltCoreStepProps['disabled'] = disabled
  @property({ type: Boolean, reflect: true }) active: IAltCoreStepProps['active'] = active

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreStepVarsCss)}
      ${unsafeCSS(AltCoreStepScopedCss)}
    `,
  ]

  connectedCallback() {
    super.connectedCallback()

    if (!this.hasAttribute('role')) this.setAttribute('role', 'group')
  }

  protected updated(changedProperties: PropertyValues<this>) {
    if (this.title) this.setAttribute('aria-label', this.title)
    else this.removeAttribute('aria-label')

    // The stepper redraws its header when a step changes what the header shows
    if (HEADER_PROPERTIES.some((key) => changedProperties.has(key))) {
      this.dispatchEvent(new Event('step-change', { bubbles: true }))
    }
  }

  protected render() {
    return html`
      <div class=${this.baseClass}>
        <slot></slot>
      </div>
    `
  }
}
