import {
  createCoreTableHeadCellProps,
  type IYCoreTableHeadCellProps,
  type IYCoreTableHeadCellSortEvent,
} from '~core/ui/tableHeadCell/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreTableHeadCellProps extends IYCoreTableHeadCellProps {}

export interface IYVueTableHeadCellProps {
  align?: IYVueCoreTableHeadCellProps['align']
  disabled?: IYVueCoreTableHeadCellProps['disabled']
  header?: IYVueCoreTableHeadCellProps['header']
  headerLabel?: IYVueCoreTableHeadCellProps['headerLabel']
  sortDirection?: IYVueCoreTableHeadCellProps['sortDirection']
  sortable?: IYVueCoreTableHeadCellProps['sortable']
  sticky?: IYVueCoreTableHeadCellProps['sticky']
  ellipsis?: IYVueCoreTableHeadCellProps['ellipsis']
  lineclamp?: IYVueCoreTableHeadCellProps['lineclamp']
  bordered?: IYVueCoreTableHeadCellProps['bordered']
}

export const createVueTableHeadCellProps = (): TDefinedVueProps<IYVueTableHeadCellProps> => {
  const {
    align,
    disabled,
    header,
    headerLabel,
    sortDirection,
    sortable,
    sticky,
    ellipsis,
    lineclamp,
    bordered,
  } = createCoreTableHeadCellProps()

  return {
    align,
    disabled,
    header: header ? () => header : undefined,
    headerLabel,
    sortDirection,
    sortable,
    sticky,
    ellipsis,
    lineclamp,
    bordered,
  }
}

export interface IYVueTableHeadCellEmits {
  (event: 'sort', payload: IYCoreTableHeadCellSortEvent): void
}
