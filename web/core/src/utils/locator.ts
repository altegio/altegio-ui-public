import type { ReactiveController, ReactiveControllerHost } from 'lit'
import type { ReactiveElement } from 'lit'

/**
 * Host that can use LocatorController.
 * Extends lit's ReactiveControllerHost with the locator property.
 */
interface ILocatorHost extends ReactiveControllerHost, HTMLElement {
  locator?: string
}

/**
 * Controller that keeps the data-locator attribute up to date.
 * Precedence: the locator prop → a data-locator already set by the consumer → the tag name.
 */
class LocatorController implements ReactiveController {
  constructor(
    private host: ILocatorHost,
    private fallback: string,
  ) {
    this.host.addController(this)
  }

  /**
   * Applies the locator value to the host.
   */
  private apply() {
    if (this.host.locator) {
      this.host.dataset.locator = this.host.locator

      return
    }

    if (!this.host.dataset.locator) {
      this.host.dataset.locator = this.fallback
    }
  }

  /**
   * Lifecycle callback called when the host is connected to the DOM.
   */
  hostConnected() {
    this.apply()
  }

  /**
   * Lifecycle callback called after the host updates.
   * Propagates runtime changes of locator to data-locator.
   */
  hostUpdated() {
    this.apply()
  }
}

/**
 * Element with an attached locator controller.
 */
type TLocatorElement = ILocatorHost & {
  _locatorController?: LocatorController
  connectedCallback?: () => void
}

/**
 * Constructor type for classes that can use the withLocator decorator.
 */
type TConstructor<T> = {
  new (...args: unknown[]): T
  prototype: T & { connectedCallback?: () => void }
}

/**
 * Class decorator that lets consumers control the component locator.
 *
 * Declares a reactive locator property and sets data-locator using this precedence:
 * the locator prop → a data-locator already set by the consumer → the fallback (tag name).
 *
 * Redeclares locator through createProperty, overriding the options of a local @property locator if the class declares one.
 * Decorator order matters: @withLocator must come below @customElement, otherwise observedAttributes misses locator and setting it through the attribute silently stops working (the DOM property still works).
 * If locator is set and then reset to undefined, data-locator keeps the previous value instead of falling back to the tag name.
 *
 * @example
 * ```ts
 * @customElement(tagName)
 * @withLocator(tagName)
 * class MyElement extends LitElement {}
 * ```
 *
 * @param fallback - Default data-locator value, usually the tag name.
 * @returns Class decorator.
 */
export const withLocator = (fallback: string) => {
  return <T extends object>(target: TConstructor<T>) => {
    (target as unknown as typeof ReactiveElement).createProperty(
      'locator',
      {
        type: String,
        attribute: 'locator',
      },
    )

    const originalConnectedCallback = target.prototype.connectedCallback

    target.prototype.connectedCallback = function(this: TLocatorElement) {
      if (!this._locatorController) {
        this._locatorController = new LocatorController(
          this,
          fallback,
        )
      }

      originalConnectedCallback?.call(this)
    }
  }
}
