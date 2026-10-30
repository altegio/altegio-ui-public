import type { TPropTestCase } from '~shared/types/tests'
import { empty, number, text } from '~shared/tests/slotContents'
import { EAltInputAutocomplete, EAltInputType, EAltSizes } from '~shared/types/global'
import { createVueFieldInputProps, type IAltVueCoreFieldInputProps } from '~vue/ui/fieldInput/models/types'

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


export const propDisabledTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propReadonlyTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, expected: true },
  { prop: 'readonly', case: 'false', value: false, expected: false },
  { prop: 'readonly', case: 'undefined', value: undefined, expected: readonly },
]

export const propSizeTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]

export const propValueTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: text, value: text, expected: text },
  { prop: 'modelValue', case: 'not set', value: undefined, expected: modelValue },
]

export const propNameTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text, expected: text },
  { prop: 'name', case: 'with an empty string', value: empty, expected: empty },
  { prop: 'name', case: 'without text', value: undefined, expected: name },
]

export const propPlaceholderTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text, expected: text },
  { prop: 'placeholder', case: 'with an empty value', value: empty, expected: empty },
  { prop: 'placeholder', case: 'without a selected value', value: undefined, expected: placeholder },
]

export const propAutofocusTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]

export const propRequiredTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]

export const propTypeTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'type'>[] = [
  { prop: 'type', case: EAltInputType.TEXT, value: EAltInputType.TEXT, expected: EAltInputType.TEXT },
  { prop: 'type', case: EAltInputType.NUMBER, value: EAltInputType.NUMBER, expected: EAltInputType.NUMBER },
  { prop: 'type', case: 'undefined', value: undefined, expected: type },
]

export const propMaxlengthTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: 'set', value: number, expected: number },
  { prop: 'maxlength', case: 'undefined', value: undefined, expected: maxlength },
]

export const propHideSpaceLeftTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'hideSpaceLeft'>[] = [
  { prop: 'hideSpaceLeft', case: 'true', value: true, expected: true },
  { prop: 'hideSpaceLeft', case: 'false', value: false, expected: false },
  { prop: 'hideSpaceLeft', case: 'undefined', value: undefined, expected: hideSpaceLeft },
]

export const propHideSpaceRightTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'hideSpaceRight'>[] = [
  { prop: 'hideSpaceRight', case: 'true', value: true, expected: true },
  { prop: 'hideSpaceRight', case: 'false', value: false, expected: false },
  { prop: 'hideSpaceRight', case: 'undefined', value: undefined, expected: hideSpaceRight },
]

export const propAutocompleteTestCases: TPropTestCase<IAltVueCoreFieldInputProps, 'autocomplete'>[] = [
  { prop: 'autocomplete', case: EAltInputAutocomplete.ON, value: EAltInputAutocomplete.ON, expected: EAltInputAutocomplete.ON },
  { prop: 'autocomplete', case: EAltInputAutocomplete.TEL, value: EAltInputAutocomplete.TEL, expected: EAltInputAutocomplete.TEL },
  { prop: 'autocomplete', case: 'undefined', value: undefined, expected: autocomplete },
]
