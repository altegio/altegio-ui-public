import {
  createCoreDatePickerProps,
  type IYCoreDatePickerProps,
} from '~core/ui/datePicker/models/types'
import type { PickEvent } from '~core/ui/datePicker/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IYVueCoreDatePickerProps extends Omit<IYCoreDatePickerProps, 'date'> {
  modelValue?: IYCoreDatePickerProps['date']
}

export interface IYVueDatePickerProps {
  modelValue?: IYVueCoreDatePickerProps['modelValue']
  name?: IYVueCoreDatePickerProps['name']
  placeholder?: IYVueCoreDatePickerProps['placeholder']
  disabled?: IYVueCoreDatePickerProps['disabled']
  required?: IYVueCoreDatePickerProps['required']
  readonly?: IYVueCoreDatePickerProps['readonly']
  autofocus?: IYVueCoreDatePickerProps['autofocus']
  errors?: IYVueCoreDatePickerProps['errors']
  locale?: IYVueCoreDatePickerProps['locale']
  size?: IYVueCoreDatePickerProps['size']
  labelText?: IYVueCoreDatePickerProps['labelText']
  labelTooltipText?: IYVueCoreDatePickerProps['labelTooltipText']
  labelDebounce?: IYVueCoreDatePickerProps['labelDebounce']
  annotationText?: IYVueCoreDatePickerProps['annotationText']
  calendarHeaderSelectors?: IYVueCoreDatePickerProps['calendarHeaderSelectors']
  isRange?: IYVueCoreDatePickerProps['isRange']
  minDate?: IYVueCoreDatePickerProps['minDate']
  maxDate?: IYVueCoreDatePickerProps['maxDate']
  error?: IYVueCoreDatePickerProps['error']
}

export const createVueDatePickerProps = (): TDefinedVueProps<IYVueDatePickerProps> => {
  const {
    errors,
    locale,
    date,
    name,
    placeholder,
    disabled,
    required,
    readonly,
    autofocus,
    size,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    calendarHeaderSelectors,
    isRange,
    minDate,
    maxDate,
    error,
  } = createCoreDatePickerProps()

  return {
    name,
    placeholder,
    disabled,
    required,
    readonly,
    autofocus,
    size,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    calendarHeaderSelectors,
    isRange,
    minDate,
    maxDate,
    error,
    modelValue: date ? () => date : undefined,
    errors: errors ? () => errors : undefined,
    locale: locale ? () => locale : undefined,
  }
}

export interface IYVueDatePickerEmits {
  (event: 'update:modelValue', payload: PickEvent['detail']['value']): void
}
