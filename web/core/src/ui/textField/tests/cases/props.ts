import { empty, text } from '~shared/tests/slotContents'
import { EYInputType, EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import type { IYCoreTextFieldProps } from '~core/ui/textField/models/types'
import type { IYCoreLabelExternalProps } from '~core/ui/label/models/types'

export const testErrors = [
  text,
  text,
]
const sizes = Object.values(EYSizes).filter((size) => size !== EYSizes.EXTRA_LARGE && size !== EYSizes.EXTRA_SMALL)

type TPropAnnotation<K extends keyof IYCoreTextFieldProps, T extends keyof IYCoreAnnotationExternalProps> = TPropTestCase<IYCoreTextFieldProps, K> & { annotationProp: T }
type TPropLabel<K extends keyof IYCoreTextFieldProps, T extends keyof IYCoreLabelExternalProps> = TPropTestCase<IYCoreTextFieldProps, K> & { labelProp: T }

export const propValueCases: TPropTestCase<IYCoreTextFieldProps, 'value'>[] = [
  { prop: 'value', case: 'с текстом', value: text },
  { prop: 'value', case: 'без текста', value: '' },
]

export const propNameCases: TPropTestCase<IYCoreTextFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text },
  { prop: 'name', case: 'без текста', value: '' },
]

export const propTypeTestCases: TPropTestCase<IYCoreTextFieldProps, 'type'>[] = [
  { prop: 'type', case: EYInputType.TEXT, value: EYInputType.TEXT, expected: EYInputType.TEXT },
  { prop: 'type', case: EYInputType.NUMBER, value: EYInputType.NUMBER, expected: EYInputType.NUMBER },
]

export const propPlaceholderCases: TPropTestCase<IYCoreTextFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text },
  { prop: 'placeholder', case: 'без текста', value: empty },
]

export const propRequiredCases: TPropTestCase<IYCoreTextFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true },
  { prop: 'required', case: 'false', value: false },
]

export const propMaxlengthCases: TPropTestCase<IYCoreTextFieldProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: '10', value: 10 },
  { prop: 'maxlength', case: '100', value: 100 },
  { prop: 'maxlength', case: 'без ограничения', value: undefined },
]

export const propAutofocusCases: TPropTestCase<IYCoreTextFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true },
  { prop: 'autofocus', case: 'false', value: false },
]

export const propDisabledCases: TPropTestCase<IYCoreTextFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]

export const propReadonlyCases: TPropTestCase<IYCoreTextFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IYCoreTextFieldProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))

export const propErrorsCases: TPropTestCase<IYCoreTextFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'с ошибками', value: [text], expected: true },
  { prop: 'errors', case: 'без ошибок', value: [], expected: false },
]

export const propErrorCases: TPropTestCase<IYCoreTextFieldProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
]


export const propLabelTextCases: TPropLabel<'labelText', 'text'>[] = [
  { prop: 'labelText', labelProp: 'text', case: 'с текстом', value: text },
  { prop: 'labelText', labelProp: 'text', case: 'без текста', value: '' },
]

export const propLabelTooltipTextCases: TPropLabel<'labelTooltipText', 'tooltipText'>[] = [
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'с текстом', value: text },
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'без текста', value: empty },
]

export const propAnnotationTextTestCases: TPropAnnotation<'annotationText', 'text'>[] = [
  { prop: 'annotationText', annotationProp: 'text', case: 'с текстом', value: text },
  { prop: 'annotationText', annotationProp: 'text', case: 'с пустым значением', value: empty },
  { prop: 'annotationText', annotationProp: 'text', case: 'без текста', value: undefined },
]

export const propClearableCases: TPropTestCase<IYCoreTextFieldProps, 'clearable'>[] = [
  { prop: 'clearable', case: 'true', value: true },
  { prop: 'clearable', case: 'false', value: false },
]
