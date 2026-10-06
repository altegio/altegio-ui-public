import type { TPropTestCase } from '~shared/types/tests'
import {
  createNgCollapseProps,
  type IYNgCollapseProps,
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

export const propValueCases: TPropTestCase<IYNgCollapseProps, 'value'>[] = [
  ...corePropValueCases.map((testCase) => ({
    ...testCase,
    expected: testCase.value,
  })) as TPropTestCase<IYNgCollapseProps, 'value'>[],
  { prop: 'value', case: 'undefined', value: undefined, expected: defaultValue },
]

export const propTypeCases: TPropTestCase<IYNgCollapseProps, 'type'>[] = [
  ...corePropTypeCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'type', case: 'undefined', value: undefined, expected: defaultType },
]

export const propDraggableCases: TPropTestCase<IYNgCollapseProps, 'draggable'>[] = [...corePropDraggableCases.map((testCase) => ({ ...testCase, expected: testCase.value }))]

export const propVariantCases: TPropTestCase<IYNgCollapseProps, 'variant'>[] = [
  ...corePropVariantCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
