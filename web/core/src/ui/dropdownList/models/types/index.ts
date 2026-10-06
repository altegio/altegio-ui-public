import {
  createCoreDropdownListExternalProps,
  type IYCoreDropdownListExternalProps,
} from './external'
import {
  createCoreDropdownListInternalProps,
  type IYCoreDropdownListInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCoreDropdownListProps extends IYCoreDropdownListExternalProps, IYCoreDropdownListInternalProps {}

export const createCoreDropdownListProps = (): IYCoreDropdownListProps => ({
  ...createCoreDropdownListExternalProps(),
  ...createCoreDropdownListInternalProps(),
})
