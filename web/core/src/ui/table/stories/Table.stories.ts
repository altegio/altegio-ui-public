/* eslint-disable lit/prefer-static-styles */

import { html, unsafeCSS } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreTableProps,
  type IAltCoreTableProps,
} from '~core/ui/table/models/types'
import {
  AltCoreTableTagName as tagName,
} from '~shared/constants'

import {
  storyControlsTable,
  getComponentStateTable,
} from '~shared/.storybook/tables'
import TableStoriesCss from './Table.stories.css?inline'

import '~core/ui/table'

export interface IAltCoreTableStorySlots {
  showActionsSlot: boolean
  showHeadSlot: boolean
  showBarSlot: boolean
  showBodySlot: boolean
  showPaginationSlot: boolean
  showPlaceholderSlot: boolean
}

export type TAltCoreTableMeta = Meta<IAltCoreTableProps & IAltCoreTableStorySlots>

const { loading, disabled, hideHead, hideBar } = createCoreTableProps()

/**
 * ## Core Table
 */
const meta: TAltCoreTableMeta = {
  title: 'Table',
  id: 'table',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    loading,
    disabled,
    showActionsSlot,
    showHeadSlot,
    showBarSlot,
    showBodySlot,
    showPaginationSlot,
    showPlaceholderSlot,
    hideHead,
    hideBar,
  }) => {
    return html`
      <style>${unsafeCSS(TableStoriesCss)}</style>

      <alt-core-table
        .loading=${loading}
        .disabled=${disabled}
        .hideHead=${hideHead}
        .hideBar=${hideBar}
      >
        ${showPlaceholderSlot && html`
          <div slot="placeholder" class="alt-core-table-slot">
            PlaceholderSlot
          </div>
        `}

        ${showActionsSlot && html`
          <div slot="actions" class="alt-core-table-slot">
            ActionsSlot
          </div>
        `}

        ${showHeadSlot && html`
          <div slot="head" class="alt-core-table-slot">
            HeadSlot
          </div>
        `}

        ${showBarSlot && html`
          <div slot="bar" class="alt-core-table-slot">
            BarSlot
          </div>
        `}

        ${showBodySlot && html`
          <div slot="body" class="alt-core-table-slot">
            BodySlot
          </div>
        `}

        ${showPaginationSlot && html`
          <div slot="pagination" class="alt-core-table-slot">
            PaginationSlot
          </div>
        `}
      </alt-core-table>
    `
  },
  argTypes: {
    loading: {
      type: 'boolean',
      description: 'Show loading',
      ...getComponentStateTable(loading),
    },
    disabled: {
      type: 'boolean',
      description: 'Disable the table',
      ...getComponentStateTable(disabled),
    },
    hideHead: {
      type: 'boolean',
      description: 'Hide the "head" slot',
      ...getComponentStateTable(hideHead),
    },
    hideBar: {
      type: 'boolean',
      description: 'Hide the "bar" slot',
      ...getComponentStateTable(hideBar),
    },

    // Story Controls
    showActionsSlot: {
      type: 'boolean',
      description: 'Show the "actions" slot',
      ...storyControlsTable,
    },
    showHeadSlot: {
      type: 'boolean',
      description: 'Show the "head" slot',
      ...storyControlsTable,
    },
    showBarSlot: {
      type: 'boolean',
      description: 'Show the "bar" slot',
      ...storyControlsTable,
    },
    showBodySlot: {
      type: 'boolean',
      description: 'Show the "body" slot',
      ...storyControlsTable,
    },
    showPaginationSlot: {
      type: 'boolean',
      description: 'Show the "pagination" slot',
      ...storyControlsTable,
    },
    showPlaceholderSlot: {
      type: 'boolean',
      description: 'Show the "placeholder" slot',
      ...storyControlsTable,
    },
  },
  args: {
    loading,
    disabled,
    hideHead,
    hideBar,
    showActionsSlot: true,
    showHeadSlot: true,
    showBarSlot: true,
    showBodySlot: true,
    showPaginationSlot: true,
    showPlaceholderSlot: true,
  },
} satisfies TAltCoreTableMeta

export default meta
type Story = StoryObj<TAltCoreTableMeta>

export const Playground: Story = { args: {} }
