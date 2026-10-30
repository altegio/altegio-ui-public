import { text } from '~shared/tests/slotContents'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

import { type IAltCoreFieldTextareaProps } from '~core/ui/fieldTextarea/models/types'

export const propDisabledCases: TPropTestCase<IAltCoreFieldTextareaProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IAltCoreFieldTextareaProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
]
export const propReadonlyCases: TPropTestCase<IAltCoreFieldTextareaProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
]
export const propValueCases: TPropTestCase<IAltCoreFieldTextareaProps, 'value'>[] = [
  { prop: 'value', case: 'with text', value: text },
  { prop: 'value', case: 'without text', value: '' },
]
export const propNameCases: TPropTestCase<IAltCoreFieldTextareaProps, 'name'>[] = [
  { prop: 'name', case: 'with text', value: text },
  { prop: 'name', case: 'without text', value: '' },
]
export const propPlaceholderCases: TPropTestCase<IAltCoreFieldTextareaProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'with text', value: text },
  { prop: 'placeholder', case: 'without text', value: '' },
]
export const propAutocompleteCases: TPropTestCase<IAltCoreFieldTextareaProps, 'autocomplete'>[] = [
  { prop: 'autocomplete', case: 'on', value: 'on' },
  { prop: 'autocomplete', case: 'off', value: 'off' },
  { prop: 'autocomplete', case: 'tel', value: 'tel' },
  { prop: 'autocomplete', case: 'tel-national', value: 'tel-national' },
]
export const propMaxlengthCases: TPropTestCase<IAltCoreFieldTextareaProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: '10', value: 10 },
  { prop: 'maxlength', case: '0', value: 0 },
]
export const propRequiredCases: TPropTestCase<IAltCoreFieldTextareaProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true },
  { prop: 'required', case: 'false', value: false },
]
export const propAutofocusCases: TPropTestCase<IAltCoreFieldTextareaProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true },
  { prop: 'autofocus', case: 'false', value: false },
]
export const propHideSpaceLeftCases: TPropTestCase<IAltCoreFieldTextareaProps, 'hideSpaceLeft'>[] = [
  { prop: 'hideSpaceLeft', case: 'true', value: true },
  { prop: 'hideSpaceLeft', case: 'false', value: false },
]
export const propHideSpaceRightCases: TPropTestCase<IAltCoreFieldTextareaProps, 'hideSpaceRight'>[] = [
  { prop: 'hideSpaceRight', case: 'true', value: true },
  { prop: 'hideSpaceRight', case: 'false', value: false },
]
export const propRowsCases: TPropTestCase<IAltCoreFieldTextareaProps, 'rows'>[] = [
  { prop: 'rows', case: '1', value: 1 },
  { prop: 'rows', case: '2', value: 2 },
  { prop: 'rows', case: '3', value: 3 },
]
export const propResizeCases: TPropTestCase<IAltCoreFieldTextareaProps, 'resize'>[] = [
  { prop: 'resize', case: 'both', value: 'both' },
  { prop: 'resize', case: 'horizontal', value: 'horizontal' },
  { prop: 'resize', case: 'vertical', value: 'vertical' },
  { prop: 'resize', case: 'none', value: 'none' },
]
