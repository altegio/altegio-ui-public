import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IAltCoreTablePaginationChangeItemsPerPageEvent {
  event: Event
  itemsPerPage: number
}

export class ChangeItemsPerPageEvent extends CustomEvent<IAltCoreTablePaginationChangeItemsPerPageEvent> {}

export type TAltCoreTablePaginationEvents = TEventsStoryArgs<{ ChangeItemsPerPageEvent: typeof ChangeItemsPerPageEvent }>
