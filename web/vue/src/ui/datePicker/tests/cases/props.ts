import { text, empty } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { createCoreDatePickerProps } from '~core/ui/datePicker/models/types'
import { type IYVueDatePickerProps } from '~vue/ui/datePicker/models/types'

const {
  date,
  size,
  name,
  errors,
  placeholder,
  disabled,
  readonly,
  required,
  labelDebounce,
  labelText,
  labelTooltipText,
  isRange,
  maxDate,
  minDate,
  annotationText,
  calendarHeaderSelectors,
} = createCoreDatePickerProps()

export const propModelValueCases: TPropTestCase<IYVueDatePickerProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: '', value: text, expected: text },
  { prop: 'modelValue', case: '', value: empty, expected: empty },
  { prop: 'modelValue', case: '', value: undefined, expected: date },
]
export const propNameCases: TPropTestCase<IYVueDatePickerProps, 'name'>[] = [
  { prop: 'name', case: '', value: text, expected: text },
  { prop: 'name', case: '', value: empty, expected: empty },
  { prop: 'name', case: '', value: undefined, expected: name },
]
export const propPlaceholderCases: TPropTestCase<IYVueDatePickerProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: '', value: text, expected: text },
  { prop: 'placeholder', case: '', value: empty, expected: empty },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propDisabledCases: TPropTestCase<IYVueDatePickerProps, 'disabled'>[] = [
  { prop: 'disabled', case: '', value: true, expected: true },
  { prop: 'disabled', case: '', value: false, expected: false },
  { prop: 'disabled', case: '', value: undefined, expected: disabled },
]
export const propReadonlyCases: TPropTestCase<IYVueDatePickerProps, 'readonly'>[] = [
  { prop: 'readonly', case: '', value: true, expected: true },
  { prop: 'readonly', case: '', value: false, expected: false },
  { prop: 'readonly', case: '', value: undefined, expected: readonly },
]
export const propRequiredCases: TPropTestCase<IYVueDatePickerProps, 'required'>[] = [
  { prop: 'required', case: '', value: true, expected: true },
  { prop: 'required', case: '', value: false, expected: false },
  { prop: 'required', case: '', value: undefined, expected: required },
]
export const propSizeTestCases: TPropTestCase<IYVueDatePickerProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: '', value: undefined, expected: size },
]
export const propLabelDebounceCases: TPropTestCase<IYVueDatePickerProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: '', value: 100, expected: 100 },
  { prop: 'labelDebounce', case: '', value: 0, expected: 0 },
  { prop: 'labelDebounce', case: '', value: undefined, expected: labelDebounce },
]
export const propLabelTextCases: TPropTestCase<IYVueDatePickerProps, 'labelText'>[] = [
  { prop: 'labelText', case: '', value: text, expected: text },
  { prop: 'labelText', case: '', value: empty, expected: empty },
  { prop: 'labelText', case: '', value: undefined, expected: labelText },
]
export const propLabelTooltipTextCases: TPropTestCase<IYVueDatePickerProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: '', value: text, expected: text },
  { prop: 'labelTooltipText', case: '', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: '', value: undefined, expected: labelTooltipText },
]
export const propIsRangeCases: TPropTestCase<IYVueDatePickerProps, 'isRange'>[] = [
  { prop: 'isRange', case: '', value: true, expected: true },
  { prop: 'isRange', case: '', value: false, expected: false },
  { prop: 'isRange', case: '', value: undefined, expected: isRange },
]
export const propMaxDateCases: TPropTestCase<IYVueDatePickerProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: '', value: text, expected: text },
  { prop: 'maxDate', case: '', value: empty, expected: empty },
  { prop: 'maxDate', case: '', value: undefined, expected: maxDate },
]
export const propMinDateCases: TPropTestCase<IYVueDatePickerProps, 'minDate'>[] = [
  { prop: 'minDate', case: '', value: text, expected: text },
  { prop: 'minDate', case: '', value: empty, expected: empty },
  { prop: 'minDate', case: '', value: undefined, expected: minDate },
]
export const propAnnotationTextCases: TPropTestCase<IYVueDatePickerProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: '', value: text, expected: text },
  { prop: 'annotationText', case: '', value: empty, expected: empty },
  { prop: 'annotationText', case: '', value: undefined, expected: annotationText },
]
export const propCalendarHeaderSelectorsCases: TPropTestCase<IYVueDatePickerProps, 'calendarHeaderSelectors'>[] = [
  { prop: 'calendarHeaderSelectors', case: '', value: true, expected: true },
  { prop: 'calendarHeaderSelectors', case: '', value: false, expected: false },
  { prop: 'calendarHeaderSelectors', case: '', value: undefined, expected: calendarHeaderSelectors },
]
export const propErrorsCases: TPropTestCase<IYVueDatePickerProps, 'errors'>[] = [
  { prop: 'errors', case: '', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: '', value: [], expected: [] },
  { prop: 'errors', case: '', value: undefined, expected: errors },
]
