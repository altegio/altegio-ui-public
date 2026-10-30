import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state, query } from 'lit/decorators.js'
import {
  computePosition,
  offset as offsetMiddleware,
  shift as shiftMiddleware,
  flip as flipMiddleware,
  autoUpdate,
} from '@floating-ui/dom'
import { nothing } from 'lit'
import { debounce } from 'radash'

import {
  createCoreDropdownProps,
  EAltCoreDropdownTrigger,
  EAltCoreDropdownPlacement,
  EAltCoreDropdownStrategy,
  type IAltCoreDropdownProps,
} from '~core/ui/dropdown/models/types'
import { AltCoreDropdownTagName as tagName } from '~shared/constants'

import AltCoreDropdownVarsCSS from '~core/ui/dropdown/css/Dropdown.vars.css?inline'
import AltCoreDropdownScopedCSS from '~core/ui/dropdown/css/Dropdown.scoped.css?inline'
import AltCoreTransitionCss from '~core/assets/css/transitions.css?inline'

import { isClickOutside } from '~core/utils/dom-events'
import {
  createTransition,
  type IElementTransition,
} from '~shared/utils/transition'
import { EventListenersList } from '~shared/utils/eventListenersList'
import type { ComputePositionReturn } from '@floating-ui/dom'

import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { VisibleEvent, ClickOutsideEvent } from '~core/ui/dropdown/models/types/events'
import { classMap } from 'lit/directives/class-map.js'
import { defineCustomElement } from '~web/shared/utils/components'
import { withLocator } from '~core/utils/locator'

const { trigger, isOpen, placement, strategy, padding, offset, middlewares, handlers, transition, disabled, inline, strictWidth } = createCoreDropdownProps()

@customElement(tagName)
@withLocator(tagName)
export class AltCoreDropdown extends LitElement implements IAltCoreDropdownProps {
  @property({ type: String }) trigger: IAltCoreDropdownProps['trigger'] = trigger
  @property({ type: Boolean, attribute: 'is-open', reflect: true }) isOpen: IAltCoreDropdownProps['isOpen'] = isOpen
  @property({ type: Object }) offset: IAltCoreDropdownProps['offset'] = offset
  @property({ type: Object }) padding: IAltCoreDropdownProps['padding'] = padding
  @property({ type: String }) placement: IAltCoreDropdownProps['placement'] = placement
  @property({ type: String }) strategy: IAltCoreDropdownProps['strategy'] = strategy
  @property({ type: Array }) middlewares: IAltCoreDropdownProps['middlewares'] = middlewares
  @property({ type: Array }) handlers: IAltCoreDropdownProps['handlers'] = handlers
  @property({ type: String }) transition: IAltCoreDropdownProps['transition'] = transition
  @property({ type: Boolean }) disabled: IAltCoreDropdownProps['disabled'] = disabled
  @property({ type: Boolean }) inline: IAltCoreDropdownProps['inline'] = inline
  @property({ type: Boolean, attribute: 'strict-width' }) strictWidth: IAltCoreDropdownProps['strictWidth'] = strictWidth

  @state() private isContentVisible = false
  @state() private animation?: IElementTransition
  @state() private minContentWidth = 0
  @state() private maxContentWidth: number | null = null
  @state() private resizeObserver?: ResizeObserver

  @bubblingEvent(
    VisibleEvent,
    { name: 'change-visible' },
  )
  private _visible!: TDispatcher<VisibleEvent>

  @bubblingEvent(
    ClickOutsideEvent,
    { name: 'click-outside' },
  )
  private _clickOutside!: TDispatcher<ClickOutsideEvent>

  private readonly baseClass = tagName
  private readonly eventListenersList = new EventListenersList()

  @query(`.${tagName}__activator`) private activator?: HTMLElement
  @query(`.${tagName}__content`) private content?: HTMLElement

  private cleanup?: () => void

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreDropdownVarsCSS)}
      ${unsafeCSS(AltCoreDropdownScopedCSS)}
      ${unsafeCSS(AltCoreTransitionCss)}
    `,
  ]

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
    }
  }

  private get computedActivatorClasses() {
    return {
      [`${this.baseClass}__activator`]: true,
      [`${this.baseClass}__activator_inline`]: Boolean(this.inline),
    }
  }

  private get isAnimationInProgress(): boolean {
    return this.content?.classList.contains(`${this.transition}-active`) ?? false
  }

  private changeContentVisible = (visible: boolean) => {
    if (this.isContentVisible === visible) return

    if (this.animation && !visible) {
      this.animation.leave().then(() => {
        this.isContentVisible = visible
        this.handleVisibilityChange(visible)
        this.animation = undefined
      })

      return
    }

    this.isContentVisible = visible
    this.handleVisibilityChange(visible)
  }

  private isTriggerType(type: EAltCoreDropdownTrigger): boolean {
    return this.trigger === type
  }

  private handleClickOutside = (event: Event) => {
    if (!this.isTriggerType(EAltCoreDropdownTrigger.CLICK) && !this.isTriggerType(EAltCoreDropdownTrigger.MANUAL)) return

    event.stopPropagation()

    if (isClickOutside(
      event as MouseEvent,
      this,
    )) {
      if (this.isTriggerType(EAltCoreDropdownTrigger.CLICK)) {
        this.changeContentVisible(false)
      }

      this._clickOutside({ detail: { value: false } })
    }
  }

  private handleActivatorClick = () => {
    if (this.disabled || !this.isTriggerType(EAltCoreDropdownTrigger.CLICK)) return
    this.changeContentVisible(!this.isContentVisible)
  }

  private handleMouseEnter = (event: Event) => {
    event.stopPropagation()

    if (this.disabled || !this.isTriggerType(EAltCoreDropdownTrigger.HOVER)) return

    this.changeContentVisible(true)

    if (this.isAnimationInProgress) {
      this.animation?.abortLeave()
    }
  }

  private handleMouseLeave = (event: Event) => {
    event.stopPropagation()

    if (this.disabled || !this.isTriggerType(EAltCoreDropdownTrigger.HOVER)) return

    if (this.isContentVisible && this.isAnimationInProgress) {
      this.animation?.abortEnter()
    }

    this.changeContentVisible(false)
  }

  private handlePositionCallback = (data: ComputePositionReturn): Promise<ComputePositionReturn> => {
    if (!this.handlers || this.handlers.length === 0) return Promise.resolve(data)

    return this.handlers.reduce(
      (promise, handler) => promise.then((data) => handler(data)),
      Promise.resolve(data),
    )
  }

  private setAnimationAndEnter = () => {
    if (!this.transition || !this.content) return

    const animation = createTransition(
      this.content,
      {
        enter: `${this.transition}-enter`,
        enterActive: `${this.transition}-active`,
        enterTo: `${this.transition}-enter-to`,
        leave: `${this.transition}-leave`,
        leaveActive: `${this.transition}-active`,
        leaveTo: `${this.transition}-leave-to`,
        noTransition: 'no-animation',
      },
    )

    animation.enter().then(() => {
      this.animation = animation
    })
  }

  private updatePosition = () => {
    const { content, activator, isContentVisible } = this

    if (!content || !activator || !isContentVisible) return

    const middleware = [
      offsetMiddleware(this.offset),
      flipMiddleware({ fallbackAxisSideDirection: 'start' }),
      shiftMiddleware({ padding: this.padding }),
      ...this.middlewares ?? [],
    ]

    this.cleanup = autoUpdate(
      activator,
      content,
      () => {
        computePosition(
          activator,
          content,
          {
            placement: this.placement || EAltCoreDropdownPlacement.BOTTOM_START,
            strategy: this.strategy || EAltCoreDropdownStrategy.FIXED,
            middleware,
          },
        ).then((data) => {
          Object.assign(
            content.style,
            {
              left: `${data.x}px`,
              top: `${data.y}px`,
              minWidth: this.minContentWidth ? `${this.minContentWidth}px` : 'unset',
              maxWidth: this.maxContentWidth ? `${this.maxContentWidth}px` : 'unset',
            },
          )

          return Promise.resolve(data)
        })
          .then(this.handlePositionCallback)
      },
    )
  }

  private setMinMaxContentWidth = () => {
    if (!this.activator || !this.content) return

    const newWidth = this.activator.getBoundingClientRect().width

    if (this.minContentWidth !== newWidth) {
      this.minContentWidth = newWidth
    }

    if (this.maxContentWidth !== newWidth && this.strictWidth) {
      this.maxContentWidth = newWidth
    }
  }

  private handleResize = debounce({ delay: 100 }, this.setMinMaxContentWidth)

  private handleVisibilityChange(visible: boolean) {
    this._visible({ detail: { value: visible } })

    if (visible) {
      requestAnimationFrame(() => {
        this.setMinMaxContentWidth()
        this.updatePosition()

        if (!this.animation) this.setAnimationAndEnter()
      })
    } else {
      this.cleanup?.()
    }
  }

  private handleTriggerChange(): void {
    if (this.trigger === EAltCoreDropdownTrigger.MANUAL && this.isOpen) {
      this.changeContentVisible(true)
      return
    }
    this.changeContentVisible(false)
  }

  private handleManualControl(): void {
    if (this.disabled) return

    this.changeContentVisible(this.isOpen ?? false)
  }

  private resetComponent(): void {
    // Cancel running animations
    this.animation?.abortEnter()
    this.animation?.abortLeave()

    // Reset the internal state
    this.isContentVisible = false
    this.animation = undefined
    this.minContentWidth = 0
    this.maxContentWidth = null
    this.resizeObserver = undefined

    // Restore the default property values
    this.isOpen = isOpen
  }

  updated(changedProperties: Map<string, unknown>): void {
    if (changedProperties.has('trigger')) {
      this.handleTriggerChange()
    }
    if (changedProperties.has('isOpen')) {
      this.handleManualControl()
    }
  }

  connectedCallback() {
    super.connectedCallback()

    this.resizeObserver = new ResizeObserver(this.handleResize)

    if (this.activator) {
      this.resizeObserver.observe(this.activator)
    }


    this.eventListenersList.add(
      'click',
      this.handleClickOutside,
    )
  }

  protected firstUpdated(): void {
    defineCustomElement(tagName, AltCoreDropdown)
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.eventListenersList.remove('click')

    if (this.resizeObserver && this.activator) {
      this.resizeObserver.unobserve(this.activator)
      this.resizeObserver.disconnect()
      this.resizeObserver = undefined
      this.handleResize.cancel()
    }

    this.cleanup?.()
    this.resetComponent()
  }

  private get renderActivator() {
    return html`
      <div 
        class=${classMap(this.computedActivatorClasses)}
        @click=${this.handleActivatorClick}
      >
        <slot name="activator"></slot>
      </div>
    `
  }


  private get renderContent() {
    if (!this.isContentVisible) return nothing

    return html`
      <div 
        class="${this.baseClass}__content"
      >
        <slot name="content"></slot>
      </div>
    `
  }

  public close(): void {
    this.changeContentVisible(false)
  }

  public open(): void {
    this.changeContentVisible(true)
  }

  protected render() {
    return html`
      <div 
        class=${classMap(this.computedClasses)}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        ${this.renderActivator}
        ${this.renderContent}
      </div>
    `
  }
}

