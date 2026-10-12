import { empty, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYNgMultipleSelectFieldProps } from '~ng/ui/multipleSelectField/models/types'
import { createNgMultipleSelectFieldProps } from '~ng/ui/multipleSelectField/models/types'

const {
  name,
  placeholder,
  disabled,
  errors,
  size,
  required,
  labelText,
  labelTooltipText,
  annotationText,
  itemLabel,
  value,
  isCustomFilter,
  isFilterable,
  itemValue,
  filterCallback,
  labelDebounce,
  error,
} = createNgMultipleSelectFieldProps()

export const propValueTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'value'>[] = [
  { prop: 'value', case: 'со значением', value: [text], expected: [text], additionalProps: { isMapOptions: true } },
  { prop: 'value', case: 'без значения', value: undefined, expected: value, additionalProps: { isMapOptions: true } },
]

export const propNameTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, expected: text },
  { prop: 'name', case: 'без текста', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, expected: text },
  { prop: 'placeholder', case: 'без текста', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]
export const propDisabledTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propRequiredTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]
export const propErrorsTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelTextTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
export const propAnnotationTextTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'текст', value: text, expected: text },
  { prop: 'annotationText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: annotationText },
]

export const propItemLabelTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'itemLabel'>[] = [
  { prop: 'itemLabel', case: 'текст', value: 'label', expected: 'label' },
  { prop: 'itemLabel', case: 'undefined', value: undefined, expected: itemLabel },
]

export const propItemValueTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'itemValue'>[] = [
  { prop: 'itemValue', case: 'текст', value: 'value', expected: 'value' },
  { prop: 'itemValue', case: 'undefined', value: undefined, expected: itemValue },
]

export const propItemsTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'items'>[] = [
  { prop: 'items', case: 'массив опций', value: [{ id: 1 }], expected: [{ id: 1 }] },
  { prop: 'items', case: 'пустой массив', value: [], expected: [] },
  { prop: 'items', case: 'undefined', value: undefined, expected: [] },
]

export const filterCallbackMock: IYNgMultipleSelectFieldProps['filterCallback'] = () => []

export const propFilterCallbackTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'filterCallback'>[] = [
  { prop: 'filterCallback', case: 'function', value: filterCallbackMock, expected: filterCallbackMock },
  { prop: 'filterCallback', case: 'undefined', value: undefined, expected: filterCallback },
]

export const propIsCustomFilterTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'isCustomFilter'>[] = [
  { prop: 'isCustomFilter', case: 'true', value: true, expected: true },
  { prop: 'isCustomFilter', case: 'false', value: false, expected: false },
  { prop: 'isCustomFilter', case: 'undefined', value: undefined, expected: isCustomFilter },
]

export const propIsFilterableTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'isFilterable'>[] = [
  { prop: 'isFilterable', case: 'true', value: true, expected: true },
  { prop: 'isFilterable', case: 'false', value: false, expected: false },
  { prop: 'isFilterable', case: 'undefined', value: undefined, expected: isFilterable },
]

export const propIsMapOptionsTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'isMapOptions'>[] = [
  { prop: 'isMapOptions', case: 'true', value: true, expected: true },
  { prop: 'isMapOptions', case: 'false', value: false, expected: false },
]

export const propErrorTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: error },
]

export const propLabelDebounceTestCases: TPropTestCase<IYNgMultipleSelectFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'со значением', value: 1000, expected: 1000 },
  { prop: 'labelDebounce', case: 'без значения', value: undefined, expected: labelDebounce },
]
