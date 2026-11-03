import {
  createCoreListExternalProps,
  type IAltCoreListExternalProps,
} from './external'
import {
  createCoreListInternalProps,
  type IAltCoreListInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreListProps extends IAltCoreListExternalProps, IAltCoreListInternalProps {}

export const createCoreListProps = (): IAltCoreListProps => ({
  ...createCoreListExternalProps(),
  ...createCoreListInternalProps(),
})
