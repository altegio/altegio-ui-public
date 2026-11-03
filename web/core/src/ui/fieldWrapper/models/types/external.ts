import { EAltSizes, type TAltSizes } from '~shared/types/global'

export interface IAltCoreFieldWrapperExternalProps {
  disabled: boolean | undefined
  readonly: boolean | undefined
  error: boolean | undefined
  size: Extract<TAltSizes, 'small' | 'medium' | 'large'> | undefined
  clickable: boolean | undefined
}

export const createCoreFieldWrapperExternalProps = (): IAltCoreFieldWrapperExternalProps => ({
  disabled: false,
  readonly: false,
  error: false,
  size: EAltSizes.MEDIUM,
  clickable: false,
})
