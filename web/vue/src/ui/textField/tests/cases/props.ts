import { empty, text } from '~shared/tests/slotContents'
import { EYSizes, EYInputType } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { createVueTextFieldProps, type IYVueTextFieldProps } from '~vue/ui/textField/models/types'

const { labelDebounce } = createVueTextFieldProps()

export const propValueTestCases: TPropTestCase<IYVueTextFieldProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'с текстом', value: text, expected: text },
  { prop: 'modelValue', case: 'без текста', value: empty, expected: empty },
]

export const propNameTestCases: TPropTestCase<IYVueTextFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: empty, expected: empty },
]

export const propPlaceholderTestCases: TPropTestCase<IYVueTextFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: empty, expected: empty },
]

export const propAnnotationTextTestCases: TPropTestCase<IYVueTextFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'с текстом', value: text, expected: text },
  { prop: 'annotationText', case: 'без текста', value: empty, expected: empty },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYVueTextFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с текстом', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'без текста', value: empty, expected: empty },
]

export const propLabelTextTestCases: TPropTestCase<IYVueTextFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с текстом', value: text, expected: text },
  { prop: 'labelText', case: 'без текста', value: empty, expected: empty },
]

export const propsDisabledTestCases: TPropTestCase<IYVueTextFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
]

export const propsRequiredTestCases: TPropTestCase<IYVueTextFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
]

export const propsReadonlyTestCases: TPropTestCase<IYVueTextFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, expected: true },
  { prop: 'readonly', case: 'false', value: false, expected: false },
]

export const propsMaxlengthTestCases: TPropTestCase<IYVueTextFieldProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: 'со значением', value: 10, expected: 10 },
  { prop: 'maxlength', case: 'без значения', value: undefined, expected: undefined },
]

export const propsLabelDebounceTestCases: TPropTestCase<IYVueTextFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'со значением', value: 10, expected: 10 },
  { prop: 'labelDebounce', case: 'без значения', value: undefined, expected: labelDebounce },
]

export const propsAutofocusTestCases: TPropTestCase<IYVueTextFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]

export const propsClearableTestCases: TPropTestCase<IYVueTextFieldProps, 'clearable'>[] = [
  { prop: 'clearable', case: 'true', value: true, expected: true },
  { prop: 'clearable', case: 'false', value: false, expected: false },
]

export const propsSizeTestCases: TPropTestCase<IYVueTextFieldProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: EYSizes.LARGE },
]

export const propsTypeTestCases: TPropTestCase<IYVueTextFieldProps, 'type'>[] = [
  { prop: 'type', case: EYInputType.TEXT, value: EYInputType.TEXT, expected: EYInputType.TEXT },
  { prop: 'type', case: EYInputType.PASSWORD, value: EYInputType.PASSWORD, expected: EYInputType.PASSWORD },
]
