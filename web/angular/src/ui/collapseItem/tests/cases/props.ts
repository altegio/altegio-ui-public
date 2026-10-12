import type { TPropTestCase } from '~shared/types/tests'
import {
  createNgCollapseItemProps,
  type IYNgCollapseItemProps,
} from '~ng/ui/collapseItem/models/types'
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
} = createNgCollapseItemProps()

export const propLabelCases: TPropTestCase<IYNgCollapseItemProps, 'label'>[] = [
  ...corePropLabelCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'label', case: 'undefined', value: undefined, expected: defaultLabel },
]

export const propAnnotationCases: TPropTestCase<IYNgCollapseItemProps, 'annotation'>[] = [
  ...corePropAnnotationCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'annotation', case: 'undefined', value: undefined, expected: defaultAnnotation },
]

export const propOpenedCases: TPropTestCase<IYNgCollapseItemProps, 'opened'>[] = [
  ...corePropOpenedCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'opened', case: 'undefined', value: undefined, expected: defaultOpened },
]

export const propValueCases: TPropTestCase<IYNgCollapseItemProps, 'value'>[] = [
  ...corePropValueCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'value', case: 'undefined', value: undefined, expected: defaultValue },
]

export const propVariantCases: TPropTestCase<IYNgCollapseItemProps, 'variant'>[] = [
  ...corePropVariantCases.map((testCase) => ({ ...testCase, expected: testCase.value })),
  { prop: 'variant', case: 'undefined', value: undefined, expected: defaultVariant },
]
