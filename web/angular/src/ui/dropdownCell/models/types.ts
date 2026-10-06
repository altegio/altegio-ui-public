import {
  createCoreDropdownCellProps,
  type IYCoreDropdownCellProps,
} from '~core/ui/dropdownCell/models/types'

export interface IYNgDropdownCellProps extends IYCoreDropdownCellProps {}

export const createNgDropdownCellProps = (): IYNgDropdownCellProps => createCoreDropdownCellProps()
