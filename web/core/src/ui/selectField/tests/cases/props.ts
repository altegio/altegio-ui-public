import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreSelectFieldProps } from '~core/ui/selectField/models/types'
import { empty, number, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { IYCoreAnnotationProps } from '~core/ui/annotation/models/types'
import type { IYCoreLabelProps } from '~core/ui/label/models/types'

export const sizes = Object.values(EYSizes).filter((size) => size !== EYSizes.EXTRA_LARGE && size !== EYSizes.EXTRA_SMALL)

export const testErrors = [
  text,
  text,
]

export const items: IYCoreSelectFieldProps['items'] = [
  {
    id: '1',
    label: 'Item 1',
    value: 'item1',
    name: 'Item name 1',
  },
  {
    id: '2',
    label: 'Item 2',
    value: 'item2',
    name: 'Item name 2',
  },
]

export const filterCallback: IYCoreSelectFieldProps['filterCallback'] = (items, filterValue) => {
  return items.filter((item) => item.label === filterValue)
}


export const propDisabledTestCases: TPropTestCase<IYCoreSelectFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]

export const propReadonlyTestCases: TPropTestCase<IYCoreSelectFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
]

export const propSizeTestCases: TPropTestCase<IYCoreSelectFieldProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))

export const propValueTestCases: TPropTestCase<IYCoreSelectFieldProps, 'value'>[] = [
  { prop: 'value', case: JSON.stringify(items[0]), value: items[0], expected: String(items[0].label) },
  { prop: 'value', case: JSON.stringify(items[1]), value: items[1], expected: String(items[1].label) },
  { prop: 'value', case: 'без выбранного значения', value: undefined, expected: empty },
]

export const propNameTestCases: TPropTestCase<IYCoreSelectFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text },
  { prop: 'name', case: 'с пустой строкой', value: empty },
  { prop: 'name', case: 'без текста', value: undefined },
]

export const propPlaceholderTestCases: TPropTestCase<IYCoreSelectFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text },
  { prop: 'placeholder', case: 'с пустым значением', value: empty },
  { prop: 'placeholder', case: 'без выбранного значения', value: undefined },
]

export const propAutofocusTestCases: TPropTestCase<IYCoreSelectFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true },
  { prop: 'autofocus', case: 'false', value: false },
]

export const propRequiredTestCases: TPropTestCase<IYCoreSelectFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true },
  { prop: 'required', case: 'false', value: false },
]
export const propErrorsTestCases: TPropTestCase<IYCoreSelectFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'с ошибками', value: testErrors },
  { prop: 'errors', case: 'с одной ошибкой', value: [testErrors[0]] },
  { prop: 'errors', case: '0 ошибок', value: [] },
  { prop: 'errors', case: 'без ошибок', value: undefined },
]

export const propErrorTestCases: TPropTestCase<IYCoreSelectFieldProps, 'error'>[] = [
  { prop: 'error', case: 'c ошибкой', value: true },
  { prop: 'error', case: 'без ошибок', value: false },
  { prop: 'error', case: 'не передано ошибок', value: undefined },
]

export const propIsMapOptionsTestCases: TPropTestCase<IYCoreSelectFieldProps, 'isMapOptions'>[] = [
  { prop: 'isMapOptions', case: 'false', value: false, expected: String(items[0].label), additionalProps: { selectedValue: items[0] } },
  { prop: 'isMapOptions', case: 'true', value: true, expected: String(items[0].label), additionalProps: { selectedValue: items[0].id } },
]

type TPropAnnotation<K extends keyof IYCoreSelectFieldProps, T extends keyof IYCoreAnnotationProps> = TPropTestCase<IYCoreSelectFieldProps, K> & { annotationProp: T }
type TPropLabel<K extends keyof IYCoreSelectFieldProps, T extends keyof IYCoreLabelProps> = TPropTestCase<IYCoreSelectFieldProps, K> & { labelProp: T }

export const propLabelTextTestCases: TPropLabel<'labelText', 'text'>[] = [
  { prop: 'labelText', labelProp: 'text', case: 'с текстом', value: text },
  { prop: 'labelText', labelProp: 'text', case: 'с пустым значением', value: empty },
  { prop: 'labelText', labelProp: 'text', case: 'без текста', value: undefined },
]

export const propLabelTooltipTextTestCases: TPropLabel<'labelTooltipText', 'tooltipText'>[] = [
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'с текстом', value: text },
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'с пустым значением', value: empty },
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'без текста', value: undefined },
]

export const propLabelDebounceTestCases: TPropLabel<'labelDebounce', 'debounce'>[] = [
  { prop: 'labelDebounce', case: String(number), labelProp: 'debounce', value: Number(number) },
  { prop: 'labelDebounce', case: 'undefined', labelProp: 'debounce', value: undefined },
]

export const propAnnotationTextTestCases: TPropAnnotation<'annotationText', 'text'>[] = [
  { prop: 'annotationText', annotationProp: 'text', case: 'с текстом', value: text },
  { prop: 'annotationText', annotationProp: 'text', case: 'с пустым значением', value: empty },
  { prop: 'annotationText', annotationProp: 'text', case: 'без текста', value: undefined },
]

export const propItemLabelTestCases: TPropTestCase<IYCoreSelectFieldProps, 'itemLabel'>[] = [
  { prop: 'itemLabel', case: 'по умолчанию "label"', value: 'label', expected: String(items[0].label), additionalProps: { selectedValue: items[0] } },
  { prop: 'itemLabel', case: 'name', value: 'name', expected: String(items[0].name), additionalProps: { selectedValue: items[0] } },
]

export const propItemValueTestCases: TPropTestCase<IYCoreSelectFieldProps, 'itemValue'>[] = [
  { prop: 'itemValue', case: 'по умолчанию "id"', value: 'id', expected: String(items[0].label), additionalProps: { selectedValue: items[0] } },
  { prop: 'itemValue', case: 'value', value: 'value', expected: String(items[0].label), additionalProps: { selectedValue: items[0] } },
]

export const propIsCustomFilterTestCases: TPropTestCase<IYCoreSelectFieldProps, 'isCustomFilter'>[] = [
  { prop: 'isCustomFilter', case: 'true', value: true },
  { prop: 'isCustomFilter', case: 'false', value: false },
]

export const propIsFilterableTestCases: TPropTestCase<IYCoreSelectFieldProps, 'isFilterable'>[] = [
  { prop: 'isFilterable', case: 'true', value: true, additionalProps: { items } },
  { prop: 'isFilterable', case: 'false', value: false, additionalProps: { items } },
]

export const propFilterCallbackCases: TPropTestCase<IYCoreSelectFieldProps, 'filterCallback'>[] = [
  { prop: 'filterCallback', case: 'function', value: filterCallback, additionalProps: { isFilterable: true, items } },
  { prop: 'filterCallback', case: 'undefined', value: undefined, additionalProps: { isFilterable: false, items } },
]
