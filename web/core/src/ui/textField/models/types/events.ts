import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltBaseCustomEvent } from '~shared/types/global'

export {
  ClickOutsideEvent, MouseEnterEvent, MouseLeaveEvent, FocusEvent, BlurEvent,
  type TAltCoreFieldWrapperEvents,
} from '~core/ui/fieldWrapper/models/types/events'
export {
  InputEvent, KeydownEvent, RenderEvent,
  type TAltCoreFieldInputEvents,
  type IAltCoreFieldInputInputEvent,
} from '~core/ui/fieldInput/models/types/events'

export class ClearEvent extends CustomEvent<IAltBaseCustomEvent> {}

export type TAltCoreTextFieldEvents = TEventsStoryArgs<{
  ClearEvent: typeof ClearEvent
}>
