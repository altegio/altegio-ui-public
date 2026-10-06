import {
  createCorePaginationExternalProps,
  type IYCorePaginationExternalProps,
} from './external'
import {
  createCorePaginationInternalProps,
  type IYCorePaginationInternalProps,
} from './internal'

export * from './external'
export * from './internal'
export * from './events'

export interface IYCorePaginationProps extends IYCorePaginationExternalProps, IYCorePaginationInternalProps {}

export const createCorePaginationProps = (): IYCorePaginationProps => ({
  ...createCorePaginationExternalProps(),
  ...createCorePaginationInternalProps(),
})
