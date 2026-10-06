import { type TPropTestCase } from '~shared/types/tests'
import { type IYNgSearchFieldProps } from '~ng/ui/searchField/models/types'
import { EYSizes } from '~shared/types/global'
import { text, empty, number } from '~shared/tests/slotContents'
import { createCoreTextFieldProps } from '~core/ui/textField/models/types'

const { size, disabled, labelText, labelTooltipText, labelDebounce, error, errors, placeholder } = createCoreTextFieldProps()

export const propPlaceholderTestCases: TPropTestCase<IYNgSearchFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IYNgSearchFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]
export const propDisabledTestCases: TPropTestCase<IYNgSearchFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]
export const propErrorTestCases: TPropTestCase<IYNgSearchFieldProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: error },
]
export const propErrorsTestCases: TPropTestCase<IYNgSearchFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IYNgSearchFieldProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelDebounceTestCases: TPropTestCase<IYNgSearchFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'число', value: Number(number), expected: number },
  { prop: 'labelDebounce', case: 'undefined', value: undefined, expected: labelDebounce },
]
export const propLabelTextTestCases: TPropTestCase<IYNgSearchFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IYNgSearchFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
