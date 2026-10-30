import { LitElement, html, css, unsafeCSS } from 'lit'
import { customElement, property, state } from 'lit/decorators.js'
import { classMap } from 'lit/directives/class-map.js'
import { provide } from '@lit/context'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  createCoreFieldWrapperProps,
  type IAltCoreFieldWrapperProps,
  ClickOutsideEvent, BlurEvent, FocusEvent, MouseEnterEvent, MouseLeaveEvent,
} from '~core/ui/fieldWrapper/models/types'
import {
  AltCoreFieldWrapperTagName as tagName,
} from '~shared/constants'
import { EventListenersList } from '~shared/utils/eventListenersList'

import { disabledContextCreated, readonlyContextCreated, errorContextCreated, sizeContextCreated, hoveredContextCreated, focusedContextCreated } from './providers'

import AltCoreFieldWrapperVarsCSS from '~core/ui/fieldWrapper/css/FieldWrapper.vars.css?inline'
import AltCoreFieldWrapperScopedCSS from '~core/ui/fieldWrapper/css/FieldWrapper.scoped.css?inline'

import { booleanConverter } from '~core/utils/converters'
import { interceptEvents } from '~core/utils/event-interceptor'
import { isClickOutside } from '~core/utils/dom-events'
import { bubblingEvent, type TDispatcher } from '~core/utils/event-decorator'
import { preventAndStopEvent } from '~shared/utils/helpers'
import { withLocator } from '~core/utils/locator'

const { disabled, readonly, error, size, clickable } = createCoreFieldWrapperProps()

@customElement(tagName)
@interceptEvents()
@withLocator(tagName)
export class AltCoreFieldWrapper
  extends LitElement
  implements IAltCoreFieldWrapperProps {
  @provide({ context: disabledContextCreated })
  @property({ type: Boolean }) disabled: IAltCoreFieldWrapperProps['disabled'] = disabled
  @provide({ context: readonlyContextCreated })
  @property({ type: Boolean }) readonly: IAltCoreFieldWrapperProps['readonly'] = readonly
  @provide({ context: errorContextCreated })
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) error: IAltCoreFieldWrapperProps['error'] = error
  @provide({ context: sizeContextCreated })
  @property({ type: String, reflect: true }) size: IAltCoreFieldWrapperProps['size'] = size
  @property({ type: Boolean, reflect: true, converter: booleanConverter }) clickable: IAltCoreFieldWrapperProps['clickable'] = clickable

  @provide({ context: hoveredContextCreated })
  @state() private hovered = false
  @provide({ context: focusedContextCreated })
  @state() private focused = false

  @bubblingEvent(
    ClickOutsideEvent,
    { name: 'click-outside' },
  )
  private _clickOutside!: TDispatcher<ClickOutsideEvent>
  @bubblingEvent(
    FocusEvent,
    { name: 'focus' },
  )
  private _focus!: TDispatcher<FocusEvent>
  @bubblingEvent(
    BlurEvent,
    { name: 'blur' },
  )
  private _blur!: TDispatcher<BlurEvent>
  @bubblingEvent(
    MouseEnterEvent,
    { name: 'mouse-enter' },
  )
  private _mouseenter!: TDispatcher<MouseEnterEvent>
  @bubblingEvent(
    MouseLeaveEvent,
    { name: 'mouse-leave' },
  )
  private _mouseleave!: TDispatcher<MouseLeaveEvent>

  private readonly baseClass = tagName

  static readonly styles = [
    css`
      ${unsafeCSS(AltCoreFieldWrapperVarsCSS)}
      ${unsafeCSS(AltCoreFieldWrapperScopedCSS)}
    `,
  ]

  private readonly eventListenersList = new EventListenersList()

  private get computedClasses() {
    return {
      [this.baseClass]: true,
      [`${this.baseClass}_disabled`]: Boolean(this.disabled),
      [`${this.baseClass}_readonly`]: Boolean(this.readonly),
      [`${this.baseClass}_error`]: Boolean(this.error),
      [`${this.baseClass}_focused`]: Boolean(this.focused),
      [`${this.baseClass}_hovered`]: Boolean(this.hovered),
      [`${this.baseClass}_size_${this.size}`]: true,
      [`${this.baseClass}_clickable`]: Boolean(this.clickable),
    }
  }

  private handleFocus = (event: FocusEvent) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this.focused = true

    this._focus({ detail: { event } })
  }

  private handleBlur = (event: FocusEvent) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this.focused = false

    this._blur({ detail: { event } })
  }

  private handleMouseEnter = (event: MouseEvent) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this.hovered = true

    this._mouseenter({ detail: { event } })
  }

  private handleMouseLeave = (event: MouseEvent) => {
    preventAndStopEvent(event)

    if (this.disabled) return

    this.hovered = false

    this._mouseleave({ detail: { event } })
  }

  private handleClickOutside = (event: Event) => {
    if (this.disabled) return

    if (isClickOutside(
      event as MouseEvent,
      this,
    )) {
      this._clickOutside({ detail: { event } })
    }
  }

  connectedCallback() {
    super.connectedCallback()


    this.eventListenersList.add(
      'click',
      this.handleClickOutside,
    )
  }

  disconnectedCallback() {
    super.disconnectedCallback()

    this.eventListenersList.remove('click')
  }

  protected render() {
    return html`
      <div
        class=${classMap(this.computedClasses)}
        tabindex="0"
        data-disabled=${ifDefined(this.disabled)}
        data-readonly=${ifDefined(this.readonly)}
        data-error=${ifDefined(this.error)}
        data-size=${ifDefined(this.size)}
        data-clickable=${ifDefined(this.clickable)}
        data-focused=${ifDefined(this.focused)}
        data-hovered=${ifDefined(this.hovered)}
        @focus=${this.handleFocus}
        @blur=${this.handleBlur}
        @mouseenter=${this.handleMouseEnter}
        @mouseleave=${this.handleMouseLeave}
      >
        <slot></slot>
      </div>
    `
  }
}
