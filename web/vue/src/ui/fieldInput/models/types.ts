import {
  createCoreFieldInputProps,
  type IAltCoreFieldInputProps,
  type InputEvent,
  type FocusEvent,
  type BlurEvent,
  type KeydownEvent,
} from '~core/ui/fieldInput/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreFieldInputProps extends Omit<IAltCoreFieldInputProps, 'value'> {
  modelValue: IAltCoreFieldInputProps['value'] | undefined
}

export interface IAltVueFieldInputProps {
  disabled?: IAltVueCoreFieldInputProps['disabled']
  size?: IAltVueCoreFieldInputProps['size']
  readonly?: IAltVueCoreFieldInputProps['readonly']
  modelValue?: IAltVueCoreFieldInputProps['modelValue']
  name?: IAltVueCoreFieldInputProps['name']
  type?: IAltVueCoreFieldInputProps['type']
  placeholder?: IAltVueCoreFieldInputProps['placeholder']
  required?: IAltVueCoreFieldInputProps['required']
  maxlength?: IAltVueCoreFieldInputProps['maxlength']
  autofocus?: IAltVueCoreFieldInputProps['autofocus']
  autocomplete?: IAltVueCoreFieldInputProps['autocomplete']
  hideSpaceLeft?: IAltVueCoreFieldInputProps['hideSpaceLeft']
  hideSpaceRight?: IAltVueCoreFieldInputProps['hideSpaceRight']
}

export const createVueFieldInputProps = (): TDefinedVueProps<IAltVueFieldInputProps> => {
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

export interface IAltVueFieldInputEmits {
  (e: 'update:modelValue', value: InputEvent['detail']['value']): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: BlurEvent): void
  (e: 'keydown', event: KeydownEvent): void
  (e: 'render'): void
}
