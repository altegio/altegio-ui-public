import { text, empty } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { type IYCoreDatePickerProps } from '~core/ui/datePicker/models/types'
import dayjs from 'dayjs'
import { formatDate, getDefaultMaxDate, getDefaultMinDate } from '~shared/utils/dateTime'

export const testErrors = [
  text,
  text,
]

export const sizes = Object.values(EYSizes).filter((size) => size !== EYSizes.EXTRA_LARGE && size !== EYSizes.EXTRA_SMALL)

export const propDateCases: TPropTestCase<IYCoreDatePickerProps, 'date'>[] = [
  { prop: 'date', case: 'с текстом', value: formatDate(dayjs()), expected: formatDate(dayjs()) },
  { prop: 'date', case: 'без текста', value: '', expected: '' },
]
export const propNameCases: TPropTestCase<IYCoreDatePickerProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: '', expected: '' },
]
export const propPlaceholderCases: TPropTestCase<IYCoreDatePickerProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: '', expected: '' },
]
export const propDisabledCases: TPropTestCase<IYCoreDatePickerProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
]
export const propReadonlyCases: TPropTestCase<IYCoreDatePickerProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, expected: true },
  { prop: 'readonly', case: 'false', value: false, expected: false },
]
export const propRequiredCases: TPropTestCase<IYCoreDatePickerProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
]
export const propSizeCases: TPropTestCase<IYCoreDatePickerProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
  expected: size,
}))
export const propLabelDebounceCases: TPropTestCase<IYCoreDatePickerProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: '100', value: 100, expected: 100 },
  { prop: 'labelDebounce', case: '0', value: 0, expected: 0 },
]
export const propLabelTextCases: TPropTestCase<IYCoreDatePickerProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с текстом', value: text, expected: text },
  { prop: 'labelText', case: 'без текста', value: empty, expected: '' },
]
export const propLabelTooltipTextCases: TPropTestCase<IYCoreDatePickerProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с текстом', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'без текста', value: empty, expected: '' },
]
export const propIsRangeCases: TPropTestCase<IYCoreDatePickerProps, 'isRange'>[] = [
  { prop: 'isRange', case: 'true', value: true, expected: true },
  { prop: 'isRange', case: 'false', value: false, expected: false },
]
export const propMaxDateCases: TPropTestCase<IYCoreDatePickerProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: 'с текстом', value: formatDate(dayjs().add(1, 'day')), expected: formatDate(dayjs().add(1, 'day')) },
  { prop: 'maxDate', case: 'без текста', value: empty, expected: formatDate(getDefaultMaxDate()) },
]
export const propMinDateCases: TPropTestCase<IYCoreDatePickerProps, 'minDate'>[] = [
  { prop: 'minDate', case: 'с текстом', value: formatDate(dayjs().subtract(1, 'day')), expected: formatDate(dayjs().subtract(1, 'day')) },
  { prop: 'minDate', case: 'без текста', value: empty, expected: formatDate(getDefaultMinDate()) },
]
export const propAnnotationTextCases: TPropTestCase<IYCoreDatePickerProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'с текстом', value: text, expected: text },
  { prop: 'annotationText', case: 'без текста', value: empty, expected: '' },
]
export const propCalendarHeaderSelectorsCases: TPropTestCase<IYCoreDatePickerProps, 'calendarHeaderSelectors'>[] = [
  { prop: 'calendarHeaderSelectors', case: 'true', value: true, expected: true },
  { prop: 'calendarHeaderSelectors', case: 'false', value: false, expected: false },
]
export const propErrorsCases: (TPropTestCase<IYCoreDatePickerProps, 'errors'> & { inputValue: boolean })[] = [
  { prop: 'errors', case: 'с ошибками', value: testErrors, inputValue: true, expected: testErrors },
  { prop: 'errors', case: 'с одной ошибкой', value: [testErrors[0]], inputValue: true, expected: [testErrors[0]] },
  { prop: 'errors', case: 'без ошибок', value: [], inputValue: false, expected: [] },
]
