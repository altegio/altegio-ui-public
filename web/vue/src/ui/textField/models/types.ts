import {
  createCoreTextFieldProps,
  type IAltCoreTextFieldProps,
  type InputEvent,
  type BlurEvent,
  type FocusEvent,
  type ClearEvent,
  type KeydownEvent,
} from '~core/ui/textField/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreTextFieldProps extends Omit<IAltCoreTextFieldProps, 'value'> {
  modelValue: IAltCoreTextFieldProps['value'] | undefined
}

export interface IAltVueTextFieldProps {
  modelValue?: IAltCoreTextFieldProps['value']
  name?: IAltCoreTextFieldProps['name']
  placeholder?: IAltCoreTextFieldProps['placeholder']
  disabled?: IAltCoreTextFieldProps['disabled']
  required?: IAltCoreTextFieldProps['required']
  readonly?: IAltCoreTextFieldProps['readonly']
  maxlength?: IAltCoreTextFieldProps['maxlength']
  autofocus?: IAltCoreTextFieldProps['autofocus']
  type?: IAltCoreTextFieldProps['type']
  error?: IAltCoreTextFieldProps['error']
  errors?: IAltCoreTextFieldProps['errors']
  clearable?: IAltCoreTextFieldProps['clearable']
  maskOptions?: IAltCoreTextFieldProps['maskOptions']
  size?: IAltCoreTextFieldProps['size']
  labelText?: IAltCoreTextFieldProps['labelText']
  labelTooltipText?: IAltCoreTextFieldProps['labelTooltipText']
  annotationText?: IAltCoreTextFieldProps['annotationText']
  labelDebounce?: IAltCoreTextFieldProps['labelDebounce']
}

export const createVueTextFieldProps = (): TDefinedVueProps<IAltVueTextFieldProps> => {
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

export interface IAltTextFieldEmits {
  (event: 'update:modelValue', payload: InputEvent['detail']['value']): void
  (event: 'blur', payload: BlurEvent): void
  (event: 'focus', payload: FocusEvent): void
  (event: 'clear', payload: ClearEvent): void
  (event: 'keydown', payload: KeydownEvent): void
}
