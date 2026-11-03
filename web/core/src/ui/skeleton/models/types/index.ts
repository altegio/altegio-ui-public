import {
  createCoreSkeletonExternalProps,
  type IAltCoreSkeletonExternalProps,
} from './external'
import {
  createCoreSkeletonInternalProps,
  type IAltCoreSkeletonInternalProps,
} from './internal'

export * from './external'
export * from './internal'

export interface IAltCoreSkeletonProps extends IAltCoreSkeletonExternalProps, IAltCoreSkeletonInternalProps {}

export const createCoreSkeletonProps = (): IAltCoreSkeletonProps => ({
  ...createCoreSkeletonExternalProps(),
  ...createCoreSkeletonInternalProps(),
})
