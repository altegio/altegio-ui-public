import type { TPropTestCase } from '~shared/types/tests'
import {
  EAltCoreCollapseType,
  type IAltCoreCollapseProps,
} from '~core/ui/collapse/models/types'
import { text } from '~shared/tests/slotContents'

export const propValueCases: TPropTestCase<IAltCoreCollapseProps, 'value'>[] = [
  { prop: 'value', case: 'string', value: text },
  { prop: 'value', case: 'array', value: [text, 'test'] },
  { prop: 'value', case: 'empty string', value: '' },
  { prop: 'value', case: 'empty array', value: [] },
]

export const propTypeCases: TPropTestCase<IAltCoreCollapseProps, 'type'>[] = [
  { prop: 'type', case: 'single', value: EAltCoreCollapseType.SINGLE },
  { prop: 'type', case: 'multiple', value: EAltCoreCollapseType.MULTIPLE },
]

export const propDraggableCases: TPropTestCase<IAltCoreCollapseProps, 'draggable'>[] = [
  { prop: 'draggable', case: 'true', value: true },
  { prop: 'draggable', case: 'false', value: false },
]

export { propVariantCases } from '~core/ui/collapseItem/tests/cases/props'
