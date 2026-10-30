import {
  createCoreDropdownExternalProps,
  type IAltCoreDropdownExternalProps,
} from './external'
import {
  createCoreDropdownInternalProps,
  type IAltCoreDropdownInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreDropdownProps extends IAltCoreDropdownExternalProps, IAltCoreDropdownInternalProps {}

export const createCoreDropdownProps = (): IAltCoreDropdownProps => ({
  ...createCoreDropdownExternalProps(),
  ...createCoreDropdownInternalProps(),
})
