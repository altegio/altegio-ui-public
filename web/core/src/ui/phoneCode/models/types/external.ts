import { pick } from 'radash'

import type { TAltCountry } from '~shared/types/country'
import type { TAltSizes } from '~shared/types/global'
import { EAltSizes } from '~shared/types/global'
import { EAltCoreTextSize } from '~core/ui/text/models/types'
import {
  createCoreFieldWrapperProps,
  type IAltCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'

type TPhoneCodeSize = Extract<TAltSizes, 'small' | 'medium' | 'large'>

export const ICON_SIZES: Record<TPhoneCodeSize, string> = {
  [EAltSizes.SMALL]: '16px',
  [EAltSizes.MEDIUM]: '20px',
  [EAltSizes.LARGE]: '24px',
} as const

export const TEXT_SIZES: Record<TPhoneCodeSize, EAltCoreTextSize> = {
  [EAltSizes.SMALL]: EAltCoreTextSize.P2_REGULAR,
  [EAltSizes.MEDIUM]: EAltCoreTextSize.P1_REGULAR,
  [EAltSizes.LARGE]: EAltCoreTextSize.P1_REGULAR,
} as const

export interface IAltCorePhoneCodeExternalProps extends
  Pick<IAltCoreFieldWrapperProps, 'disabled' | 'size' | 'readonly'> {
  code: TAltCountry['code'] | undefined
}

export const createCorePhoneCodeExternalProps = (): IAltCorePhoneCodeExternalProps => {
  return {
    ...pick(createCoreFieldWrapperProps(), ['disabled', 'size', 'readonly']),
    code: undefined,
  }
}
