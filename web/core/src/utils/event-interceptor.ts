import type { ReactiveController, ReactiveControllerHost } from 'lit'

/**
 * Host that can use EventInterceptorController.
 * Extends lit's ReactiveControllerHost with the disabled, loading and readonly properties
 * and the methods that manage event listeners.
 */
interface IEventInterceptorHost extends ReactiveControllerHost {
  disabled?: boolean
  loading?: boolean
  readonly?: boolean
  addEventListener: (type: string, listener: EventListener, options?: boolean | AddEventListenerOptions) => void
  removeEventListener: (type: string, listener: EventListener, options?: boolean | EventListenerOptions) => void
}

/**
 * Element with an attached event interceptor controller.
 * Extends IEventInterceptorHost with a property that holds the controller instance
 * and an optional connectedCallback method.
 */
type TEventInterceptorElement = IEventInterceptorHost & {
  _eventInterceptor?: EventInterceptorController
  connectedCallback?: () => void
}

/**
 * Controller that intercepts and blocks DOM events.
 * Implements lit's ReactiveController interface.
 * Blocks event handling while the element is disabled, loading or readonly.
 */
class EventInterceptorController implements ReactiveController {
  private disabledOrLoadingEvents = [
    'click',
    'dblclick',
    'mousedown',
    'mouseenter',
    'mouseleave',
    'mousemove',
    'mouseover',
    'mouseout',
    'mouseup',
    'keydown',
    'keypress',
    'keyup',
    'blur',
    'change',
    'focus',
    'focusin',
    'focusout',
    'input',
    'invalid',
    'reset',
    'search',
    'select',
    'submit',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'copy',
    'cut',
    'paste',
    'touchcancel',
    'touchend',
  ]

  private readonlyEvents = [
    'keydown',
    'keypress',
    'keyup',
    'change',
    'input',
    'invalid',
    'reset',
    'search',
    'select',
    'submit',
    'drag',
    'dragend',
    'dragenter',
    'dragleave',
    'dragover',
    'dragstart',
    'drop',
    'cut',
    'paste',
  ]

  /**
   * Whether the disabled/loading listeners are currently attached.
   */
  private isDisabledOrLoadingListening = false

  /**
   * Whether the readonly listeners are currently attached.
   */
  private isReadonlyListening = false

  /**
   * Creates the controller and registers it with the host.
   * @param host - Host element the controller is attached to
   */
  constructor(private host: IEventInterceptorHost) {
    this.host.addController(this)
  }

  /**
   * Event handler that prevents the default action and stops propagation.
   * @param e - DOM event
   */
  private handleEvent = (e: Event) => {
    if (e.type === 'keydown') {
      const keyEvent = e as KeyboardEvent
      // keys used for page navigation
      const navigationKeys = ['Tab']
      const ctrlComboKeys = ['KeyA', 'KeyC']

      // allow select-all and copy
      if ((keyEvent.ctrlKey || keyEvent.metaKey) && ctrlComboKeys.includes(keyEvent.code)) return

      // allow keyboard navigation through the page
      if (navigationKeys.includes(keyEvent.key)) return
    }

    e.preventDefault()
    e.stopPropagation()
    e.stopImmediatePropagation()
  }

  /**
   * Attaches or detaches the listeners for the disabled/loading states.
   * @param shouldListen - Whether the listeners should be attached
   */
  private setupDisabledAndLoadingListeners(shouldListen: boolean) {
    if (shouldListen === this.isDisabledOrLoadingListening) return

    this.disabledOrLoadingEvents.forEach((eventName) => {
      if (shouldListen) {
        this.host.addEventListener(
          eventName,
          this.handleEvent,
          { capture: true },
        )
      } else {
        this.host.removeEventListener(
          eventName,
          this.handleEvent,
          { capture: true },
        )
      }
    })

    this.isDisabledOrLoadingListening = shouldListen
  }

  /**
   * Attaches or detaches the listeners for the readonly state.
   * @param shouldListen - Whether the listeners should be attached
   */
  private setupReadonlyListeners(shouldListen: boolean) {
    if (shouldListen === this.isReadonlyListening) return

    this.readonlyEvents.forEach((eventName) => {
      if (shouldListen) {
        this.host.addEventListener(
          eventName,
          this.handleEvent,
          { capture: true },
        )
      } else {
        this.host.removeEventListener(
          eventName,
          this.handleEvent,
          { capture: true },
        )
      }
    })

    this.isReadonlyListening = shouldListen
  }

  /**
   * Syncs the listeners with the host properties.
   */
  private setupListeners() {
    const isDisabledOrLoading = Boolean(this.host.disabled) || Boolean(this.host.loading)
    const isReadonly = Boolean(this.host.readonly)

    this.setupReadonlyListeners(isReadonly && !isDisabledOrLoading)
    this.setupDisabledAndLoadingListeners(isDisabledOrLoading)
  }

  /**
   * Lifecycle callback called when the host is connected to the DOM.
   * Attaches the listeners if the host is disabled, loading or readonly.
   */
  hostConnected() {
    this.setupListeners()
  }

  /**
   * Lifecycle callback called when the host is disconnected from the DOM.
   * Detaches all listeners.
   */
  hostDisconnected() {
    this.setupDisabledAndLoadingListeners(false)
    this.setupReadonlyListeners(false)
  }

  /**
   * Lifecycle callback called after the host updates.
   * Syncs the listeners with the disabled, loading and readonly properties.
   */
  hostUpdated() {
    this.setupListeners()
  }
}

/**
 * Object with the disabled, loading and readonly properties.
 */
type HasDisabledOrLoadingOrReadonly = {
  disabled: boolean | undefined
  loading?: boolean
  readonly?: boolean
}

/**
 * Object with an optional connectedCallback method.
 */
type HasConnectedCallback = {
  connectedCallback?: () => void
}

/**
 * Constructor type for classes that can use the interceptEvents decorator.
 */
type Constructor<T> = {
  new (...args: unknown[]): T
  prototype: T & HasConnectedCallback
}

/**
 * Class decorator that adds event interception.
 * While the element is disabled (disabled = true), loading (loading = true) or readonly (readonly = true),
 * DOM events are intercepted and blocked.
 *
 * @example
 * ```ts
 * @interceptEvents()
 * class MyElement extends LitElement {
 *   @property({ type: Boolean, reflect: true })
 *   disabled = false;
 *
 *   @property({ type: Boolean, reflect: true })
 *   loading = false;
 *
 *   @property({ type: Boolean, reflect: true })
 *   readonly = false;
 *
 *   // ... the rest of the element
 * }
 * ```
 *
 * @returns Class decorator that attaches the event interceptor controller
 */
export const interceptEvents = <T extends HasDisabledOrLoadingOrReadonly>() => {
  return (target: Constructor<T>) => {
    const originalConnectedCallback = target.prototype.connectedCallback

    target.prototype.connectedCallback = function(this: T & TEventInterceptorElement) {
      if (!this._eventInterceptor) {
        this._eventInterceptor = new EventInterceptorController(this)
      }

      if (originalConnectedCallback) {
        originalConnectedCallback.call(this)
      }
    }
  }
}
