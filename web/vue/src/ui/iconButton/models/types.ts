import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreIconButtonProps,
  type IYCoreIconButtonProps,
} from '~core/ui/iconButton/models/types'

export interface IYVueCoreIconButtonProps extends IYCoreIconButtonProps {}

export interface IYVueIconButtonProps {
  icon: IYVueCoreIconButtonProps['icon']
  size?: IYVueCoreIconButtonProps['size']
  variant?: IYVueCoreIconButtonProps['variant']
  disabled?: IYVueCoreIconButtonProps['disabled']
  loading?: IYVueCoreIconButtonProps['loading']
  href?: IYVueCoreIconButtonProps['href']
  target?: IYVueCoreIconButtonProps['target']
  fullWidth?: IYVueCoreIconButtonProps['fullWidth']
}

export const createVueIconButtonProps = (): TDefinedVueProps<IYVueIconButtonProps> => {
  const { size, variant, disabled, loading, href, target, fullWidth } = createCoreIconButtonProps()

  return {
    size,
    variant,
    disabled,
    loading,
    href,
    target,
    fullWidth,
  }
}
