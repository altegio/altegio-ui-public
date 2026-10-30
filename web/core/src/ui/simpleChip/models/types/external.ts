import { EAltSizes } from '~shared/types/global'

export enum EAltCoreSimpleChipVariant {
  MUTED = 'muted',
  DANGER = 'danger',
  WARNING = 'warning',
}

export type TAltCoreSimpleChipSize = Extract<EAltSizes, 'small' | 'medium'>
export type TAltCoreSimpleChipVariant = EAltCoreSimpleChipVariant


export interface IAltCoreSimpleChipExternalProps {
  size: TAltCoreSimpleChipSize | undefined
  variant: TAltCoreSimpleChipVariant | undefined
  disabled: boolean | undefined
  readonly: boolean | undefined
}

export const createCoreSimpleChipExternalProps = (): IAltCoreSimpleChipExternalProps => ({
  size: EAltSizes.SMALL,
  variant: EAltCoreSimpleChipVariant.MUTED,
  disabled: undefined,
  readonly: undefined,
})
