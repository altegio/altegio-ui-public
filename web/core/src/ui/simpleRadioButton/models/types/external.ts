import { EYSizes, type TYSizes } from '~shared/types/global'

export interface IYCoreSimpleRadioButtonExternalProps {
  size: Extract<TYSizes, 'small' | 'medium'> | undefined
  checked: boolean | undefined
  disabled: boolean | undefined
  error: boolean | undefined
  name: string | undefined
}

export const createCoreSimpleRadioButtonExternalProps = (): IYCoreSimpleRadioButtonExternalProps => {
  return {
    size: EYSizes.SMALL,
    checked: false,
    error: false,
    disabled: false,
    name: '',
  }
}
