import {
  createCoreSimpleButtonProps,
  type IYCoreSimpleButtonProps,
} from '~core/ui/simpleButton/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreSimpleButtonProps extends IYCoreSimpleButtonProps {}

export interface IYVueSimpleButtonProps {
  size?: IYVueCoreSimpleButtonProps['size']
  variant?: IYVueCoreSimpleButtonProps['variant']
  disabled?: IYVueCoreSimpleButtonProps['disabled']
  loading?: IYVueCoreSimpleButtonProps['loading']
  href?: IYVueCoreSimpleButtonProps['href']
  target?: IYVueCoreSimpleButtonProps['target']
  alignment?: IYVueCoreSimpleButtonProps['alignment']
  fullWidth?: IYVueCoreSimpleButtonProps['fullWidth']
  hostStyles?: IYVueCoreSimpleButtonProps['hostStyles']
  loaderVariant?: IYVueCoreSimpleButtonProps['loaderVariant']
}

export const createVueSimpleButtonProps = (): TDefinedVueProps<IYVueSimpleButtonProps> => {
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

export interface IYVueSimpleButtonEmits {
  (event: 'click', payload: Event): void
}
