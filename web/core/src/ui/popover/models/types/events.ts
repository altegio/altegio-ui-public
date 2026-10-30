import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCorePopoverCancelEvent extends CustomEvent<Event> {}

export interface IAltCorePopoverSubmitEvent extends CustomEvent<Event> {}

export class CancelEvent extends CustomEvent<IAltCorePopoverCancelEvent> {}
export class SubmitEvent extends CustomEvent<IAltCorePopoverSubmitEvent> {}

export type TAltCorePopoverActionEvents = TEventsStoryArgs<{
  CancelEvent: typeof CancelEvent
  SubmitEvent: typeof SubmitEvent
}>
