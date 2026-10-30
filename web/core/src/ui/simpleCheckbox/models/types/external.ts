import { EAltSizes, type TAltSizes } from '~shared/types/global'

export interface IAltCoreSimpleCheckboxExternalProps {
  size: Extract<TAltSizes, 'small' | 'medium'> | undefined
  checked: boolean | undefined
  indeterminate: boolean | undefined
  disabled: boolean | undefined
  error: boolean | undefined
}

export const createCoreSimpleCheckboxExternalProps = (): IAltCoreSimpleCheckboxExternalProps => {
  return {
    size: EAltSizes.SMALL,
    checked: false,
    indeterminate: false,
    error: false,
    disabled: false,
  }
}
