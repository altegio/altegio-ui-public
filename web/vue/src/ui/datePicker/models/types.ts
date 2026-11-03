import {
  createCoreDatePickerProps,
  type IAltCoreDatePickerProps,
} from '~core/ui/datePicker/models/types'
import type { PickEvent } from '~core/ui/datePicker/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export interface IAltVueCoreDatePickerProps extends Omit<IAltCoreDatePickerProps, 'date'> {
  modelValue?: IAltCoreDatePickerProps['date']
}

export interface IAltVueDatePickerProps {
  modelValue?: IAltVueCoreDatePickerProps['modelValue']
  name?: IAltVueCoreDatePickerProps['name']
  placeholder?: IAltVueCoreDatePickerProps['placeholder']
  disabled?: IAltVueCoreDatePickerProps['disabled']
  required?: IAltVueCoreDatePickerProps['required']
  readonly?: IAltVueCoreDatePickerProps['readonly']
  autofocus?: IAltVueCoreDatePickerProps['autofocus']
  errors?: IAltVueCoreDatePickerProps['errors']
  locale?: IAltVueCoreDatePickerProps['locale']
  size?: IAltVueCoreDatePickerProps['size']
  labelText?: IAltVueCoreDatePickerProps['labelText']
  labelTooltipText?: IAltVueCoreDatePickerProps['labelTooltipText']
  labelDebounce?: IAltVueCoreDatePickerProps['labelDebounce']
  annotationText?: IAltVueCoreDatePickerProps['annotationText']
  calendarHeaderSelectors?: IAltVueCoreDatePickerProps['calendarHeaderSelectors']
  isRange?: IAltVueCoreDatePickerProps['isRange']
  minDate?: IAltVueCoreDatePickerProps['minDate']
  maxDate?: IAltVueCoreDatePickerProps['maxDate']
  error?: IAltVueCoreDatePickerProps['error']
}

export const createVueDatePickerProps = (): TDefinedVueProps<IAltVueDatePickerProps> => {
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

export interface IAltVueDatePickerEmits {
  (event: 'update:modelValue', payload: PickEvent['detail']['value']): void
}
