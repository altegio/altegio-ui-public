import { css, nothing, unsafeCSS } from 'lit'
import { html } from 'lit/static-html.js'
import { customElement, property, query, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { debounce } from 'radash'

import { hasSlotContent } from '~core/utils/lit-slots'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { LocalizedElement } from '~core/i18n/LocalizedElement'

import '~core/ui/loader'
import '~core/ui/iconButton'
import '~core/ui/modal'
import '~core/ui/text'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { BreakpointsController } from '~core/utils/breakpoints'

import { YCoreFunctionalModalTagName as tagName } from '~shared/constants'

import {
  createCoreFunctionalModalProps,
  type IYCoreFunctionalModalProps,
} from '~core/ui/functionalModal/models/types'
import {
  OpenEvent,
  CloseEvent,
  ClickCloseIconEvent,
  ClickOverlayEvent,
  ClickActivatorEvent,
  PressEscapeEvent,
  CancelEvent,
  SubmitEvent,
} from '~core/ui/functionalModal/models/types/events'

import YCoreFunctionalModalVarsCSS from '~core/ui/functionalModal/css/FunctionalModal.vars.css?inline'
import YCoreFunctionalModalScopedCSS from '~core/ui/functionalModal/css/FunctionalModal.scoped.css?inline'
import { withLocator } from '~core/utils/locator'

const { open, size, width, preventEscape, hideOverlay, hideFooter, fullScreen, heading, subHeading } = createCoreFunctionalModalProps()

const RESIZE_OBSERVER_DELAY_MS = 100

@customElement(tagName)
@withLocator(tagName)
export class YCoreFunctionalModal extends LocalizedElement implements IYCoreFunctionalModalProps {
  @property({ type: Boolean }) open: IYCoreFunctionalModalProps['open'] = open
  @property({ type: String }) size: IYCoreFunctionalModalProps['size'] = size
  @property({ type: String }) width: IYCoreFunctionalModalProps['width'] = width
  @property({ type: Boolean, attribute: 'prevent-escape' }) preventEscape: IYCoreFunctionalModalProps['preventEscape'] = preventEscape
  @property({ type: Boolean, attribute: 'hide-overlay' }) hideOverlay: IYCoreFunctionalModalProps['hideOverlay'] = hideOverlay
  @property({ type: Boolean, attribute: 'hide-footer' }) hideFooter: IYCoreFunctionalModalProps['hideFooter'] = hideFooter
  @property({ type: Boolean, attribute: 'full-screen' }) fullScreen: IYCoreFunctionalModalProps['fullScreen'] = fullScreen
  @property({ type: String }) heading: IYCoreFunctionalModalProps['heading'] = heading
  @property({ type: String, attribute: 'sub-heading' }) subHeading: IYCoreFunctionalModalProps['subHeading'] = subHeading

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

  @bubblingEvent(CancelEvent, { name: 'cancel' })
  protected _cancel!: TDispatcher<CancelEvent>

  @bubblingEvent(SubmitEvent, { name: 'submit' })
  protected _submit!: TDispatcher<SubmitEvent>

  @state() private resizeObserver?: ResizeObserver
  @state() private intersectionObserver?: IntersectionObserver
  @state() private hasContentOverflow = false
  @state() private hasScrollAtBottom = false
  @state() private hasHeaderSlot = false
  @state() private hasContentSlot = false

  @query(`.${tagName}__content`) private content?: HTMLElement
  @query(`.${tagName}__content-sentinel`) private contentSentinel?: HTMLElement

  private readonly breakpoints = new BreakpointsController(this)

  protected get baseClass() {
    return tagName
  }

  protected get baseHeaderClass() {
    return `${this.baseClass}__header`
  }

  protected get baseContentClass() {
    return `${this.baseClass}__content`
  }

  private get computedHeaderClasses() {
    return {
      [this.baseHeaderClass]: true,
      [`${this.baseHeaderClass}-hidden`]: !this.hasHeaderContent,
    }
  }

  private get computedContentClasses() {
    return {
      [this.baseContentClass]: true,
      [`${this.baseContentClass}-border`]: this.hasContentOverflow && !this.hasScrollAtBottom,
      [`${this.baseContentClass}-full-height`]: this.isFullScreen,
      [`${this.baseContentClass}-hidden`]: !this.hasContentSlot,
      [`${this.baseContentClass}-margin-top`]: this.hasHeaderContent,
      'y-scrollbar': true,
    }
  }

  private get hasHeaderContent() {
    return this.hasHeaderSlot || Boolean(this.heading)
  }

  private get isFullScreen() {
    return this.fullScreen || this.breakpoints.smallerOrEqual('XS')
  }

  connectedCallback() {
    super.connectedCallback()

    this.initResizeObserver()
    this.initIntersectionObserver()
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.destroyResizeObserver()
    this.destroyIntersectionObserver()
  }

  private handleResizeOverflow = debounce({ delay: RESIZE_OBSERVER_DELAY_MS }, () => {
    this.hasContentOverflow = !!this.content && this.content.scrollHeight > this.content.clientHeight
  })

  private initResizeObserver() {
    this.resizeObserver = new ResizeObserver(this.handleResizeOverflow)

    if (this.content) {
      this.resizeObserver.observe(this.content)
    }
  }

  private initIntersectionObserver() {
    if (!this.content || !this.contentSentinel) return

    this.intersectionObserver = new IntersectionObserver(
      ([entry]) => {
        this.hasScrollAtBottom = entry.isIntersecting
      },
      {
        root: this.content,
        threshold: 1.0,
      },
    )

    this.intersectionObserver.observe(this.contentSentinel)
  }

  private destroyResizeObserver() {
    if (!this.content) return

    this.resizeObserver?.unobserve(this.content)
  }

  private destroyIntersectionObserver() {
    if (!this.contentSentinel) return

    this.intersectionObserver?.unobserve(this.contentSentinel)
  }

  private handleSlotHeaderChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasHeaderSlot = hasSlotContent(target)
  }

  private handleSlotContentChange = (event: Event) => {
    preventAndStopEvent(event)

    const target = event.target as HTMLSlotElement

    this.hasContentSlot = hasSlotContent(target)
  }

  private handleCancelClick = () => {
    this.open = false
    this._cancel()
  }

  protected renderHeader() {
    return html`
      <header class=${classMap(this.computedHeaderClasses)}>
        <slot
          name="header"
          class="${this.baseHeaderClass}-wrapper"
          @slotchange=${this.handleSlotHeaderChange}
        >
          <y-core-text size="h2-semibold">
            ${this.heading ?? nothing}
          </y-core-text>

          ${
            this.subHeading
            ? html`
              <y-core-text size="p2-regular">
                ${this.subHeading}
              </y-core-text>`
            : nothing
          }
        </slot>
      </header>`
  }

  protected override render() {
    return html`
      <y-core-modal
        class=${this.baseClass}
        .open=${this.open}
        .size=${this.size}
        .width=${!this.isFullScreen ? this.width : undefined}
        .hideOverlay=${this.hideOverlay || this.isFullScreen}
        .preventEscape=${this.preventEscape}
        .fullScreen=${this.isFullScreen}
        variant="primary"
        @open=${this._open}
        @close=${this._close}
        @click-overlay=${this._clickOverlay}
        @click-close-icon=${this._clickCloseIcon}
        @click-activator=${this._clickActivator}
        @press-escape=${this._pressEscape}
      >
        <article
          class="${this.baseClass}__wrapper"
          slot="content"
        >
          <div class="${this.baseClass}__header-media-wrapper">
            <slot name="header-media"></slot>
          </div>

          <div class="${this.baseClass}__main">
            ${this.renderHeader()}

            <section class=${classMap(this.computedContentClasses)}>
              <div class="${this.baseClass}__content-wrapper">
                <slot
                  name="content"
                  @slotchange=${this.handleSlotContentChange}
                ></slot>
  
                <div class="${this.baseClass}__content-sentinel"></div>
              </div>
            </section>
          </div>

          ${!this.hideFooter
            ? html` <footer class="${this.baseClass}__footer">
                <slot name="footer">
                  <div class="${this.baseClass}__before-actions">
                    <slot name="before-actions"> </slot>
                  </div>

                  <div class="${this.baseClass}__actions">
                    <slot name="actions">
                      <y-core-button
                        label=${this.getLocale().messages.cancel}
                        variant="outline"
                        @click=${this.handleCancelClick}
                      ></y-core-button>

                      <y-core-button
                        label=${this.getLocale().messages.good}
                        @click=${this._submit}
                      ></y-core-button>
                    </slot>
                  </div>
                </slot>
              </footer>`
            : nothing}
        </article>

        <slot
          slot="activator"
          name="activator"
        >
        </slot>
      </y-core-modal>
    `
  }

  static readonly styles = [
    css`
      ${unsafeCSS(YCoreFunctionalModalVarsCSS)}
      ${unsafeCSS(YCoreFunctionalModalScopedCSS)}
    `,
  ]

  scrollToTop() {
    this.content?.scrollTo({ top: 0 })
  }
}
