import {
  createCoreTableCellProps,
  type IYCoreTableCellProps,
} from '~core/ui/tableCell/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreTableCellProps extends IYCoreTableCellProps {}

export interface IYVueTableCellProps {
  align?: IYVueCoreTableCellProps['align']
  item?: IYVueCoreTableCellProps['item']
  itemLabel?: IYVueCoreTableCellProps['itemLabel']
  disabled?: IYVueCoreTableCellProps['disabled']
  sticky?: IYVueCoreTableCellProps['sticky']
  ellipsis?: IYVueCoreTableCellProps['ellipsis']
  lineclamp?: IYVueCoreTableCellProps['lineclamp']
  bordered?: IYVueCoreTableCellProps['bordered']
}

export const createVueTableCellProps = (): TDefinedVueProps<IYVueTableCellProps> => {
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
