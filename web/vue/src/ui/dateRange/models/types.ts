import {
  createCoreDateRangeProps,
  type IAltCoreDateRangeProps,
  type IAltCoreDateRangeValue,
} from '~core/ui/dateRange/models/types'
import type { TDefinedVueProps } from '~vue/utils/utility-types'

export type TAltVueDateRangeValue = IAltCoreDateRangeValue

export interface IAltVueDateRangeProps {
  modelValue?: TAltVueDateRangeValue
  name?: IAltCoreDateRangeProps['name']
  placeholder?: IAltCoreDateRangeProps['placeholder']
  required?: IAltCoreDateRangeProps['required']
  disabled?: IAltCoreDateRangeProps['disabled']
  readonly?: IAltCoreDateRangeProps['readonly']
  autofocus?: IAltCoreDateRangeProps['autofocus']
  error?: IAltCoreDateRangeProps['error']
  errors?: IAltCoreDateRangeProps['errors']
  size?: IAltCoreDateRangeProps['size']
  minDate?: IAltCoreDateRangeProps['minDate']
  maxDate?: IAltCoreDateRangeProps['maxDate']
  labelText?: IAltCoreDateRangeProps['labelText']
  labelTooltipText?: IAltCoreDateRangeProps['labelTooltipText']
  labelDebounce?: IAltCoreDateRangeProps['labelDebounce']
  annotationText?: IAltCoreDateRangeProps['annotationText']
  calendarHeaderSelectors?: IAltCoreDateRangeProps['calendarHeaderSelectors']
  locale?: IAltCoreDateRangeProps['locale']
}

export interface IAltVueDateRangeEmits {
  (event: 'update:modelValue', value: TAltVueDateRangeValue): void
}

export const createVueDateRangeProps = (): TDefinedVueProps<IAltVueDateRangeProps> => {
  const {
    name,
    placeholder,
    required,
    disabled,
    readonly,
    autofocus,
    error,
    errors,
    size,
    minDate,
    maxDate,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    calendarHeaderSelectors,
    locale,
  } = createCoreDateRangeProps()

  return {
    modelValue: () => ({ from: null, to: null }),
    name,
    placeholder,
    required,
    disabled,
    readonly,
    autofocus,
    error,
    errors: errors ? () => errors : undefined,
    size,
    minDate,
    maxDate,
    labelText,
    labelTooltipText,
    labelDebounce,
    annotationText,
    calendarHeaderSelectors,
    locale: locale ? () => locale : undefined,
  }
}
