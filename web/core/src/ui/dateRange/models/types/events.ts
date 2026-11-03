import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreDateRangeValue {
  from: string | null
  to: string | null
}

export class DateRangeChangeEvent extends CustomEvent<IAltCoreDateRangeValue> {}

export type TAltCoreDateRangeEvents = TEventsStoryArgs<{ ChangeEvent: typeof DateRangeChangeEvent }>
