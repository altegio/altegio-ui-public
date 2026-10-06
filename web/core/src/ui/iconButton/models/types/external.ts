import type { IYIcon } from '~shared/icons'

import {
  type IYCoreSimpleButtonExternalProps,
  createCoreSimpleButtonExternalProps,
} from '~core/ui/simpleButton/models/types'

export interface IYCoreIconButtonExternalProps extends Omit<IYCoreSimpleButtonExternalProps, 'hostStyles' | 'alignment'> {
  icon: IYIcon | undefined
}

export const createCoreIconButtonExternalProps = (): IYCoreIconButtonExternalProps => {
  const { disabled, loading, size, href, target, variant, fullWidth } = createCoreSimpleButtonExternalProps()
  return {
    disabled,
    loading,
    size,
    variant,
    href,
    target,
    fullWidth,
    icon: undefined,
  }
}
