import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'

export interface IYCoreTablePaginationChangeItemsPerPageEvent {
  event: Event
  itemsPerPage: number
}

export class ChangeItemsPerPageEvent extends CustomEvent<IYCoreTablePaginationChangeItemsPerPageEvent> {}

export type TYCoreTablePaginationEvents = TEventsStoryArgs<{ ChangeItemsPerPageEvent: typeof ChangeItemsPerPageEvent }>
