import { html } from 'lit'
import { fn } from 'storybook/test'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/pagination'

import {
  createCorePaginationProps,
  type IAltCorePaginationProps,
  type TAltCorePaginationEvents,
  type ChangePageEvent,
} from '~core/ui/pagination/models/types'
import {
  AltCorePaginationTagName as tagName,
} from '~shared/constants'
import { getComponentStateTable, getComponentEmitsTable } from '~shared/.storybook/tables'

const { disabled, itemsPerPage, total, page } = createCorePaginationProps()

const storyTotal = 50


export type TAltCorePaginationMeta = Meta<IAltCorePaginationProps & TAltCorePaginationEvents>

/**
 * ## Core Pagination
 */
const meta: TAltCorePaginationMeta = {
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
    ] = useArgs<IAltCorePaginationProps>()

    const onStoryPageChange = (event: ChangePageEvent) => {
      updateArgs({ ...args, page: event.detail.page })
      onChangePage(event)
    }

    return html`
      <alt-core-pagination
        .disabled=${disabled}
        .itemsPerPage=${itemsPerPage}
        .page=${page}
        .total=${total}
        @change-page=${onStoryPageChange}
      >
      </alt-core-pagination>
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
} satisfies TAltCorePaginationMeta

export default meta
type Story = StoryObj<IAltCorePaginationProps>

export const Playground: Story = { args: {} }
