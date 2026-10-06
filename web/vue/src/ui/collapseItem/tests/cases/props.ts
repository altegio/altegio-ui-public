import type { TPropTestCase } from '~shared/types/tests'
import {
  createVueCollapseItemProps,
  type IYVueCollapseItemProps,
} from '~vue/ui/collapseItem/models/types'
import {
  propLabelCases as corePropLabelCases,
  propAnnotationCases as corePropAnnotationCases,
  propOpenedCases as corePropOpenedCases,
  propValueCases as corePropValueCases,
  propVariantCases as corePropVariantCases,
} from '~core/ui/collapseItem/tests/cases/props'

const {
  label: defaultLabel,
  annotation: defaultAnnotation,
  opened: defaultOpened,
  value: defaultValue,
  variant: defaultVariant,
} = createVueCollapseItemProps()

export const propLabelCases: TPropTestCase<IYVueCollapseItemProps, 'label'>[] = [
  ...corePropLabelCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'label', case: 'undefined', value: undefined, expected: defaultLabel },
]

export const propAnnotationCases: TPropTestCase<IYVueCollapseItemProps, 'annotation'>[] = [
  ...corePropAnnotationCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'annotation', case: 'undefined', value: undefined, expected: defaultAnnotation },
]

export const propOpenedCases: TPropTestCase<IYVueCollapseItemProps, 'opened'>[] = [
  ...corePropOpenedCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'opened', case: 'undefined', value: undefined, expected: defaultOpened },
]

export const propValueCases: TPropTestCase<IYVueCollapseItemProps, 'value'>[] = [
  ...corePropValueCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'value', case: 'undefined', value: undefined, expected: defaultValue },
]

export const propVariantCases: TPropTestCase<IYVueCollapseItemProps, 'variant'>[] = [
  ...corePropVariantCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
