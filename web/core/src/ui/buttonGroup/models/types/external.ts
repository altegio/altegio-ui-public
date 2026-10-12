import { EYSizes, type TYSizes } from '~shared/types/global'
import { EYCoreSimpleButtonVariant } from '~core/ui/simpleButton/models/types/external'

export enum EYCoreButtonGroupVariant {
  PRIMARY = 'primary',
  OUTLINE = 'outline',
  OUTLINE_FILLED = 'outline-filled',
}

export type TYCoreButtonGroupVariant = `${EYCoreButtonGroupVariant}`

export interface IYCoreButtonGroupExternalProps {
  size: Extract<TYSizes, 'small' | 'medium' | 'large'>
  variant: TYCoreButtonGroupVariant
}

export const createCoreButtonGroupExternalProps = (): IYCoreButtonGroupExternalProps => {
  return {
    size: EYSizes.SMALL,
    variant: EYCoreSimpleButtonVariant.PRIMARY,
  }
}
