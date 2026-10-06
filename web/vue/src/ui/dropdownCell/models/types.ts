import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreDropdownCellProps,
  type IYCoreDropdownCellProps,
} from '~core/ui/dropdownCell/models/types'

export interface IYVueCoreDropdownCellProps extends IYCoreDropdownCellProps {}

export interface IYVueDropdownCellProps {}

export const createVueDropdownCellProps = (): TDefinedVueProps<IYVueDropdownCellProps> => {
  return createCoreDropdownCellProps()
}
