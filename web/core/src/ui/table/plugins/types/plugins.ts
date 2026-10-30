import type {
  AltCoreTableTagName,
  AltCoreTableBarTagName,
  AltCoreTableRowTagName,
  AltCoreTableCellTagName,
  AltCoreTableHeadCellTagName,
  AltCoreTablePaginationTagName,
} from '~shared/constants'
import { type AltCoreTable } from '~core/ui/table'
import { type AltCoreTableBar } from '~core/ui/tableBar'
import { type AltCoreTableRow } from '~core/ui/tableRow'
import { type AltCoreTableCell } from '~core/ui/tableCell'
import { type AltCoreTableHeadCell } from '~core/ui/tableHeadCell'
import { type AltCoreTablePagination } from '~core/ui/tablePagination'

export type TTablePluginComponents =
  typeof AltCoreTableTagName |
  typeof AltCoreTableBarTagName |
  typeof AltCoreTableRowTagName |
  typeof AltCoreTableCellTagName |
  typeof AltCoreTableHeadCellTagName |
  typeof AltCoreTablePaginationTagName

export interface ITableComponentsMap {
  [AltCoreTableTagName]: AltCoreTable
  [AltCoreTableBarTagName]: AltCoreTableBar
  [AltCoreTableRowTagName]: AltCoreTableRow
  [AltCoreTableCellTagName]: AltCoreTableCell
  [AltCoreTableHeadCellTagName]: AltCoreTableHeadCell
  [AltCoreTablePaginationTagName]: AltCoreTablePagination
}

export type TTablePluginComponent = AltCoreTable | AltCoreTableBar | AltCoreTableRow | AltCoreTableCell | AltCoreTableHeadCell | AltCoreTablePagination
export type TTablePluginHook<T extends TTablePluginComponents> = (component: ITableComponentsMap[T]) => void
export interface ITablePlugin<T extends TTablePluginComponents> {
  id: string
  install: TTablePluginHook<T>
  uninstall: TTablePluginHook<T>
}
