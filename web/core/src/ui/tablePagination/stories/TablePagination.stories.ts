import { html } from 'lit'
import { fn } from 'storybook/test'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/tablePagination'

import {
  createCoreTablePaginationProps,
  type IAltCoreTablePaginationProps,
  type TAltCorePaginationEvents,
  type TAltCoreTablePaginationEvents,
  type ChangePageEvent,
  type ChangeItemsPerPageEvent,
} from '../models/types'
import {
  AltCoreTablePaginationTagName as tagName,
} from '~shared/constants'
import altCorePaginationStoryMeta from '~core/ui/pagination/stories/Pagination.stories'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

const { counterText, optionsItemsPerPage } = createCoreTablePaginationProps()

const storyCounterText = 'promo codes per page'
const storyOptionsItemsPerPage: number[] = [10, 25, 50]

export type TAltCoreTablePaginationMeta = Meta<IAltCoreTablePaginationProps & TAltCorePaginationEvents & TAltCoreTablePaginationEvents>

/**
 * ## Core TablePagination
 */
const meta: TAltCoreTablePaginationMeta = {
  title: 'TablePagination',
  id: 'tablePagination',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    itemsPerPage,
    page,
    total,
    counterText,
    optionsItemsPerPage,
    onChangePage,
    onChangeItemsPerPage,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<IAltCoreTablePaginationProps>()

    const onStoryPageChange = (event: ChangePageEvent) => {
      updateArgs({ ...args, page: event.detail.page })
      onChangePage(event)
    }

    const onStoryItemsPerPageChange = (event: ChangeItemsPerPageEvent) => {
      updateArgs({ ...args, itemsPerPage: event.detail.itemsPerPage })
      onChangeItemsPerPage(event)
    }

    return html`
      <alt-core-table-pagination
        .disabled=${disabled}
        .itemsPerPage=${itemsPerPage}
        .page=${page}
        .total=${total}
        .counterText=${counterText}
        .optionsItemsPerPage=${optionsItemsPerPage}
        @change-page=${onStoryPageChange}
        @change-items-per-page=${onStoryItemsPerPageChange}
      ></alt-core-table-pagination>
    `
  },
  argTypes: {
    ...altCorePaginationStoryMeta.argTypes,

    counterText: {
      type: 'string',
      description: 'Counter text',
      ...getComponentStateTable(counterText),
    },
    optionsItemsPerPage: {
      control: { type: 'object' },
      description: 'Options for the number of items per page',
      ...getComponentStateTable(optionsItemsPerPage),
    },
    onChangeItemsPerPage: {
      type: 'function',
      description: 'Items per page change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...altCorePaginationStoryMeta.args,

    counterText: storyCounterText,
    optionsItemsPerPage: storyOptionsItemsPerPage,
    onChangeItemsPerPage: fn(),
  },
} satisfies TAltCoreTablePaginationMeta

export default meta
type Story = StoryObj<IAltCoreTablePaginationProps>

export const Playground: Story = { args: {} }
