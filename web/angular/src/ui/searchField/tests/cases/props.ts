import { type TPropTestCase } from '~shared/types/tests'
import { type IAltNgSearchFieldProps } from '~ng/ui/searchField/models/types'
import { EAltSizes } from '~shared/types/global'
import { text, empty, number } from '~shared/tests/slotContents'
import { createCoreTextFieldProps } from '~core/ui/textField/models/types'

const { size, disabled, labelText, labelTooltipText, labelDebounce, error, errors, placeholder } = createCoreTextFieldProps()

export const propPlaceholderTestCases: TPropTestCase<IAltNgSearchFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text, expected: text },
  { prop: 'placeholder', case: 'without text', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IAltNgSearchFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]
export const propDisabledTestCases: TPropTestCase<IAltNgSearchFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]
export const propErrorTestCases: TPropTestCase<IAltNgSearchFieldProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: error },
]
export const propErrorsTestCases: TPropTestCase<IAltNgSearchFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'array with errors', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'empty array', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IAltNgSearchFieldProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelDebounceTestCases: TPropTestCase<IAltNgSearchFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'number', value: Number(number), expected: number },
  { prop: 'labelDebounce', case: 'undefined', value: undefined, expected: labelDebounce },
]
export const propLabelTextTestCases: TPropTestCase<IAltNgSearchFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'text', value: text, expected: text },
  { prop: 'labelText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IAltNgSearchFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
