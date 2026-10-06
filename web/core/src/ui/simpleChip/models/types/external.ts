import { EYSizes } from '~shared/types/global'

export enum EYCoreSimpleChipVariant {
  MUTED = 'muted',
  DANGER = 'danger',
  WARNING = 'warning',
}

export type TYCoreSimpleChipSize = Extract<EYSizes, 'small' | 'medium'>
export type TYCoreSimpleChipVariant = EYCoreSimpleChipVariant


export interface IYCoreSimpleChipExternalProps {
  size: TYCoreSimpleChipSize | undefined
  variant: TYCoreSimpleChipVariant | undefined
  disabled: boolean | undefined
  readonly: boolean | undefined
}

export const createCoreSimpleChipExternalProps = (): IYCoreSimpleChipExternalProps => ({
  size: EYSizes.SMALL,
  variant: EYCoreSimpleChipVariant.MUTED,
  disabled: undefined,
  readonly: undefined,
})
