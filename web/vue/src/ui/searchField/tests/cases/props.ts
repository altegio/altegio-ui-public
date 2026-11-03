import { type TPropTestCase } from '~shared/types/tests'
import { EAltSizes } from '~shared/types/global'
import { text, empty, number } from '~shared/tests/slotContents'
import { createCoreTextFieldProps } from '~core/ui/textField/models/types'
import { type IAltVueSearchFieldProps } from '~vue/ui/searchField/models/types'

const { size, disabled, autofocus, labelText, labelTooltipText, labelDebounce, error, errors, name, placeholder } = createCoreTextFieldProps()

export const propModelValueTestCases: TPropTestCase<IAltVueSearchFieldProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'with text', value: text, expected: text },
  { prop: 'modelValue', case: 'without text', value: '', expected: '' },
]
export const propNameTestCases: TPropTestCase<IAltVueSearchFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text, expected: text },
  { prop: 'name', case: 'without text', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IAltVueSearchFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text, expected: text },
  { prop: 'placeholder', case: 'without text', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IAltVueSearchFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: autofocus },
]
export const propDisabledTestCases: TPropTestCase<IAltVueSearchFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]
export const propErrorTestCases: TPropTestCase<IAltVueSearchFieldProps, 'error'>[] = [
  { prop: 'error', case: 'with an error', value: true, expected: true },
  { prop: 'error', case: 'without an error', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: error },
]
export const propErrorsTestCases: TPropTestCase<IAltVueSearchFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'array with errors', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'empty array', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IAltVueSearchFieldProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelDebounceTestCases: TPropTestCase<IAltVueSearchFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'number', value: Number(number), expected: number },
  { prop: 'labelDebounce', case: 'undefined', value: undefined, expected: labelDebounce },
]
export const propLabelTextTestCases: TPropTestCase<IAltVueSearchFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'text', value: text, expected: text },
  { prop: 'labelText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IAltVueSearchFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
