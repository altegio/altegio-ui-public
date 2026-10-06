import type { TPropTestCase } from '~shared/types/tests'

import {
  createVueTableProps,
  type IYVueTableProps,
  type TYVueTableItems,
  type TYVueTableHeaders,
} from '~vue/ui/table/models/types'

const {
  disabled: defaultDisabled,
  loading: defaultLoading,
  hideHeader: defaultHideHeader,
  stripe: defaultStripe,
  selectable: defaultSelectable,
  sticky: defaultSticky,
  page: defaultPage,
  itemsPerPage: defaultItemsPerPage,
  total: defaultTotal,
  itemValue: defaultItemValue,
  itemLabel: defaultItemLabel,
  counterText: defaultCounterText,
  showPagination: defaultShowPagination,
} = createVueTableProps()

export const testHeaders: TYVueTableHeaders = {
  id: { id: 'id', label: 'ID', align: 'left', sortable: true },
  name: { id: 'name', label: 'Name', align: 'right', sortable: false },
}

export const testItems: TYVueTableItems = [
  {
    rowId: 'row-1',
    id: { id: 'id', value: '1', label: 'ID', head: testHeaders.id },
    name: { id: 'name', value: 'Test', label: 'Name', head: testHeaders.name },
  },
  {
    rowId: 'row-2',
    id: { id: 'id-2', value: '2', label: 'ID', head: testHeaders.id },
    name: { id: 'name-2', value: 'Test-2', label: 'Name', head: testHeaders.name },
  },
]

export const propDisabledTestCases: TPropTestCase<IYVueTableProps, 'disabled'>[] = [
  {
    prop: 'disabled',
    case: 'без значения',
    value: undefined,
    expected: defaultDisabled,
  },
  {
    prop: 'disabled',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'disabled',
    case: 'false',
    value: false,
    expected: false,
  },
]

export const propLoadingTestCases: TPropTestCase<IYVueTableProps, 'loading'>[] = [
  {
    prop: 'loading',
    case: 'без значения',
    value: undefined,
    expected: defaultLoading,
  },
  {
    prop: 'loading',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'loading',
    case: 'false',
    value: false,
    expected: false,
  },
]

export const propHideHeaderTestCases: TPropTestCase<IYVueTableProps, 'hideHeader'>[] = [
  {
    prop: 'hideHeader',
    case: 'без значения',
    value: undefined,
    expected: defaultHideHeader,
  },
  {
    prop: 'hideHeader',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'hideHeader',
    case: 'false',
    value: false,
    expected: false,
  },
]

export const propStripeTestCases: TPropTestCase<IYVueTableProps, 'stripe'>[] = [
  {
    prop: 'stripe',
    case: 'без значения',
    value: undefined,
    expected: defaultStripe,
  },
  {
    prop: 'stripe',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'stripe',
    case: 'false',
    value: false,
    expected: false,
  },
]

export const propSelectableTestCases: TPropTestCase<IYVueTableProps, 'selectable'>[] = [
  {
    prop: 'selectable',
    case: 'без значения',
    value: undefined,
    expected: defaultSelectable,
  },
  {
    prop: 'selectable',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'selectable',
    case: 'false',
    value: false,
    expected: false,
  },
]

export const propStickyTestCases: TPropTestCase<IYVueTableProps, 'sticky'>[] = [
  {
    prop: 'sticky',
    case: 'без значения',
    value: undefined,
    expected: defaultSticky,
  },
  {
    prop: 'sticky',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'sticky',
    case: 'false',
    value: false,
    expected: false,
  },
]

export const propPageTestCases: TPropTestCase<IYVueTableProps, 'page'>[] = [
  {
    prop: 'page',
    case: 'без значения',
    value: undefined,
    expected: defaultPage,
  },
  {
    prop: 'page',
    case: 'число',
    value: 1,
    expected: 1,
  },
]

export const propItemsPerPageTestCases: TPropTestCase<IYVueTableProps, 'itemsPerPage'>[] = [
  {
    prop: 'itemsPerPage',
    case: 'без значения',
    value: undefined,
    expected: defaultItemsPerPage,
  },
  {
    prop: 'itemsPerPage',
    case: 'число',
    value: 10,
    expected: 10,
  },
]

export const propTotalTestCases: TPropTestCase<IYVueTableProps, 'total'>[] = [
  {
    prop: 'total',
    case: 'без значения',
    value: undefined,
    expected: defaultTotal,
  },
  {
    prop: 'total',
    case: 'число',
    value: 100,
    expected: 100,
  },
]

export const propItemValueTestCases: TPropTestCase<IYVueTableProps, 'itemValue'>[] = [
  {
    prop: 'itemValue',
    case: 'без значения',
    value: undefined,
    expected: defaultItemValue,
  },
  {
    prop: 'itemValue',
    case: 'строка',
    value: 'id',
    expected: 'id',
  },
]

export const propItemLabelTestCases: TPropTestCase<IYVueTableProps, 'itemLabel'>[] = [
  {
    prop: 'itemLabel',
    case: 'без значения',
    value: undefined,
    expected: defaultItemLabel,
  },
  {
    prop: 'itemLabel',
    case: 'строка',
    value: 'name',
    expected: 'name',
  },
]

export const propOptionsItemsPerPageTestCases: TPropTestCase<IYVueTableProps, 'optionsItemsPerPage'>[] = [
  {
    prop: 'optionsItemsPerPage',
    case: 'без значения',
    value: undefined,
    expected: [],
  },
  {
    prop: 'optionsItemsPerPage',
    case: 'массив',
    value: [10, 20, 50],
    expected: [10, 20, 50],
  },
]

export const propCounterTextTestCases: TPropTestCase<IYVueTableProps, 'counterText'>[] = [
  {
    prop: 'counterText',
    case: 'без значения',
    value: undefined,
    expected: defaultCounterText,
  },
  {
    prop: 'counterText',
    case: 'строка',
    value: 'Всего записей',
    expected: 'Всего записей',
  },
]

export const propShowPaginationTestCases: TPropTestCase<IYVueTableProps, 'showPagination'>[] = [
  {
    prop: 'showPagination',
    case: 'без значения',
    value: undefined,
    expected: defaultShowPagination,
  },
  {
    prop: 'showPagination',
    case: 'true',
    value: true,
    expected: true,
  },
  {
    prop: 'showPagination',
    case: 'false',
    value: false,
    expected: false,
  },
]

export const propHeadersTestCases: TPropTestCase<IYVueTableProps, 'headers'>[] = [
  {
    prop: 'headers',
    case: 'без значения',
    value: undefined,
    expected: {},
  },
  {
    prop: 'headers',
    case: 'с заголовками',
    value: testHeaders,
    expected: testHeaders,
  },
]

export type TYItemsExpected = {
  rows: number
  cells: number
}

interface IItemsTestCase extends TPropTestCase<IYVueTableProps, 'items', TYItemsExpected> {
  additionalProps?: Partial<IYVueTableProps>
}

export const propItemsTestCases: IItemsTestCase[] = [
  {
    prop: 'items',
    case: 'без значения',
    value: undefined,
    expected: {
      rows: 0,
      cells: 0,
    },
  },
  {
    prop: 'items',
    case: 'с данными, без заголовков',
    value: testItems,
    expected: {
      rows: testItems.length,
      cells: 0,
    },
  },
  {
    prop: 'items',
    case: 'с данными и заголовками',
    value: testItems,
    additionalProps: { headers: testHeaders },
    expected: {
      rows: testItems.length,
      cells: testItems.length * Object.keys(testHeaders).length,
    },
  },
]

export type TYSelectedExpected = {
  head: {
    checked: boolean
    indeterminate: boolean
  }
  rows: boolean[]
}
export const propSelectedTestCases: TPropTestCase<IYVueTableProps, 'selected', TYSelectedExpected>[] = [
  {
    prop: 'selected',
    case: 'без значения',
    value: undefined,
    expected: {
      head: {
        checked: false,
        indeterminate: false,
      },
      rows: [false, false],
    },
  },
  {
    prop: 'selected',
    case: 'выбрана только первая строка',
    value: [testItems[0].rowId],
    expected: {
      head: {
        checked: false,
        indeterminate: true,
      },
      rows: [true, false],
    },
  },
  {
    prop: 'selected',
    case: 'выбраны все строки',
    value: testItems.map((item) => item.rowId),
    expected: {
      head: {
        checked: true,
        indeterminate: false,
      },
      rows: [true, true],
    },
  },
]

export const propPluginsTestCases: TPropTestCase<IYVueTableProps, 'plugins'>[] = [
  {
    prop: 'plugins',
    case: 'без значения',
    value: undefined,
    expected: {},
  },
  {
    prop: 'plugins',
    case: 'с плагинами',
    value: {
      'y-core-table': [],
      'y-core-table-row': [],
    },
    expected: {
      'y-core-table': [],
      'y-core-table-row': [],
    },
  },
]

export const skeletonTableColumnsTestCases = propHeadersTestCases.map((testCase) => {
  return {
    ...testCase,
    expected: Object.values(testCase.value ?? {}).map((header) => ({
      align: header.align,
      width: header.width,
    })),
  }
})
