import { createCoreTableProps, type IAltCoreTableProps } from '~core/ui/table/models/types'
import { createCoreTableRowProps, type IAltCoreTableRowProps } from '~core/ui/tableRow/models/types'
import { type IAltCoreTableHeadCellProps, type ITableHeadCellItem } from '~core/ui/tableHeadCell/models/types'

export interface ISkeletonTableColumn extends Pick<IAltCoreTableHeadCellProps, 'align'> {
  gridTemplate?: ITableHeadCellItem['gridTemplate']
}

export interface IAltCoreSkeletonTableExternalProps extends
  Pick<IAltCoreTableProps, 'hideHead' | 'hideBar'>,
  Pick<IAltCoreTableRowProps, 'stripe'> {
  columns: ISkeletonTableColumn[] | undefined
  rows: number | undefined
  hasPagination: boolean | undefined
}

export const createCoreSkeletonTableExternalProps = (): IAltCoreSkeletonTableExternalProps => {
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
