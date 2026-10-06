import {
  createCoreDropdownExternalProps,
  type IYCoreDropdownExternalProps,
} from '~core/ui/dropdown/models/types'
import { SIZES } from '~tokens/index'

export enum EYCoreTipType {
  INVERT = 'invert',
  PRIMARY = 'primary',
}

export type TYCoreTipType = `${EYCoreTipType}`

export interface IYCoreTipExternalProps extends IYCoreDropdownExternalProps {
  type: TYCoreTipType | undefined
}

export const createCoreTipExternalProps = (): IYCoreTipExternalProps => ({
  ...createCoreDropdownExternalProps(),
  type: EYCoreTipType.INVERT,
  padding: Number(SIZES.spacing_4_x.value) || 16,
  offset: Number(SIZES.spacing_2_x.value) || 8,
})
