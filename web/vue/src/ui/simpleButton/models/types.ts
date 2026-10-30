import {
  createCoreSimpleButtonProps,
  type IAltCoreSimpleButtonProps,
} from '~core/ui/simpleButton/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreSimpleButtonProps extends IAltCoreSimpleButtonProps {}

export interface IAltVueSimpleButtonProps {
  size?: IAltVueCoreSimpleButtonProps['size']
  variant?: IAltVueCoreSimpleButtonProps['variant']
  disabled?: IAltVueCoreSimpleButtonProps['disabled']
  loading?: IAltVueCoreSimpleButtonProps['loading']
  href?: IAltVueCoreSimpleButtonProps['href']
  target?: IAltVueCoreSimpleButtonProps['target']
  alignment?: IAltVueCoreSimpleButtonProps['alignment']
  fullWidth?: IAltVueCoreSimpleButtonProps['fullWidth']
  hostStyles?: IAltVueCoreSimpleButtonProps['hostStyles']
  loaderVariant?: IAltVueCoreSimpleButtonProps['loaderVariant']
}

export const createVueSimpleButtonProps = (): TDefinedVueProps<IAltVueSimpleButtonProps> => {
  const { size, variant, disabled, loading, href, target, alignment, fullWidth, hostStyles, loaderVariant } = createCoreSimpleButtonProps()

  return {
    size,
    variant,
    disabled,
    loading,
    href,
    target,
    alignment,
    fullWidth,
    hostStyles,
    loaderVariant,
  }
}

export interface IAltVueSimpleButtonEmits {
  (event: 'click', payload: Event): void
}
