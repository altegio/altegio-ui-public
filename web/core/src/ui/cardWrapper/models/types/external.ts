import { EYSizes, type TYSizes } from '~shared/types/global'

export interface IYCoreCardWrapperExternalProps {
  checked: boolean | undefined
  disabled: boolean | undefined
  hoverable: boolean | undefined
  focusable: boolean | undefined
  size: Extract<TYSizes, 'small' | 'medium' | 'large'> | undefined
}

export const createCoreCardWrapperExternalProps = (): IYCoreCardWrapperExternalProps => ({
  checked: false,
  disabled: false,
  hoverable: true,
  focusable: false,
  size: EYSizes.MEDIUM,
})
