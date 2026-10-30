import {
  createCoreTableHeadCellProps,
  type IAltCoreTableHeadCellProps,
  type IAltCoreTableHeadCellSortEvent,
} from '~core/ui/tableHeadCell/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreTableHeadCellProps extends IAltCoreTableHeadCellProps {}

export interface IAltVueTableHeadCellProps {
  align?: IAltVueCoreTableHeadCellProps['align']
  disabled?: IAltVueCoreTableHeadCellProps['disabled']
  header?: IAltVueCoreTableHeadCellProps['header']
  headerLabel?: IAltVueCoreTableHeadCellProps['headerLabel']
  sortDirection?: IAltVueCoreTableHeadCellProps['sortDirection']
  sortable?: IAltVueCoreTableHeadCellProps['sortable']
  sticky?: IAltVueCoreTableHeadCellProps['sticky']
  ellipsis?: IAltVueCoreTableHeadCellProps['ellipsis']
  lineclamp?: IAltVueCoreTableHeadCellProps['lineclamp']
  bordered?: IAltVueCoreTableHeadCellProps['bordered']
}

export const createVueTableHeadCellProps = (): TDefinedVueProps<IAltVueTableHeadCellProps> => {
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

export interface IAltVueTableHeadCellEmits {
  (event: 'sort', payload: IAltCoreTableHeadCellSortEvent): void
}
