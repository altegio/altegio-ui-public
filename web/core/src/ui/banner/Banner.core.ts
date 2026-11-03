import { LitElement, html, css, nothing, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import {
  CloseEvent,
  createCoreBannerProps,
  EAltCoreBannerVariant,
  type IAltCoreBannerProps,
  type TAltCoreBannerVariant,
} from '~core/ui/banner/models/types'
import { AltCoreBannerTagName as tagName } from '~shared/constants'
import {
  altCheckCircle,
  altClose,
  altInfo,
  altMagic,
  altWarning,
  altWarningAlert,
  type IAltIcon,
} from '~shared/icons'
import { renderIcon } from '~core/renderers'
import { booleanConverter } from '~core/utils/converters'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { hasSlotContent } from '~core/utils/lit-slots'
import { withLocator } from '~core/utils/locator'

import AltCoreBannerVarsCss from '~core/ui/banner/css/Banner.vars.css?inline'
import AltCoreBannerScopedCss from '~core/ui/banner/css/Banner.scoped.css?inline'

const {
  variant,
  layout,
  title,
  description,
  icon,
  hideIcon,
  closable,
  closeLabel,
} = createCoreBannerProps()

const VARIANT_ICONS: Record<TAltCoreBannerVariant, IAltIcon> = {
  [EAltCoreBannerVariant.INFORMATION]: altInfo,
  [EAltCoreBannerVariant.SUCCESS]: altCheckCircle,
  [EAltCoreBannerVariant.WARNING]: altWarning,
  [EAltCoreBannerVariant.DANGER]: altWarningAlert,
  [EAltCoreBannerVariant.DISCOVERY]: altMagic,
  [EAltCoreBannerVariant.ACCENT]: altInfo,
  [EAltCoreBannerVariant.MUTED]: altInfo,
  [EAltCoreBannerVariant.INVERT]: altInfo,
}

// Warnings and errors interrupt the screen reader (role="alert"); other variants wait for a pause (role="status")
const ALERT_VARIANTS: readonly TAltCoreBannerVariant[] = [
  EAltCoreBannerVariant.WARNING,
  EAltCoreBannerVariant.DANGER,
]

const ICON_SIZE = '16px'

@customElement(tagName)
@withLocator(tagName)
export class AltCoreBanner
  extends LitElement
  implements IAltCoreBannerProps {
  @property({ type: String, reflect: true }) variant: IAltCoreBannerProps['variant'] = variant
  @property({ type: String, reflect: true }) layout: IAltCoreBannerProps['layout'] = layout
  @property({ type: String }) title: IAltCoreBannerProps['title'] = title
  @property({ type: String }) description: IAltCoreBannerProps['description'] = description
  @property({ type: Object, attribute: false }) icon: IAltCoreBannerProps['icon'] = icon
  @property({ type: Boolean, attribute: 'hide-icon', converter: booleanConverter }) hideIcon: IAltCoreBannerProps['hideIcon'] = hideIcon
  @property({ type: Boolean, converter: booleanConverter }) closable: IAltCoreBannerProps['closable'] = closable
  @property({ type: String, attribute: 'close-label' }) closeLabel: IAltCoreBannerProps['closeLabel'] = closeLabel

  @state() private hasDefaultSlot = false
  @state() private hasActionsSlot = false

  @bubblingEvent(CloseEvent, { name: 'close' })
  protected _close!: TDispatcher<CloseEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreBannerVarsCss)}
      ${unsafeCSS(AltCoreBannerScopedCss)}
    `,
  ]

  private get computedVariant(): TAltCoreBannerVariant {
    return this.variant ?? EAltCoreBannerVariant.INFORMATION
  }

  private get computedRole() {
    return ALERT_VARIANTS.includes(this.computedVariant) ? 'alert' : 'status'
  }

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_variant-${this.computedVariant}`]: true,
      [`${this.baseClass}_layout-${this.layout}`]: Boolean(this.layout),
      [`${this.baseClass}_closable`]: Boolean(this.closable),
      [`${this.baseClass}_with-icon`]: !this.hideIcon,
    }
  }

  private get computedActionsClasses() {
    return {
      [`${this.baseClass}__actions`]: true,
      [`${this.baseClass}__actions_hidden`]: !this.hasActionsSlot,
    }
  }

  private handleDefaultSlotChange = (event: Event) => {
    const slot = event.target as HTMLSlotElement

    this.hasDefaultSlot = slot.assignedNodes({ flatten: true }).some((node) => {
      return node.nodeType === Node.ELEMENT_NODE || Boolean(node.textContent?.trim())
    })
  }

  private handleActionsSlotChange = (event: Event) => {
    this.hasActionsSlot = hasSlotContent(event.target as HTMLSlotElement)
  }

  private handleCloseClick = () => {
    this._close()
  }

  private renderIcon() {
    if (this.hideIcon) return nothing

    return html`
      <span class="${this.baseClass}__icon" aria-hidden="true">
        ${renderIcon({ icon: this.icon ?? VARIANT_ICONS[this.computedVariant], size: ICON_SIZE })}
      </span>
    `
  }

  private renderTitle() {
    if (!this.title) return nothing

    return html`<div class="${this.baseClass}__title">${this.title}</div>`
  }

  private renderDescription() {
    const isDescriptionHidden = !this.description || this.hasDefaultSlot

    return html`
      <div class="${this.baseClass}__description">
        <slot @slotchange=${this.handleDefaultSlotChange}></slot>
        ${isDescriptionHidden ? nothing : this.description}
      </div>
    `
  }

  private renderCloseButton() {
    if (!this.closable) return nothing

    return html`
      <button
        type="button"
        class="${this.baseClass}__close"
        aria-label=${this.closeLabel || closeLabel || ''}
        @click=${this.handleCloseClick}
      >
        <span aria-hidden="true">
          ${renderIcon({ icon: altClose, size: ICON_SIZE })}
        </span>
      </button>
    `
  }

  protected render() {
    return html`
      <div class=${classMap(this.computedClasses)}>
        <div class="${this.baseClass}__body">
          <div class="${this.baseClass}__message" role=${this.computedRole}>
            ${this.renderIcon()}

            <div class="${this.baseClass}__content">
              ${this.renderTitle()}
              ${this.renderDescription()}
            </div>
          </div>

          <div class=${classMap(this.computedActionsClasses)}>
            <slot name="actions" @slotchange=${this.handleActionsSlotChange}></slot>
          </div>
        </div>

        ${this.renderCloseButton()}
      </div>
    `
  }
}
