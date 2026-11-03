import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreColorIconProps, type IAltCoreColorIconProps } from '~core/ui/colorIcon/models/types'

export interface IAltVueCoreColorIconProps extends IAltCoreColorIconProps {}

export interface IAltVueColorIconProps {
  icon: IAltVueCoreColorIconProps['icon']
  size?: IAltVueCoreColorIconProps['size']
  variant?: IAltVueCoreColorIconProps['variant']
  disabled?: IAltVueCoreColorIconProps['disabled']
}

export const createVueColorIconProps = (): TDefinedVueProps<IAltVueColorIconProps> => {
  const { size, variant, disabled } = createCoreColorIconProps()

  return {
    size,
    variant,
    disabled,
  }
}
