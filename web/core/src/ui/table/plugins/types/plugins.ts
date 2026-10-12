import type {
  YCoreTableTagName,
  YCoreTableBarTagName,
  YCoreTableRowTagName,
  YCoreTableCellTagName,
  YCoreTableHeadCellTagName,
  YCoreTablePaginationTagName,
} from '~shared/constants'
import { type YCoreTable } from '~core/ui/table'
import { type YCoreTableBar } from '~core/ui/tableBar'
import { type YCoreTableRow } from '~core/ui/tableRow'
import { type YCoreTableCell } from '~core/ui/tableCell'
import { type YCoreTableHeadCell } from '~core/ui/tableHeadCell'
import { type YCoreTablePagination } from '~core/ui/tablePagination'

export type TTablePluginComponents =
  typeof YCoreTableTagName |
  typeof YCoreTableBarTagName |
  typeof YCoreTableRowTagName |
  typeof YCoreTableCellTagName |
  typeof YCoreTableHeadCellTagName |
  typeof YCoreTablePaginationTagName

export interface ITableComponentsMap {
  [YCoreTableTagName]: YCoreTable
  [YCoreTableBarTagName]: YCoreTableBar
  [YCoreTableRowTagName]: YCoreTableRow
  [YCoreTableCellTagName]: YCoreTableCell
  [YCoreTableHeadCellTagName]: YCoreTableHeadCell
  [YCoreTablePaginationTagName]: YCoreTablePagination
}

export type TTablePluginComponent = YCoreTable | YCoreTableBar | YCoreTableRow | YCoreTableCell | YCoreTableHeadCell | YCoreTablePagination
export type TTablePluginHook<T extends TTablePluginComponents> = (component: ITableComponentsMap[T]) => void
export interface ITablePlugin<T extends TTablePluginComponents> {
  id: string
  install: TTablePluginHook<T>
  uninstall: TTablePluginHook<T>
}
