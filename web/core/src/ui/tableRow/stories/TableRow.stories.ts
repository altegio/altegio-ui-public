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
      description: 'Показать загрузку',
      ...getComponentStateTable(stripe),
    },
    selectable: {
      type: 'boolean',
      description: 'Показ чекбокса',
      ...getComponentStateTable(selectable),
    },
    disabled: {
      type: 'boolean',
      description: 'Отключить все действия со строкой',
      ...getComponentStateTable(disabled),
    },

    // Story Controls
    showDefaultSlot: {
      type: 'boolean',
      description: 'Показать слот "default"',
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
