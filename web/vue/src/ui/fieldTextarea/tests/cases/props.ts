import type { TPropTestCase } from '~shared/types/tests'
import {
  createVueFieldTextareaProps,
  type IAltVueFieldTextareaProps,
} from '~vue/ui/fieldTextarea/models/types'

import {
  propDisabledCases as corePropDisabledCases,
  propSizeCases as corePropSizeCases,
  propReadonlyCases as corePropReadonlyCases,
  propValueCases as corePropValueCases,
  propNameCases as corePropNameCases,
  propPlaceholderCases as corePropPlaceholderCases,
  propRequiredCases as corePropRequiredCases,
  propMaxlengthCases as corePropMaxlengthCases,
  propAutofocusCases as corePropAutofocusCases,
  propRowsCases as corePropRowsCases,
  propResizeCases as corePropResizeCases,
  propHideSpaceLeftCases as corePropHideSpaceLeftCases,
  propHideSpaceRightCases as corePropHideSpaceRightCases,
  propAutocompleteCases as corePropAutocompleteCases,
} from '~core/ui/fieldTextarea/tests/cases/props'

const {
  disabled: defaultDisabled,
  size: defaultSize,
  readonly: defaultReadonly,
  modelValue: defaultModelValue,
  name: defaultName,
  placeholder: defaultPlaceholder,
  required: defaultRequired,
  maxlength: defaultMaxlength,
  autofocus: defaultAutofocus,
  rows: defaultRows,
  resize: defaultResize,
  hideSpaceLeft: defaultHideSpaceLeft,
  hideSpaceRight: defaultHideSpaceRight,
  autocomplete: defaultAutocomplete,
} = createVueFieldTextareaProps()


export const propDisabledCases: TPropTestCase<IAltVueFieldTextareaProps, 'disabled'>[] = [
  ...corePropDisabledCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

export const propSizeCases: TPropTestCase<IAltVueFieldTextareaProps, 'size'>[] = [
  ...corePropSizeCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

export const propReadonlyCases: TPropTestCase<IAltVueFieldTextareaProps, 'readonly'>[] = [
  ...corePropReadonlyCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'readonly', case: 'undefined', value: undefined, expected: defaultReadonly },
]

export const propModelValueCases: TPropTestCase<IAltVueFieldTextareaProps, 'modelValue'>[] = [
  ...corePropValueCases.map((testCase) => ({
    ...testCase,
    prop: 'modelValue',
    expected: testCase.value,
  })) as TPropTestCase<IAltVueFieldTextareaProps, 'modelValue'>[],
  { prop: 'modelValue', case: 'undefined', value: undefined, expected: defaultModelValue },
]

export const propNameCases: TPropTestCase<IAltVueFieldTextareaProps, 'name'>[] = [
  ...corePropNameCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'name', case: 'undefined', value: undefined, expected: defaultName },
]

export const propPlaceholderCases: TPropTestCase<IAltVueFieldTextareaProps, 'placeholder'>[] = [
  ...corePropPlaceholderCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: defaultPlaceholder },
]

export const propRequiredCases: TPropTestCase<IAltVueFieldTextareaProps, 'required'>[] = [
  ...corePropRequiredCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'required', case: 'undefined', value: undefined, expected: defaultRequired },
]

export const propMaxlengthCases: TPropTestCase<IAltVueFieldTextareaProps, 'maxlength'>[] = [
  ...corePropMaxlengthCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'maxlength', case: 'undefined', value: undefined, expected: defaultMaxlength },
]

export const propAutofocusCases: TPropTestCase<IAltVueFieldTextareaProps, 'autofocus'>[] = [
  ...corePropAutofocusCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'autofocus', case: 'undefined', value: undefined, expected: defaultAutofocus },
]

export const propRowsCases: TPropTestCase<IAltVueFieldTextareaProps, 'rows'>[] = [
  ...corePropRowsCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'rows', case: 'undefined', value: undefined, expected: defaultRows },
]

export const propResizeCases: TPropTestCase<IAltVueFieldTextareaProps, 'resize'>[] = [
  ...corePropResizeCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'resize', case: 'undefined', value: undefined, expected: defaultResize },
]

export const propHideSpaceLeftCases: TPropTestCase<IAltVueFieldTextareaProps, 'hideSpaceLeft'>[] = [
  ...corePropHideSpaceLeftCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'hideSpaceLeft', case: 'undefined', value: undefined, expected: defaultHideSpaceLeft },
]

export const propHideSpaceRightCases: TPropTestCase<IAltVueFieldTextareaProps, 'hideSpaceRight'>[] = [
  ...corePropHideSpaceRightCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'hideSpaceRight', case: 'undefined', value: undefined, expected: defaultHideSpaceRight },
]

export const propAutocompleteCases: TPropTestCase<IAltVueFieldTextareaProps, 'autocomplete'>[] = [
  ...corePropAutocompleteCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'autocomplete', case: 'undefined', value: undefined, expected: defaultAutocomplete },
]
