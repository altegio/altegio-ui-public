import { EAltSizes, type TAltSizes } from '~shared/types/global'

export interface IAltCoreSimpleRadioButtonExternalProps {
  size: Extract<TAltSizes, 'small' | 'medium'> | undefined
  checked: boolean | undefined
  disabled: boolean | undefined
  error: boolean | undefined
  name: string | undefined
}

export const createCoreSimpleRadioButtonExternalProps = (): IAltCoreSimpleRadioButtonExternalProps => {
  return {
    size: EAltSizes.SMALL,
    checked: false,
    error: false,
    disabled: false,
    name: '',
  }
}
