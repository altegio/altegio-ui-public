import { EAltSizes } from '~shared/types/global'
import type { TAltSizes } from '~shared/types/global'
import type { IAltIcon } from '~shared/icons'

export type TAltCoreChipSize = Extract<TAltSizes, 'small' | 'large'>

export interface IAltCoreChipExternalProps {
  labelText: string
  iconLeft: IAltIcon | undefined
  size: TAltCoreChipSize | undefined
  active: boolean | undefined
  disabled: boolean | undefined
}

export const createCoreChipExternalProps = (): IAltCoreChipExternalProps => ({
  labelText: '',
  size: EAltSizes.SMALL,
  iconLeft: undefined,
  active: undefined,
  disabled: undefined,
})
