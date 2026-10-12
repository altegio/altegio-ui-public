import { empty, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { IYVueSelectFieldProps } from '~vue/ui/selectField/models/types'
import { createVueSelectFieldProps } from '~vue/ui/selectField/models/types'
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
} = createVueSelectFieldProps()

export const propValueTestCases: TPropTestCase<IYVueSelectFieldProps, 'modelValue'>[] = [
  { prop: 'modelValue', case: 'со значением', value: text, expected: text, additionalProps: { isMapOptions: true } },
  { prop: 'modelValue', case: 'без значения', value: undefined, expected: modelValue, additionalProps: { isMapOptions: true } },
]

export const propNameTestCases: TPropTestCase<IYVueSelectFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IYVueSelectFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IYVueSelectFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: autofocus },
]
export const propDisabledTestCases: TPropTestCase<IYVueSelectFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]
export const propReadonlyTestCases: TPropTestCase<IYVueSelectFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, expected: true },
  { prop: 'readonly', case: 'false', value: false, expected: false },
  { prop: 'readonly', case: 'undefined', value: undefined, expected: readonly },
]
export const propRequiredTestCases: TPropTestCase<IYVueSelectFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]
export const propErrorsTestCases: TPropTestCase<IYVueSelectFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IYVueSelectFieldProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelTextTestCases: TPropTestCase<IYVueSelectFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IYVueSelectFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
export const propAnnotationTextTestCases: TPropTestCase<IYVueSelectFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'текст', value: text, expected: text },
  { prop: 'annotationText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: annotationText },
]

export const propItemLabelTestCases: TPropTestCase<IYVueSelectFieldProps, 'itemLabel'>[] = [
  { prop: 'itemLabel', case: 'текст', value: 'label', expected: 'label' },
  { prop: 'itemLabel', case: 'undefined', value: undefined, expected: itemLabel },
]

export const propItemValueTestCases: TPropTestCase<IYVueSelectFieldProps, 'itemValue'>[] = [
  { prop: 'itemValue', case: 'текст', value: 'value', expected: 'value' },
  { prop: 'itemValue', case: 'undefined', value: undefined, expected: itemValue },
]

export const propItemsTestCases: TPropTestCase<IYVueSelectFieldProps, 'items'>[] = [
  { prop: 'items', case: 'массив опций', value: [{ id: 1 }], expected: [{ id: 1 }] },
  { prop: 'items', case: 'пустой массив', value: [], expected: [] },
  { prop: 'items', case: 'undefined', value: undefined, expected: [] },
]

export const filterCallbackMock: IYVueSelectFieldProps['filterCallback'] = () => []

export const propFilterCallbackTestCases: TPropTestCase<IYVueSelectFieldProps, 'filterCallback'>[] = [
  { prop: 'filterCallback', case: 'function', value: filterCallbackMock, expected: filterCallbackMock },
  { prop: 'filterCallback', case: 'undefined', value: undefined, expected: filterCallback },
]

export const propIsCustomFilterTestCases: TPropTestCase<IYVueSelectFieldProps, 'isCustomFilter'>[] = [
  { prop: 'isCustomFilter', case: 'true', value: true, expected: true },
  { prop: 'isCustomFilter', case: 'false', value: false, expected: false },
  { prop: 'isCustomFilter', case: 'undefined', value: undefined, expected: isCustomFilter },
]

export const propIsFilterableTestCases: TPropTestCase<IYVueSelectFieldProps, 'isFilterable'>[] = [
  { prop: 'isFilterable', case: 'true', value: true, expected: true },
  { prop: 'isFilterable', case: 'false', value: false, expected: false },
  { prop: 'isFilterable', case: 'undefined', value: undefined, expected: isFilterable },
]

export const propIsMapOptionsTestCases: TPropTestCase<IYVueSelectFieldProps, 'isMapOptions'>[] = [
  { prop: 'isMapOptions', case: 'true', value: true, expected: true },
  { prop: 'isMapOptions', case: 'false', value: false, expected: false },
  { prop: 'isMapOptions', case: 'undefined', value: undefined, expected: isMapOptions },
]

export const propErrorTestCases: TPropTestCase<IYVueSelectFieldProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: error },
]

export const propLabelDebounceTestCases: TPropTestCase<IYVueSelectFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'со значением', value: 1000, expected: 1000 },
  { prop: 'labelDebounce', case: 'без значения', value: undefined, expected: labelDebounce },
]
