import {
  createCoreTextareaProps,
  type IYCoreTextareaProps,
  type BlurEvent,
  type FocusEvent,
  type KeydownEvent,
  type MouseEnterEvent,
  type MouseLeaveEvent,
  type ClickOutsideEvent,
  type ClearEvent,
  type RenderEvent,
} from '~core/ui/textarea/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreTextareaProps extends Omit<IYCoreTextareaProps, 'value'> {
  modelValue?: IYCoreTextareaProps['value']
}

export interface IYVueTextareaProps {
  modelValue?: IYVueCoreTextareaProps['modelValue']
  name?: IYVueCoreTextareaProps['name']
  placeholder?: IYVueCoreTextareaProps['placeholder']
  maxlength?: IYVueCoreTextareaProps['maxlength']
  required?: IYVueCoreTextareaProps['required']
  autofocus?: IYVueCoreTextareaProps['autofocus']
  labelText?: IYVueCoreTextareaProps['labelText']
  labelTooltipText?: IYVueCoreTextareaProps['labelTooltipText']
  labelDebounce?: IYVueCoreTextareaProps['labelDebounce']
  errors?: IYVueCoreTextareaProps['errors']
  clearable?: IYVueCoreTextareaProps['clearable']
  rows?: IYVueCoreTextareaProps['rows']
  resize?: IYVueCoreTextareaProps['resize']
  disabled?: IYVueCoreTextareaProps['disabled']
  size?: IYVueCoreTextareaProps['size']
  readonly?: IYVueCoreTextareaProps['readonly']
  error?: IYVueCoreTextareaProps['error']
}

export interface IYVueTextareaEmits {
  'update:modelValue': [value: string | undefined]
  blur: [event: BlurEvent]
  focus: [event: FocusEvent]
  keydown: [event: KeydownEvent]
  'mouse-enter': [event: MouseEnterEvent]
  'mouse-leave': [event: MouseLeaveEvent]
  click: [event: Event]
  'click-outside': [event: ClickOutsideEvent]
  clear: [event: ClearEvent]
  'render-textarea': [event: RenderEvent]
}

export const createVueTextareaProps = (): TDefinedVueProps<IYVueTextareaProps> => {
  const { value, errors, autofocus, clearable, rows, resize, disabled, size, readonly, error, labelDebounce, labelText, labelTooltipText, maxlength, name, placeholder, required } = createCoreTextareaProps()

  return {
    modelValue: value,
    name,
    placeholder,
    disabled,
    required,
    readonly,
    maxlength,
    rows,
    resize,
    clearable,
    size,
    autofocus,
    error,
    errors: errors ? () => errors : undefined,
    labelText,
    labelTooltipText,
    labelDebounce,
  }
}
