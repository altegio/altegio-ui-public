import { searchNumberValue, text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { type IAltCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import type { IAltCorePhoneFieldProps } from '~core/ui/phoneField/models/types'
import type { IAltCoreLabelExternalProps } from '~core/ui/label/models/types'

export const testErrors = [
  text,
  text,
]

export const sizes = Object.values(EAltSizes).filter((size) => size !== EAltSizes.EXTRA_LARGE && size !== EAltSizes.EXTRA_SMALL)

export const autocompleteOptions = [{ id: 1, title: 'Some title', phone: '+7 999 157-91-72' }]

export const searchFunction: IAltCorePhoneFieldProps['searchFunction'] = (detail) => {
  const { meta } = detail
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(autocompleteOptions.filter((item) => item.phone.replace(/[( )-]/g, '').includes(meta.phoneBody)))
    }, 500)
  })
}

export const propValueCases: TPropTestCase<IAltCorePhoneFieldProps, 'value'>[] = [
  { prop: 'value', case: 'with a number', value: searchNumberValue },
  { prop: 'value', case: 'without a number', value: '' },
]
export const propNameCases: TPropTestCase<IAltCorePhoneFieldProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text },
  { prop: 'name', case: 'without text', value: '' },
]
export const propPlaceholderCases: TPropTestCase<IAltCorePhoneFieldProps, 'placeholder'>[] = [{ prop: 'placeholder', case: 'with text', value: text }]
export const propAutofocusCases: TPropTestCase<IAltCorePhoneFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true },
  { prop: 'autofocus', case: 'false', value: false },
]
export const propDisabledCases: TPropTestCase<IAltCorePhoneFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propReadonlyCases: TPropTestCase<IAltCorePhoneFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
]
export const propRequiredCases: TPropTestCase<IAltCorePhoneFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true },
  { prop: 'required', case: 'false', value: false },
]
export const propErrorsCases: TPropTestCase<IAltCorePhoneFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'with errors', value: testErrors },
  { prop: 'errors', case: 'with one error', value: [testErrors[0]] },
  { prop: 'errors', case: 'without errors', value: [] },
]
export const propSizeCases: TPropTestCase<IAltCorePhoneFieldProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))

type TPropMinSearchlength = TPropTestCase<IAltCorePhoneFieldProps, 'minSearchLength'> & { searchPhone: string }

export const propMinSearchLengthCases: TPropMinSearchlength[] = [
  { prop: 'minSearchLength', case: 'is greater than the phone length', value: 3, searchPhone: '99' },
  { prop: 'minSearchLength', case: 'equals the phone length', value: 3, searchPhone: '999' },
  { prop: 'minSearchLength', case: 'is less than the phone length', value: 3, searchPhone: '9999' },
]

export const propDisabledAutocompleteCases: TPropTestCase<IAltCorePhoneFieldProps, 'disabledAutocomplete'>[] = [
  { prop: 'disabledAutocomplete', case: 'true', value: true },
  { prop: 'disabledAutocomplete', case: 'false', value: false },
]

export const propWithoutCodeSelectionCases: TPropTestCase<IAltCorePhoneFieldProps, 'withoutCodeSelection'>[] = [
  { prop: 'withoutCodeSelection', case: 'false', value: false },
  { prop: 'withoutCodeSelection', case: 'true', value: true },
]

export const propSearchFunctionCases: TPropTestCase<IAltCorePhoneFieldProps, 'searchFunction'>[] = [
  { prop: 'searchFunction', case: 'function', value: searchFunction },
  { prop: 'searchFunction', case: 'undefined', value: undefined },
]

export const propDefaultCountryIdCases: TPropTestCase<IAltCorePhoneFieldProps, 'defaultCountryId'>[] = [
  { prop: 'defaultCountryId', case: 'set', value: 2 },
  { prop: 'defaultCountryId', case: 'not set', value: undefined },
]

type TPropAnnotation<K extends keyof IAltCorePhoneFieldProps, T extends keyof IAltCoreAnnotationExternalProps> = TPropTestCase<IAltCorePhoneFieldProps, K> & { annotationProp: T }
type TPropLabel<K extends keyof IAltCorePhoneFieldProps, T extends keyof IAltCoreLabelExternalProps> = TPropTestCase<IAltCorePhoneFieldProps, K> & { labelProp: T }

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
