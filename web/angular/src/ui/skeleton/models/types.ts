import {
  createCoreSkeletonExternalProps,
  type IAltCoreSkeletonExternalProps,
} from '~core/ui/skeleton/models/types'

export interface IAltNgSkeletonProps extends IAltCoreSkeletonExternalProps {}

export const createNgSkeletonProps = (): IAltNgSkeletonProps => createCoreSkeletonExternalProps()
