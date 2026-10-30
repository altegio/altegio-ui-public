import type { TPropTestCase } from '~shared/types/tests'
import {
  createVueCollapseProps,
  type IAltVueCollapseProps,
} from '~vue/ui/collapse/models/types'
import {
  propValueCases as corePropValueCases,
  propTypeCases as corePropTypeCases,
  propDraggableCases as corePropDraggableCases,
  propVariantCases as corePropVariantCases,
} from '~core/ui/collapse/tests/cases/props'

const {
  modelValue: defaultValue,
  type: defaultType,
  draggable: defaultDraggable,
  variant: defaultVariant,
} = createVueCollapseProps()

export const propModelValueCases: TPropTestCase<IAltVueCollapseProps, 'modelValue'>[] = [
  ...corePropValueCases.map((testCase) => ({
    ...testCase,
    prop: 'modelValue',
    expected: testCase.value,
  })) as TPropTestCase<IAltVueCollapseProps, 'modelValue'>[],
  { prop: 'modelValue', case: 'undefined', value: undefined, expected: defaultValue },
]

export const propTypeCases: TPropTestCase<IAltVueCollapseProps, 'type'>[] = [
  ...corePropTypeCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'type', case: 'undefined', value: undefined, expected: defaultType },
]

export const propDraggableCases: TPropTestCase<IAltVueCollapseProps, 'draggable'>[] = [
  ...corePropDraggableCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'draggable', case: 'undefined', value: undefined, expected: defaultDraggable },
]

export const propVariantCases: TPropTestCase<IAltVueCollapseProps, 'variant'>[] = [
  ...corePropVariantCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
