import type { TPropTestCase } from '~shared/types/tests'
import {
  ETableCellAlign,
} from '~core/ui/tableCell/models/types'
import {
  type IYVueCoreTableCellProps,
  createVueTableCellProps,
} from '~vue/ui/tableCell/models/types'
import { text } from '~shared/tests/slotContents'

const { itemLabel } = createVueTableCellProps()

const item = { id: '', label: text, name: '' }

export const propStickyTestCases: TPropTestCase<IYVueCoreTableCellProps, 'sticky'>[] = [
  { prop: 'sticky', case: 'true', value: true, expected: true },
  { prop: 'sticky', case: 'false', value: false, expected: false },
]

export const propDisabledTestCases: TPropTestCase<IYVueCoreTableCellProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
]

export const propAlignTestCases: TPropTestCase<IYVueCoreTableCellProps, 'align'>[] = [
  { prop: 'align', case: ETableCellAlign.CENTER, value: ETableCellAlign.CENTER, expected: ETableCellAlign.CENTER },
  { prop: 'align', case: ETableCellAlign.LEFT, value: ETableCellAlign.LEFT, expected: ETableCellAlign.LEFT },
  { prop: 'align', case: ETableCellAlign.RIGHT, value: ETableCellAlign.RIGHT, expected: ETableCellAlign.RIGHT },
]

export const propEllipsisTestCases: TPropTestCase<IYVueCoreTableCellProps, 'ellipsis'>[] = [
  { prop: 'ellipsis', case: 'true', value: true, expected: true },
  { prop: 'ellipsis', case: 'false', value: false, expected: false },
]

export const propLineclampTestCases: TPropTestCase<IYVueCoreTableCellProps, 'lineclamp'>[] = [
  { prop: 'lineclamp', case: '10', value: 10, expected: 10 },
  { prop: 'lineclamp', case: '0', value: 0, expected: 0 },
]

export const propItemTestCases: TPropTestCase<IYVueCoreTableCellProps, 'item'>[] = [
  { prop: 'item', case: 'с объектом', value: item, expected: item },
  { prop: 'item', case: 'с undefined', value: undefined, expected: undefined },
]

export const propItemLabelTestCases: TPropTestCase<IYVueCoreTableCellProps, 'itemLabel'>[] = [
  { prop: 'itemLabel', case: 'с текстом', value: text, expected: text },
  { prop: 'itemLabel', case: 'с undefined', value: undefined, expected: itemLabel },
]
