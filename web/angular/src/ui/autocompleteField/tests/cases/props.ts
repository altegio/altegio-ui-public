import { empty, searchNumberValue, text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createCoreAutocompleteFieldProps, type IAltCoreAutocompleteFieldProps,
} from '~core/ui/autocompleteField/models/types'
import type { IAltVueAutocompleteFieldProps } from '~vue/ui/autocompleteField/models/types'

const {
  name,
  placeholder,
  autofocus,
  disabled,
  errors,
  size,
  required,
  labelText,
  labelTooltipText,
  annotationText,
  minSearchLength,
  disabledAutocomplete,
  searchFunction,
} = createCoreAutocompleteFieldProps()

export const propValueTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'value'>[] = [
  { prop: 'value', case: 'with a number', value: searchNumberValue, expected: searchNumberValue },
  { prop: 'value', case: 'without a number', value: '', expected: '' },
]

export const propNameTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text, expected: text },
  { prop: 'name', case: 'without text', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text, expected: text },
  { prop: 'placeholder', case: 'without text', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: autofocus },
]
export const propDisabledTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propRequiredTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]
export const propErrorsTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'array with errors', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'empty array', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelTextTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'text', value: text, expected: text },
  { prop: 'labelText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
export const propAnnotationTextTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'text', value: text, expected: text },
  { prop: 'annotationText', case: 'empty string', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: annotationText },
]

export const propMinSearchLengthTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'minSearchLength'>[] = [
  { prop: 'minSearchLength', case: 'length', value: 3, expected: 3 },
  { prop: 'minSearchLength', case: 'undefined', value: undefined, expected: minSearchLength },
]

export const propDisabledAutocompleteTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'disabledAutocomplete'>[] = [
  { prop: 'disabledAutocomplete', case: 'true', value: true, expected: true },
  { prop: 'disabledAutocomplete', case: 'false', value: false, expected: false },
  { prop: 'disabledAutocomplete', case: 'undefined', value: undefined, expected: disabledAutocomplete },
]

export const searchFunctionMock: IAltCoreAutocompleteFieldProps['searchFunction'] = () => []

export const propSearchFunctionTestCases: TPropTestCase<IAltVueAutocompleteFieldProps, 'searchFunction'>[] = [
  { prop: 'searchFunction', case: 'function', value: searchFunctionMock, expected: searchFunctionMock },
  { prop: 'searchFunction', case: 'undefined', value: searchFunction },
]
