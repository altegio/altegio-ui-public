import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  createCoreStatusProps,
  EAltCoreStatusVariant,
  type IAltCoreStatusProps,
  type TAltCoreStatusVariant,
} from '~core/ui/status/models/types'
import { AltCoreStatusTagName as tagName } from '~shared/constants'
import { altCheckCircle, altClock, altWarningAlert, type IAltIcon } from '~shared/icons'
import { renderIcon } from '~core/renderers'
import { withLocator } from '~core/utils/locator'

import AltCoreStatusVarsCss from '~core/ui/status/css/Status.vars.css?inline'
import AltCoreStatusScopedCss from '~core/ui/status/css/Status.scoped.css?inline'

const { variant, text, size, icon } = createCoreStatusProps()

const VARIANT_ICONS: Record<TAltCoreStatusVariant, IAltIcon> = {
  [EAltCoreStatusVariant.WAITING]: altClock,
  [EAltCoreStatusVariant.SUCCESS]: altCheckCircle,
  [EAltCoreStatusVariant.ERROR]: altWarningAlert,
}

const ICON_SIZES: Record<NonNullable<IAltCoreStatusProps['size']>, string> = {
  medium: '20px',
  large: '24px',
}

/**
 * A card that tells the outcome of an action or the state of a process: waiting, done, or failed.
 *
 * The message is a live region: an error interrupts the screen reader (`role="alert"`), the other variants
 * wait for a pause (`role="status"`), so a status that appears or changes is announced.
 * Put a text in `text` and anything else (links, buttons, details) in the default slot.
 */
@customElement(tagName)
@withLocator(tagName)
export class AltCoreStatus
  extends LitElement
  implements IAltCoreStatusProps {
  @property({ type: String, reflect: true }) variant: IAltCoreStatusProps['variant'] = variant
  @property({ type: String }) text: IAltCoreStatusProps['text'] = text
  @property({ type: String, reflect: true }) size: IAltCoreStatusProps['size'] = size
  @property({ type: Object, attribute: false }) icon: IAltCoreStatusProps['icon'] = icon

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreStatusVarsCss)}
      ${unsafeCSS(AltCoreStatusScopedCss)}
    `,
  ]

  private get computedVariant(): TAltCoreStatusVariant {
    return this.variant ?? EAltCoreStatusVariant.WAITING
  }

  protected render() {
    const classes = {
      [this.baseClass]: true,
      [`${this.baseClass}_variant-${this.computedVariant}`]: true,
      [`${this.baseClass}_size-${this.size ?? size}`]: true,
    }

    return html`
      <div class=${classMap(classes)} role=${this.computedVariant === EAltCoreStatusVariant.ERROR ? 'alert' : 'status'}>
        <span class="${this.baseClass}__icon" aria-hidden="true">
          ${renderIcon({ icon: this.icon ?? VARIANT_ICONS[this.computedVariant], size: ICON_SIZES[this.size ?? 'large'] })}
        </span>

        <div class="${this.baseClass}__text">${this.text}</div>

        <slot></slot>
      </div>
    `
  }
}
