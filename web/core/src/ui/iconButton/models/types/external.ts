import type { IAltIcon } from '~shared/icons'

import {
  type IAltCoreSimpleButtonExternalProps,
  createCoreSimpleButtonExternalProps,
} from '~core/ui/simpleButton/models/types'

export interface IAltCoreIconButtonExternalProps extends Omit<IAltCoreSimpleButtonExternalProps, 'hostStyles' | 'alignment'> {
  icon: IAltIcon | undefined
}

export const createCoreIconButtonExternalProps = (): IAltCoreIconButtonExternalProps => {
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
