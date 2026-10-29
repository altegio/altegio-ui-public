import type { TPropTestCase } from '~shared/types/tests'
import { EYCoreCollapseItemVariant } from '~core/ui/collapseItem/models/types'
import { text } from '~shared/tests/slotContents'

import type { IYCoreCollapseItemProps } from '~core/ui/collapseItem/models/types'

export const propLabelCases: TPropTestCase<IYCoreCollapseItemProps, 'label'>[] = [
  { prop: 'label', case: 'with text', value: text },
  { prop: 'label', case: 'without text', value: '' },
]
export const propAnnotationCases: TPropTestCase<IYCoreCollapseItemProps, 'annotation'>[] = [
  { prop: 'annotation', case: 'with text', value: text },
  { prop: 'annotation', case: 'without text', value: '' },
]
export const propOpenedCases: TPropTestCase<IYCoreCollapseItemProps, 'opened'>[] = [
  { prop: 'opened', case: 'true', value: true },
  { prop: 'opened', case: 'false', value: false },
]
export const propValueCases: TPropTestCase<IYCoreCollapseItemProps, 'value'>[] = [
  { prop: 'value', case: 'with text', value: text },
  { prop: 'value', case: 'without text', value: '' },
]
export const propVariantCases: TPropTestCase<IYCoreCollapseItemProps, 'variant'>[] = [
  { prop: 'variant', case: 'primary', value: EYCoreCollapseItemVariant.PRIMARY },
  { prop: 'variant', case: 'secondary', value: EYCoreCollapseItemVariant.SECONDARY },
]
