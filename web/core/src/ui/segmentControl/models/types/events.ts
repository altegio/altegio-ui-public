import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreSegmentControlClickEvent {
  value: string
}

export class ClickEvent extends CustomEvent<IAltCoreSegmentControlClickEvent> {}

export type TAltCoreSegmentControlEvents = TEventsStoryArgs<{ ClickEvent: typeof ClickEvent }>
