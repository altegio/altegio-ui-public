import type { TPropTestCase } from '~shared/types/tests'
import { empty, number, text } from '~shared/tests/slotContents'
import { EYInputAutocomplete, EYInputType, EYSizes } from '~shared/types/global'
import { createNgFieldInputProps, type IYNgFieldInputProps } from '~ng//ui/fieldInput/models/types'

const {
  disabled,
  size,
  readonly,
  value,
  name,
  type,
  placeholder,
  required,
  maxlength,
  hideSpaceLeft,
  hideSpaceRight,
  autocomplete,
} = createNgFieldInputProps()


export const propDisabledTestCases: TPropTestCase<IYNgFieldInputProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propReadonlyTestCases: TPropTestCase<IYNgFieldInputProps, 'readonly'>[] = [
  // { prop: 'readonly', case: 'true', value: true, expected: true }, // TODO: fix readonly
  { prop: 'readonly', case: 'false', value: false, expected: false },
  { prop: 'readonly', case: 'undefined', value: undefined, expected: readonly },
]

export const propSizeTestCases: TPropTestCase<IYNgFieldInputProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]

export const propValueTestCases: TPropTestCase<IYNgFieldInputProps, 'value'>[] = [
  { prop: 'value', case: text, value: text, expected: text },
  { prop: 'value', case: 'не определено', value: empty, expected: value },
]

export const propNameTestCases: TPropTestCase<IYNgFieldInputProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'с пустой строкой', value: empty, expected: empty },
  { prop: 'name', case: 'без текста', value: undefined, expected: name },
]

export const propPlaceholderTestCases: TPropTestCase<IYNgFieldInputProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'с пустым значением', value: empty, expected: empty },
  { prop: 'placeholder', case: 'без выбранного значения', value: undefined, expected: placeholder },
]

export const propAutofocusTestCases: TPropTestCase<IYNgFieldInputProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]

export const propRequiredTestCases: TPropTestCase<IYNgFieldInputProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]

export const propTypeTestCases: TPropTestCase<IYNgFieldInputProps, 'type'>[] = [
  { prop: 'type', case: EYInputType.TEXT, value: EYInputType.TEXT, expected: EYInputType.TEXT },
  { prop: 'type', case: EYInputType.NUMBER, value: EYInputType.NUMBER, expected: EYInputType.NUMBER },
  { prop: 'type', case: 'undefined', value: undefined, expected: type },
]

export const propMaxlengthTestCases: TPropTestCase<IYNgFieldInputProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: 'определено', value: number, expected: number },
  { prop: 'maxlength', case: 'undefined', value: undefined, expected: maxlength },
]

export const propHideSpaceLeftTestCases: TPropTestCase<IYNgFieldInputProps, 'hideSpaceLeft'>[] = [
  { prop: 'hideSpaceLeft', case: 'true', value: true, expected: true },
  { prop: 'hideSpaceLeft', case: 'false', value: false, expected: false },
  { prop: 'hideSpaceLeft', case: 'undefined', value: undefined, expected: hideSpaceLeft },
]

export const propHideSpaceRightTestCases: TPropTestCase<IYNgFieldInputProps, 'hideSpaceRight'>[] = [
  { prop: 'hideSpaceRight', case: 'true', value: true, expected: true },
  { prop: 'hideSpaceRight', case: 'false', value: false, expected: false },
  { prop: 'hideSpaceRight', case: 'undefined', value: undefined, expected: hideSpaceRight },
]

export const propAutocompleteTestCases: TPropTestCase<IYNgFieldInputProps, 'autocomplete'>[] = [
  { prop: 'autocomplete', case: EYInputAutocomplete.ON, value: EYInputAutocomplete.ON, expected: EYInputAutocomplete.ON },
  { prop: 'autocomplete', case: EYInputAutocomplete.TEL, value: EYInputAutocomplete.TEL, expected: EYInputAutocomplete.TEL },
  { prop: 'autocomplete', case: 'undefined', value: undefined, expected: autocomplete },
]
