import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreCardIconProps, type IAltCoreCardIconProps } from '~core/ui/cardIcon/models/types'

export interface IAltVueCoreCardIconProps extends IAltCoreCardIconProps {}

export interface IAltVueCardIconProps {
  icon: IAltVueCoreCardIconProps['icon']
  disabled?: IAltVueCoreCardIconProps['disabled']
  size?: IAltVueCoreCardIconProps['size']
  variant?: IAltVueCoreCardIconProps['variant']
}

export const createVueCardIconProps = (): TDefinedVueProps<IAltVueCardIconProps> => {
  const { disabled, size, variant } = createCoreCardIconProps()

  return {
    disabled,
    size,
    variant,
  }
}
