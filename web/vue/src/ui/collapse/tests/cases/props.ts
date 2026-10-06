import type { TPropTestCase } from '~shared/types/tests'
import {
  createVueCollapseProps,
  type IYVueCollapseProps,
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

export const propModelValueCases: TPropTestCase<IYVueCollapseProps, 'modelValue'>[] = [
  ...corePropValueCases.map((testCase) => ({
    ...testCase,
    prop: 'modelValue',
    expected: testCase.value,
  })) as TPropTestCase<IYVueCollapseProps, 'modelValue'>[],
  { prop: 'modelValue', case: 'undefined', value: undefined, expected: defaultValue },
]

export const propTypeCases: TPropTestCase<IYVueCollapseProps, 'type'>[] = [
  ...corePropTypeCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'type', case: 'undefined', value: undefined, expected: defaultType },
]

export const propDraggableCases: TPropTestCase<IYVueCollapseProps, 'draggable'>[] = [
  ...corePropDraggableCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'draggable', case: 'undefined', value: undefined, expected: defaultDraggable },
]

export const propVariantCases: TPropTestCase<IYVueCollapseProps, 'variant'>[] = [
  ...corePropVariantCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
