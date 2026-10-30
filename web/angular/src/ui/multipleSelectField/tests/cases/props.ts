import { empty, text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltNgMultipleSelectFieldProps } from '~ng/ui/multipleSelectField/models/types'
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

export const propValueTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'value'>[] = [
  { prop: 'value', case: 'with a value', value: [text], expected: [text], additionalProps: { isMapOptions: true } },
  { prop: 'value', case: 'without a value', value: undefined, expected: value, additionalProps: { isMapOptions: true } },
]

export const propNameTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text, expected: text },
  { prop: 'name', case: 'without text', value: '', expected: '' },
  { prop: 'name', case: 'undefined', value: undefined, expected: name },
]
export const propPlaceholderTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text, expected: text },
  { prop: 'placeholder', case: 'without text', value: '', expected: '' },
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: placeholder },
]
export const propAutofocusTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, expected: true },
  { prop: 'autofocus', case: 'false', value: false, expected: false },
]
export const propDisabledTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: disabled },
]

export const propRequiredTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: required },
]
export const propErrorsTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'array with errors', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'empty array', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: errors },
]
export const propSizeTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: size },
]
export const propLabelTextTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'text', value: text, expected: text },
  { prop: 'labelText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: labelText },
]
export const propLabelTooltipTextTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: labelTooltipText },
]
export const propAnnotationTextTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'text', value: text, expected: text },
  { prop: 'annotationText', case: 'empty string', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: annotationText },
]

export const propItemLabelTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'itemLabel'>[] = [
  { prop: 'itemLabel', case: 'text', value: 'label', expected: 'label' },
  { prop: 'itemLabel', case: 'undefined', value: undefined, expected: itemLabel },
]

export const propItemValueTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'itemValue'>[] = [
  { prop: 'itemValue', case: 'text', value: 'value', expected: 'value' },
  { prop: 'itemValue', case: 'undefined', value: undefined, expected: itemValue },
]

export const propItemsTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'items'>[] = [
  { prop: 'items', case: 'options array', value: [{ id: 1 }], expected: [{ id: 1 }] },
  { prop: 'items', case: 'empty array', value: [], expected: [] },
  { prop: 'items', case: 'undefined', value: undefined, expected: [] },
]

export const filterCallbackMock: IAltNgMultipleSelectFieldProps['filterCallback'] = () => []

export const propFilterCallbackTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'filterCallback'>[] = [
  { prop: 'filterCallback', case: 'function', value: filterCallbackMock, expected: filterCallbackMock },
  { prop: 'filterCallback', case: 'undefined', value: undefined, expected: filterCallback },
]

export const propIsCustomFilterTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'isCustomFilter'>[] = [
  { prop: 'isCustomFilter', case: 'true', value: true, expected: true },
  { prop: 'isCustomFilter', case: 'false', value: false, expected: false },
  { prop: 'isCustomFilter', case: 'undefined', value: undefined, expected: isCustomFilter },
]

export const propIsFilterableTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'isFilterable'>[] = [
  { prop: 'isFilterable', case: 'true', value: true, expected: true },
  { prop: 'isFilterable', case: 'false', value: false, expected: false },
  { prop: 'isFilterable', case: 'undefined', value: undefined, expected: isFilterable },
]

export const propIsMapOptionsTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'isMapOptions'>[] = [
  { prop: 'isMapOptions', case: 'true', value: true, expected: true },
  { prop: 'isMapOptions', case: 'false', value: false, expected: false },
]

export const propErrorTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: error },
]

export const propLabelDebounceTestCases: TPropTestCase<IAltNgMultipleSelectFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'with a value', value: 1000, expected: 1000 },
  { prop: 'labelDebounce', case: 'without a value', value: undefined, expected: labelDebounce },
]
