import {
  createCoreSkeletonTableExternalProps,
  type IYCoreSkeletonTableExternalProps,
} from './external'
import {
  createCoreSkeletonTableInternalProps,
  type IYCoreSkeletonTableInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IYCoreSkeletonTableProps extends IYCoreSkeletonTableExternalProps, IYCoreSkeletonTableInternalProps {}

export const createCoreSkeletonTableProps = (): IYCoreSkeletonTableProps => ({
  ...createCoreSkeletonTableExternalProps(),
  ...createCoreSkeletonTableInternalProps(),
})
