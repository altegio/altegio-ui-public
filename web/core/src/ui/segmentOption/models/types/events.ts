import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreSegmentOptionClickEvent {
  value: string
}

export class ClickEvent extends CustomEvent<IYCoreSegmentOptionClickEvent> {}

export type TYCoreSegmentOptionEvents = TEventsStoryArgs<{ ClickEvent: typeof ClickEvent }>
