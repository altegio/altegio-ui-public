import { text, empty } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

import { createCoreDatePickerExternalProps } from '~core/ui/datePicker/models/types'
import { type IYNgDatePickerProps } from '~ng/ui/datePicker/models/types'

const {
  date,
  size,
  name,
  errors,
  placeholder,
  disabled,
  required,
  labelDebounce,
  labelText,
  labelTooltipText,
  isRange,
  maxDate,
  minDate,
  annotationText,
  calendarHeaderSelectors,
} = createCoreDatePickerExternalProps()

export const propDateCases: TPropTestCase<IYNgDatePickerProps, 'date'>[] = [
  { prop: 'date', case: '', value: text, expected: text },
  { prop: 'date', case: '', value: empty, expected: empty },
  { prop: 'date', case: '', value: undefined, expected: date },
]
export const propNameCases: TPropTestCase<IYNgDatePickerProps, 'name'>[] = [
  { prop: 'name', case: '', value: text, expected: text },
  { prop: 'name', case: '', value: empty, expected: empty },
  { prop: 'name', case: '', value: undefined, expected: name },
]
export const propPlaceholderCases: TPropTestCase<IYNgDatePickerProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: '', value: text, expected: text },
  { prop: 'placeholder', case: '', value: empty, expected: empty },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propDisabledCases: TPropTestCase<IYNgDatePickerProps, 'disabled'>[] = [
  { prop: 'disabled', case: '', value: true, expected: true },
  { prop: 'disabled', case: '', value: false, expected: false },
  { prop: 'disabled', case: '', value: undefined, expected: disabled },
]
export const propRequiredCases: TPropTestCase<IYNgDatePickerProps, 'required'>[] = [
  { prop: 'required', case: '', value: true, expected: true },
  { prop: 'required', case: '', value: false, expected: false },
  { prop: 'required', case: '', value: undefined, expected: required },
]
export const propSizeTestCases: TPropTestCase<IYNgDatePickerProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: '', value: undefined, expected: size },
]
export const propLabelDebounceCases: TPropTestCase<IYNgDatePickerProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: '', value: 100, expected: 100 },
  { prop: 'labelDebounce', case: '', value: 0, expected: 0 },
  { prop: 'labelDebounce', case: '', value: undefined, expected: labelDebounce },
]
export const propLabelTextCases: TPropTestCase<IYNgDatePickerProps, 'labelText'>[] = [
  { prop: 'labelText', case: '', value: text, expected: text },
  { prop: 'labelText', case: '', value: empty, expected: empty },
  { prop: 'labelText', case: '', value: undefined, expected: labelText },
]
export const propLabelTooltipTextCases: TPropTestCase<IYNgDatePickerProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: '', value: text, expected: text },
  { prop: 'labelTooltipText', case: '', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: '', value: undefined, expected: labelTooltipText },
]
export const propIsRangeCases: TPropTestCase<IYNgDatePickerProps, 'isRange'>[] = [
  { prop: 'isRange', case: '', value: true, expected: true },
  { prop: 'isRange', case: '', value: false, expected: false },
  { prop: 'isRange', case: '', value: undefined, expected: isRange },
]
export const propMaxDateCases: TPropTestCase<IYNgDatePickerProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: '', value: text, expected: text },
  { prop: 'maxDate', case: '', value: empty, expected: empty },
  { prop: 'maxDate', case: '', value: undefined, expected: maxDate },
]
export const propMinDateCases: TPropTestCase<IYNgDatePickerProps, 'minDate'>[] = [
  { prop: 'minDate', case: '', value: text, expected: text },
  { prop: 'minDate', case: '', value: empty, expected: empty },
  { prop: 'minDate', case: '', value: undefined, expected: minDate },
]
export const propAnnotationTextCases: TPropTestCase<IYNgDatePickerProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: '', value: text, expected: text },
  { prop: 'annotationText', case: '', value: empty, expected: empty },
  { prop: 'annotationText', case: '', value: undefined, expected: annotationText },
]
export const propCalendarHeaderSelectorsCases: TPropTestCase<IYNgDatePickerProps, 'calendarHeaderSelectors'>[] = [
  { prop: 'calendarHeaderSelectors', case: '', value: true, expected: true },
  { prop: 'calendarHeaderSelectors', case: '', value: false, expected: false },
  { prop: 'calendarHeaderSelectors', case: '', value: undefined, expected: calendarHeaderSelectors },
]
export const propErrorsCases: TPropTestCase<IYNgDatePickerProps, 'errors'>[] = [
  { prop: 'errors', case: '', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: '', value: [], expected: [] },
  { prop: 'errors', case: '', value: undefined, expected: errors },
]
