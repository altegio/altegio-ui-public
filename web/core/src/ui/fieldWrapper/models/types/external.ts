import { EYSizes, type TYSizes } from '~shared/types/global'

export interface IYCoreFieldWrapperExternalProps {
  disabled: boolean | undefined
  readonly: boolean | undefined
  error: boolean | undefined
  size: Extract<TYSizes, 'small' | 'medium' | 'large'> | undefined
  clickable: boolean | undefined
}

export const createCoreFieldWrapperExternalProps = (): IYCoreFieldWrapperExternalProps => ({
  disabled: false,
  readonly: false,
  error: false,
  size: EYSizes.MEDIUM,
  clickable: false,
})
