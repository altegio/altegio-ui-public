import {
  createCoreFieldWrapperExternalProps,
  type IAltCoreFieldWrapperExternalProps,
} from './external'
import {
  createCoreFieldWrapperInternalProps,
  type IAltCoreFieldWrapperInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCoreFieldWrapperProps extends IAltCoreFieldWrapperExternalProps, IAltCoreFieldWrapperInternalProps {}

export const createCoreFieldWrapperProps = (): IAltCoreFieldWrapperProps => ({
  ...createCoreFieldWrapperExternalProps(),
  ...createCoreFieldWrapperInternalProps(),
})
