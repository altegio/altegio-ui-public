import { empty, text } from '~shared/tests/slotContents'
import { EYSizes, EYInputType } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgTextFieldProps, type IYNgTextFieldProps } from '~ng/ui/textField/models/types'

const { labelDebounce } = createNgTextFieldProps()

export const propNameTestCases: TPropTestCase<IYNgTextFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: empty, expected: empty },
]

export const propPlaceholderTestCases: TPropTestCase<IYNgTextFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: empty, expected: empty },
]

export const propAnnotationTextTestCases: TPropTestCase<IYNgTextFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'с текстом', value: text, expected: text },
  { prop: 'annotationText', case: 'без текста', value: empty, expected: empty },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYNgTextFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с текстом', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'без текста', value: empty, expected: empty },
]

export const propLabelTextTestCases: TPropTestCase<IYNgTextFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с текстом', value: text, expected: text },
  { prop: 'labelText', case: 'без текста', value: empty, expected: empty },
]

export const propsDisabledTestCases: TPropTestCase<IYNgTextFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
]

export const propsRequiredTestCases: TPropTestCase<IYNgTextFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
]

export const propsMaxlengthTestCases: TPropTestCase<IYNgTextFieldProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: 'со значением', value: 10, expected: 10 },
  { prop: 'maxlength', case: 'без значения', value: undefined, expected: undefined },
]

export const propsLabelDebounceTestCases: TPropTestCase<IYNgTextFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'со значением', value: 10, expected: 10 },
  { prop: 'labelDebounce', case: 'без значения', value: undefined, expected: labelDebounce },
]

export const propsAutofocusTestCases: TPropTestCase<IYNgTextFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]

export const propsClearableTestCases: TPropTestCase<IYNgTextFieldProps, 'clearable'>[] = [
  { prop: 'clearable', case: 'true', value: true, expected: true },
  { prop: 'clearable', case: 'false', value: false, expected: false },
]

export const propsSizeTestCases: TPropTestCase<IYNgTextFieldProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: EYSizes.LARGE },
]

export const propsTypeTestCases: TPropTestCase<IYNgTextFieldProps, 'type'>[] = [
  { prop: 'type', case: EYInputType.TEXT, value: EYInputType.TEXT, expected: EYInputType.TEXT },
  { prop: 'type', case: EYInputType.PASSWORD, value: EYInputType.PASSWORD, expected: EYInputType.PASSWORD },
]
