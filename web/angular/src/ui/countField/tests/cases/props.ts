import type { TPropTestCase } from '~shared/types/tests'
import type { IYNgCountFieldProps } from '~ng/ui/countField/models/types'

export const propMinTestCases: TPropTestCase<IYNgCountFieldProps, 'min'>[] = [
  { prop: 'min', case: 'with a minimum value', value: 0 },
  { prop: 'min', case: 'without a minimum value', value: undefined },
]

export const propMaxTestCases: TPropTestCase<IYNgCountFieldProps, 'max'>[] = [
  { prop: 'max', case: 'with a maximum value', value: Infinity },
  { prop: 'max', case: 'without a maximum value', value: undefined },
]

export const propSizeTestCases: TPropTestCase<IYNgCountFieldProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: 'small' },
  { prop: 'size', case: 'medium', value: 'medium' },
  { prop: 'size', case: 'large', value: 'large' },
]

export const propDisabledTestCases: TPropTestCase<IYNgCountFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'have', value: true },
  { prop: 'disabled', case: 'not have', value: false },
]

export const propRequiredTestCases: TPropTestCase<IYNgCountFieldProps, 'required'>[] = [
  { prop: 'required', case: 'have', value: true },
  { prop: 'required', case: 'not have', value: false },
]

export const propErrorTestCases: TPropTestCase<IYNgCountFieldProps, 'error'>[] = [
  { prop: 'error', case: 'have', value: true },
  { prop: 'error', case: 'not have', value: false },
]

export const propPlaceholderTestCases: TPropTestCase<IYNgCountFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: 'Enter a value' },
  { prop: 'placeholder', case: 'without text', value: '' },
]

export const propAutofocusTestCases: TPropTestCase<IYNgCountFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'have', value: true },
  { prop: 'autofocus', case: 'not have', value: false },
]

export const propLabelTextTestCases: TPropTestCase<IYNgCountFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with text', value: 'Label' },
  { prop: 'labelText', case: 'without text', value: '' },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYNgCountFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with text', value: 'Tooltip' },
  { prop: 'labelTooltipText', case: 'without text', value: '' },
]

export const propLabelDebounceTestCases: TPropTestCase<IYNgCountFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'with a delay', value: 300 },
  { prop: 'labelDebounce', case: 'without a delay', value: 0 },
]

export const propAnnotationTextTestCases: TPropTestCase<IYNgCountFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with text', value: 'Annotation' },
  { prop: 'annotationText', case: 'without text', value: '' },
]

export const propErrorsTestCases: TPropTestCase<IYNgCountFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'with errors', value: ['Error 1', 'Error 2'] },
  { prop: 'errors', case: 'without errors', value: [] },
]

export const propNameTestCases: TPropTestCase<IYNgCountFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with a name', value: 'count-field' },
  { prop: 'name', case: 'without a name', value: '' },
]
