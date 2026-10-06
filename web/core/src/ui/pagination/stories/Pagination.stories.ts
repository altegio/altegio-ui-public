import { html } from 'lit'
import { fn } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/pagination'

import {
  createCorePaginationProps,
  type IYCorePaginationProps,
  type TYCorePaginationEvents,
  type ChangePageEvent,
} from '~core/ui/pagination/models/types'
import {
  YCorePaginationTagName as tagName,
} from '~shared/constants'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

const { disabled, itemsPerPage, total, page } = createCorePaginationProps()

const storyTotal = 50


export type TYCorePaginationMeta = Meta<IYCorePaginationProps & TYCorePaginationEvents>

/**
 * ## Core Pagination
 */
const meta: TYCorePaginationMeta = {
  title: '⚠️ Pagination',
  id: 'pagination',
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
    onChangePage,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<IYCorePaginationProps>()

    const onStoryPageChange = (event: ChangePageEvent) => {
      updateArgs({ ...args, page: event.detail.page })
      onChangePage(event)
    }

    return html`
      <y-core-pagination
        .disabled=${disabled}
        .itemsPerPage=${itemsPerPage}
        .page=${page}
        .total=${total}
        @change-page=${onStoryPageChange}
      >
      </y-core-pagination>
    `
  },
  argTypes: {
    disabled: {
      type: 'boolean',
      description: 'Disable pagination',
      ...getComponentStateTable(disabled),
    },
    itemsPerPage: {
      type: 'number',
      description: 'Items per page',
      ...getComponentStateTable(itemsPerPage),
    },
    page: {
      type: 'number',
      description: 'Current page',
      ...getComponentStateTable(page),
    },
    total: {
      type: 'number',
      description: 'Total number of items',
      ...getComponentStateTable(total),
    },
    onChangePage: {
      type: 'function',
      description: 'Page change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    disabled,
    itemsPerPage,
    page,
    total: storyTotal,
    onChangePage: fn(),
  },
} satisfies TYCorePaginationMeta

export default meta
type Story = StoryObj<IYCorePaginationProps>

export const Playground: Story = { args: {} }
