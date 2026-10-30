import { empty, text } from '~shared/tests/slotContents'
import { EAltSizes, EAltInputType } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { createVueTextFieldProps, type IAltVueTextFieldProps } from '~vue/ui/textField/models/types'

const { labelDebounce } = createVueTextFieldProps()

export const propValueTestCases: TPropTestCase<IAltVueTextFieldProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'with text', value: text, expected: text },
  { prop: 'modelValue', case: 'without text', value: empty, expected: empty },
]

export const propNameTestCases: TPropTestCase<IAltVueTextFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text, expected: text },
  { prop: 'name', case: 'without text', value: empty, expected: empty },
]

export const propPlaceholderTestCases: TPropTestCase<IAltVueTextFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text, expected: text },
  { prop: 'placeholder', case: 'without text', value: empty, expected: empty },
]

export const propAnnotationTextTestCases: TPropTestCase<IAltVueTextFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with text', value: text, expected: text },
  { prop: 'annotationText', case: 'without text', value: empty, expected: empty },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IAltVueTextFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without text', value: empty, expected: empty },
]

export const propLabelTextTestCases: TPropTestCase<IAltVueTextFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with text', value: text, expected: text },
  { prop: 'labelText', case: 'without text', value: empty, expected: empty },
]

export const propsDisabledTestCases: TPropTestCase<IAltVueTextFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
]

export const propsRequiredTestCases: TPropTestCase<IAltVueTextFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
]

export const propsReadonlyTestCases: TPropTestCase<IAltVueTextFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, expected: true },
  { prop: 'readonly', case: 'false', value: false, expected: false },
]

export const propsMaxlengthTestCases: TPropTestCase<IAltVueTextFieldProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: 'with a value', value: 10, expected: 10 },
  { prop: 'maxlength', case: 'without a value', value: undefined, expected: undefined },
]

export const propsLabelDebounceTestCases: TPropTestCase<IAltVueTextFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'with a value', value: 10, expected: 10 },
  { prop: 'labelDebounce', case: 'without a value', value: undefined, expected: labelDebounce },
]

export const propsAutofocusTestCases: TPropTestCase<IAltVueTextFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]

export const propsClearableTestCases: TPropTestCase<IAltVueTextFieldProps, 'clearable'>[] = [
  { prop: 'clearable', case: 'true', value: true, expected: true },
  { prop: 'clearable', case: 'false', value: false, expected: false },
]

export const propsSizeTestCases: TPropTestCase<IAltVueTextFieldProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: EAltSizes.LARGE },
]

export const propsTypeTestCases: TPropTestCase<IAltVueTextFieldProps, 'type'>[] = [
  { prop: 'type', case: EAltInputType.TEXT, value: EAltInputType.TEXT, expected: EAltInputType.TEXT },
  { prop: 'type', case: EAltInputType.PASSWORD, value: EAltInputType.PASSWORD, expected: EAltInputType.PASSWORD },
]
