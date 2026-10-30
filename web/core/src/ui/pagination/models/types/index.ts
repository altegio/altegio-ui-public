import {
  createCorePaginationExternalProps,
  type IAltCorePaginationExternalProps,
} from './external'
import {
  createCorePaginationInternalProps,
  type IAltCorePaginationInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IAltCorePaginationProps extends IAltCorePaginationExternalProps, IAltCorePaginationInternalProps {}

export const createCorePaginationProps = (): IAltCorePaginationProps => ({
  ...createCorePaginationExternalProps(),
  ...createCorePaginationInternalProps(),
})
