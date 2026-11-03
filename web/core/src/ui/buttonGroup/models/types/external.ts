import { EAltSizes, type TAltSizes } from '~shared/types/global'
import { EAltCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types/external'

export enum EAltCoreButtonGroupVariant {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
  OUTLINE_FILLED = 'outline-filled',
}

export type TAltCoreButtonGroupVariant = `${EAltCoreButtonGroupVariant}`

export interface IAltCoreButtonGroupExternalProps {
  size: Extract<TAltSizes, 'small' | 'medium' | 'large'>
  variant: TAltCoreButtonGroupVariant
}

export const createCoreButtonGroupExternalProps = (): IAltCoreButtonGroupExternalProps => {
  return {
    size: EAltSizes.SMALL,
    variant: EAltCoreSimpleButtonVariant.PRIMARY,
  }
}
