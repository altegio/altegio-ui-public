import {
  createCoreTextareaProps,
  type IAltCoreTextareaProps,
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

export interface IAltVueCoreTextareaProps extends Omit<IAltCoreTextareaProps, 'value'> {
  modelValue?: IAltCoreTextareaProps['value']
}

export interface IAltVueTextareaProps {
  modelValue?: IAltVueCoreTextareaProps['modelValue']
  name?: IAltVueCoreTextareaProps['name']
  placeholder?: IAltVueCoreTextareaProps['placeholder']
  maxlength?: IAltVueCoreTextareaProps['maxlength']
  required?: IAltVueCoreTextareaProps['required']
  autofocus?: IAltVueCoreTextareaProps['autofocus']
  labelText?: IAltVueCoreTextareaProps['labelText']
  labelTooltipText?: IAltVueCoreTextareaProps['labelTooltipText']
  labelDebounce?: IAltVueCoreTextareaProps['labelDebounce']
  errors?: IAltVueCoreTextareaProps['errors']
  clearable?: IAltVueCoreTextareaProps['clearable']
  rows?: IAltVueCoreTextareaProps['rows']
  resize?: IAltVueCoreTextareaProps['resize']
  disabled?: IAltVueCoreTextareaProps['disabled']
  size?: IAltVueCoreTextareaProps['size']
  readonly?: IAltVueCoreTextareaProps['readonly']
  error?: IAltVueCoreTextareaProps['error']
}

export interface IAltVueTextareaEmits {
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

export const createVueTextareaProps = (): TDefinedVueProps<IAltVueTextareaProps> => {
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
