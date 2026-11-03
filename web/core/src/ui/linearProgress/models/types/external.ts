import type { TAltSizes } from '~shared/types/global'

export type TAltCoreLinearProgressSize = Extract<TAltSizes, 'small' | 'medium'>

export enum EAltCoreLinearProgressVariant {
  ACCENT = 'accent',
  POSITIVE = 'positive',
  NEGATIVE = 'negative',
}

export type TAltCoreLinearProgressVariant = `${EAltCoreLinearProgressVariant}`

export interface IAltCoreLinearProgressExternalProps {
  value: number
  max: number
  indeterminate: boolean | undefined
  size: TAltCoreLinearProgressSize | undefined
  variant: TAltCoreLinearProgressVariant | undefined
  accessibleName: string | undefined
  valueText: string | undefined
}

export const createCoreLinearProgressExternalProps = (): IAltCoreLinearProgressExternalProps => ({
  value: 0,
  max: 100,
  indeterminate: false,
  size: 'small',
  variant: EAltCoreLinearProgressVariant.ACCENT,
  accessibleName: undefined,
  valueText: undefined,
})
