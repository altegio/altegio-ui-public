import type { TAltSizes } from '~shared/types/global'

export type TAltCoreRatingSize = Extract<TAltSizes, 'small' | 'medium' | 'large'>

export interface IAltCoreRatingExternalProps {
  value: number
  max: number
  readonly: boolean | undefined
  disabled: boolean | undefined
  required: boolean | undefined
  size: TAltCoreRatingSize | undefined
  accessibleName: string | undefined
}

export const createCoreRatingExternalProps = (): IAltCoreRatingExternalProps => ({
  value: 0,
  max: 5,
  readonly: false,
  disabled: false,
  required: false,
  size: 'medium',
  accessibleName: undefined,
})
