import {
  createCoreTableRowProps,
  type IYCoreTableRowProps,
} from '~core/ui/tableRow/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreTableRowProps extends IYCoreTableRowProps {}

export interface IYVueTableRowProps {
  stripe?: IYVueCoreTableRowProps['stripe']
  selectable?: IYVueCoreTableRowProps['selectable']
  sticky?: IYVueCoreTableRowProps['sticky']
  disabled?: IYVueCoreTableRowProps['disabled']
}

export const createVueTableRowProps = (): TDefinedVueProps<IYVueTableRowProps> => {
  const {
    stripe,
    selectable,
    sticky,
    disabled,
  } = createCoreTableRowProps()

  return {
    stripe,
    selectable,
    sticky,
    disabled,
  }
}
