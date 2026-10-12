import { type TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import { text, empty, number } from '~shared/tests/slotContents'
import { createCoreTextFieldProps } from '~core/ui/textField/models/types'
import { type IYVueSearchFieldProps } from '~vue/ui/searchField/models/types'

const { size, disabled, autofocus, labelText, labelTooltipText, labelDebounce, error, errors, name, placeholder } = createCoreTextFieldProps()

export const propModelValueTestCases: TPropTestCase<IYVueSearchFieldProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'с текстом', value: text, expected: text },
  { prop: 'modelValue', case: 'без текста', value: '', expected: '' },
]
export const propNameTestCases: TPropTestCase<IYVueSearchFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IYVueSearchFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IYVueSearchFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: autofocus },
]
export const propDisabledTestCases: TPropTestCase<IYVueSearchFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]
export const propErrorTestCases: TPropTestCase<IYVueSearchFieldProps, 'error'>[] = [
  { prop: 'error', case: 'с ошибкой', value: true, expected: true },
  { prop: 'error', case: 'без ошибки', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: error },
]
export const propErrorsTestCases: TPropTestCase<IYVueSearchFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IYVueSearchFieldProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelDebounceTestCases: TPropTestCase<IYVueSearchFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'число', value: Number(number), expected: number },
  { prop: 'labelDebounce', case: 'undefined', value: undefined, expected: labelDebounce },
]
export const propLabelTextTestCases: TPropTestCase<IYVueSearchFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IYVueSearchFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
