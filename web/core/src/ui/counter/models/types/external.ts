import { EYSizes, type TYSizes } from '~shared/types/global'

export enum EYCoreCounterVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  NEGATIVE = 'negative',
  OTHER_INVERT = 'other-invert',
}

export type TYCoreCounterVariant = `${EYCoreCounterVariant}`

export interface IYCoreCounterExternalProps {
  variant: TYCoreCounterVariant
  size: Extract<TYSizes, 'small' | 'medium'> | undefined
  disabled: boolean | undefined
  value: number
  withPlusSign: boolean | undefined
  locator: string | undefined
}

export const createCoreCounterExternalProps = (): IYCoreCounterExternalProps => {
  return {
    variant: EYCoreCounterVariant.PRIMARY,
    size: EYSizes.SMALL,
    disabled: false,
    value: 0,
    withPlusSign: undefined,
    locator: undefined,
  }
}
