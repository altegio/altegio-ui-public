import type { TDefinedVueProps } from '~vue/utils/utility-types'
import {
  createCoreButtonProps,
  type IAltCoreButtonProps,
} from '~core/ui/button/models/types'

export interface IAltVueCoreButtonProps extends IAltCoreButtonProps {}

export interface IAltVueButtonProps {
  size?: IAltVueCoreButtonProps['size']
  variant?: IAltVueCoreButtonProps['variant']
  label?: IAltVueCoreButtonProps['label']
  disabled?: IAltVueCoreButtonProps['disabled']
  loading?: IAltVueCoreButtonProps['loading']
  href?: IAltVueCoreButtonProps['href']
  alignment?: IAltVueCoreButtonProps['alignment']
  fullWidth?: IAltVueCoreButtonProps['fullWidth']
  target?: IAltVueCoreButtonProps['target']
  type?: IAltVueCoreButtonProps['type']
  iconLeft?: IAltVueCoreButtonProps['iconLeft']
  iconRight?: IAltVueCoreButtonProps['iconRight']
  accessibleName?: IAltVueCoreButtonProps['accessibleName']
}

export const createVueButtonProps = (): TDefinedVueProps<IAltVueButtonProps> => {
  const { disabled, href, iconLeft, iconRight, label, loading, size, variant, target, alignment, fullWidth, type, accessibleName } = createCoreButtonProps()
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
    type,
    iconLeft: iconLeft
      ? () => iconLeft
      : undefined,
    iconRight: iconRight
      ? () => iconRight
      : undefined,
    accessibleName,
  }
}

export interface IAltVueButtonEmits {
  (e: 'click', value: PointerEvent): void
}
