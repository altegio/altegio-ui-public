import {
  createCorePhoneCodeProps,
  type IAltCorePhoneCodeProps,
} from '~core/ui/phoneCode/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCorePhoneCodeProps extends IAltCorePhoneCodeProps {}

export interface IAltVuePhoneCodeProps {
  disabled?: IAltVueCorePhoneCodeProps['disabled']
  readonly?: IAltVueCorePhoneCodeProps['readonly']
  size?: IAltVueCorePhoneCodeProps['size']
  code?: IAltVueCorePhoneCodeProps['code']
}

export const createVuePhoneCodeProps = (): TDefinedVueProps<IAltVuePhoneCodeProps> => {
  const { disabled, readonly, size, code } = createCorePhoneCodeProps()

  return {
    disabled,
    readonly,
    size,
    code,
  }
}

export interface IAltVuePhoneCodeEmits {
  (event: 'click', payload: Event): void
}
