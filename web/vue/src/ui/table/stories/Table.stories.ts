import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, computed } from 'vue'
import { fn } from '@storybook/test'
import { pick, omit } from 'radash'

import { YTable } from '~vue/ui/table'
import { type IYVueTableProps } from '~vue/ui/table/models/types'
import type { TAnyVoidFunction } from '~shared/types/utils'
import type { TYCoreTableMeta } from '~core/ui/table/stories/Table.stories'
import yTableStoryMeta from '~core/ui/table/stories/Table.stories'
import yTableRowStoryMeta from '~core/ui/tableRow/stories/TableRow.stories'
import yTableCellStoryMeta from '~core/ui/tableCell/stories/TableCell.stories'
import yTablePaginationStoryMeta from '~core/ui/tablePagination/stories/TablePagination.stories'

import {
  type TYVueTableHeaders,
  type TYVueTableItems,
  type IYVueTableEmitSortPayload,
} from '~vue/ui/table/models/types'

import {
  storyControlsTable,
  getComponentStateTable,
} from '~shared/.storybook/tables'
import type { TTablePluginsContext } from '~core/ui/table/plugins'
import {
  Dragging,
} from '~core/ui/table/plugins'

import type { ITableCellItem } from '~core/ui/tableCell/models/types'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { ESort } from '~shared/types/global'

const headers: TYVueTableHeaders = {
  services: {
    id: 'services',
    label: 'Услуги',
    gridTemplate: 'minmax(300px, 1fr)',
    align: 'left',
    sortable: true,
  },
  total: {
    id: 'total',
    label: 'Сумма выручки, ₽',
    gridTemplate: 'max-content',
    align: 'right',
  },
  average: {
    id: 'average',
    label: 'Ср. чек, ₽',
    gridTemplate: 'minmax(100px, 200px)',
    align: 'right',
    hint: 'Средний чек за покупку',
  },
  status: {
    id: 'status',
    gridTemplate: '130px',
    label: 'Статус услуги',
    align: 'left',
  },
}
const items: TYVueTableItems = [
  {
    rowId: 'item-1',
    services: {
      id: 'item-service-1',
      label: LOREM_IPSUM,
      ellipsis: true,
      lineclamp: 1,
    },
    total: {
      id: 'item-total-1',
      label: '252 028,00',
    },
    average: {
      id: 'item-average-1',
      label: '3 625,55',
    },
    status: {
      id: 'item-status-1',
      label: 'Активно',
      status: true,
    },
  },
  {
    rowId: 'item-2',
    services: {
      id: 'item-service-2',
      label: 'Блондирование волос',
    },
    total: {
      id: 'item-total-2',
      label: '252 028,00',
    },
    average: {
      id: 'item-average-2',
      label: '3 625,55',
    },
    status: {
      id: 'item-status-2',
      label: 'Отключено',
      status: false,
    },
  },
  {
    rowId: 'item-3',
    services: {
      id: 'item-service-3',
      label: 'Стрижка женская',
    },
    total: {
      id: 'item-total-3',
      label: '252 028,00',
    },
    average: {
      id: 'item-average-3',
      label: '3 625,55',
    },
    status: {
      id: 'item-status-3',
      label: 'Активно',
      status: true,
    },
  },
  {
    rowId: 'item-4',
    services: {
      id: 'item-service-4',
      label: 'Тонирование волос',
    },
    total: {
      id: 'item-total-4',
      label: '252 028,00',
    },
    average: {
      id: 'item-average-4',
      label: '3 625,55',
    },
    status: {
      id: 'item-status-4',
      label: 'Активно',
      status: true,
    },
  },
  {
    rowId: 'item-5',
    services: {
      id: 'item-service-5',
      label: 'Стрижка женская',
    },
    total: {
      id: 'item-total-5',
      label: '252 028,00',
    },
    average: {
      id: 'item-average-5',
      label: '3 625,55',
    },
    status: {
      id: 'item-status-5',
      label: 'Активно',
      status: true,
    },
  },
]

type TVueTableStoryMeta = IYVueTableProps & {
  showHeadHintAverageSlot: boolean
  showHeadCellTotal: boolean
  showHeadCell: boolean
  showCellColStatusSlot: boolean
  showCellSlot: boolean
  showCellOuterColStatusSlot: boolean
  showCellOuterSlot: boolean
  showRowOuterItem1Slot: boolean
  showRowInnerItem1Slot: boolean
  showRowOuterSlot: boolean
  showRowInnerSlot: boolean
  addDraggingPlugin: boolean
  onTableRowDrag: TAnyVoidFunction
  onTableRowDrop: TAnyVoidFunction
  onSort: TAnyVoidFunction
  onUpdateSelected: TAnyVoidFunction
  onUpdatePage: TAnyVoidFunction
  onUpdateItemsPerPage: TAnyVoidFunction
} & TYCoreTableMeta

/**
 * Составной Vue-компонент YTable
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components-(IN-PROGRESS)?node-id=2113-6857&p=f&t=trRvI3Uj84kWcK6f-0)
 */
const meta: Meta<TVueTableStoryMeta> = {
  title: '✅ Table',
  id: 'table',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YTable },
    setup() {
      const selected = ref<number[]>([])
      const headers = ref<TYVueTableHeaders>(args.headers ?? {})
      const sortedItems = ref<TYVueTableItems>(args.items ?? [])
      const page = ref<number>(args.page ?? 1)
      const itemsPerPage = ref<number>(args.itemsPerPage ?? 10)

      const onSort = (payload: IYVueTableEmitSortPayload) => {
        headers.value[payload.headId].sortDirection = payload.event.detail.direction
        sortedItems.value = payload.event.detail.direction === ESort.DEFAULT
          ? args.items ?? []
          : payload.event.detail.handler(
            sortedItems.value as Record<string, ITableCellItem>[],
            payload.headId,
            'label',
            payload.event.detail.direction,
          ) as TYVueTableItems
      }

      const pluginsList = [new Dragging()]
      const plugins = computed<TTablePluginsContext>(() => ({ 'y-core-table-row': args.addDraggingPlugin ? pluginsList : [] }))

      return { args, selected, headers, sortedItems, onSort, plugins, page, itemsPerPage }
    },
    template: `
      <div :style="args.sticky ? 'width: 600px;' : ''">
        <YTable
          v-bind="args"
          v-model:selected="selected"
          v-model:page="page"
          v-model:itemsPerPage="itemsPerPage"
          :headers="headers"
          :items="sortedItems"
          :plugins="plugins"
          @sort="onSort"
          @table-row-drag="onTableRowDrag"
          @table-row-drop="onTableRowDrop"
          @update:selected="args.onUpdateSelected"
          @update:page="args.onUpdatePage"
          @update:itemsPerPage="args.onUpdateItemsPerPage"
        >
          <template v-if="args.showHeadHintAverageSlot" #head-hint-average>
            Кастомный слот
          </template>

          <template v-if="args.showHeadCellTotal" #head-cell-total>
            Кастомный слот
          </template>

          <template v-if="args.showHeadCell" #head-cell>
            Кастомный слот
          </template>

          <template v-if="args.showCellColStatusSlot" #cell-col-status>
            Кастомный слот
          </template>

          <template v-if="args.showCellSlot" #cell>
            Кастомный слот
          </template>

          <template v-if="args.showRowOuterItem1Slot" #row-outer-item-1>
            <div slot="body">
              Кастомный слот
            </div>
          </template>

          <template v-if="args.showRowInnerItem1Slot" #row-inner-item-1>
            <div>
              Кастомный слот
            </div>
          </template>

          <template v-if="args.showCellOuterColStatusSlot" #cell-outer-col-status="{ cell }">
            <div
              :style="'box-sizing: border-box;padding: 10px;background-color: #c7c7fb;display: flex;justify-content: center;align-items: center;flex-shrink: 0;' + (cell?.head?.width ? 'width: ' + cell.head.width : '')"
            >{{ cell.label }}</div>
          </template>

          <template v-if="args.showCellOuterSlot" #cell-outer="{ cell }">
            <div
              :style="'box-sizing: border-box;padding: 10px;background-color: #b8ffb8;display: flex;justify-content: center;align-items: center;flex-shrink: 0;' + (cell?.head?.width ? 'width: ' + cell.head.width : '')"
            >{{ cell.label }}</div>
          </template>

          <template v-if="args.showRowOuterSlot" #row-outer="{ row }">
            <div slot="body">
              Кастомный слот row-outer
            </div>
          </template>

          <template v-if="args.showRowInnerSlot" #row-inner="{ row }">
            <div>
              {{ row.rowId }} - Кастомный слот row-inner
            </div>
          </template>
        </YTable>
      </div>
    `,
  }),
  argTypes: {
    ...pick(
      yTableStoryMeta.argTypes ?? {},
      ['loading', 'disabled'],
    ),
    ...pick(
      yTableRowStoryMeta.argTypes ?? {},
      ['stripe', 'selectable'],
    ),
    ...pick(
      yTableCellStoryMeta.argTypes ?? {},
      ['sticky'],
    ),
    ...omit(
      yTablePaginationStoryMeta.argTypes ?? {},
      ['disabled'],
    ),
    headers: {
      control: { type: 'object' },
      description: 'Загаловки таблицы',
      ...getComponentStateTable({}),
    },
    items: {
      control: { type: 'object' },
      description: 'Данные таблицы',
      ...getComponentStateTable({}),
    },
    showPagination: {
      type: 'boolean',
      description: 'Показать пагинацию',
      ...storyControlsTable,
    },
    hideHeader: {
      type: 'boolean',
      description: 'Скрыть заголовок',
      ...getComponentStateTable({}),
    },

    // Story Controls
    addDraggingPlugin: {
      type: 'boolean',
      description: 'Добавить Dragging плагин',
      ...storyControlsTable,
    },
    showHeadHintAverageSlot: {
      type: 'boolean',
      description: 'Показать слот "head-hint-average"',
      ...storyControlsTable,
    },
    showHeadCellTotal: {
      type: 'boolean',
      description: 'Показать слот "head-cell-total"',
      ...storyControlsTable,
    },
    showHeadCell: {
      type: 'boolean',
      description: 'Показать слот "head-cell"',
      ...storyControlsTable,
    },
    showRowOuterItem1Slot: {
      type: 'boolean',
      description: 'Показать слот "row-outer-item-1"',
      ...storyControlsTable,
    },
    showRowInnerItem1Slot: {
      type: 'boolean',
      description: 'Показать слот "row-inner-item-1"',
      ...storyControlsTable,
    },
    showRowOuterSlot: {
      type: 'boolean',
      description: 'Показать слот "row-outer"',
      ...storyControlsTable,
    },
    showRowInnerSlot: {
      type: 'boolean',
      description: 'Показать слот "row-inner"',
      ...storyControlsTable,
    },
    showCellColStatusSlot: {
      type: 'boolean',
      description: 'Показать слот "cell-col-status"',
      ...storyControlsTable,
    },
    showCellSlot: {
      type: 'boolean',
      description: 'Показать слот "cell"',
      ...storyControlsTable,
    },
    showCellOuterColStatusSlot: {
      type: 'boolean',
      description: 'Показать слот "cell-outer-col-status"',
      ...storyControlsTable,
    },
    showCellOuterSlot: {
      type: 'boolean',
      description: 'Показать слот "cell-outer"',
      ...storyControlsTable,
    },
    onTableRowDrag: {
      type: 'function',
      description: 'Событие "table-row-drag"',
      ...storyControlsTable,
    },
    onTableRowDrop: {
      type: 'function',
      description: 'Событие "table-row-drop"',
      ...storyControlsTable,
    },
    onSort: {
      type: 'function',
      description: 'Событие "sort"',
      ...storyControlsTable,
    },
    onUpdateSelected: {
      type: 'function',
      description: 'Событие "update:selected"',
      ...storyControlsTable,
    },
    onUpdatePage: {
      type: 'function',
      description: 'Событие "update:page"',
      ...storyControlsTable,
    },
    onUpdateItemsPerPage: {
      type: 'function',
      description: 'Событие "update:itemsPerPage"',
      ...storyControlsTable,
    },
  },
  args: {
    headers,
    items,
    showPagination: false,
    ...pick(
      yTableStoryMeta.args ?? {},
      ['loading', 'disabled'],
    ),
    ...pick(
      yTableRowStoryMeta.args ?? {},
      ['stripe'],
    ),
    ...pick(
      yTableCellStoryMeta.args ?? {},
      ['sticky'],
    ),
    ...omit(
      yTablePaginationStoryMeta.args ?? {},
      ['disabled'],
    ),
    stripe: false,
    sticky: false,
    selectable: false,
    loading: false,
    addDraggingPlugin: true,
    showHeadHintAverageSlot: false,
    showHeadCellTotal: false,
    showHeadCell: false,
    showRowOuterItem1Slot: false,
    showRowInnerItem1Slot: false,
    showRowOuterSlot: false,
    showRowInnerSlot: false,
    showCellColStatusSlot: false,
    showCellSlot: false,
    showCellOuterColStatusSlot: false,
    showCellOuterSlot: false,
    hideHeader: false,
    onTableRowDrag: fn(),
    onTableRowDrop: fn(),
    onSort: fn(),
    onUpdateSelected: fn(),
    onUpdatePage: fn(),
    onUpdateItemsPerPage: fn(),
  },
}

export default meta

type Story = StoryObj<typeof meta>

// Базовый вариант
export const Playground: Story = { args: { total: 0 } }

// С пагинацией
export const WithPagination: Story = { args: { showPagination: true, total: yTablePaginationStoryMeta.args?.total } }

// Loading
export const Loading: Story = { args: { loading: true } }

// Stripe
export const Stripe: Story = { args: { stripe: true } }

// Selectable
export const Selectable: Story = { args: { selectable: true } }

// Disabled
export const Disabled: Story = { args: { disabled: true } }

// Sticky
export const Sticky: Story = { args: { sticky: true } }

// С rowKey
const itemsWithRowKey: TYVueTableItems = items.map((item, index) => ({
  ...item,
  rowKey: `unique-key-${index + 1}`,
}))
export const WithRowKey: Story = { args: { items: itemsWithRowKey } }

// Перетаскивание из таблицы в таблицу
export const DraggingMultipleTables: Story = {
  render: (args) => ({
    components: { YTable },
    setup() {
      const firstTableItems = ref((args.items ?? []).map((item) => ({ ...item, group: 'group-1' })))
      const secondTableItems = ref<TYVueTableItems>((args.items ?? []).map((item) => ({ ...item, group: 'group-1' })))

      const pluginsList = [new Dragging()]
      const plugins = computed<TTablePluginsContext>(() => ({ 'y-core-table-row': args.addDraggingPlugin ? pluginsList : [] }))

      return { args, firstTableItems, secondTableItems, plugins }
    },
    template: `
      <div>
        <div>
          <h2>Таблица 1</h2>
          
          <YTable :headers="args.headers" :items="firstTableItems" :plugins="plugins" />
        </div>
        
        <div>
          <h2>Таблица 2</h2>
          
          <YTable :headers="args.headers" :items="secondTableItems" :plugins="plugins" />
        </div>
      </div>
    `,
  }),
  args: { addDraggingPlugin: true },
}
