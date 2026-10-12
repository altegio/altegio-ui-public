import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreSegmentControlClickEvent {
  value: string
}

export class ClickEvent extends CustomEvent<IYCoreSegmentControlClickEvent> {}

export type TYCoreSegmentControlEvents = TEventsStoryArgs<{ ClickEvent: typeof ClickEvent }>
