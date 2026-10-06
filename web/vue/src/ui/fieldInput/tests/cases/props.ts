import type { TPropTestCase } from '~shared/types/tests'
import { empty, number, text } from '~shared/tests/slotContents'
import { EYInputAutocomplete, EYInputType, EYSizes } from '~shared/types/global'
import { createVueFieldInputProps, type IYVueCoreFieldInputProps } from '~vue/ui/fieldInput/models/types'

const {
  disabled,
  size,
  readonly,
  modelValue,
  name,
  type,
  placeholder,
  required,
  maxlength,
  hideSpaceLeft,
  hideSpaceRight,
  autocomplete,
} = createVueFieldInputProps()


export const propDisabledTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propReadonlyTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, expected: true },
  { prop: 'readonly', case: 'false', value: false, expected: false },
  { prop: 'readonly', case: 'undefined', value: undefined, expected: readonly },
]

export const propSizeTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]

export const propValueTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: text, value: text, expected: text },
  { prop: 'modelValue', case: 'не определено', value: undefined, expected: modelValue },
]

export const propNameTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'с пустой строкой', value: empty, expected: empty },
  { prop: 'name', case: 'без текста', value: undefined, expected: name },
]

export const propPlaceholderTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'с пустым значением', value: empty, expected: empty },
  { prop: 'placeholder', case: 'без выбранного значения', value: undefined, expected: placeholder },
]

export const propAutofocusTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]

export const propRequiredTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]

export const propTypeTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'type'>[] = [
  { prop: 'type', case: EYInputType.TEXT, value: EYInputType.TEXT, expected: EYInputType.TEXT },
  { prop: 'type', case: EYInputType.NUMBER, value: EYInputType.NUMBER, expected: EYInputType.NUMBER },
  { prop: 'type', case: 'undefined', value: undefined, expected: type },
]

export const propMaxlengthTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: 'определено', value: number, expected: number },
  { prop: 'maxlength', case: 'undefined', value: undefined, expected: maxlength },
]

export const propHideSpaceLeftTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'hideSpaceLeft'>[] = [
  { prop: 'hideSpaceLeft', case: 'true', value: true, expected: true },
  { prop: 'hideSpaceLeft', case: 'false', value: false, expected: false },
  { prop: 'hideSpaceLeft', case: 'undefined', value: undefined, expected: hideSpaceLeft },
]

export const propHideSpaceRightTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'hideSpaceRight'>[] = [
  { prop: 'hideSpaceRight', case: 'true', value: true, expected: true },
  { prop: 'hideSpaceRight', case: 'false', value: false, expected: false },
  { prop: 'hideSpaceRight', case: 'undefined', value: undefined, expected: hideSpaceRight },
]

export const propAutocompleteTestCases: TPropTestCase<IYVueCoreFieldInputProps, 'autocomplete'>[] = [
  { prop: 'autocomplete', case: EYInputAutocomplete.ON, value: EYInputAutocomplete.ON, expected: EYInputAutocomplete.ON },
  { prop: 'autocomplete', case: EYInputAutocomplete.TEL, value: EYInputAutocomplete.TEL, expected: EYInputAutocomplete.TEL },
  { prop: 'autocomplete', case: 'undefined', value: undefined, expected: autocomplete },
]
