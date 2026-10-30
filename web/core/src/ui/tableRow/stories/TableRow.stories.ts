import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/tableRow'

import {
  createCoreTableRowProps,
  type IAltCoreTableRowProps,
} from '../models/types'
import {
  AltCoreTableRowTagName as tagName,
} from '~shared/constants'

import { storyControlsTable, getComponentStateTable } from '~shared/.storybook/tables'

import type { TAltCoreSimpleCheckboxEvents } from '~core/ui/simpleCheckbox/models/types/events'

export interface IAltCoreTableRowStorySlots {
  showDefaultSlot?: boolean
}

export type TAltCoreTableRowMeta = IAltCoreTableRowProps & IAltCoreTableRowStorySlots & TAltCoreSimpleCheckboxEvents

const { stripe, selectable, disabled } = createCoreTableRowProps()

/**
 * ## Core TableRow
 */
const meta: Meta<TAltCoreTableRowMeta> = {
  title: 'TableRow',
  id: 'tableRow',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    stripe,
    selectable,
    showDefaultSlot,
  }) => {
    return html`
      <alt-core-table-row
        .stripe=${stripe}
        .selectable=${selectable}
      >
        ${showDefaultSlot && html`
          <div>row</div>
        `}
      </alt-core-table-row>
    `
  },
  argTypes: {
    stripe: {
      type: 'boolean',
      description: 'Show loading',
      ...getComponentStateTable(stripe),
    },
    selectable: {
      type: 'boolean',
      description: 'Show the checkbox',
      ...getComponentStateTable(selectable),
    },
    disabled: {
      type: 'boolean',
      description: 'Disable all row interactions',
      ...getComponentStateTable(disabled),
    },

    // Story Controls
    showDefaultSlot: {
      type: 'boolean',
      description: 'Show the "default" slot',
      ...storyControlsTable,
    },
  },
  args: {
    stripe,
    selectable,
    disabled,
    showDefaultSlot: true,
  },
} satisfies Meta<TAltCoreTableRowMeta>

export default meta
type Story = StoryObj<TAltCoreTableRowMeta>

export const Playground: Story = { args: {} }
