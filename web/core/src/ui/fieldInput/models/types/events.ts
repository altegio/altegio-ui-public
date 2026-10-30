import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { IAltBaseCustomEvent } from '~shared/types/global'

export interface IAltCoreFieldInputInputEvent extends IAltBaseCustomEvent {
  value: string
}

export interface IAltCoreFieldInputKeydownEvent extends IAltBaseCustomEvent {
  code: string
  event: KeyboardEvent
}

export class FocusEvent extends CustomEvent<IAltBaseCustomEvent> {}

export class BlurEvent extends CustomEvent<IAltBaseCustomEvent> {}

export class InputEvent extends CustomEvent<IAltCoreFieldInputInputEvent> {}

export class KeydownEvent extends CustomEvent<IAltCoreFieldInputKeydownEvent> {}

export class RenderEvent extends CustomEvent<IAltBaseCustomEvent> {}

export type TAltCoreFieldInputEvents = TEventsStoryArgs<{
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  InputEvent: typeof InputEvent
  KeydownEvent: typeof KeydownEvent
  RenderEvent: typeof RenderEvent
}>
