import { text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { type IYCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import type { IYCoreAutocompleteFieldProps } from '~core/ui/autocompleteField/models/types'
import type { IYCoreLabelExternalProps } from '~core/ui/label/models/types'

export const testErrors = [
  text,
  text,
]

export const sizes = Object.values(EYSizes).filter((size) => size !== EYSizes.EXTRA_LARGE && size !== EYSizes.EXTRA_SMALL)

export const autocompleteOptions = [{ id: 1, value: text }]

export const searchFunction: IYCoreAutocompleteFieldProps['searchFunction'] = (options) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(autocompleteOptions.filter((item) => item.value.toLowerCase().includes(options.value.toLowerCase())))
    }, 500)
  })
}

export const propValueCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'value'>[] = [
  { prop: 'value', case: 'with a value', value: text },
  { prop: 'value', case: 'without a value', value: '' },
]
export const propNameCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text },
  { prop: 'name', case: 'without text', value: '' },
]
export const propPlaceholderCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'placeholder'>[] = [{ prop: 'placeholder', case: 'with text', value: text }]
export const propAutofocusCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true },
  { prop: 'autofocus', case: 'false', value: false },
]
export const propDisabledCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propReadonlyCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
]
export const propRequiredCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true },
  { prop: 'required', case: 'false', value: false },
]
export const propErrorsCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'with errors', value: testErrors },
  { prop: 'errors', case: 'with one error', value: [testErrors[0]] },
  { prop: 'errors', case: 'without errors', value: [] },
]
export const propSizeCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))

type TPropMinSearchlength = TPropTestCase<IYCoreAutocompleteFieldProps, 'minSearchLength'> & { searchValue: string }

export const propMinSearchLengthCases: TPropMinSearchlength[] = [
  { prop: 'minSearchLength', case: 'is less than the minimum search length', value: 3, searchValue: 'ma' },
  { prop: 'minSearchLength', case: 'equals the minimum search length', value: 3, searchValue: 'mak' },
  { prop: 'minSearchLength', case: 'is greater than the minimum search length', value: 3, searchValue: 'make' },
]

export const propDisabledAutocompleteCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'disabledAutocomplete'>[] = [
  { prop: 'disabledAutocomplete', case: 'true', value: true },
  { prop: 'disabledAutocomplete', case: 'false', value: false },
]

export const propSearchFunctionCases: TPropTestCase<IYCoreAutocompleteFieldProps, 'searchFunction'>[] = [
  { prop: 'searchFunction', case: 'function', value: searchFunction },
  { prop: 'searchFunction', case: 'undefined', value: undefined },
]

type TPropAnnotation<K extends keyof IYCoreAutocompleteFieldProps, T extends keyof IYCoreAnnotationExternalProps> = TPropTestCase<IYCoreAutocompleteFieldProps, K> & { annotationProp: T }
type TPropLabel<K extends keyof IYCoreAutocompleteFieldProps, T extends keyof IYCoreLabelExternalProps> = TPropTestCase<IYCoreAutocompleteFieldProps, K> & { labelProp: T }

export const propLabelTextCases: TPropLabel<'labelText', 'text'>[] = [
  { prop: 'labelText', labelProp: 'text', case: 'with text', value: text },
  { prop: 'labelText', labelProp: 'text', case: 'without text', value: '' },
]
export const propLabelTooltipTextCases: TPropLabel<'labelTooltipText', 'tooltipText'>[] = [
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'with text', value: text },
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'without text', value: '' },
]
export const propAnnotationTextCases: TPropAnnotation<'annotationText', 'text'>[] = [
  { prop: 'annotationText', annotationProp: 'text', case: 'with text', value: text },
  { prop: 'annotationText', annotationProp: 'text', case: 'without text', value: '' },
]
