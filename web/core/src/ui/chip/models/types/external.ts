import { EYSizes } from '~shared/types/global'
import type { TYSizes } from '~shared/types/global'
import type { IYIcon } from '~shared/icons'

export type TYCoreChipSize = Extract<TYSizes, 'small' | 'large'>

export interface IYCoreChipExternalProps {
  labelText: string
  iconLeft: IYIcon | undefined
  size: TYCoreChipSize | undefined
  active: boolean | undefined
  disabled: boolean | undefined
}

export const createCoreChipExternalProps = (): IYCoreChipExternalProps => ({
  labelText: '',
  size: EYSizes.SMALL,
  iconLeft: undefined,
  active: undefined,
  disabled: undefined,
})
