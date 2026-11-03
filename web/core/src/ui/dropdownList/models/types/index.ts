import {
  createCoreDropdownListExternalProps,
  type IAltCoreDropdownListExternalProps,
} from './external'
import {
  createCoreDropdownListInternalProps,
  type IAltCoreDropdownListInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreDropdownListProps extends IAltCoreDropdownListExternalProps, IAltCoreDropdownListInternalProps {}

export const createCoreDropdownListProps = (): IAltCoreDropdownListProps => ({
  ...createCoreDropdownListExternalProps(),
  ...createCoreDropdownListInternalProps(),
})
