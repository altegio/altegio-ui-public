import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreIconButtonProps,
  type IAltCoreIconButtonProps,
} from '~core/ui/iconButton/models/types'

export interface IAltVueCoreIconButtonProps extends IAltCoreIconButtonProps {}

export interface IAltVueIconButtonProps {
  icon: IAltVueCoreIconButtonProps['icon']
  size?: IAltVueCoreIconButtonProps['size']
  variant?: IAltVueCoreIconButtonProps['variant']
  disabled?: IAltVueCoreIconButtonProps['disabled']
  loading?: IAltVueCoreIconButtonProps['loading']
  href?: IAltVueCoreIconButtonProps['href']
  target?: IAltVueCoreIconButtonProps['target']
  fullWidth?: IAltVueCoreIconButtonProps['fullWidth']
}

export const createVueIconButtonProps = (): TDefinedVueProps<IAltVueIconButtonProps> => {
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
