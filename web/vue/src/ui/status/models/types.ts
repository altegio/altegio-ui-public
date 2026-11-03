import {
  createCoreStatusProps,
  type IAltCoreStatusProps,
} from '~core/ui/status/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueStatusProps {
  variant?: IAltCoreStatusProps['variant']
  text?: IAltCoreStatusProps['text']
  size?: IAltCoreStatusProps['size']
  icon?: IAltCoreStatusProps['icon']
}

export const createVueStatusProps = (): TDefinedVueProps<IAltVueStatusProps> => {
  const { variant, text, size, icon } = createCoreStatusProps()

  return {
    variant,
    text,
    size,
    icon: icon ? () => icon : undefined,
  }
}
