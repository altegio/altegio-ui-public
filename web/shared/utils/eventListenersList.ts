type EventListeners = Record<string, EventListenerOrEventListenerObject | undefined>

export class EventListenersList {
  private eventListeners: EventListeners = {}

  add(event: string, listener: EventListenerOrEventListenerObject) {
    this.eventListeners[event] = listener
    window.addEventListener(
      event,
      listener,
    )
  }

  remove(event: string) {
    const listener = this.eventListeners[event]
    if (listener) {
      window.removeEventListener(
        event,
        listener,
      )
      delete this.eventListeners[event]
    }
  }
}
