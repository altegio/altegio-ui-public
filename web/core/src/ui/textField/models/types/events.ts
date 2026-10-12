import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYBaseCustomEvent } from '~shared/types/global'

export {
  ClickOutsideEvent, MouseEnterEvent, MouseLeaveEvent, FocusEvent, BlurEvent,
  type TYCoreFieldWrapperEvents,
} from '~core/ui/fieldWrapper/models/types/events'
export {
  InputEvent, KeydownEvent, RenderEvent,
  type TYCoreFieldInputEvents,
  type IYCoreFieldInputInputEvent,
} from '~core/ui/fieldInput/models/types/events'

export class ClearEvent extends CustomEvent<IYBaseCustomEvent> {}

export type TYCoreTextFieldEvents = TEventsStoryArgs<{
  ClearEvent: typeof ClearEvent
}>
