import {
  createCoreFieldTextareaProps,
  type IYCoreFieldTextareaProps,
  type InputEvent,
  type FocusEvent,
  type BlurEvent,
  type KeydownEvent,
} from '~core/ui/fieldTextarea/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreFieldTextareaProps extends Omit<IYCoreFieldTextareaProps, 'value'> {
  modelValue?: IYCoreFieldTextareaProps['value']
}

export interface IYVueFieldTextareaProps {
  disabled?: IYVueCoreFieldTextareaProps['disabled']
  size?: IYVueCoreFieldTextareaProps['size']
  readonly?: IYVueCoreFieldTextareaProps['readonly']
  modelValue?: IYVueCoreFieldTextareaProps['modelValue']
  name?: IYVueCoreFieldTextareaProps['name']
  placeholder?: IYVueCoreFieldTextareaProps['placeholder']
  required?: IYVueCoreFieldTextareaProps['required']
  maxlength?: IYVueCoreFieldTextareaProps['maxlength']
  autofocus?: IYVueCoreFieldTextareaProps['autofocus']
  rows?: IYVueCoreFieldTextareaProps['rows']
  resize?: IYVueCoreFieldTextareaProps['resize']
  hideSpaceLeft?: IYVueCoreFieldTextareaProps['hideSpaceLeft']
  hideSpaceRight?: IYVueCoreFieldTextareaProps['hideSpaceRight']
  autocomplete?: IYVueCoreFieldTextareaProps['autocomplete']
}

export const createVueFieldTextareaProps = (): TDefinedVueProps<IYVueFieldTextareaProps> => {
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

export interface IYVueFieldTextareaEmits {
  (e: 'update:modelValue', value: InputEvent['detail']['value']): void
  (e: 'focus', event: FocusEvent): void
  (e: 'blur', event: BlurEvent): void
  (e: 'keydown', event: KeydownEvent): void
  (e: 'render'): void
}
