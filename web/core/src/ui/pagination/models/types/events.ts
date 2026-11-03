import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCorePaginationChangePageEvent {
  event: Event
  page: number
}

export class ChangePageEvent extends CustomEvent<IAltCorePaginationChangePageEvent> {}

export type TAltCorePaginationEvents = TEventsStoryArgs<{ ChangePageEvent: typeof ChangePageEvent }>
