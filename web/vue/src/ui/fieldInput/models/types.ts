import {
  createCoreFieldInputProps,
  type IYCoreFieldInputProps,
  type InputEvent,
  type FocusEvent,
  type BlurEvent,
  type KeydownEvent,
} from '~core/ui/fieldInput/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreFieldInputProps extends Omit<IYCoreFieldInputProps, 'value'> {
  modelValue: IYCoreFieldInputProps['value'] | undefined
}

export interface IYVueFieldInputProps {
  disabled?: IYVueCoreFieldInputProps['disabled']
  size?: IYVueCoreFieldInputProps['size']
  readonly?: IYVueCoreFieldInputProps['readonly']
  modelValue?: IYVueCoreFieldInputProps['modelValue']
  name?: IYVueCoreFieldInputProps['name']
  type?: IYVueCoreFieldInputProps['type']
  placeholder?: IYVueCoreFieldInputProps['placeholder']
  required?: IYVueCoreFieldInputProps['required']
  maxlength?: IYVueCoreFieldInputProps['maxlength']
  autofocus?: IYVueCoreFieldInputProps['autofocus']
  autocomplete?: IYVueCoreFieldInputProps['autocomplete']
  hideSpaceLeft?: IYVueCoreFieldInputProps['hideSpaceLeft']
  hideSpaceRight?: IYVueCoreFieldInputProps['hideSpaceRight']
}

export const createVueFieldInputProps = (): TDefinedVueProps<IYVueFieldInputProps> => {
  const { disabled, size, readonly, value: modelValue, name, type, placeholder, required, maxlength, autofocus, hideSpaceLeft, hideSpaceRight, autocomplete } = createCoreFieldInputProps()

  return {
    disabled,
    size,
    readonly,
    modelValue,
    name,
    type,
    placeholder,
    required,
    maxlength,
    autofocus,
    hideSpaceLeft,
    hideSpaceRight,
    autocomplete,
  }
}

export interface IYVueFieldInputEmits {
  (e: 'update:modelValue', value: InputEvent['detail']['value']): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: BlurEvent): void
  (e: 'keydown', event: KeydownEvent): void
  (e: 'render'): void
}
