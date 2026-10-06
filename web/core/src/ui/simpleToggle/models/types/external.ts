import type { TYSizes } from '~shared/types/global'
import { EYSizes } from '~shared/types/global'
import { DEFAULT_CHECKED_VALUE, DEFAULT_DISABLED_VALUE } from './constants'

export interface IYCoreSimpleToggleExternalProps {
  checked: boolean | undefined
  disabled: boolean | undefined
  size: Extract<TYSizes, 'small' | 'medium'> | undefined
}

export const createCoreSimpleToggleExternalProps = (): IYCoreSimpleToggleExternalProps => {
  return {
    size: EYSizes.SMALL,
    checked: DEFAULT_CHECKED_VALUE,
    disabled: DEFAULT_DISABLED_VALUE,
  }
}
