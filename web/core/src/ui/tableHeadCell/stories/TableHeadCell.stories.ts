import { html } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreTableHeadCellProps,
  type IAltCoreTableHeadCellProps,
  type TAltCoreTableHeadCellEvents,
} from '~core/ui/tableHeadCell/models/types'
import {
  AltCoreTableCellTagName as tagName,
} from '~shared/constants'
import { storyControlsTable, getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import altCoreTableCellStoryMeta, {
  type IAltCoreTableCellStorySlots,
} from '~core/ui/tableCell/stories/TableCell.stories'
import { omit } from 'radash'
import { ESort } from '~shared/types/global'

import '~core/ui/tableHeadCell'

export interface IAltCoreTableHeadCellStorySlots {
  showHintSlot: boolean
}

export type TAltCoreTableHeadCellMeta = IAltCoreTableHeadCellProps & IAltCoreTableHeadCellStorySlots & TAltCoreTableHeadCellEvents & IAltCoreTableCellStorySlots

const storyHeader = {
  id: '1',
  label: 'Column 1',
}
const storyHeaderLabel = 'label'

const { sortDirection } = createCoreTableHeadCellProps()

/**
 * ## Core TableCell
 */
const meta: Meta<TAltCoreTableHeadCellMeta> = {
  title: 'TableHeadCell',
  id: 'tableHeadCell',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    sticky,
    align,
    disabled,
    sortable,
    sortDirection,
    header,
    headerLabel,
    showCellSlot,
    showHintSlot,
    onSort,
  }) => {
    return html`
      <alt-core-table-head-cell
        .sticky=${sticky}
        .align=${align}
        .disabled=${disabled}
        .sortable=${sortable}
        .sortDirection=${sortDirection}
        .header=${header}
        .headerLabel=${headerLabel}
        @sort=${onSort}
      >
        ${showCellSlot
          ? html`
            <div slot="cell">
              CellSlot
            </div>
          `
          : ''
        }
        ${showHintSlot
          ? html`
            <div slot="hint">
              HintSlot
            </div>
          `
          : ''
        }
      </alt-core-table-head-cell>
    `
  },
  argTypes: {
    ...omit(
      altCoreTableCellStoryMeta.argTypes ?? {},
      ['item', 'itemLabel'],
    ),

    sortable: {
      type: 'boolean',
      description: 'Sorting',
      ...getComponentStateTable(false),
    },
    sortDirection: {
      control: { type: 'select' },
      description: 'Sort direction',
      options: Object.values(ESort),
      ...getComponentStateTable(sortDirection),
    },
    header: {
      control: { type: 'object' },
      description: 'Column data',
      ...getComponentStateTable(storyHeader),
    },
    headerLabel: {
      type: 'string',
      description: 'Column data label',
      ...getComponentStateTable(storyHeaderLabel),
    },

    // Story Controls
    showHintSlot: {
      type: 'boolean',
      description: 'Show the "hint" slot',
      ...storyControlsTable,
    },

    // Story Actions
    onSort: {
      type: 'function',
      description: 'Input event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...omit(
      altCoreTableCellStoryMeta.args ?? {},
      ['item', 'itemLabel'],
    ),

    sortable: false,
    header: storyHeader,
    headerLabel: storyHeaderLabel,
    showHintSlot: false,
    onSort: fn(),
  },
} satisfies Meta<TAltCoreTableHeadCellMeta>

export default meta
type Story = StoryObj<IAltCoreTableHeadCellProps>

export const Playground: Story = { args: {} }
