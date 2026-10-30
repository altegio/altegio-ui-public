import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreSegmentOptionClickEvent {
  value: string
}

export class ClickEvent extends CustomEvent<IAltCoreSegmentOptionClickEvent> {}

export type TAltCoreSegmentOptionEvents = TEventsStoryArgs<{ ClickEvent: typeof ClickEvent }>
