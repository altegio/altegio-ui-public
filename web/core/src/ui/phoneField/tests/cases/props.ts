import { searchNumberValue, text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import { type IYCoreAnnotationExternalProps } from '~core/ui/annotation/models/types'
import type { IYCorePhoneFieldProps } from '~core/ui/phoneField/models/types'
import type { IYCoreLabelExternalProps } from '~core/ui/label/models/types'

export const testErrors = [
  text,
  text,
]

export const sizes = Object.values(EYSizes).filter((size) => size !== EYSizes.EXTRA_LARGE && size !== EYSizes.EXTRA_SMALL)

export const autocompleteOptions = [{ id: 1, title: 'Some title', phone: '+7 999 157-91-72' }]

export const searchFunction: IYCorePhoneFieldProps['searchFunction'] = (detail) => {
  const { meta } = detail
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(autocompleteOptions.filter((item) => item.phone.replace(/[( )-]/g, '').includes(meta.phoneBody)))
    }, 500)
  })
}

export const propValueCases: TPropTestCase<IYCorePhoneFieldProps, 'value'>[] = [
  { prop: 'value', case: 'с номером', value: searchNumberValue },
  { prop: 'value', case: 'без номера', value: '' },
]
export const propNameCases: TPropTestCase<IYCorePhoneFieldProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text },
  { prop: 'name', case: 'без текста', value: '' },
]
export const propPlaceholderCases: TPropTestCase<IYCorePhoneFieldProps, 'placeholder'>[] = [{ prop: 'placeholder', case: 'с текстом', value: text }]
export const propAutofocusCases: TPropTestCase<IYCorePhoneFieldProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true },
  { prop: 'autofocus', case: 'false', value: false },
]
export const propDisabledCases: TPropTestCase<IYCorePhoneFieldProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propReadonlyCases: TPropTestCase<IYCorePhoneFieldProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
]
export const propRequiredCases: TPropTestCase<IYCorePhoneFieldProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true },
  { prop: 'required', case: 'false', value: false },
]
export const propErrorsCases: TPropTestCase<IYCorePhoneFieldProps, 'errors'>[] = [
  { prop: 'errors', case: 'с ошибками', value: testErrors },
  { prop: 'errors', case: 'с одной ошибкой', value: [testErrors[0]] },
  { prop: 'errors', case: 'без ошибок', value: [] },
]
export const propSizeCases: TPropTestCase<IYCorePhoneFieldProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))

type TPropMinSearchlength = TPropTestCase<IYCorePhoneFieldProps, 'minSearchLength'> & { searchPhone: string }

export const propMinSearchLengthCases: TPropMinSearchlength[] = [
  { prop: 'minSearchLength', case: 'больше длины телефона', value: 3, searchPhone: '99' },
  { prop: 'minSearchLength', case: 'равно длине телефона', value: 3, searchPhone: '999' },
  { prop: 'minSearchLength', case: 'меньше длины телефона', value: 3, searchPhone: '9999' },
]

export const propDisabledAutocompleteCases: TPropTestCase<IYCorePhoneFieldProps, 'disabledAutocomplete'>[] = [
  { prop: 'disabledAutocomplete', case: 'true', value: true },
  { prop: 'disabledAutocomplete', case: 'false', value: false },
]

export const propWithoutCodeSelectionCases: TPropTestCase<IYCorePhoneFieldProps, 'withoutCodeSelection'>[] = [
  { prop: 'withoutCodeSelection', case: 'false', value: false },
  { prop: 'withoutCodeSelection', case: 'true', value: true },
]

export const propSearchFunctionCases: TPropTestCase<IYCorePhoneFieldProps, 'searchFunction'>[] = [
  { prop: 'searchFunction', case: 'function', value: searchFunction },
  { prop: 'searchFunction', case: 'undefined', value: undefined },
]

export const propDefaultCountryIdCases: TPropTestCase<IYCorePhoneFieldProps, 'defaultCountryId'>[] = [
  { prop: 'defaultCountryId', case: 'наличии', value: 2 },
  { prop: 'defaultCountryId', case: 'отстутствие', value: undefined },
]

type TPropAnnotation<K extends keyof IYCorePhoneFieldProps, T extends keyof IYCoreAnnotationExternalProps> = TPropTestCase<IYCorePhoneFieldProps, K> & { annotationProp: T }
type TPropLabel<K extends keyof IYCorePhoneFieldProps, T extends keyof IYCoreLabelExternalProps> = TPropTestCase<IYCorePhoneFieldProps, K> & { labelProp: T }

export const propLabelTextCases: TPropLabel<'labelText', 'text'>[] = [
  { prop: 'labelText', labelProp: 'text', case: 'с текстом', value: text },
  { prop: 'labelText', labelProp: 'text', case: 'без текста', value: '' },
]
export const propLabelTooltipTextCases: TPropLabel<'labelTooltipText', 'tooltipText'>[] = [
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'с текстом', value: text },
  { prop: 'labelTooltipText', labelProp: 'tooltipText', case: 'без текста', value: '' },
]
export const propAnnotationTextCases: TPropAnnotation<'annotationText', 'text'>[] = [
  { prop: 'annotationText', annotationProp: 'text', case: 'с текстом', value: text },
  { prop: 'annotationText', annotationProp: 'text', case: 'без текста', value: '' },
]
