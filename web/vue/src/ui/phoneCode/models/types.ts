import {
  createCorePhoneCodeProps,
  type IYCorePhoneCodeProps,
} from '~core/ui/phoneCode/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCorePhoneCodeProps extends IYCorePhoneCodeProps {}

export interface IYVuePhoneCodeProps {
  disabled?: IYVueCorePhoneCodeProps['disabled']
  readonly?: IYVueCorePhoneCodeProps['readonly']
  size?: IYVueCorePhoneCodeProps['size']
  code?: IYVueCorePhoneCodeProps['code']
}

export const createVuePhoneCodeProps = (): TDefinedVueProps<IYVuePhoneCodeProps> => {
  const { disabled, readonly, size, code } = createCorePhoneCodeProps()

  return {
    disabled,
    readonly,
    size,
    code,
  }
}

export interface IYVuePhoneCodeEmits {
  (event: 'click', payload: Event): void
}
