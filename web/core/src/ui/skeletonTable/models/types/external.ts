import { createCoreTableProps, type IYCoreTableProps } from '~core/ui/table/models/types'
import { createCoreTableRowProps, type IYCoreTableRowProps } from '~core/ui/tableRow/models/types'
import { type IYCoreTableHeadCellProps, type ITableHeadCellItem } from '~core/ui/tableHeadCell/models/types'

export interface ISkeletonTableColumn extends Pick<IYCoreTableHeadCellProps, 'align'> {
  gridTemplate?: ITableHeadCellItem['gridTemplate']
}

export interface IYCoreSkeletonTableExternalProps extends
  Pick<IYCoreTableProps, 'hideHead' | 'hideBar'>,
  Pick<IYCoreTableRowProps, 'stripe'> {
  columns: ISkeletonTableColumn[] | undefined
  rows: number | undefined
  hasPagination: boolean | undefined
}

export const createCoreSkeletonTableExternalProps = (): IYCoreSkeletonTableExternalProps => {
  const { hideHead, hideBar } = createCoreTableProps()
  const { stripe } = createCoreTableRowProps()

  return {
    columns: [],
    rows: 0,
    hasPagination: false,
    stripe,
    hideHead,
    hideBar,
  }
}
