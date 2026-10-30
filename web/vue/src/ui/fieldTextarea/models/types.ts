import {
  createCoreFieldTextareaProps,
  type IAltCoreFieldTextareaProps,
  type InputEvent,
  type FocusEvent,
  type BlurEvent,
  type KeydownEvent,
} from '~core/ui/fieldTextarea/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreFieldTextareaProps extends Omit<IAltCoreFieldTextareaProps, 'value'> {
  modelValue?: IAltCoreFieldTextareaProps['value']
}

export interface IAltVueFieldTextareaProps {
  disabled?: IAltVueCoreFieldTextareaProps['disabled']
  size?: IAltVueCoreFieldTextareaProps['size']
  readonly?: IAltVueCoreFieldTextareaProps['readonly']
  modelValue?: IAltVueCoreFieldTextareaProps['modelValue']
  name?: IAltVueCoreFieldTextareaProps['name']
  placeholder?: IAltVueCoreFieldTextareaProps['placeholder']
  required?: IAltVueCoreFieldTextareaProps['required']
  maxlength?: IAltVueCoreFieldTextareaProps['maxlength']
  autofocus?: IAltVueCoreFieldTextareaProps['autofocus']
  rows?: IAltVueCoreFieldTextareaProps['rows']
  resize?: IAltVueCoreFieldTextareaProps['resize']
  hideSpaceLeft?: IAltVueCoreFieldTextareaProps['hideSpaceLeft']
  hideSpaceRight?: IAltVueCoreFieldTextareaProps['hideSpaceRight']
  autocomplete?: IAltVueCoreFieldTextareaProps['autocomplete']
}

export const createVueFieldTextareaProps = (): TDefinedVueProps<IAltVueFieldTextareaProps> => {
  const { disabled, size, readonly, value: modelValue, name, placeholder, required, maxlength, autofocus, rows, resize, hideSpaceLeft, hideSpaceRight, autocomplete } = createCoreFieldTextareaProps()

  return {
    disabled,
    size,
    readonly,
    modelValue,
    name,
    placeholder,
    required,
    maxlength,
    autofocus,
    rows,
    resize,
    hideSpaceLeft,
    hideSpaceRight,
    autocomplete,
  }
}

export interface IAltVueFieldTextareaEmits {
  (e: 'update:modelValue', value: InputEvent['detail']['value']): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: BlurEvent): void
  (e: 'keydown', event: KeydownEvent): void
  (e: 'render'): void
}
