import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export class OpenEvent extends CustomEvent<Event> {}
export class CloseEvent extends CustomEvent<Event> {}
export class ClickCloseIconEvent extends CustomEvent<Event> {}
export class ClickOverlayEvent extends CustomEvent<Event> {}
export class ClickActivatorEvent extends CustomEvent<Event> {}
export class PressEscapeEvent extends CustomEvent<Event> {}

export type TYCoreModalEvents = TEventsStoryArgs<{
  OpenEvent: typeof OpenEvent
  CloseEvent: typeof CloseEvent
  ClickCloseIconEvent: typeof ClickCloseIconEvent
  ClickOverlayEvent: typeof ClickOverlayEvent
  ClickActivatorEvent: typeof ClickActivatorEvent
  PressEscapeEvent: typeof PressEscapeEvent
}>
