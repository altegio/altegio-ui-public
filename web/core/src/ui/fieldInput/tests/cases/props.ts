import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreFieldInputExternalProps } from '~core/ui/fieldInput/models/types'
import { empty, number, text } from '~shared/tests/slotContents'
import { EYInputAutocomplete, EYInputType, EYSizes } from '~shared/types/global'

export const sizes = Object.values(EYSizes).filter((size) => size !== EYSizes.EXTRA_LARGE && size !== EYSizes.EXTRA_SMALL)

type TPropFieldInputTestCase<T extends keyof IYCoreFieldInputExternalProps> = TPropTestCase<IYCoreFieldInputExternalProps, T> & {
  attribute?: keyof HTMLInputElement
  classModifier?: string
}


export const propDisabledTestCases: TPropFieldInputTestCase<'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, attribute: 'disabled', classModifier: 'disabled' },
  { prop: 'disabled', case: 'false', value: false, attribute: 'disabled', classModifier: 'disabled' },
  { prop: 'disabled', case: 'undefined', value: undefined, attribute: 'disabled', classModifier: 'disabled' },
]

export const propReadonlyTestCases: TPropFieldInputTestCase<'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true, attribute: 'readOnly' },
  { prop: 'readonly', case: 'false', value: false, attribute: 'readOnly' },
  { prop: 'readonly', case: 'undefined', value: undefined, attribute: 'readOnly' },
]

export const propSizeTestCases: TPropFieldInputTestCase<'size'>[] = sizes.map((size) => ({
  prop: 'size',
  case: size,
  value: size,
  classModifier: `size_${size}`,
}))

export const propValueTestCases: TPropFieldInputTestCase<'value'>[] = [
  { prop: 'value', case: text, value: text, attribute: 'value' },
  { prop: 'value', case: 'не определено', value: empty, attribute: 'value' },
]

export const propNameTestCases: TPropFieldInputTestCase<'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text, attribute: 'name' },
  { prop: 'name', case: 'с пустой строкой', value: empty, attribute: 'name' },
  { prop: 'name', case: 'без текста', value: undefined, attribute: 'name' },
]

export const propPlaceholderTestCases: TPropFieldInputTestCase<'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text, attribute: 'placeholder' },
  { prop: 'placeholder', case: 'с пустым значением', value: empty, attribute: 'placeholder' },
  { prop: 'placeholder', case: 'без выбранного значения', value: undefined, attribute: 'placeholder' },
]

export const propAutofocusTestCases: TPropFieldInputTestCase<'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true, attribute: 'autofocus' },
  { prop: 'autofocus', case: 'false', value: false, attribute: 'autofocus' },
]

export const propRequiredTestCases: TPropFieldInputTestCase<'required'>[] = [
  { prop: 'required', case: 'true', value: true, attribute: 'required' },
  { prop: 'required', case: 'false', value: false, attribute: 'required' },
  { prop: 'required', case: 'undefined', value: undefined, attribute: 'required' },
]

export const propTypeTestCases: TPropFieldInputTestCase<'type'>[] = [
  { prop: 'type', case: EYInputType.TEXT, value: EYInputType.TEXT, attribute: 'type' },
  { prop: 'type', case: EYInputType.NUMBER, value: EYInputType.NUMBER, attribute: 'type' },
  { prop: 'type', case: 'undefined', value: undefined, attribute: 'type' },
]

export const propMaxlengthTestCases: TPropFieldInputTestCase<'maxlength'>[] = [
  { prop: 'maxlength', case: 'определено', value: number, attribute: 'maxLength' },
  { prop: 'maxlength', case: 'undefined', value: undefined, attribute: 'maxLength' },
]

export const propHideSpaceLeftTestCases: TPropFieldInputTestCase<'hideSpaceLeft'>[] = [
  { prop: 'hideSpaceLeft', case: 'true', value: true, classModifier: 'hide-space-left' },
  { prop: 'hideSpaceLeft', case: 'false', value: false, classModifier: 'hide-space-left' },
  { prop: 'hideSpaceLeft', case: 'undefined', value: undefined, classModifier: 'hide-space-left' },
]

export const propHideSpaceRightTestCases: TPropFieldInputTestCase<'hideSpaceRight'>[] = [
  { prop: 'hideSpaceRight', case: 'true', value: true, classModifier: 'hide-space-right' },
  { prop: 'hideSpaceRight', case: 'false', value: false, classModifier: 'hide-space-right' },
  { prop: 'hideSpaceRight', case: 'undefined', value: undefined, classModifier: 'hide-space-right' },
]

export const propAutocompleteTestCases: TPropFieldInputTestCase<'autocomplete'>[] = [
  { prop: 'autocomplete', case: EYInputAutocomplete.ON, value: EYInputAutocomplete.ON, attribute: 'autocomplete' },
  { prop: 'autocomplete', case: EYInputAutocomplete.TEL, value: EYInputAutocomplete.TEL, attribute: 'autocomplete' },
  { prop: 'autocomplete', case: 'undefined', value: undefined, attribute: 'autocomplete' },
]
