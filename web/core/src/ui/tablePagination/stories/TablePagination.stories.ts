import { html } from 'lit'
import { fn } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/tablePagination'

import {
  createCoreTablePaginationProps,
  type IYCoreTablePaginationProps,
  type TYCorePaginationEvents,
  type TYCoreTablePaginationEvents,
  type ChangePageEvent,
  type ChangeItemsPerPageEvent,
} from '../models/types'
import {
  YCoreTablePaginationTagName as tagName,
} from '~shared/constants'
import yCorePaginationStoryMeta from '~core/ui/pagination/stories/Pagination.stories'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

const { counterText, optionsItemsPerPage } = createCoreTablePaginationProps()

const storyCounterText = 'промокодов на странице'
const storyOptionsItemsPerPage: number[] = [10, 25, 50]

export type TYCoreTablePaginationMeta = Meta<IYCoreTablePaginationProps & TYCorePaginationEvents & TYCoreTablePaginationEvents>

/**
 * ## Core TablePagination
 */
const meta: TYCoreTablePaginationMeta = {
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
    ] = useArgs<IYCoreTablePaginationProps>()

    const onStoryPageChange = (event: ChangePageEvent) => {
      updateArgs({ ...args, page: event.detail.page })
      onChangePage(event)
    }

    const onStoryItemsPerPageChange = (event: ChangeItemsPerPageEvent) => {
      updateArgs({ ...args, itemsPerPage: event.detail.itemsPerPage })
      onChangeItemsPerPage(event)
    }

    return html`
      <y-core-table-pagination
        .disabled=${disabled}
        .itemsPerPage=${itemsPerPage}
        .page=${page}
        .total=${total}
        .counterText=${counterText}
        .optionsItemsPerPage=${optionsItemsPerPage}
        @change-page=${onStoryPageChange}
        @change-items-per-page=${onStoryItemsPerPageChange}
      ></y-core-table-pagination>
    `
  },
  argTypes: {
    ...yCorePaginationStoryMeta.argTypes,

    counterText: {
      type: 'string',
      description: 'Текст счетчика',
      ...getComponentStateTable(counterText),
    },
    optionsItemsPerPage: {
      control: { type: 'object' },
      description: 'Массив с опциями количества элементов на странице',
      ...getComponentStateTable(optionsItemsPerPage),
    },
    onChangeItemsPerPage: {
      type: 'function',
      description: 'Событие изменение количества элементов на странице',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...yCorePaginationStoryMeta.args,

    counterText: storyCounterText,
    optionsItemsPerPage: storyOptionsItemsPerPage,
    onChangeItemsPerPage: fn(),
  },
} satisfies TYCoreTablePaginationMeta

export default meta
type Story = StoryObj<IYCoreTablePaginationProps>

export const Playground: Story = { args: {} }
