import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreColorIconProps, type IYCoreColorIconProps } from '~core/ui/colorIcon/models/types'

export interface IYVueCoreColorIconProps extends IYCoreColorIconProps {}

export interface IYVueColorIconProps {
  icon: IYVueCoreColorIconProps['icon']
  size?: IYVueCoreColorIconProps['size']
  variant?: IYVueCoreColorIconProps['variant']
  disabled?: IYVueCoreColorIconProps['disabled']
}

export const createVueColorIconProps = (): TDefinedVueProps<IYVueColorIconProps> => {
  const { size, variant, disabled } = createCoreColorIconProps()

  return {
    size,
    variant,
    disabled,
  }
}
