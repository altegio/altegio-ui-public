import { LitElement, css, nothing, unsafeCSS, type PropertyValues } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'

import '~core/ui/loader'
import '~core/ui/iconButton'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import YCoreTransitionCss from '~core/assets/css/transitions.css?inline'

import { YCoreModalTagName as tagName } from '~shared/constants'
import { yBigClose } from '~shared/icons'
import { createTransition, type IElementTransition } from '~shared/utils/transition'

import { createCoreModalProps, type IYCoreModalProps } from './models/types'
import { OVERLAY_TRANSITION_CLASSES } from './models/constants/transitions'
import {
  OpenEvent,
  CloseEvent,
  ClickCloseIconEvent,
  ClickOverlayEvent,
  ClickActivatorEvent,
  PressEscapeEvent,
} from './models/types/events'

import ModalVarsCSS from './css/Modal.vars.css?inline'
import ModalScopedCSS from './css/Modal.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { open, size, variant, width, preventEscape, hideOverlay, fullScreen } = createCoreModalProps()

@customElement(tagName)
@withLocator(tagName)
export class YCoreModal extends LitElement implements IYCoreModalProps {
  @property({ type: Boolean }) open: IYCoreModalProps['open'] = open
  @property({ type: String }) size: IYCoreModalProps['size'] = size
  @property({ type: String }) variant: IYCoreModalProps['variant'] = variant
  @property({ type: String }) width: IYCoreModalProps['width'] = width
  @property({ type: Boolean, attribute: 'prevent-escape' }) preventEscape: IYCoreModalProps['preventEscape'] = preventEscape
  @property({ type: Boolean, attribute: 'hide-overlay' }) hideOverlay: IYCoreModalProps['hideOverlay'] = hideOverlay
  @property({ type: Boolean, attribute: 'full-screen' }) fullScreen: IYCoreModalProps['fullScreen'] = fullScreen

  @bubblingEvent(OpenEvent, { name: 'open' })
  protected _open!: TDispatcher<OpenEvent>

  @bubblingEvent(CloseEvent, { name: 'close' })
  protected _close!: TDispatcher<CloseEvent>

  @bubblingEvent(ClickCloseIconEvent, { name: 'click-close-icon' })
  protected _clickCloseIcon!: TDispatcher<ClickCloseIconEvent>

  @bubblingEvent(ClickOverlayEvent, { name: 'click-overlay' })
  protected _clickOverlay!: TDispatcher<ClickOverlayEvent>

  @bubblingEvent(ClickActivatorEvent, { name: 'click-activator' })
  protected _clickActivator!: TDispatcher<ClickActivatorEvent>

  @bubblingEvent(PressEscapeEvent, { name: 'press-escape' })
  protected _pressEscape!: TDispatcher<PressEscapeEvent>

  @query(`.${tagName}__overlay`) private overlay?: HTMLElement

  @state() private isOpen = false
  @state() private transition?: IElementTransition

  protected get baseClass() {
    return tagName
  }

  protected get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_size_${this.size}`]: Boolean(!this.fullScreen),
      [`${this.baseClass}_full-screen`]: Boolean(this.fullScreen),
      [`${this.baseClass}_variant_${this.variant}`]: true,
    }
  }

  protected get computedStyles() {
    return this.width ? `max-width: ${this.width};` : ''
  }

  connectedCallback() {
    super.connectedCallback()


    window.addEventListener('keydown', this.handleKeydown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()
    window.removeEventListener('keydown', this.handleKeydown)
  }

  private animateOnEnter = () => {
    if (!this.overlay) {
      this.transition = undefined
      return
    }

    const transition = createTransition(this.overlay, OVERLAY_TRANSITION_CLASSES)

    transition.enter().then(() => {
      this.transition = transition
    })
  }

  private animateOnLeave = () => {
    if (!this.overlay) {
      this.transition = undefined
      return
    }

    this.transition = createTransition(this.overlay, OVERLAY_TRANSITION_CLASSES)
    this.transition.leave().finally(() => {
      this.transition = undefined
    })
  }

  private openModal() {
    this.isOpen = true
    this._open()

    requestAnimationFrame(this.animateOnEnter)
  }

  private closeModal() {
    this.isOpen = false
    this._close()

    requestAnimationFrame(this.animateOnLeave)
  }

  private handleCloseIconClick = (event: Event) => {
    event.stopPropagation()

    this._clickCloseIcon()
    this.closeModal()
  }

  private handleOverlayClick = (event: Event) => {
    event.stopPropagation()
    if (!this.isOpen) return

    this._clickOverlay()
    this.closeModal()
  }

  private handleActivatorClick = (event: Event) => {
    event.stopPropagation()
    if (this.isOpen) return

    this._clickActivator()
    this.openModal()
  }

  private handleKeydown = (event: KeyboardEvent) => {
    event.stopPropagation()
    if (!this.isOpen) return

    if (!this.preventEscape && event.code === 'Escape') {
      this._pressEscape()
      this.closeModal()
    }
  }

  protected updated(changedProperties: PropertyValues) {
    if (changedProperties.has('open') && this.open !== this.isOpen) {
      if (this.open) {
        this.openModal()
      } else {
        this.closeModal()
      }
    }
  }

  protected renderOverlay() {
    return html`<div
      class="${this.baseClass}__overlay"
      @click=${this.handleOverlayClick}
    ></div>`
  }

  protected renderModal() {
    return html`
      <div
        class=${classMap(this.computedClasses)}
        style=${this.computedStyles}
        role="dialog"
        aria-modal="true"
        aria-labelledby="modal-title"
      >
        <slot name="content"></slot>

        <div class="${this.baseClass}__close">
          <slot name="close">
            <y-core-icon-button
              .icon=${yBigClose}
              variant="text"
              @click=${this.handleCloseIconClick}
            >
            </y-core-icon-button>
          </slot>
        </div>
      </div>
    `
  }

  protected render() {
    return html`
      <slot
        name="activator"
        @click=${this.handleActivatorClick}
      ></slot>

      ${(this.isOpen || !!this.transition) && !this.hideOverlay ? this.renderOverlay() : nothing}
      ${this.isOpen ? this.renderModal() : nothing}
    `
  }

  static readonly styles = [
    css`
      ${unsafeCSS(ModalVarsCSS)}
      ${unsafeCSS(ModalScopedCSS)}
      ${unsafeCSS(YCoreTransitionCss)}
    `,
  ]
}
