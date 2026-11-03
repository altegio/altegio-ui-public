import { EAltSizes, type TAltSizes } from '~shared/types/global'

export interface IAltCoreCardWrapperExternalProps {
  checked: boolean | undefined
  disabled: boolean | undefined
  hoverable: boolean | undefined
  focusable: boolean | undefined
  size: Extract<TAltSizes, 'small' | 'medium' | 'large'> | undefined
}

export const createCoreCardWrapperExternalProps = (): IAltCoreCardWrapperExternalProps => ({
  checked: false,
  disabled: false,
  hoverable: true,
  focusable: false,
  size: EAltSizes.MEDIUM,
})
