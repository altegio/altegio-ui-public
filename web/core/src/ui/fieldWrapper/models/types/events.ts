import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export class ClickOutsideEvent extends CustomEvent<{ event: Event }> {}
export class FocusEvent extends CustomEvent<{ event: Event }> {}
export class BlurEvent extends CustomEvent<{ event: Event }> {}
export class MouseEnterEvent extends CustomEvent<{ event: Event }> {}
export class MouseLeaveEvent extends CustomEvent<{ event: Event }> {}

export type TYCoreFieldWrapperEvents = TEventsStoryArgs<{
  ClickOutsideEvent: typeof ClickOutsideEvent
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
  MouseEnterEvent: typeof MouseEnterEvent
  MouseLeaveEvent: typeof MouseLeaveEvent
}>
