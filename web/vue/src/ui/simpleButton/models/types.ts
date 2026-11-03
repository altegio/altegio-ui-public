import {
  createCoreSimpleButtonProps,
  type IAltCoreSimpleButtonProps,
} from '~core/ui/simpleButton/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

// accessibleCurrent is set by core components only
export interface IAltVueCoreSimpleButtonProps extends Omit<IAltCoreSimpleButtonProps, 'accessibleCurrent'> {}

export interface IAltVueSimpleButtonProps {
  size?: IAltVueCoreSimpleButtonProps['size']
  variant?: IAltVueCoreSimpleButtonProps['variant']
  disabled?: IAltVueCoreSimpleButtonProps['disabled']
  loading?: IAltVueCoreSimpleButtonProps['loading']
  href?: IAltVueCoreSimpleButtonProps['href']
  target?: IAltVueCoreSimpleButtonProps['target']
  alignment?: IAltVueCoreSimpleButtonProps['alignment']
  fullWidth?: IAltVueCoreSimpleButtonProps['fullWidth']
  type?: IAltVueCoreSimpleButtonProps['type']
  hostStyles?: IAltVueCoreSimpleButtonProps['hostStyles']
  loaderVariant?: IAltVueCoreSimpleButtonProps['loaderVariant']
  accessibleName?: IAltVueCoreSimpleButtonProps['accessibleName']
}

export const createVueSimpleButtonProps = (): TDefinedVueProps<IAltVueSimpleButtonProps> => {
  const { size, variant, disabled, loading, href, target, alignment, fullWidth, type, hostStyles, loaderVariant, accessibleName } = createCoreSimpleButtonProps()

  return {
    size,
    variant,
    disabled,
    loading,
    href,
    target,
    alignment,
    fullWidth,
    type,
    hostStyles,
    loaderVariant,
    accessibleName,
  }
}

export interface IAltVueSimpleButtonEmits {
  (event: 'click', payload: Event): void
}
