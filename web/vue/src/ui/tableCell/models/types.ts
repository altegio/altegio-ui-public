import {
  createCoreTableCellProps,
  type IAltCoreTableCellProps,
} from '~core/ui/tableCell/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreTableCellProps extends IAltCoreTableCellProps {}

export interface IAltVueTableCellProps {
  align?: IAltVueCoreTableCellProps['align']
  item?: IAltVueCoreTableCellProps['item']
  itemLabel?: IAltVueCoreTableCellProps['itemLabel']
  disabled?: IAltVueCoreTableCellProps['disabled']
  sticky?: IAltVueCoreTableCellProps['sticky']
  ellipsis?: IAltVueCoreTableCellProps['ellipsis']
  lineclamp?: IAltVueCoreTableCellProps['lineclamp']
  bordered?: IAltVueCoreTableCellProps['bordered']
}

export const createVueTableCellProps = (): TDefinedVueProps<IAltVueTableCellProps> => {
  const { align, item, itemLabel, disabled, sticky, ellipsis, lineclamp, bordered } = createCoreTableCellProps()
  return {
    align,
    item: item ? () => item : undefined,
    itemLabel,
    disabled,
    sticky,
    ellipsis,
    lineclamp,
    bordered,
  }
}
