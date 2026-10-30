import type { TPropTestCase } from '~shared/types/tests'
import {
  createNgCollapseProps,
  type IAltNgCollapseProps,
} from '~ng/ui/collapse/models/types'
import {
  propValueCases as corePropValueCases,
  propTypeCases as corePropTypeCases,
  propDraggableCases as corePropDraggableCases,
  propVariantCases as corePropVariantCases,
} from '~core/ui/collapse/tests/cases/props'

const {
  value: defaultValue,
  type: defaultType,
  variant: defaultVariant,
} = createNgCollapseProps()

export const propValueCases: TPropTestCase<IAltNgCollapseProps, 'value'>[] = [
  ...corePropValueCases.map((testCase) => ({
    ...testCase,
    expected: testCase.value,
  })) as TPropTestCase<IAltNgCollapseProps, 'value'>[],
  { prop: 'value', case: 'undefined', value: undefined, expected: defaultValue },
]

export const propTypeCases: TPropTestCase<IAltNgCollapseProps, 'type'>[] = [
  ...corePropTypeCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'type', case: 'undefined', value: undefined, expected: defaultType },
]

export const propDraggableCases: TPropTestCase<IAltNgCollapseProps, 'draggable'>[] = [...corePropDraggableCases.map((testCase) => ({ ...testCase, expected: testCase.value }))]

export const propVariantCases: TPropTestCase<IAltNgCollapseProps, 'variant'>[] = [
  ...corePropVariantCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
