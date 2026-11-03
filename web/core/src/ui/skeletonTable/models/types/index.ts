import {
  createCoreSkeletonTableExternalProps,
  type IAltCoreSkeletonTableExternalProps,
} from './external'
import {
  createCoreSkeletonTableInternalProps,
  type IAltCoreSkeletonTableInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreSkeletonTableProps extends IAltCoreSkeletonTableExternalProps, IAltCoreSkeletonTableInternalProps {}

export const createCoreSkeletonTableProps = (): IAltCoreSkeletonTableProps => ({
  ...createCoreSkeletonTableExternalProps(),
  ...createCoreSkeletonTableInternalProps(),
})
