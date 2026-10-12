import type { TPropTestCase } from '~shared/types/tests'
import {
  EYCoreCollapseType,
  type IYCoreCollapseProps,
} from '~core/ui/collapse/models/types'
import { text } from '~shared/tests/slotContents'

export const propValueCases: TPropTestCase<IYCoreCollapseProps, 'value'>[] = [
  { prop: 'value', case: 'строка', value: text },
  { prop: 'value', case: 'массив', value: [text, 'test'] },
  { prop: 'value', case: 'пустая строка', value: '' },
  { prop: 'value', case: 'пустой массив', value: [] },
]

export const propTypeCases: TPropTestCase<IYCoreCollapseProps, 'type'>[] = [
  { prop: 'type', case: 'single', value: EYCoreCollapseType.SINGLE },
  { prop: 'type', case: 'multiple', value: EYCoreCollapseType.MULTIPLE },
]

export const propDraggableCases: TPropTestCase<IYCoreCollapseProps, 'draggable'>[] = [
  { prop: 'draggable', case: 'true', value: true },
  { prop: 'draggable', case: 'false', value: false },
]

export { propVariantCases } from '~core/ui/collapseItem/tests/cases/props'
