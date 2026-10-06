import { empty, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { IYVueMultipleSelectFieldProps } from '~vue/ui/multipleSelectField/models/types'
import { createVueMultipleSelectFieldProps } from '~vue/ui/multipleSelectField/models/types'
import type { TPropTestCase } from '~shared/types/tests'

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
  itemLabel,
  modelValue,
  isCustomFilter,
  isFilterable,
  isMapOptions,
  itemValue,
  filterCallback,
  labelDebounce,
  error,
} = createVueMultipleSelectFieldProps()

export const propValueTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'со значением', value: [text], expected: [text], additionalProps: { isMapOptions: true } },
  { prop: 'modelValue', case: 'без значения', value: undefined, expected: modelValue, additionalProps: { isMapOptions: true } },
]

export const propNameTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: autofocus },
]
export const propDisabledTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]
export const propReadonlyTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, expected: true },
  { prop: 'readonly', case: 'false', value: false, expected: false },
  { prop: 'readonly', case: 'undefined', value: undefined, expected: readonly },
]
export const propRequiredTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]
export const propErrorsTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelTextTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
export const propAnnotationTextTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'текст', value: text, expected: text },
  { prop: 'annotationText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: annotationText },
]

export const propItemLabelTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'itemLabel'>[] = [
  { prop: 'itemLabel', case: 'текст', value: 'label', expected: 'label' },
  { prop: 'itemLabel', case: 'undefined', value: undefined, expected: itemLabel },
]

export const propItemValueTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'itemValue'>[] = [
  { prop: 'itemValue', case: 'текст', value: 'value', expected: 'value' },
  { prop: 'itemValue', case: 'undefined', value: undefined, expected: itemValue },
]

export const propItemsTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'items'>[] = [
  { prop: 'items', case: 'массив опций', value: [{ id: 1 }], expected: [{ id: 1 }] },
  { prop: 'items', case: 'пустой массив', value: [], expected: [] },
  { prop: 'items', case: 'undefined', value: undefined, expected: [] },
]

export const filterCallbackMock: IYVueMultipleSelectFieldProps['filterCallback'] = () => []

export const propFilterCallbackTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'filterCallback'>[] = [
  { prop: 'filterCallback', case: 'function', value: filterCallbackMock, expected: filterCallbackMock },
  { prop: 'filterCallback', case: 'undefined', value: undefined, expected: filterCallback },
]

export const propIsCustomFilterTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'isCustomFilter'>[] = [
  { prop: 'isCustomFilter', case: 'true', value: true, expected: true },
  { prop: 'isCustomFilter', case: 'false', value: false, expected: false },
  { prop: 'isCustomFilter', case: 'undefined', value: undefined, expected: isCustomFilter },
]

export const propIsFilterableTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'isFilterable'>[] = [
  { prop: 'isFilterable', case: 'true', value: true, expected: true },
  { prop: 'isFilterable', case: 'false', value: false, expected: false },
  { prop: 'isFilterable', case: 'undefined', value: undefined, expected: isFilterable },
]

export const propIsMapOptionsTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'isMapOptions'>[] = [
  { prop: 'isMapOptions', case: 'true', value: true, expected: true },
  { prop: 'isMapOptions', case: 'false', value: false, expected: false },
  { prop: 'isMapOptions', case: 'undefined', value: undefined, expected: isMapOptions },
]

export const propLabelDebounceTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'со значением', value: 1000, expected: 1000 },
  { prop: 'labelDebounce', case: 'без значения', value: undefined, expected: labelDebounce },
]

export const propErrorTestCases: TPropTestCase<IYVueMultipleSelectFieldProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: error },
]
