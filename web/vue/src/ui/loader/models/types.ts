import type { TDefinedVueProps } from '~vue/utils/utility-types'

import {
  type IYCoreLoaderProps,
  createCoreLoaderProps,
} from '~core/ui/loader/models/types'

export interface IYVueCoreLoaderProps extends IYCoreLoaderProps {}

export interface IYVueLoaderProps {
  size?: IYVueCoreLoaderProps['size']
  variant?: IYVueCoreLoaderProps['variant']
}

export const createVueLoaderProps = (): TDefinedVueProps<IYVueLoaderProps> => {
  const { size, variant } = createCoreLoaderProps()

  return {
    size,
    variant,
  }
}
