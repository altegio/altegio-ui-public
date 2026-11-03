import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreDropdownCellProps,
  type IAltCoreDropdownCellProps,
} from '~core/ui/dropdownCell/models/types'

export interface IAltVueCoreDropdownCellProps extends IAltCoreDropdownCellProps {}

export interface IAltVueDropdownCellProps {}

export const createVueDropdownCellProps = (): TDefinedVueProps<IAltVueDropdownCellProps> => {
  return createCoreDropdownCellProps()
}
