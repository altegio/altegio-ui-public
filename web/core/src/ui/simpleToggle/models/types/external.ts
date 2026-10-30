import type { TAltSizes } from '~shared/types/global'
import { EAltSizes } from '~shared/types/global'
import { DEFAULT_CHECKED_VALUE, DEFAULT_DISABLED_VALUE } from './constants'

export interface IAltCoreSimpleToggleExternalProps {
  checked: boolean | undefined
  disabled: boolean | undefined
  size: Extract<TAltSizes, 'small' | 'medium'> | undefined
}

export const createCoreSimpleToggleExternalProps = (): IAltCoreSimpleToggleExternalProps => {
  return {
    size: EAltSizes.SMALL,
    checked: DEFAULT_CHECKED_VALUE,
    disabled: DEFAULT_DISABLED_VALUE,
  }
}
