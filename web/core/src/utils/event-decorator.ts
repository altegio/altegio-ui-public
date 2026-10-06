// Source of inspiration: https://github.com/chase-moskal/event-decorators/

/**
 * Extracts the details type from a CustomEvent.
 *
 * @template T - The CustomEvent type.
 */
type TEventDetails<T extends CustomEvent> = T extends CustomEvent<infer D> ? D : never


/**
 * A type representing a class constructor for Event or CustomEvent.
 */
// eslint-disable-next-line @typescript-eslint/no-explicit-any
type TEventClass = new (...args: any) => Event | CustomEvent

/**
 * Options for configuring an event decorator.
 */
interface IEventDecoratorOptions extends CustomEventInit {

  /** Required name for the event. */
  name: string
}

/**
 * A dispatcher function type for custom events.
 *
 * @template E - The CustomEvent type.
 * @param options - The optional initialization options for the custom event.
 */
export type TDispatcher<E extends CustomEvent> = (options?: CustomEventInit<TEventDetails<E>>) => void

/**
 * Prepares an event decorator that dispatches a custom event.
 *
 * @param settings - Default settings for the custom event initialization.
 * @returns A decorator function for adding event dispatching capabilities.
 */
export function prepareEventDecorator(settings: CustomEventInit = {}): (EventClass: TEventClass, config: IEventDecoratorOptions) => PropertyDecorator {
  return function event(EventClass: TEventClass, { name, ...config }: IEventDecoratorOptions): PropertyDecorator {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (target: Record<string | symbol, any>, key: string | symbol) => {
      target[key] = function(this: EventTarget, options: CustomEventInit = {}) {
        this.dispatchEvent(new EventClass(
          name,
          {
            ...settings,
            ...config,
            ...options,
          },
        ))
      }
    }
  }
}

// /**
//  * A decorator for dispatching events with default settings.
//  */
// export const event = prepareEventDecorator()

/**
 * A decorator for dispatching bubbling and composed events.
 */
export const bubblingEvent = prepareEventDecorator({
  bubbles: true,
  composed: true,
})
