import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreRatingChangePayload {
  value: number
}

export class RatingChangeEvent extends CustomEvent<IAltCoreRatingChangePayload> {}

export type TAltCoreRatingEvents = TEventsStoryArgs<{ ChangeEvent: typeof RatingChangeEvent }>
