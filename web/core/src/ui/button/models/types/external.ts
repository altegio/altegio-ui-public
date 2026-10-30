import type { IAltIcon } from '~shared/icons'

import {
  type IAltCoreSimpleButtonExternalProps,
  createCoreSimpleButtonExternalProps,
} from '~core/ui/simpleButton/models/types'

export interface IAltCoreButtonExternalProps extends IAltCoreSimpleButtonExternalProps {
  label: string | undefined
  iconLeft: IAltIcon | undefined
  iconRight: IAltIcon | undefined
}

export const createCoreButtonExternalProps = (): IAltCoreButtonExternalProps => {
  const { disabled, loading, size, variant, href, target, alignment, fullWidth } = createCoreSimpleButtonExternalProps()
  return {
    disabled,
    loading,
    size,
    variant,
    href,
    target,
    alignment,
    fullWidth,
    label: undefined,
    iconLeft: undefined,
    iconRight: undefined,
  }
}

export { EAltCoreSimpleButtonVariant as EAltCoreButtonVariant } from '~core/ui/simpleButton/models/types'
export { EAltCoreSimpleButtonContentAlignment as EAltCoreButtonContentAlignment } from '~core/ui/simpleButton/models/types'
