import {
  createCoreDropdownExternalProps,
  type IYCoreDropdownExternalProps,
} from './external'
import {
  createCoreDropdownInternalProps,
  type IYCoreDropdownInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreDropdownProps extends IYCoreDropdownExternalProps, IYCoreDropdownInternalProps {}

export const createCoreDropdownProps = (): IYCoreDropdownProps => ({
  ...createCoreDropdownExternalProps(),
  ...createCoreDropdownInternalProps(),
})
