import {
  createCoreDropdownCellExternalProps,
  type IYCoreDropdownCellExternalProps,
} from './external'
import {
  createCoreDropdownCellInternalProps,
  type IYCoreDropdownCellInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreDropdownCellProps extends IYCoreDropdownCellExternalProps, IYCoreDropdownCellInternalProps {}

export const createCoreDropdownCellProps = (): IYCoreDropdownCellProps => ({
  ...createCoreDropdownCellExternalProps(),
  ...createCoreDropdownCellInternalProps(),
})
