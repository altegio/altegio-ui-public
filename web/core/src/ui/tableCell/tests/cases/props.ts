import type { TPropTestCase } from '~shared/types/tests'
import {
  ETableCellAlign,
  type IYCoreTableCellProps,
} from '~core/ui/tableCell/models/types'
import { text } from '~shared/tests/slotContents'

export const propStickyTestCases: TPropTestCase<IYCoreTableCellProps, 'sticky'>[] = [
  { prop: 'sticky', case: 'Должен добавить', value: true },
  { prop: 'sticky', case: 'Не Должен добавить', value: false },
]

export const propDisabledTestCases: TPropTestCase<IYCoreTableCellProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'Должен добавить', value: true },
  { prop: 'disabled', case: 'Не Должен добавить', value: false },
]

export const propAlignTestCases: TPropTestCase<IYCoreTableCellProps, 'align'>[] = [
  { prop: 'align', case: 'Должен добавить', value: ETableCellAlign.CENTER },
  { prop: 'align', case: 'Должен добавить', value: ETableCellAlign.LEFT },
  { prop: 'align', case: 'Должен добавить', value: ETableCellAlign.RIGHT },
  { prop: 'align', case: 'Не Должен добавить', value: undefined },
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
  { prop: 'item', case: 'с объектом', value: { id: '', label: text, name: '' }, expected: text },
  { prop: 'item', case: 'с undefined', value: undefined, expected: '' },
  { prop: 'item', case: 'с пустым объектом', value: { id: '2' }, expected: '' },
]

export const propItemLabelTestCases: TPropTestCase<IYCoreTableCellProps, 'itemLabel'>[] = [
  { prop: 'itemLabel', case: 'с текстом', value: text, expected: text },
  { prop: 'itemLabel', case: 'с undefined', value: undefined, expected: '' },
]
