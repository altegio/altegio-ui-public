import type { TDefinedVueProps } from '~vue/utils/utility-types'
import { createCoreCardIconProps, type IYCoreCardIconProps } from '~core/ui/cardIcon/models/types'

export interface IYVueCoreCardIconProps extends IYCoreCardIconProps {}

export interface IYVueCardIconProps {
  icon: IYVueCoreCardIconProps['icon']
  disabled?: IYVueCoreCardIconProps['disabled']
  size?: IYVueCoreCardIconProps['size']
  variant?: IYVueCoreCardIconProps['variant']
}

export const createVueCardIconProps = (): TDefinedVueProps<IYVueCardIconProps> => {
  const { disabled, size, variant } = createCoreCardIconProps()

  return {
    disabled,
    size,
    variant,
  }
}
