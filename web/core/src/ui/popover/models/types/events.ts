import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCorePopoverCancelEvent extends CustomEvent<Event> {}

export interface IYCorePopoverSubmitEvent extends CustomEvent<Event> {}

export class CancelEvent extends CustomEvent<IYCorePopoverCancelEvent> {}
export class SubmitEvent extends CustomEvent<IYCorePopoverSubmitEvent> {}

export type TYCorePopoverActionEvents = TEventsStoryArgs<{
  CancelEvent: typeof CancelEvent
  SubmitEvent: typeof SubmitEvent
}>
