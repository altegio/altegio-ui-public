import type { TPropTestCase } from '~shared/types/tests'
import {
  ETableCellAlign,
  type IYCoreTableCellProps,
} from '~core/ui/tableCell/models/types'
import { text } from '~shared/tests/slotContents'

export const propStickyTestCases: TPropTestCase<IYCoreTableCellProps, 'sticky'>[] = [
  { prop: 'sticky', case: 'Should', value: true },
  { prop: 'sticky', case: 'Should not', value: false },
]

export const propDisabledTestCases: TPropTestCase<IYCoreTableCellProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'Should', value: true },
  { prop: 'disabled', case: 'Should not', value: false },
]

export const propAlignTestCases: TPropTestCase<IYCoreTableCellProps, 'align'>[] = [
  { prop: 'align', case: 'Should', value: ETableCellAlign.CENTER },
  { prop: 'align', case: 'Should', value: ETableCellAlign.LEFT },
  { prop: 'align', case: 'Should', value: ETableCellAlign.RIGHT },
  { prop: 'align', case: 'Should not', value: undefined },
]

export const propEllipsisTestCases: TPropTestCase<IYCoreTableCellProps, 'ellipsis'>[] = [
  { prop: 'ellipsis', case: 'true', value: true, expected: true },
  { prop: 'ellipsis', case: 'false', value: false, expected: false },
]

export const propLineclampTestCases: TPropTestCase<IYCoreTableCellProps, 'lineclamp'>[] = [
  { prop: 'lineclamp', case: '10', value: 10, expected: 10 },
  { prop: 'lineclamp', case: '0', value: 0, expected: 0 },
]

export const propItemTestCases: TPropTestCase<IYCoreTableCellProps, 'item'>[] = [
  { prop: 'item', case: 'with an object', value: { id: '', label: text, name: '' }, expected: text },
  { prop: 'item', case: 'with undefined', value: undefined, expected: '' },
  { prop: 'item', case: 'with an empty object', value: { id: '2' }, expected: '' },
]

export const propItemLabelTestCases: TPropTestCase<IYCoreTableCellProps, 'itemLabel'>[] = [
  { prop: 'itemLabel', case: 'with text', value: text, expected: text },
  { prop: 'itemLabel', case: 'with undefined', value: undefined, expected: '' },
]
