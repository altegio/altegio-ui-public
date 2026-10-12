import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCorePaginationChangePageEvent {
  event: Event
  page: number
}

export class ChangePageEvent extends CustomEvent<IYCorePaginationChangePageEvent> {}

export type TYCorePaginationEvents = TEventsStoryArgs<{ ChangePageEvent: typeof ChangePageEvent }>
