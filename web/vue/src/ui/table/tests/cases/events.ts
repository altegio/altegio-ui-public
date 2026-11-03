import type { TEventTestCase } from '~shared/types/tests'
import { ESort, type TSort } from '~shared/types/global'
import type { IAltCoreTablePaginationProps } from '~core/ui/tablePagination/models/types'
import type { IAltVueTableItem } from '~vue/ui/table/models/types'

import {
  testHeaders,
  testItems,
} from './props'

export type TAltSortPayload = {
  headId: string
  event: {
    direction: TSort
  }
}
export type TAltSortExpected = {
  headId: string
  direction: TSort
}
export const eventSortTestCases: TEventTestCase<TAltSortPayload, TAltSortExpected>[] = [
  {
    event: 'sort',
    case: 'ascending sort',
    nodeEventName: 'sort',
    payload: {
      headId: testHeaders.id.id,
      event: { direction: ESort.ASC },
    },
    expected: {
      headId: testHeaders.id.id,
      direction: ESort.ASC,
    },
  },
  {
    event: 'sort',
    case: 'descending sort',
    nodeEventName: 'sort',
    payload: {
      headId: testHeaders.id.id,
      event: { direction: ESort.DESC },
    },
    expected: {
      headId: testHeaders.id.id,
      direction: ESort.DESC,
    },
  },
]

export type TAltUpdateSelectedPayload = IAltVueTableItem['id'][]
export type TAltUpdateSelectedExpected = IAltVueTableItem['id'][]
export const eventUpdateSelectedTestCases: TEventTestCase<TAltUpdateSelectedPayload, TAltUpdateSelectedExpected>[] = [
  {
    event: 'update:selected',
    case: 'row selection',
    nodeEventName: 'checked',
    payload: [testItems[0].rowId],
    expected: [testItems[0].rowId],
  },
  {
    event: 'update:selected',
    case: 'row deselection',
    nodeEventName: 'checked',
    payload: [],
    expected: [],
  },
]

export type TAltUpdatePagePayload = IAltCoreTablePaginationProps['page']
export const eventUpdatePageTestCases: TEventTestCase<TAltUpdatePagePayload, number>[] = [
  {
    event: 'update:page',
    case: 'page change',
    nodeEventName: 'change-page',
    payload: 2,
    expected: 2,
  },
]

export type TAltUpdateItemsPerPagePayload = IAltCoreTablePaginationProps['itemsPerPage']
export const eventUpdateItemsPerPageTestCases: TEventTestCase<TAltUpdateItemsPerPagePayload, number>[] = [
  {
    event: 'update:itemsPerPage',
    case: 'items-per-page change',
    nodeEventName: 'change-items-per-page',
    payload: 50,
    expected: 50,
  },
]


