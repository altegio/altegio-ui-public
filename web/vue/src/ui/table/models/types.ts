import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreTableProps,
  type IAltCoreTableProps,
} from '~core/ui/table/models/types'
import {
  createCoreTableRowProps,
  type IAltCoreTableRowProps,
} from '~core/ui/tableRow/models/types'
import {
  createCoreTableCellProps,
  type IAltCoreTableCellProps,
  type ITableCellItem,
} from '~core/ui/tableCell/models/types'
import {
  type IAltCoreTableHeadCellProps,
  type TableHeadCellSortEvent,
  type ITableHeadCellItem,
} from '~core/ui/tableHeadCell/models/types'
import {
  createCoreTablePaginationProps,
  type IAltCoreTablePaginationProps,
} from '~core/ui/tablePagination/models/types'
import type { TPrimitive } from '~shared/types/global'

export type { ISkeletonTableColumn } from '~core/ui/skeletonTable/models/types'

export interface IAltVueTableHeadItem extends ITableHeadCellItem, Partial<IAltCoreTableHeadCellProps> {
  hint?: string
}
export interface IAltVueTableCellItem extends ITableCellItem, Partial<IAltCoreTableCellProps> {}

export type TAltVueTableCellItem = IAltVueTableCellItem | TPrimitive
export type TAltVueTableHeaders = Record<IAltVueTableHeadItem['id'], IAltVueTableHeadItem>
export interface IAltVueTableItem extends Record<IAltVueTableHeadItem['id'], TAltVueTableCellItem> {
  rowId: string
  rowKey?: string
  group?: string
}
export type TAltVueTableItems = IAltVueTableItem[]

export interface IAltVueCoreTableProps extends
  Omit<IAltCoreTableProps, 'hideHead' | 'hideBar'>,
  Pick<IAltCoreTableRowProps, 'stripe' | 'selectable'>,
  Pick<IAltCoreTableCellProps, 'sticky'>,
  Omit<IAltCoreTablePaginationProps, 'disabled'> {
  headers: TAltVueTableHeaders | undefined
  items: TAltVueTableItems | undefined
  selected: IAltVueTableItem['rowId'][] | undefined
  hideHeader?: IAltCoreTableProps['hideHead']
}
export interface IAltVueTableProps {
  disabled?: IAltVueCoreTableProps['disabled']
  loading?: IAltVueCoreTableProps['loading']
  plugins?: IAltVueCoreTableProps['plugins']
  stripe?: IAltVueCoreTableProps['stripe']
  selectable?: IAltVueCoreTableProps['selectable']
  sticky?: IAltVueCoreTableProps['sticky']
  page?: IAltVueCoreTableProps['page']
  itemsPerPage?: IAltVueCoreTableProps['itemsPerPage']
  total?: IAltVueCoreTableProps['total']
  itemValue?: IAltVueCoreTableProps['itemValue']
  itemLabel?: IAltVueCoreTableProps['itemLabel']
  optionsItemsPerPage?: IAltVueCoreTableProps['optionsItemsPerPage']
  counterText?: IAltVueCoreTableProps['counterText']
  headers?: IAltVueCoreTableProps['headers']
  items?: IAltVueCoreTableProps['items']
  selected?: IAltVueCoreTableProps['selected']
  showPagination?: boolean
  hideHeader?: IAltVueCoreTableProps['hideHeader']
}

export const createVueTableProps = (): TDefinedVueProps<IAltVueTableProps> => {
  const { disabled, loading } = createCoreTableProps()
  const { stripe, selectable } = createCoreTableRowProps()
  const { sticky } = createCoreTableCellProps()
  const { page, itemsPerPage, total, itemValue, itemLabel, optionsItemsPerPage, counterText } = createCoreTablePaginationProps()

  const headers: () => TAltVueTableHeaders = () => ({})
  const items: () => TAltVueTableItems = () => []
  const selected: () => IAltVueTableItem['rowId'][] = () => []

  return {
    disabled,
    loading,
    hideHeader: false,
    stripe,
    selectable,
    sticky,
    headers,
    items,
    selected,
    plugins: () => ({}),
    page,
    itemsPerPage,
    total,
    itemValue,
    itemLabel,
    optionsItemsPerPage: optionsItemsPerPage ? () => optionsItemsPerPage : () => [],
    counterText,
    showPagination: false,
  }
}

export interface IAltVueTableEmitSortPayload {
  headId: string
  event: TableHeadCellSortEvent
}

export interface IAltVueTableEmits {
  (event: 'sort', payload: IAltVueTableEmitSortPayload): void
  (event: 'update:selected', payload: IAltVueTableItem['rowId'][]): void
  (event: 'update:page', payload: IAltCoreTablePaginationProps['page']): void
  (event: 'update:itemsPerPage', payload: IAltCoreTablePaginationProps['itemsPerPage']): void
}

export interface IAltVueTableSlots {
  [key: `head-hint-${string}`]: (props: { hint?: string }) => unknown
  [key: `head-cell-${string}`]: (props: { item: IAltVueTableHeadItem }) => unknown
  'head-cell': (props: { item: IAltVueTableHeadItem }) => unknown
  [key: `row-outer-${string}`]: (props: { row: IAltVueTableItem }) => unknown
  [key: `row-inner-${string}`]: (props: { row: IAltVueTableItem }) => unknown
  'row-inner': (props: { row: IAltVueTableItem; index: number }) => unknown
  'row-outer': (props: { row: IAltVueTableItem; index: number }) => unknown
  [key: `cell-outer-col-${string}`]: (props: { cell: TAltVueTableCellItem; row: IAltVueTableItem }) => unknown
  'cell-outer': (props: { cell: TAltVueTableCellItem; row: IAltVueTableItem }) => unknown
  [key: `cell-col-${string}`]: (props: { cell: TAltVueTableCellItem; row: IAltVueTableItem }) => unknown
  cell: (props: { cell: TAltVueTableCellItem; row: IAltVueTableItem }) => unknown
}
