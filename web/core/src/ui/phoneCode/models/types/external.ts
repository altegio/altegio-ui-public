import { pick } from 'radash'

import type { TYCountry } from '~shared/types/country'
import type { TYSizes } from '~shared/types/global'
import { EYSizes } from '~shared/types/global'
import { EYCoreTextSize } from '~core/ui/text/models/types'
import {
  createCoreFieldWrapperProps,
  type IYCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'

type TPhoneCodeSize = Extract<TYSizes, 'small' | 'medium' | 'large'>

export const ICON_SIZES: Record<TPhoneCodeSize, string> = {
  [EYSizes.SMALL]: '16px',
  [EYSizes.MEDIUM]: '20px',
  [EYSizes.LARGE]: '24px',
} as const

export const TEXT_SIZES: Record<TPhoneCodeSize, EYCoreTextSize> = {
  [EYSizes.SMALL]: EYCoreTextSize.P2_REGULAR,
  [EYSizes.MEDIUM]: EYCoreTextSize.P1_REGULAR,
  [EYSizes.LARGE]: EYCoreTextSize.P1_REGULAR,
} as const

export interface IYCorePhoneCodeExternalProps extends
  Pick<IYCoreFieldWrapperProps, 'disabled' | 'size' | 'readonly'> {
  code: TYCountry['code'] | undefined
}

export const createCorePhoneCodeExternalProps = (): IYCorePhoneCodeExternalProps => {
  return {
    ...pick(createCoreFieldWrapperProps(), ['disabled', 'size', 'readonly']),
    code: undefined,
  }
}
