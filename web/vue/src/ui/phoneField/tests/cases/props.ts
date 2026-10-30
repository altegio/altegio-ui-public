import { empty, searchNumberValue, text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createCorePhoneFieldProps, type IAltCorePhoneFieldProps,
} from '~core/ui/phoneField/models/types'
import type { IAltVuePhoneFieldProps } from '~vue/ui/phoneField/models/types'

const {
  name,
  placeholder,
  autofocus,
  disabled,
  readonly,
  errors,
  size,
  required,
  labelText,
  labelTooltipText,
  annotationText,
  minSearchLength,
  withoutCodeSelection,
  disabledAutocomplete,
  defaultCountryId,
  searchFunction,
} = createCorePhoneFieldProps()

export const propValueTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'value'>[] = [
  { prop: 'value', case: 'with a number', value: searchNumberValue, expected: searchNumberValue },
  { prop: 'value', case: 'without a number', value: '', expected: '' },
]

export const propNameTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text, expected: text },
  { prop: 'name', case: 'without text', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text, expected: text },
  { prop: 'placeholder', case: 'without text', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: autofocus },
]
export const propDisabledTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]
export const propReadonlyTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, expected: true },
  { prop: 'readonly', case: 'false', value: false, expected: false },
  { prop: 'readonly', case: 'undefined', value: undefined, expected: readonly },
]
export const propRequiredTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]
export const propErrorsTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'array with errors', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'empty array', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelTextTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'text', value: text, expected: text },
  { prop: 'labelText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
export const propAnnotationTextTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'text', value: text, expected: text },
  { prop: 'annotationText', case: 'empty string', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: annotationText },
]

export const propMinSearchLengthTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'minSearchLength'>[] = [
  { prop: 'minSearchLength', case: 'length', value: 3, expected: 3 },
  { prop: 'minSearchLength', case: 'undefined', value: undefined, expected: minSearchLength },
]

export const propDisabledAutocompleteTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'disabledAutocomplete'>[] = [
  { prop: 'disabledAutocomplete', case: 'true', value: true, expected: true },
  { prop: 'disabledAutocomplete', case: 'false', value: false, expected: false },
  { prop: 'disabledAutocomplete', case: 'undefined', value: undefined, expected: disabledAutocomplete },
]

export const propWithoutCodeSelectionTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'withoutCodeSelection'>[] = [
  { prop: 'withoutCodeSelection', case: 'true', value: true, expected: true },
  { prop: 'withoutCodeSelection', case: 'false', value: false, expected: false },
  { prop: 'withoutCodeSelection', case: 'undefined', value: undefined, expected: withoutCodeSelection },
]

export const searchFunctionMock: IAltCorePhoneFieldProps['searchFunction'] = () => []

export const propSearchFunctionTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'searchFunction'>[] = [
  { prop: 'searchFunction', case: 'function', value: searchFunctionMock, expected: searchFunctionMock },
  { prop: 'searchFunction', case: 'undefined', value: searchFunction },
]

export const propDefaultCountryIdTestCases: TPropTestCase<IAltVuePhoneFieldProps, 'defaultCountryId'>[] = [
  { prop: 'defaultCountryId', case: 'id', value: 2, expected: 2 },
  { prop: 'defaultCountryId', case: 'undefined', value: undefined, expected: defaultCountryId },
]
