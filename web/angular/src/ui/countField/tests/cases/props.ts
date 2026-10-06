import type { TPropTestCase } from '~shared/types/tests'
import type { IYNgCountFieldProps } from '~ng/ui/countField/models/types'

export const propMinTestCases: TPropTestCase<IYNgCountFieldProps, 'min'>[] = [
  { prop: 'min', case: 'с минимальным значением', value: 0 },
  { prop: 'min', case: 'без минимального значения', value: undefined },
]

export const propMaxTestCases: TPropTestCase<IYNgCountFieldProps, 'max'>[] = [
  { prop: 'max', case: 'с максимальным значением', value: Infinity },
  { prop: 'max', case: 'без максимального значения', value: undefined },
]

export const propSizeTestCases: TPropTestCase<IYNgCountFieldProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: 'small' },
  { prop: 'size', case: 'medium', value: 'medium' },
  { prop: 'size', case: 'large', value: 'large' },
]

export const propDisabledTestCases: TPropTestCase<IYNgCountFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'содержать', value: true },
  { prop: 'disabled', case: 'отсутствовать', value: false },
]

export const propRequiredTestCases: TPropTestCase<IYNgCountFieldProps, 'required'>[] = [
  { prop: 'required', case: 'содержать', value: true },
  { prop: 'required', case: 'отсутствовать', value: false },
]

export const propErrorTestCases: TPropTestCase<IYNgCountFieldProps, 'error'>[] = [
  { prop: 'error', case: 'содержать', value: true },
  { prop: 'error', case: 'отсутствовать', value: false },
]

export const propPlaceholderTestCases: TPropTestCase<IYNgCountFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: 'Введите значение' },
  { prop: 'placeholder', case: 'без текста', value: '' },
]

export const propAutofocusTestCases: TPropTestCase<IYNgCountFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'содержать', value: true },
  { prop: 'autofocus', case: 'отсутствовать', value: false },
]

export const propLabelTextTestCases: TPropTestCase<IYNgCountFieldProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с текстом', value: 'Метка' },
  { prop: 'labelText', case: 'без текста', value: '' },
]

export const propLabelTooltipTextTestCases: TPropTestCase<IYNgCountFieldProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с текстом', value: 'Подсказка' },
  { prop: 'labelTooltipText', case: 'без текста', value: '' },
]

export const propLabelDebounceTestCases: TPropTestCase<IYNgCountFieldProps, 'labelDebounce'>[] = [
  { prop: 'labelDebounce', case: 'с задержкой', value: 300 },
  { prop: 'labelDebounce', case: 'без задержки', value: 0 },
]

export const propAnnotationTextTestCases: TPropTestCase<IYNgCountFieldProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'с текстом', value: 'Аннотация' },
  { prop: 'annotationText', case: 'без текста', value: '' },
]

export const propErrorsTestCases: TPropTestCase<IYNgCountFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'с ошибками', value: ['Ошибка 1', 'Ошибка 2'] },
  { prop: 'errors', case: 'без ошибок', value: [] },
]

export const propNameTestCases: TPropTestCase<IYNgCountFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с именем', value: 'count-field' },
  { prop: 'name', case: 'без имени', value: '' },
]
