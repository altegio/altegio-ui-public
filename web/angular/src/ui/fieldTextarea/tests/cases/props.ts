import type { TPropTestCase } from '~shared/types/tests'
import {
  createNgFieldTextareaProps,
  type IYNgFieldTextareaProps,
} from '~ng/ui/fieldTextarea/models/types'

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
  name: defaultName,
  placeholder: defaultPlaceholder,
  required: defaultRequired,
  maxlength: defaultMaxlength,
  rows: defaultRows,
  resize: defaultResize,
  hideSpaceLeft: defaultHideSpaceLeft,
  hideSpaceRight: defaultHideSpaceRight,
  autocomplete: defaultAutocomplete,
} = createNgFieldTextareaProps()

export const propDisabledCases: TPropTestCase<IYNgFieldTextareaProps, 'disabled'>[] = [
  ...corePropDisabledCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

export const propSizeCases: TPropTestCase<IYNgFieldTextareaProps, 'size'>[] = [
  ...corePropSizeCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

export const propReadonlyCases: TPropTestCase<IYNgFieldTextareaProps, 'readonly'>[] = [
  ...corePropReadonlyCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'readonly', case: 'undefined', value: undefined, expected: defaultReadonly },
]

export const propValueCases: TPropTestCase<IYNgFieldTextareaProps, 'value'>[] = [...corePropValueCases.map((testCase) => ({ ...testCase, expected: testCase.value }))]

export const propNameCases: TPropTestCase<IYNgFieldTextareaProps, 'name'>[] = [
  ...corePropNameCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'name', case: 'undefined', value: undefined, expected: defaultName },
]

export const propPlaceholderCases: TPropTestCase<IYNgFieldTextareaProps, 'placeholder'>[] = [
  ...corePropPlaceholderCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'placeholder', case: 'undefined', value: undefined, expected: defaultPlaceholder },
]

export const propRequiredCases: TPropTestCase<IYNgFieldTextareaProps, 'required'>[] = [
  ...corePropRequiredCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'required', case: 'undefined', value: undefined, expected: defaultRequired },
]

export const propMaxlengthCases: TPropTestCase<IYNgFieldTextareaProps, 'maxlength'>[] = [
  ...corePropMaxlengthCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'maxlength', case: 'undefined', value: undefined, expected: defaultMaxlength },
]

export const propAutofocusCases: TPropTestCase<IYNgFieldTextareaProps, 'autofocus'>[] = [...corePropAutofocusCases.map((testCase) => ({ ...testCase, expected: testCase.value }))]

export const propRowsCases: TPropTestCase<IYNgFieldTextareaProps, 'rows'>[] = [
  ...corePropRowsCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'rows', case: 'undefined', value: undefined, expected: defaultRows },
]

export const propResizeCases: TPropTestCase<IYNgFieldTextareaProps, 'resize'>[] = [
  ...corePropResizeCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'resize', case: 'undefined', value: undefined, expected: defaultResize },
]

export const propHideSpaceLeftCases: TPropTestCase<IYNgFieldTextareaProps, 'hideSpaceLeft'>[] = [
  ...corePropHideSpaceLeftCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'hideSpaceLeft', case: 'undefined', value: undefined, expected: defaultHideSpaceLeft },
]

export const propHideSpaceRightCases: TPropTestCase<IYNgFieldTextareaProps, 'hideSpaceRight'>[] = [
  ...corePropHideSpaceRightCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'hideSpaceRight', case: 'undefined', value: undefined, expected: defaultHideSpaceRight },
]

export const propAutocompleteCases: TPropTestCase<IYNgFieldTextareaProps, 'autocomplete'>[] = [
  ...corePropAutocompleteCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'autocomplete', case: 'undefined', value: undefined, expected: defaultAutocomplete },
]
