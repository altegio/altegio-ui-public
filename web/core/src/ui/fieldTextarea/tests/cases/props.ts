import { text } from '~shared/tests/slotContents'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

import { type IYCoreFieldTextareaProps } from '~core/ui/fieldTextarea/models/types'

export const propDisabledCases: TPropTestCase<IYCoreFieldTextareaProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'disabled', case: 'false', value: false },
]
export const propSizeCases: TPropTestCase<IYCoreFieldTextareaProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM },
  { prop: 'size', case: 'large', value: EYSizes.LARGE },
]
export const propReadonlyCases: TPropTestCase<IYCoreFieldTextareaProps, 'readonly'>[] = [
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'readonly', case: 'false', value: false },
]
export const propValueCases: TPropTestCase<IYCoreFieldTextareaProps, 'value'>[] = [
  { prop: 'value', case: 'с текстом', value: text },
  { prop: 'value', case: 'без текста', value: '' },
]
export const propNameCases: TPropTestCase<IYCoreFieldTextareaProps, 'name'>[] = [
  { prop: 'name', case: 'с текстом', value: text },
  { prop: 'name', case: 'без текста', value: '' },
]
export const propPlaceholderCases: TPropTestCase<IYCoreFieldTextareaProps, 'placeholder'>[] = [
  { prop: 'placeholder', case: 'с текстом', value: text },
  { prop: 'placeholder', case: 'без текста', value: '' },
]
export const propAutocompleteCases: TPropTestCase<IYCoreFieldTextareaProps, 'autocomplete'>[] = [
  { prop: 'autocomplete', case: 'on', value: 'on' },
  { prop: 'autocomplete', case: 'off', value: 'off' },
  { prop: 'autocomplete', case: 'tel', value: 'tel' },
  { prop: 'autocomplete', case: 'tel-national', value: 'tel-national' },
]
export const propMaxlengthCases: TPropTestCase<IYCoreFieldTextareaProps, 'maxlength'>[] = [
  { prop: 'maxlength', case: '10', value: 10 },
  { prop: 'maxlength', case: '0', value: 0 },
]
export const propRequiredCases: TPropTestCase<IYCoreFieldTextareaProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true },
  { prop: 'required', case: 'false', value: false },
]
export const propAutofocusCases: TPropTestCase<IYCoreFieldTextareaProps, 'autofocus'>[] = [
  { prop: 'autofocus', case: 'true', value: true },
  { prop: 'autofocus', case: 'false', value: false },
]
export const propHideSpaceLeftCases: TPropTestCase<IYCoreFieldTextareaProps, 'hideSpaceLeft'>[] = [
  { prop: 'hideSpaceLeft', case: 'true', value: true },
  { prop: 'hideSpaceLeft', case: 'false', value: false },
]
export const propHideSpaceRightCases: TPropTestCase<IYCoreFieldTextareaProps, 'hideSpaceRight'>[] = [
  { prop: 'hideSpaceRight', case: 'true', value: true },
  { prop: 'hideSpaceRight', case: 'false', value: false },
]
export const propRowsCases: TPropTestCase<IYCoreFieldTextareaProps, 'rows'>[] = [
  { prop: 'rows', case: '1', value: 1 },
  { prop: 'rows', case: '2', value: 2 },
  { prop: 'rows', case: '3', value: 3 },
]
export const propResizeCases: TPropTestCase<IYCoreFieldTextareaProps, 'resize'>[] = [
  { prop: 'resize', case: 'both', value: 'both' },
  { prop: 'resize', case: 'horizontal', value: 'horizontal' },
  { prop: 'resize', case: 'vertical', value: 'vertical' },
  { prop: 'resize', case: 'none', value: 'none' },
]
