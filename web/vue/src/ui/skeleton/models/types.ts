import {
  createCoreSkeletonProps,
  type IAltCoreSkeletonProps,
} from '~core/ui/skeleton/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueSkeletonProps {
  size?: IAltCoreSkeletonProps['size']
  shape?: IAltCoreSkeletonProps['shape']
  width?: IAltCoreSkeletonProps['width']
  height?: IAltCoreSkeletonProps['height']
}

export const createVueSkeletonProps = (): TDefinedVueProps<IAltVueSkeletonProps> => {
  const { size, shape, width, height } = createCoreSkeletonProps()

  return {
    size,
    shape,
    width,
    height,
  }
}
