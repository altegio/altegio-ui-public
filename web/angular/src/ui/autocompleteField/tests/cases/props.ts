import { empty, searchNumberValue, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import {
  createCoreAutocompleteFieldProps, type IYCoreAutocompleteFieldProps,
} from '~core/ui/autocompleteField/models/types'
import type { IYVueAutocompleteFieldProps } from '~vue/ui/autocompleteField/models/types'

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

export const propValueTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'value'>[] = [
  { prop: 'value', case: 'с номером', value: searchNumberValue, expected: searchNumberValue },
  { prop: 'value', case: 'без номера', value: '', expected: '' },
]

export const propNameTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: autofocus },
]
export const propDisabledTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propRequiredTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]
export const propErrorsTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelTextTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
export const propAnnotationTextTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'текст', value: text, expected: text },
  { prop: 'annotationText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: annotationText },
]

export const propMinSearchLengthTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'minSearchLength'>[] = [
  { prop: 'minSearchLength', case: 'длина', value: 3, expected: 3 },
  { prop: 'minSearchLength', case: 'undefined', value: undefined, expected: minSearchLength },
]

export const propDisabledAutocompleteTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'disabledAutocomplete'>[] = [
  { prop: 'disabledAutocomplete', case: 'true', value: true, expected: true },
  { prop: 'disabledAutocomplete', case: 'false', value: false, expected: false },
  { prop: 'disabledAutocomplete', case: 'undefined', value: undefined, expected: disabledAutocomplete },
]

export const searchFunctionMock: IYCoreAutocompleteFieldProps['searchFunction'] = () => []

export const propSearchFunctionTestCases: TPropTestCase<IYVueAutocompleteFieldProps, 'searchFunction'>[] = [
  { prop: 'searchFunction', case: 'function', value: searchFunctionMock, expected: searchFunctionMock },
  { prop: 'searchFunction', case: 'undefined', value: searchFunction },
]
