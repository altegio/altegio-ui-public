import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { TYCoreModalEvents } from '~core/ui/modal/models/types/events'

export {
  OpenEvent,
  CloseEvent,
  ClickCloseIconEvent,
  ClickOverlayEvent,
  ClickActivatorEvent,
  PressEscapeEvent,
} from '~core/ui/modal/models/types/events'

export class CancelEvent extends CustomEvent<Event> {}
export class SubmitEvent extends CustomEvent<Event> {}

export type TYCoreFunctionalModalEvents = TYCoreModalEvents & TEventsStoryArgs<{
  CancelEvent: typeof CancelEvent
  SubmitEvent: typeof SubmitEvent
}>
