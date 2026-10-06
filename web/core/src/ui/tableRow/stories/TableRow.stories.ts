import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/tableRow'

import {
  createCoreTableRowProps,
  type IYCoreTableRowProps,
} from '../models/types'
import {
  YCoreTableRowTagName as tagName,
} from '~shared/constants'

import { storyControlsTable, getComponentStateTable } from '~shared/.storybook/tables'

import type { TYCoreSimpleCheckboxEvents } from '~core/ui/simpleCheckbox/models/types/events'

export interface IYCoreTableRowStorySlots {
  showDefaultSlot?: boolean
}

export type TYCoreTableRowMeta = IYCoreTableRowProps & IYCoreTableRowStorySlots & TYCoreSimpleCheckboxEvents

const { stripe, selectable, disabled } = createCoreTableRowProps()

/**
 * ## Core TableRow
 */
const meta: Meta<TYCoreTableRowMeta> = {
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
      <y-core-table-row
        .stripe=${stripe}
        .selectable=${selectable}
      >
        ${showDefaultSlot && html`
          <div>row</div>
        `}
      </y-core-table-row>
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
} satisfies Meta<TYCoreTableRowMeta>

export default meta
type Story = StoryObj<TYCoreTableRowMeta>

export const Playground: Story = { args: {} }
