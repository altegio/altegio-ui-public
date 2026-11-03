import type { TEventsStoryArgs } from '~core/utils/helpers-utility-types'
import type { TSort } from '~shared/types/global'
import type { ITableCellItem } from '~core/ui/tableCell/models/types'

export type TSortHandler = <T extends ITableCellItem>(
  items: Record<string, T>[],
  headId: string,
  key: keyof T,
  direction?: TSort,
) => Record<string, T>[]
export interface IAltCoreTableHeadCellSortEvent {
  direction: TSort
  handler: TSortHandler
}

export interface IAltCoreTableHeadCellCheckedEvent {
  checked: boolean
}

export class TableHeadCellSortEvent extends CustomEvent<IAltCoreTableHeadCellSortEvent> {}

export type TAltCoreTableHeadCellEvents = TEventsStoryArgs<{ SortEvent: typeof TableHeadCellSortEvent }>

export class TableHeadCellCheckedEvent extends CustomEvent<IAltCoreTableHeadCellCheckedEvent> {}
