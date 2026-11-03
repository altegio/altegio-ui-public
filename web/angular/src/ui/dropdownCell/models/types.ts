import {
  createCoreDropdownCellProps,
  type IAltCoreDropdownCellProps,
} from '~core/ui/dropdownCell/models/types'

export interface IAltNgDropdownCellProps extends IAltCoreDropdownCellProps {}

export const createNgDropdownCellProps = (): IAltNgDropdownCellProps => createCoreDropdownCellProps()
