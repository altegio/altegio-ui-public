import {
  createCoreDropdownCellExternalProps,
  type IAltCoreDropdownCellExternalProps,
} from './external'
import {
  createCoreDropdownCellInternalProps,
  type IAltCoreDropdownCellInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreDropdownCellProps extends IAltCoreDropdownCellExternalProps, IAltCoreDropdownCellInternalProps {}

export const createCoreDropdownCellProps = (): IAltCoreDropdownCellProps => ({
  ...createCoreDropdownCellExternalProps(),
  ...createCoreDropdownCellInternalProps(),
})
