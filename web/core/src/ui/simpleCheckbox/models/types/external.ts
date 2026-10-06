import { EYSizes, type TYSizes } from '~shared/types/global'

export interface IYCoreSimpleCheckboxExternalProps {
  size: Extract<TYSizes, 'small' | 'medium'> | undefined
  checked: boolean | undefined
  indeterminate: boolean | undefined
  disabled: boolean | undefined
  error: boolean | undefined
}

export const createCoreSimpleCheckboxExternalProps = (): IYCoreSimpleCheckboxExternalProps => {
  return {
    size: EYSizes.SMALL,
    checked: false,
    indeterminate: false,
    error: false,
    disabled: false,
  }
}
