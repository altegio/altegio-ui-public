import {
  type IYCoreTableCellExternalProps,
  type ITableCellItem,
  createCoreTableCellExternalProps,
} from '~core/ui/tableCell/models/types'
import { ESort, type TSort } from '~shared/types/global'

export interface ITableHeadCellItem extends ITableCellItem {
  gridTemplate?: string
}
export interface IYCoreTableHeadCellExternalProps extends Omit<IYCoreTableCellExternalProps, 'item' | 'itemLabel' | 'stripe'> {
  sortable: boolean | undefined
  sortDirection: TSort | undefined
  header: ITableHeadCellItem | undefined
  headerLabel: IYCoreTableCellExternalProps['itemLabel']
}

export const createCoreTableHeadCellExternalProps = (): IYCoreTableHeadCellExternalProps => {
  const {
    sticky,
    align,
    disabled,
    item: header,
    itemLabel: headerLabel,
    ellipsis,
    lineclamp,
    bordered,
  } = createCoreTableCellExternalProps()

  return {
    sticky,
    align,
    disabled,
    sortable: undefined,
    sortDirection: ESort.ASC,
    header,
    headerLabel,
    ellipsis,
    lineclamp,
    bordered,
  }
}
