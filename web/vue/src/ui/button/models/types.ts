import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreButtonProps,
  type IYCoreButtonProps,
} from '~core/ui/button/models/types'

export interface IYVueCoreButtonProps extends IYCoreButtonProps {}

export interface IYVueButtonProps {
  size?: IYVueCoreButtonProps['size']
  variant?: IYVueCoreButtonProps['variant']
  label?: IYVueCoreButtonProps['label']
  disabled?: IYVueCoreButtonProps['disabled']
  loading?: IYVueCoreButtonProps['loading']
  href?: IYVueCoreButtonProps['href']
  alignment?: IYVueCoreButtonProps['alignment']
  fullWidth?: IYVueCoreButtonProps['fullWidth']
  target?: IYVueCoreButtonProps['target']
  iconLeft?: IYVueCoreButtonProps['iconLeft']
  iconRight?: IYVueCoreButtonProps['iconRight']
}

export const createVueButtonProps = (): TDefinedVueProps<IYVueButtonProps> => {
  const { disabled, href, iconLeft, iconRight, label, loading, size, variant, target, alignment, fullWidth } = createCoreButtonProps()
  return {
    disabled,
    href,
    label,
    loading,
    size,
    variant,
    target,
    alignment,
    fullWidth,
    iconLeft: iconLeft
      ? () => iconLeft
      : undefined,
    iconRight: iconRight
      ? () => iconRight
      : undefined,
  }
}

export interface IYVueButtonEmits {
  (e: 'click', value: PointerEvent): void
}
