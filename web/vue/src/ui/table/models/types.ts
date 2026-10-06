import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreTableProps,
  type IYCoreTableProps,
} from '~core/ui/table/models/types'
import {
  createCoreTableRowProps,
  type IYCoreTableRowProps,
} from '~core/ui/tableRow/models/types'
import {
  createCoreTableCellProps,
  type IYCoreTableCellProps,
  type ITableCellItem,
} from '~core/ui/tableCell/models/types'
import {
  type IYCoreTableHeadCellProps,
  type TableHeadCellSortEvent,
  type ITableHeadCellItem,
} from '~core/ui/tableHeadCell/models/types'
import {
  createCoreTablePaginationProps,
  type IYCoreTablePaginationProps,
} from '~core/ui/tablePagination/models/types'
import type { TPrimitive } from '~shared/types/global'

export type { ISkeletonTableColumn } from '~core/ui/skeletonTable/models/types'

export interface IYVueTableHeadItem extends ITableHeadCellItem, Partial<IYCoreTableHeadCellProps> {
  hint?: string
}
export interface IYVueTableCellItem extends ITableCellItem, Partial<IYCoreTableCellProps> {}

export type TYVueTableCellItem = IYVueTableCellItem | TPrimitive
export type TYVueTableHeaders = Record<IYVueTableHeadItem['id'], IYVueTableHeadItem>
export interface IYVueTableItem extends Record<IYVueTableHeadItem['id'], TYVueTableCellItem> {
  rowId: string
  rowKey?: string
  group?: string
}
export type TYVueTableItems = IYVueTableItem[]

export interface IYVueCoreTableProps extends
  Omit<IYCoreTableProps, 'hideHead' | 'hideBar'>,
  Pick<IYCoreTableRowProps, 'stripe' | 'selectable'>,
  Pick<IYCoreTableCellProps, 'sticky'>,
  Omit<IYCoreTablePaginationProps, 'disabled'> {
  headers: TYVueTableHeaders | undefined
  items: TYVueTableItems | undefined
  selected: IYVueTableItem['rowId'][] | undefined
  hideHeader?: IYCoreTableProps['hideHead']
}
export interface IYVueTableProps {
  disabled?: IYVueCoreTableProps['disabled']
  loading?: IYVueCoreTableProps['loading']
  plugins?: IYVueCoreTableProps['plugins']
  stripe?: IYVueCoreTableProps['stripe']
  selectable?: IYVueCoreTableProps['selectable']
  sticky?: IYVueCoreTableProps['sticky']
  page?: IYVueCoreTableProps['page']
  itemsPerPage?: IYVueCoreTableProps['itemsPerPage']
  total?: IYVueCoreTableProps['total']
  itemValue?: IYVueCoreTableProps['itemValue']
  itemLabel?: IYVueCoreTableProps['itemLabel']
  optionsItemsPerPage?: IYVueCoreTableProps['optionsItemsPerPage']
  counterText?: IYVueCoreTableProps['counterText']
  headers?: IYVueCoreTableProps['headers']
  items?: IYVueCoreTableProps['items']
  selected?: IYVueCoreTableProps['selected']
  showPagination?: boolean
  hideHeader?: IYVueCoreTableProps['hideHeader']
}

export const createVueTableProps = (): TDefinedVueProps<IYVueTableProps> => {
  const { disabled, loading } = createCoreTableProps()
  const { stripe, selectable } = createCoreTableRowProps()
  const { sticky } = createCoreTableCellProps()
  const { page, itemsPerPage, total, itemValue, itemLabel, optionsItemsPerPage, counterText } = createCoreTablePaginationProps()

  const headers: () => TYVueTableHeaders = () => ({})
  const items: () => TYVueTableItems = () => []
  const selected: () => IYVueTableItem['rowId'][] = () => []

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

export interface IYVueTableEmitSortPayload {
  headId: string
  event: TableHeadCellSortEvent
}

export interface IYVueTableEmits {
  (event: 'sort', payload: IYVueTableEmitSortPayload): void
  (event: 'update:selected', payload: IYVueTableItem['rowId'][]): void
  (event: 'update:page', payload: IYCoreTablePaginationProps['page']): void
  (event: 'update:itemsPerPage', payload: IYCoreTablePaginationProps['itemsPerPage']): void
}

export interface IYVueTableSlots {
  [key: `head-hint-${string}`]: (props: { hint?: string }) => unknown
  [key: `head-cell-${string}`]: (props: { item: IYVueTableHeadItem }) => unknown
  'head-cell': (props: { item: IYVueTableHeadItem }) => unknown
  [key: `row-outer-${string}`]: (props: { row: IYVueTableItem }) => unknown
  [key: `row-inner-${string}`]: (props: { row: IYVueTableItem }) => unknown
  'row-inner': (props: { row: IYVueTableItem; index: number }) => unknown
  'row-outer': (props: { row: IYVueTableItem; index: number }) => unknown
  [key: `cell-outer-col-${string}`]: (props: { cell: TYVueTableCellItem; row: IYVueTableItem }) => unknown
  'cell-outer': (props: { cell: TYVueTableCellItem; row: IYVueTableItem }) => unknown
  [key: `cell-col-${string}`]: (props: { cell: TYVueTableCellItem; row: IYVueTableItem }) => unknown
  cell: (props: { cell: TYVueTableCellItem; row: IYVueTableItem }) => unknown
}
