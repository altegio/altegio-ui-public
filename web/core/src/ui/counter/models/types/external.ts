import { EAltSizes, type TAltSizes } from '~shared/types/global'

export enum EAltCoreCounterVariant {
  PRIMARY = 'primary',
  SECONDARY = 'secondary',
  NEGATIVE = 'negative',
  OTHER_INVERT = 'other-invert',
}

export type TAltCoreCounterVariant = `${EAltCoreCounterVariant}`

export interface IAltCoreCounterExternalProps {
  variant: TAltCoreCounterVariant
  size: Extract<TAltSizes, 'small' | 'medium'> | undefined
  disabled: boolean | undefined
  value: number
  withPlusSign: boolean | undefined
  locator: string | undefined
}

export const createCoreCounterExternalProps = (): IAltCoreCounterExternalProps => {
  return {
    variant: EAltCoreCounterVariant.PRIMARY,
    size: EAltSizes.SMALL,
    disabled: false,
    value: 0,
    withPlusSign: undefined,
    locator: undefined,
  }
}
