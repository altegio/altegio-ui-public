import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import { testHeaders, testItems } from './props'

export const slotHeadFirstTestCases: TSlotTestCase[] = [
  { slot: 'head-first', case: 'с контентом', content: text },
  { slot: 'head-first', case: 'без контента', content: empty },
]

export const slotHeadLastTestCases: TSlotTestCase[] = [
  { slot: 'head-last', case: 'с контентом', content: text },
  { slot: 'head-last', case: 'без контента', content: empty },
]

export const slotHeadCellTestCases: TSlotTestCase[] = [
  { slot: 'head-cell', case: 'с контентом', content: text },
  { slot: 'head-cell', case: 'без контента', content: empty },
]

export const slotRowFirstTestCases: TSlotTestCase[] = [
  { slot: 'row-first', case: 'с контентом', content: text },
  { slot: 'row-first', case: 'без контента', content: empty },
]

export const slotRowLastTestCases: TSlotTestCase[] = [
  { slot: 'row-last', case: 'с контентом', content: text },
  { slot: 'row-last', case: 'без контента', content: empty },
]
export const slotRowOuterTestCases: TSlotTestCase[] = [
  { slot: 'row-outer', case: 'с контентом', content: text },
  { slot: 'row-outer', case: 'без контента', content: empty },
]
export const slotRowOuterDynamicTestCases: TSlotTestCase[] = [
  { slot: `row-outer-${testItems[0].rowId}`, case: 'с контентом', content: text },
  { slot: `row-outer-${testItems[0].rowId}`, case: 'без контента', content: empty },
]
export const slotRowInnerTestCases: TSlotTestCase[] = [
  { slot: 'row-inner', case: 'с контентом', content: text },
  { slot: 'row-inner', case: 'без контента', content: empty },
]
export const slotRowInnerDynamicTestCases: TSlotTestCase[] = [
  { slot: `row-inner-${testItems[0].rowId}`, case: 'с контентом', content: text },
  { slot: `row-inner-${testItems[0].rowId}`, case: 'без контента', content: empty },
]
export const slotCellOuterTestCases: TSlotTestCase[] = [
  { slot: 'cell-outer', case: 'с контентом', content: text },
  { slot: 'cell-outer', case: 'без контента', content: empty },
]

export const slotCellTestCases: TSlotTestCase[] = [
  { slot: 'cell', case: 'с контентом', content: text },
  { slot: 'cell', case: 'без контента', content: empty },
]

// Динамические слоты для заголовков
export const slotHeadHintDynamicTestCases: TSlotTestCase[] = [
  { slot: `head-hint-${testHeaders.id.id}`, case: 'с контентом', content: text },
  { slot: `head-hint-${testHeaders.id.id}`, case: 'без контента', content: empty },
]

export const slotHeadCellDynamicTestCases: TSlotTestCase[] = [
  { slot: `head-cell-${testHeaders.name.id}`, case: 'с контентом', content: text },
  { slot: `head-cell-${testHeaders.name.id}`, case: 'без контента', content: empty },
]

// Динамические слоты для строк
export const slotRowFirstDynamicTestCases: TSlotTestCase[] = [
  { slot: `row-first-${testItems[0].rowId}`, case: 'с контентом', content: text },
  { slot: `row-first-${testItems[0].rowId}`, case: 'без контента', content: empty },
]

export const slotRowLastDynamicTestCases: TSlotTestCase[] = [
  { slot: `row-last-${testItems[0].rowId}`, case: 'с контентом', content: text },
  { slot: `row-last-${testItems[0].rowId}`, case: 'без контента', content: empty },
]

// Динамические слоты для ячеек
export const slotCellOuterDynamicTestCases: TSlotTestCase[] = [
  { slot: `cell-outer-${testItems[0].rowId}`, case: 'с контентом', content: text },
  { slot: `cell-outer-${testItems[0].rowId}`, case: 'без контента', content: empty },
]

export const slotCellOuterColDynamicTestCases: TSlotTestCase[] = [
  { slot: `cell-outer-col-${testHeaders.name.id}`, case: 'с контентом', content: text },
  { slot: `cell-outer-col-${testHeaders.name.id}`, case: 'без контента', content: empty },
]

export const slotCellColDynamicTestCases: TSlotTestCase[] = [
  { slot: `cell-col-${testHeaders.name.id}`, case: 'с контентом', content: text },
  { slot: `cell-col-${testHeaders.name.id}`, case: 'без контента', content: empty },
]

