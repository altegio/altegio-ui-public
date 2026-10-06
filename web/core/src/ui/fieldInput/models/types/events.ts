import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IYBaseCustomEvent } from '~shared/types/global'

export interface IYCoreFieldInputInputEvent extends IYBaseCustomEvent {
  value: string
}

export interface IYCoreFieldInputKeydownEvent extends IYBaseCustomEvent {
  code: string
  event: KeyboardEvent
}

export class FocusEvent extends CustomEvent<IYBaseCustomEvent> {}

export class BlurEvent extends CustomEvent<IYBaseCustomEvent> {}

export class InputEvent extends CustomEvent<IYCoreFieldInputInputEvent> {}

export class KeydownEvent extends CustomEvent<IYCoreFieldInputKeydownEvent> {}

export class RenderEvent extends CustomEvent<IYBaseCustomEvent> {}

export type TYCoreFieldInputEvents = TEventsStoryArgs<{
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  InputEvent: typeof InputEvent
  KeydownEvent: typeof KeydownEvent
  RenderEvent: typeof RenderEvent
}>
