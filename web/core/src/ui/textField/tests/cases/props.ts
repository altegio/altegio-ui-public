import { empty, text } from '~shared/tests/slotContents'
import { EAltInputType, EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import type { IAltCoreTextFieldProps } from '~core/ui/textField/models/types'
import type { IAltCoreLabelExternalProps } from '~core/ui/label/models/types'

export const testErrors = [
  text,
  text,
]
const sizes = Object.values(EAltSizes).filter((size) => size !== EAltSizes.EXTRA_LARGE && size !== EAltSizes.EXTRA_SMALL)

type TPropAnnotation<K extends keyof IAltCoreTextFieldProps, T extends keyof IAltCoreAnnotationExternalProps> = TPropTestCase<IAltCoreTextFieldProps, K> & { annotationProp: T }
type TPropLabel<K extends keyof IAltCoreTextFieldProps, T extends keyof IAltCoreLabelExternalProps> = TPropTestCase<IAltCoreTextFieldProps, K> & { labelProp: T }

export const propValueCases: TPropTestCase<IAltCoreTextFieldProps, 'value'>[] = [
  { prop: 'value', case: 'with text', value: text },
  { prop: 'value', case: 'without text', value: '' },
]

export const propNameCases: TPropTestCase<IAltCoreTextFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text },
  { prop: 'name', case: 'without text', value: '' },
]

export const propTypeTestCases: TPropTestCase<IAltCoreTextFieldProps, 'type'>[] = [
  { prop: 'type', case: EAltInputType.TEXT, value: EAltInputType.TEXT, expected: EAltInputType.TEXT },
  { prop: 'type', case: EAltInputType.NUMBER, value: EAltInputType.NUMBER, expected: EAltInputType.NUMBER },
]

export const propPlaceholderCases: TPropTestCase<IAltCoreTextFieldProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text },
  { prop: 'placeholder', case: 'without text', value: empty },
]

export const propRequiredCases: TPropTestCase<IAltCoreTextFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true },
  { prop: 'required', case: 'false', value: false },
]

export const propMaxlengthCases: TPropTestCase<IAltCoreTextFieldProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: '10', value: 10 },
  { prop: 'maxlength', case: '100', value: 100 },
  { prop: 'maxlength', case: 'without a limit', value: undefined },
]

export const propAutofocusCases: TPropTestCase<IAltCoreTextFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true },
  { prop: 'autofocus', case: 'false', value: false },
]

export const propDisabledCases: TPropTestCase<IAltCoreTextFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]

export const propReadonlyCases: TPropTestCase<IAltCoreTextFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IAltCoreTextFieldProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))

export const propErrorsCases: TPropTestCase<IAltCoreTextFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'with errors', value: [text], expected: true },
  { prop: 'errors', case: 'without errors', value: [], expected: false },
]

export const propErrorCases: TPropTestCase<IAltCoreTextFieldProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
]


export const propLabelTextCases: TPropLabel<'labelText', 'text'>[] = [
  { prop: 'labelText', labelProp: 'text', case: 'with text', value: text },
  { prop: 'labelText', labelProp: 'text', case: 'without text', value: '' },
]

export const propLabelTooltipTextCases: TPropLabel<'labelTooltipText', 'tooltipText'>[] = [
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'with text', value: text },
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'without text', value: empty },
]

export const propAnnotationTextTestCases: TPropAnnotation<'annotationText', 'text'>[] = [
  { prop: 'annotationText', annotationProp: 'text', case: 'with text', value: text },
  { prop: 'annotationText', annotationProp: 'text', case: 'with an empty value', value: empty },
  { prop: 'annotationText', annotationProp: 'text', case: 'without text', value: undefined },
]

export const propClearableCases: TPropTestCase<IAltCoreTextFieldProps, 'clearable'>[] = [
  { prop: 'clearable', case: 'true', value: true },
  { prop: 'clearable', case: 'false', value: false },
]
