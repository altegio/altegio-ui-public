import type { IYIcon } from '~shared/icons'

import {
  type IYCoreSimpleButtonExternalProps,
  createCoreSimpleButtonExternalProps,
} from '~core/ui/simpleButton/models/types'

export interface IYCoreButtonExternalProps extends IYCoreSimpleButtonExternalProps {
  label: string | undefined
  iconLeft: IYIcon | undefined
  iconRight: IYIcon | undefined
}

export const createCoreButtonExternalProps = (): IYCoreButtonExternalProps => {
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

export { EYCoreSimpleButtonVariant as EYCoreButtonVariant } from '~core/ui/simpleButton/models/types'
export { EYCoreSimpleButtonContentAlignment as EYCoreButtonContentAlignment } from '~core/ui/simpleButton/models/types'
