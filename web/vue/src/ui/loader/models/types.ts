import type { TDefinedVueProps } from '~vue/utils/utility-types'

import {
  type IAltCoreLoaderProps,
  createCoreLoaderProps,
} from '~core/ui/loader/models/types'

export interface IAltVueCoreLoaderProps extends IAltCoreLoaderProps {}

export interface IAltVueLoaderProps {
  size?: IAltVueCoreLoaderProps['size']
  variant?: IAltVueCoreLoaderProps['variant']
}

export const createVueLoaderProps = (): TDefinedVueProps<IAltVueLoaderProps> => {
  const { size, variant } = createCoreLoaderProps()

  return {
    size,
    variant,
  }
}
