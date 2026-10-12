import type { TEventTestCase } from '~shared/types/tests'
import { ESort, type TSort } from '~shared/types/global'
import type { IYCoreTablePaginationProps } from '~core/ui/tablePagination/models/types'
import type { IYVueTableItem } from '~vue/ui/table/models/types'

import {
  testHeaders,
  testItems,
} from './props'

export type TYSortPayload = {
  headId: string
  event: {
    direction: TSort
  }
}
export type TYSortExpected = {
  headId: string
  direction: TSort
}
export const eventSortTestCases: TEventTestCase<TYSortPayload, TYSortExpected>[] = [
  {
    event: 'sort',
    case: 'сортировка по возрастанию',
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
    case: 'сортировка по убыванию',
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

export type TYUpdateSelectedPayload = IYVueTableItem['id'][]
export type TYUpdateSelectedExpected = IYVueTableItem['id'][]
export const eventUpdateSelectedTestCases: TEventTestCase<TYUpdateSelectedPayload, TYUpdateSelectedExpected>[] = [
  {
    event: 'update:selected',
    case: 'выбор строки',
    nodeEventName: 'checked',
    payload: [testItems[0].rowId],
    expected: [testItems[0].rowId],
  },
  {
    event: 'update:selected',
    case: 'отмена выбора строки',
    nodeEventName: 'checked',
    payload: [],
    expected: [],
  },
]

export type TYUpdatePagePayload = IYCoreTablePaginationProps['page']
export const eventUpdatePageTestCases: TEventTestCase<TYUpdatePagePayload, number>[] = [
  {
    event: 'update:page',
    case: 'изменение страницы',
    nodeEventName: 'change-page',
    payload: 2,
    expected: 2,
  },
]

export type TYUpdateItemsPerPagePayload = IYCoreTablePaginationProps['itemsPerPage']
export const eventUpdateItemsPerPageTestCases: TEventTestCase<TYUpdateItemsPerPagePayload, number>[] = [
  {
    event: 'update:itemsPerPage',
    case: 'изменение количества элементов на странице',
    nodeEventName: 'change-items-per-page',
    payload: 50,
    expected: 50,
  },
]


