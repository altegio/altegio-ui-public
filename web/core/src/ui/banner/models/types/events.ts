import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export class CloseEvent extends CustomEvent<undefined> {}

export type TAltCoreBannerEvents = TEventsStoryArgs<{ CloseEvent: typeof CloseEvent }>
