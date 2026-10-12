import {
  createCoreTextFieldProps,
  type IYCoreTextFieldProps,
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type ClearEvent,
  type KeydownEvent,
} from '~core/ui/textField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreTextFieldProps extends Omit<IYCoreTextFieldProps, 'value'> {
  modelValue: IYCoreTextFieldProps['value'] | undefined
}

export interface IYVueTextFieldProps {
  modelValue?: IYCoreTextFieldProps['value']
  name?: IYCoreTextFieldProps['name']
  placeholder?: IYCoreTextFieldProps['placeholder']
  disabled?: IYCoreTextFieldProps['disabled']
  required?: IYCoreTextFieldProps['required']
  readonly?: IYCoreTextFieldProps['readonly']
  maxlength?: IYCoreTextFieldProps['maxlength']
  autofocus?: IYCoreTextFieldProps['autofocus']
  type?: IYCoreTextFieldProps['type']
  error?: IYCoreTextFieldProps['error']
  errors?: IYCoreTextFieldProps['errors']
  clearable?: IYCoreTextFieldProps['clearable']
  maskOptions?: IYCoreTextFieldProps['maskOptions']
  size?: IYCoreTextFieldProps['size']
  labelText?: IYCoreTextFieldProps['labelText']
  labelTooltipText?: IYCoreTextFieldProps['labelTooltipText']
  annotationText?: IYCoreTextFieldProps['annotationText']
  labelDebounce?: IYCoreTextFieldProps['labelDebounce']
}

export const createVueTextFieldProps = (): TDefinedVueProps<IYVueTextFieldProps> => {
  const { error, errors, annotationText, labelText, labelTooltipText, labelDebounce, required, autofocus, clearable, maskOptions, size, disabled, maxlength, name, placeholder, readonly, type } = createCoreTextFieldProps()

  return {
    modelValue: undefined,
    name,
    placeholder,
    disabled,
    required,
    readonly,
    maxlength,
    autofocus,
    type,
    error,
    clearable,
    maskOptions: maskOptions
      ? () => maskOptions
      : undefined,
    size,
    labelText,
    labelTooltipText,
    annotationText,
    labelDebounce,
    errors: errors
      ? () => errors
      : undefined,
  }
}

export interface IYTextFieldEmits {
  (event: 'update:modelValue', payload: InputEvent['detail']['value']): void
  (event: 'blur', payload: BlurEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'clear', payload: ClearEvent): void
  (event: 'keydown', payload: KeydownEvent): void
}
