import { empty, searchNumberValue, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createCorePhoneFieldProps, type IYCorePhoneFieldProps,
} from '~core/ui/phoneField/models/types'
import type { IYVuePhoneFieldProps } from '~vue/ui/phoneField/models/types'

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

export const propValueTestCases: TPropTestCase<IYVuePhoneFieldProps, 'value'>[] = [
  { prop: 'value', case: 'с номером', value: searchNumberValue, expected: searchNumberValue },
  { prop: 'value', case: 'без номера', value: '', expected: '' },
]

export const propNameTestCases: TPropTestCase<IYVuePhoneFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IYVuePhoneFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IYVuePhoneFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: autofocus },
]
export const propDisabledTestCases: TPropTestCase<IYVuePhoneFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]
export const propReadonlyTestCases: TPropTestCase<IYVuePhoneFieldProps, 'readonly'>[] = [
  // { prop: 'readonly', case: 'true', value: true, expected: true }, // TODO: fix readonly
  { prop: 'readonly', case: 'false', value: false, expected: false },
  { prop: 'readonly', case: 'undefined', value: undefined, expected: readonly },
]
export const propRequiredTestCases: TPropTestCase<IYVuePhoneFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]
export const propErrorsTestCases: TPropTestCase<IYVuePhoneFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IYVuePhoneFieldProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelTextTestCases: TPropTestCase<IYVuePhoneFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IYVuePhoneFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
export const propAnnotationTextTestCases: TPropTestCase<IYVuePhoneFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'текст', value: text, expected: text },
  { prop: 'annotationText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: annotationText },
]

export const propMinSearchLengthTestCases: TPropTestCase<IYVuePhoneFieldProps, 'minSearchLength'>[] = [
  { prop: 'minSearchLength', case: 'длина', value: 3, expected: 3 },
  { prop: 'minSearchLength', case: 'undefined', value: undefined, expected: minSearchLength },
]

export const propDisabledAutocompleteTestCases: TPropTestCase<IYVuePhoneFieldProps, 'disabledAutocomplete'>[] = [
  { prop: 'disabledAutocomplete', case: 'true', value: true, expected: true },
  { prop: 'disabledAutocomplete', case: 'false', value: false, expected: false },
  { prop: 'disabledAutocomplete', case: 'undefined', value: undefined, expected: disabledAutocomplete },
]

export const propWithoutCodeSelectionTestCases: TPropTestCase<IYVuePhoneFieldProps, 'withoutCodeSelection'>[] = [
  { prop: 'withoutCodeSelection', case: 'true', value: true, expected: true },
  { prop: 'withoutCodeSelection', case: 'false', value: false, expected: false },
  { prop: 'withoutCodeSelection', case: 'undefined', value: undefined, expected: withoutCodeSelection },
]

export const searchFunctionMock: IYCorePhoneFieldProps['searchFunction'] = () => []

export const propSearchFunctionTestCases: TPropTestCase<IYVuePhoneFieldProps, 'searchFunction'>[] = [
  { prop: 'searchFunction', case: 'function', value: searchFunctionMock, expected: searchFunctionMock },
  { prop: 'searchFunction', case: 'undefined', value: searchFunction },
]

export const propDefaultCountryIdTestCases: TPropTestCase<IYVuePhoneFieldProps, 'defaultCountryId'>[] = [
  { prop: 'defaultCountryId', case: 'id', value: 2, expected: 2 },
  { prop: 'defaultCountryId', case: 'undefined', value: undefined, expected: defaultCountryId },
]
