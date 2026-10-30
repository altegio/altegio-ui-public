import {
  createCoreTableRowProps,
  type IAltCoreTableRowProps,
} from '~core/ui/tableRow/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreTableRowProps extends IAltCoreTableRowProps {}

export interface IAltVueTableRowProps {
  stripe?: IAltVueCoreTableRowProps['stripe']
  selectable?: IAltVueCoreTableRowProps['selectable']
  sticky?: IAltVueCoreTableRowProps['sticky']
  disabled?: IAltVueCoreTableRowProps['disabled']
}

export const createVueTableRowProps = (): TDefinedVueProps<IAltVueTableRowProps> => {
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
