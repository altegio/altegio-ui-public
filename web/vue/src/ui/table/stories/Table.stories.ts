import type { Meta, StoryObj } from '@storybook/vue3'
import { ref, computed } from 'vue'
import { fn } from 'storybook/test'
import { pick, omit } from 'radash'

import { AltTable } from '~vue/ui/table'
import { type IAltVueTableProps } from '~vue/ui/table/models/types'
import type { TAnyVoidFunction } from '~shared/types/utils'
import type { TAltCoreTableMeta } from '~core/ui/table/stories/Table.stories'
import altTableStoryMeta from '~core/ui/table/stories/Table.stories'
import altTableRowStoryMeta from '~core/ui/tableRow/stories/TableRow.stories'
import altTableCellStoryMeta from '~core/ui/tableCell/stories/TableCell.stories'
import altTablePaginationStoryMeta from '~core/ui/tablePagination/stories/TablePagination.stories'

import {
  type TAltVueTableHeaders,
  type TAltVueTableItems,
  type IAltVueTableEmitSortPayload,
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

const headers: TAltVueTableHeaders = {
  services: {
    id: 'services',
    label: 'Services',
    gridTemplate: 'minmax(300px, 1fr)',
    align: 'left',
    sortable: true,
  },
  total: {
    id: 'total',
    label: 'Revenue, $',
    gridTemplate: 'max-content',
    align: 'right',
  },
  average: {
    id: 'average',
    label: 'Average transaction, $',
    gridTemplate: 'minmax(100px, 200px)',
    align: 'right',
    hint: 'Average transaction amount',
  },
  status: {
    id: 'status',
    gridTemplate: '130px',
    label: 'Service status',
    align: 'left',
  },
}
const items: TAltVueTableItems = [
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
      label: 'Active',
      status: true,
    },
  },
  {
    rowId: 'item-2',
    services: {
      id: 'item-service-2',
      label: 'Hair bleaching',
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
      label: 'Inactive',
      status: false,
    },
  },
  {
    rowId: 'item-3',
    services: {
      id: 'item-service-3',
      label: 'Haircut',
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
      label: 'Active',
      status: true,
    },
  },
  {
    rowId: 'item-4',
    services: {
      id: 'item-service-4',
      label: 'Hair toning',
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
      label: 'Active',
      status: true,
    },
  },
  {
    rowId: 'item-5',
    services: {
      id: 'item-service-5',
      label: 'Haircut',
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
      label: 'Active',
      status: true,
    },
  },
]

type TVueTableStoryMeta = IAltVueTableProps & {
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
} & TAltCoreTableMeta

/**
 * Composite AltTable component for Vue
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
    components: { AltTable },
    setup() {
      const selected = ref<number[]>([])
      const headers = ref<TAltVueTableHeaders>(args.headers ?? {})
      const sortedItems = ref<TAltVueTableItems>(args.items ?? [])
      const page = ref<number>(args.page ?? 1)
      const itemsPerPage = ref<number>(args.itemsPerPage ?? 10)

      const onSort = (payload: IAltVueTableEmitSortPayload) => {
        headers.value[payload.headId].sortDirection = payload.event.detail.direction
        sortedItems.value = payload.event.detail.direction === ESort.DEFAULT
          ? args.items ?? []
          : payload.event.detail.handler(
            sortedItems.value as Record<string, ITableCellItem>[],
            payload.headId,
            'label',
            payload.event.detail.direction,
          ) as TAltVueTableItems
      }

      const pluginsList = [new Dragging()]
      const plugins = computed<TTablePluginsContext>(() => ({ 'alt-core-table-row': args.addDraggingPlugin ? pluginsList : [] }))

      return { args, selected, headers, sortedItems, onSort, plugins, page, itemsPerPage }
    },
    template: `
      <div :style="args.sticky ? 'width: 600px;' : ''">
        <AltTable
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
            Custom slot
          </template>

          <template v-if="args.showHeadCellTotal" #head-cell-total>
            Custom slot
          </template>

          <template v-if="args.showHeadCell" #head-cell>
            Custom slot
          </template>

          <template v-if="args.showCellColStatusSlot" #cell-col-status>
            Custom slot
          </template>

          <template v-if="args.showCellSlot" #cell>
            Custom slot
          </template>

          <template v-if="args.showRowOuterItem1Slot" #row-outer-item-1>
            <div slot="body">
              Custom slot
            </div>
          </template>

          <template v-if="args.showRowInnerItem1Slot" #row-inner-item-1>
            <div>
              Custom slot
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
              Custom slot row-outer
            </div>
          </template>

          <template v-if="args.showRowInnerSlot" #row-inner="{ row }">
            <div>
              {{ row.rowId }} - Custom slot row-inner
            </div>
          </template>
        </AltTable>
      </div>
    `,
  }),
  argTypes: {
    ...pick(
      altTableStoryMeta.argTypes ?? {},
      ['loading', 'disabled'],
    ),
    ...pick(
      altTableRowStoryMeta.argTypes ?? {},
      ['stripe', 'selectable'],
    ),
    ...pick(
      altTableCellStoryMeta.argTypes ?? {},
      ['sticky'],
    ),
    ...omit(
      altTablePaginationStoryMeta.argTypes ?? {},
      ['disabled'],
    ),
    headers: {
      control: { type: 'object' },
      description: 'Table headings',
      ...getComponentStateTable({}),
    },
    items: {
      control: { type: 'object' },
      description: 'Table data',
      ...getComponentStateTable({}),
    },
    showPagination: {
      type: 'boolean',
      description: 'Show pagination',
      ...storyControlsTable,
    },
    hideHeader: {
      type: 'boolean',
      description: 'Hide the header',
      ...getComponentStateTable({}),
    },

    // Story Controls
    addDraggingPlugin: {
      type: 'boolean',
      description: 'Add the Dragging plugin',
      ...storyControlsTable,
    },
    showHeadHintAverageSlot: {
      type: 'boolean',
      description: 'Show the "head-hint-average" slot',
      ...storyControlsTable,
    },
    showHeadCellTotal: {
      type: 'boolean',
      description: 'Show the "head-cell-total" slot',
      ...storyControlsTable,
    },
    showHeadCell: {
      type: 'boolean',
      description: 'Show the "head-cell" slot',
      ...storyControlsTable,
    },
    showRowOuterItem1Slot: {
      type: 'boolean',
      description: 'Show the "row-outer-item-1" slot',
      ...storyControlsTable,
    },
    showRowInnerItem1Slot: {
      type: 'boolean',
      description: 'Show the "row-inner-item-1" slot',
      ...storyControlsTable,
    },
    showRowOuterSlot: {
      type: 'boolean',
      description: 'Show the "row-outer" slot',
      ...storyControlsTable,
    },
    showRowInnerSlot: {
      type: 'boolean',
      description: 'Show the "row-inner" slot',
      ...storyControlsTable,
    },
    showCellColStatusSlot: {
      type: 'boolean',
      description: 'Show the "cell-col-status" slot',
      ...storyControlsTable,
    },
    showCellSlot: {
      type: 'boolean',
      description: 'Show the "cell" slot',
      ...storyControlsTable,
    },
    showCellOuterColStatusSlot: {
      type: 'boolean',
      description: 'Show the "cell-outer-col-status" slot',
      ...storyControlsTable,
    },
    showCellOuterSlot: {
      type: 'boolean',
      description: 'Show the "cell-outer" slot',
      ...storyControlsTable,
    },
    onTableRowDrag: {
      type: 'function',
      description: '"table-row-drag" event',
      ...storyControlsTable,
    },
    onTableRowDrop: {
      type: 'function',
      description: '"table-row-drop" event',
      ...storyControlsTable,
    },
    onSort: {
      type: 'function',
      description: '"sort" event',
      ...storyControlsTable,
    },
    onUpdateSelected: {
      type: 'function',
      description: '"update:selected" event',
      ...storyControlsTable,
    },
    onUpdatePage: {
      type: 'function',
      description: '"update:page" event',
      ...storyControlsTable,
    },
    onUpdateItemsPerPage: {
      type: 'function',
      description: '"update:itemsPerPage" event',
      ...storyControlsTable,
    },
  },
  args: {
    headers,
    items,
    showPagination: false,
    ...pick(
      altTableStoryMeta.args ?? {},
      ['loading', 'disabled'],
    ),
    ...pick(
      altTableRowStoryMeta.args ?? {},
      ['stripe'],
    ),
    ...pick(
      altTableCellStoryMeta.args ?? {},
      ['sticky'],
    ),
    ...omit(
      altTablePaginationStoryMeta.args ?? {},
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

// Basic example
export const Playground: Story = { args: { total: 0 } }

// With pagination
export const WithPagination: Story = { args: { showPagination: true, total: altTablePaginationStoryMeta.args?.total } }

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

// With rowKey
const itemsWithRowKey: TAltVueTableItems = items.map((item, index) => ({
  ...item,
  rowKey: `unique-key-${index + 1}`,
}))
export const WithRowKey: Story = { args: { items: itemsWithRowKey } }

// Dragging rows between tables
export const DraggingMultipleTables: Story = {
  render: (args) => ({
    components: { AltTable },
    setup() {
      const firstTableItems = ref((args.items ?? []).map((item) => ({ ...item, group: 'group-1' })))
      const secondTableItems = ref<TAltVueTableItems>((args.items ?? []).map((item) => ({ ...item, group: 'group-1' })))

      const pluginsList = [new Dragging()]
      const plugins = computed<TTablePluginsContext>(() => ({ 'alt-core-table-row': args.addDraggingPlugin ? pluginsList : [] }))

      return { args, firstTableItems, secondTableItems, plugins }
    },
    template: `
      <div>
        <div>
          <h2>Table 1</h2>
          
          <AltTable :headers="args.headers" :items="firstTableItems" :plugins="plugins" />
        </div>
        
        <div>
          <h2>Table 2</h2>
          
          <AltTable :headers="args.headers" :items="secondTableItems" :plugins="plugins" />
        </div>
      </div>
    `,
  }),
  args: { addDraggingPlugin: true },
}
