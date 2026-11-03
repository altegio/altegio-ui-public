import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreFieldInputExternalProps } from '~core/ui/fieldInput/models/types'
import { empty, number, text } from '~shared/tests/slotContents'
import { EAltInputAutocomplete, EAltInputType, EAltSizes } from '~shared/types/global'

export const sizes = Object.values(EAltSizes).filter((size) => size !== EAltSizes.EXTRA_LARGE && size !== EAltSizes.EXTRA_SMALL)

type TPropFieldInputTestCase<T extends keyof IAltCoreFieldInputExternalProps> = TPropTestCase<IAltCoreFieldInputExternalProps, T> & {
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
  { prop: 'value', case: 'not set', value: empty, attribute: 'value' },
]

export const propNameTestCases: TPropFieldInputTestCase<'name'>[] = [
  { prop: 'name', case: 'with text', value: text, attribute: 'name' },
  { prop: 'name', case: 'with an empty string', value: empty, attribute: 'name' },
  { prop: 'name', case: 'without text', value: undefined, attribute: 'name' },
]

export const propPlaceholderTestCases: TPropFieldInputTestCase<'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text, attribute: 'placeholder' },
  { prop: 'placeholder', case: 'with an empty value', value: empty, attribute: 'placeholder' },
  { prop: 'placeholder', case: 'without a selected value', value: undefined, attribute: 'placeholder' },
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
  { prop: 'type', case: EAltInputType.TEXT, value: EAltInputType.TEXT, attribute: 'type' },
  { prop: 'type', case: EAltInputType.NUMBER, value: EAltInputType.NUMBER, attribute: 'type' },
  { prop: 'type', case: 'undefined', value: undefined, attribute: 'type' },
]

export const propMaxlengthTestCases: TPropFieldInputTestCase<'maxlength'>[] = [
  { prop: 'maxlength', case: 'set', value: number, attribute: 'maxLength' },
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
  { prop: 'autocomplete', case: EAltInputAutocomplete.ON, value: EAltInputAutocomplete.ON, attribute: 'autocomplete' },
  { prop: 'autocomplete', case: EAltInputAutocomplete.TEL, value: EAltInputAutocomplete.TEL, attribute: 'autocomplete' },
  { prop: 'autocomplete', case: 'undefined', value: undefined, attribute: 'autocomplete' },
]
