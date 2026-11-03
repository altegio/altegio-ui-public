import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'

import { testHeaders, testItems } from './props'

export const slotHeadFirstTestCases: TSlotTestCase[] = [
  { slot: 'head-first', case: 'with content', content: text },
  { slot: 'head-first', case: 'without content', content: empty },
]

export const slotHeadLastTestCases: TSlotTestCase[] = [
  { slot: 'head-last', case: 'with content', content: text },
  { slot: 'head-last', case: 'without content', content: empty },
]

export const slotHeadCellTestCases: TSlotTestCase[] = [
  { slot: 'head-cell', case: 'with content', content: text },
  { slot: 'head-cell', case: 'without content', content: empty },
]

export const slotRowFirstTestCases: TSlotTestCase[] = [
  { slot: 'row-first', case: 'with content', content: text },
  { slot: 'row-first', case: 'without content', content: empty },
]

export const slotRowLastTestCases: TSlotTestCase[] = [
  { slot: 'row-last', case: 'with content', content: text },
  { slot: 'row-last', case: 'without content', content: empty },
]
export const slotRowOuterTestCases: TSlotTestCase[] = [
  { slot: 'row-outer', case: 'with content', content: text },
  { slot: 'row-outer', case: 'without content', content: empty },
]
export const slotRowOuterDynamicTestCases: TSlotTestCase[] = [
  { slot: `row-outer-${testItems[0].rowId}`, case: 'with content', content: text },
  { slot: `row-outer-${testItems[0].rowId}`, case: 'without content', content: empty },
]
export const slotRowInnerTestCases: TSlotTestCase[] = [
  { slot: 'row-inner', case: 'with content', content: text },
  { slot: 'row-inner', case: 'without content', content: empty },
]
export const slotRowInnerDynamicTestCases: TSlotTestCase[] = [
  { slot: `row-inner-${testItems[0].rowId}`, case: 'with content', content: text },
  { slot: `row-inner-${testItems[0].rowId}`, case: 'without content', content: empty },
]
export const slotCellOuterTestCases: TSlotTestCase[] = [
  { slot: 'cell-outer', case: 'with content', content: text },
  { slot: 'cell-outer', case: 'without content', content: empty },
]

export const slotCellTestCases: TSlotTestCase[] = [
  { slot: 'cell', case: 'with content', content: text },
  { slot: 'cell', case: 'without content', content: empty },
]

// Dynamic header slots
export const slotHeadHintDynamicTestCases: TSlotTestCase[] = [
  { slot: `head-hint-${testHeaders.id.id}`, case: 'with content', content: text },
  { slot: `head-hint-${testHeaders.id.id}`, case: 'without content', content: empty },
]

export const slotHeadCellDynamicTestCases: TSlotTestCase[] = [
  { slot: `head-cell-${testHeaders.name.id}`, case: 'with content', content: text },
  { slot: `head-cell-${testHeaders.name.id}`, case: 'without content', content: empty },
]

// Dynamic row slots
export const slotRowFirstDynamicTestCases: TSlotTestCase[] = [
  { slot: `row-first-${testItems[0].rowId}`, case: 'with content', content: text },
  { slot: `row-first-${testItems[0].rowId}`, case: 'without content', content: empty },
]

export const slotRowLastDynamicTestCases: TSlotTestCase[] = [
  { slot: `row-last-${testItems[0].rowId}`, case: 'with content', content: text },
  { slot: `row-last-${testItems[0].rowId}`, case: 'without content', content: empty },
]

// Dynamic cell slots
export const slotCellOuterDynamicTestCases: TSlotTestCase[] = [
  { slot: `cell-outer-${testItems[0].rowId}`, case: 'with content', content: text },
  { slot: `cell-outer-${testItems[0].rowId}`, case: 'without content', content: empty },
]

export const slotCellOuterColDynamicTestCases: TSlotTestCase[] = [
  { slot: `cell-outer-col-${testHeaders.name.id}`, case: 'with content', content: text },
  { slot: `cell-outer-col-${testHeaders.name.id}`, case: 'without content', content: empty },
]

export const slotCellColDynamicTestCases: TSlotTestCase[] = [
  { slot: `cell-col-${testHeaders.name.id}`, case: 'with content', content: text },
  { slot: `cell-col-${testHeaders.name.id}`, case: 'without content', content: empty },
]

