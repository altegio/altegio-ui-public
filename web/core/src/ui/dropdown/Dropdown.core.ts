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
  EYCoreDropdownTrigger,
  EYCoreDropdownPlacement,
  EYCoreDropdownStrategy,
  type IYCoreDropdownProps,
} from '~core/ui/dropdown/models/types'
import { YCoreDropdownTagName as tagName } from '~shared/constants'

import YCoreDropdownVarsCSS from '~core/ui/dropdown/css/Dropdown.vars.css?inline'
import YCoreDropdownScopedCSS from '~core/ui/dropdown/css/Dropdown.scoped.css?inline'
import YCoreTransitionCss from '~core/assets/css/transitions.css?inline'

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
export class YCoreDropdown extends LitElement implements IYCoreDropdownProps {
  @property({ type: String }) trigger: IYCoreDropdownProps['trigger'] = trigger
  @property({ type: Boolean, attribute: 'is-open', reflect: true }) isOpen: IYCoreDropdownProps['isOpen'] = isOpen
  @property({ type: Object }) offset: IYCoreDropdownProps['offset'] = offset
  @property({ type: Object }) padding: IYCoreDropdownProps['padding'] = padding
  @property({ type: String }) placement: IYCoreDropdownProps['placement'] = placement
  @property({ type: String }) strategy: IYCoreDropdownProps['strategy'] = strategy
  @property({ type: Array }) middlewares: IYCoreDropdownProps['middlewares'] = middlewares
  @property({ type: Array }) handlers: IYCoreDropdownProps['handlers'] = handlers
  @property({ type: String }) transition: IYCoreDropdownProps['transition'] = transition
  @property({ type: Boolean }) disabled: IYCoreDropdownProps['disabled'] = disabled
  @property({ type: Boolean }) inline: IYCoreDropdownProps['inline'] = inline
  @property({ type: Boolean, attribute: 'strict-width' }) strictWidth: IYCoreDropdownProps['strictWidth'] = strictWidth

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
      ${unsafeCSS(YCoreDropdownVarsCSS)}
      ${unsafeCSS(YCoreDropdownScopedCSS)}
      ${unsafeCSS(YCoreTransitionCss)}
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

  private isTriggerType(type: EYCoreDropdownTrigger): boolean {
    return this.trigger === type
  }

  private handleClickOutside = (event: Event) => {
    if (!this.isTriggerType(EYCoreDropdownTrigger.CLICK) && !this.isTriggerType(EYCoreDropdownTrigger.MANUAL)) return

    event.stopPropagation()

    if (isClickOutside(
      event as MouseEvent,
      this,
    )) {
      if (this.isTriggerType(EYCoreDropdownTrigger.CLICK)) {
        this.changeContentVisible(false)
      }

      this._clickOutside({ detail: { value: false } })
    }
  }

  private handleActivatorClick = () => {
    if (this.disabled || !this.isTriggerType(EYCoreDropdownTrigger.CLICK)) return
    this.changeContentVisible(!this.isContentVisible)
  }

  private handleMouseEnter = (event: Event) => {
    event.stopPropagation()

    if (this.disabled || !this.isTriggerType(EYCoreDropdownTrigger.HOVER)) return

    this.changeContentVisible(true)

    if (this.isAnimationInProgress) {
      this.animation?.abortLeave()
    }
  }

  private handleMouseLeave = (event: Event) => {
    event.stopPropagation()

    if (this.disabled || !this.isTriggerType(EYCoreDropdownTrigger.HOVER)) return

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
            placement: this.placement || EYCoreDropdownPlacement.BOTTOM_START,
            strategy: this.strategy || EYCoreDropdownStrategy.FIXED,
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
    if (this.trigger === EYCoreDropdownTrigger.MANUAL && this.isOpen) {
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
    // Сброс анимации
    this.animation?.abortEnter()
    this.animation?.abortLeave()

    // Сброс состояния
    this.isContentVisible = false
    this.animation = undefined
    this.minContentWidth = 0
    this.maxContentWidth = null
    this.resizeObserver = undefined

    // Сброс свойств
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
    defineCustomElement(tagName, YCoreDropdown)
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

