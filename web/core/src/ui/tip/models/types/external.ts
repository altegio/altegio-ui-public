import {
  createCoreDropdownExternalProps,
  type IAltCoreDropdownExternalProps,
} from '~core/ui/dropdown/models/types'
import { SIZES } from '~tokens/index'

export enum EAltCoreTipType {
  INVERT = 'invert',
  PRIMARY = 'primary',
}

export type TAltCoreTipType = `${EAltCoreTipType}`

export interface IAltCoreTipExternalProps extends IAltCoreDropdownExternalProps {
  type: TAltCoreTipType | undefined
}

export const createCoreTipExternalProps = (): IAltCoreTipExternalProps => ({
  ...createCoreDropdownExternalProps(),
  type: EAltCoreTipType.INVERT,
  padding: Number(SIZES.spacing_4_x.value) || 16,
  offset: Number(SIZES.spacing_2_x.value) || 8,
})
