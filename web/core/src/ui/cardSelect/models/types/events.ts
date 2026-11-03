import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export class FocusEvent extends CustomEvent<{ event: Event }> {}
export class BlurEvent extends CustomEvent<{ event: Event }> {}

export type TAltCoreCardSelectEvents = TEventsStoryArgs<{
  FocusEvent: typeof FocusEvent
  BlurEvent: typeof BlurEvent
}>
