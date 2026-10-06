import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreTableCellProps,
  type IYCoreTableCellProps,
  ETableCellAlign,
} from '../models/types'
import {
  YCoreTableCellTagName as tagName,
} from '~shared/constants'
import { storyControlsTable, getComponentStateTable } from '~shared/.storybook/tables'
import yCoreTextStoryMeta from '~core/ui/text/stories/Text.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

import '~core/ui/tableCell'

const { sticky, align, disabled, bordered } = createCoreTableCellProps()

export interface IYCoreTableCellStorySlots {
  showCellSlot: boolean
}

export type TYCoreTableCellMeta = IYCoreTableCellProps & IYCoreTableCellStorySlots

const storyItem = {
  id: '1',
  label: 'Cell 1',
}
const storyItemLabel = 'label'

/**
 * ## Core TableCell
 */
const meta: Meta<TYCoreTableCellMeta> = {
  title: 'TableCell',
  id: 'tableCell',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    sticky,
    align,
    item,
    itemLabel,
    disabled,
    ellipsis,
    lineclamp,
    bordered,
    showCellSlot,
  }) => {
    return html`
      <y-core-table-cell
        .sticky=${sticky}
        .align=${align}
        .item=${item}
        .itemLabel=${itemLabel}
        .disabled=${disabled}
        .ellipsis=${ellipsis}
        .lineclamp=${lineclamp}
        .bordered=${bordered}
      >
        ${showCellSlot || ellipsis
          ? html`
            <div slot="cell">
              ${ellipsis ? LOREM_IPSUM : 'CellSlot'}
            </div>
          `
          : ''
        }
      </y-core-table-cell>
    `
  },
  argTypes: {
    sticky: {
      type: 'boolean',
      description: 'Make the cell sticky',
      ...getComponentStateTable(sticky),
    },
    bordered: {
      type: 'boolean',
      description: 'Show the cell border',
      ...getComponentStateTable(bordered),
    },
    align: {
      control: { type: 'select' },
      options: Object.values(ETableCellAlign),
      description: 'Cell alignment',
      ...getComponentStateTable(align),
    },
    item: {
      control: { type: 'object' },
      description: 'Cell data',
      ...getComponentStateTable(storyItem),
    },
    itemLabel: {
      type: 'string',
      description: 'Cell data label',
      ...getComponentStateTable(storyItemLabel),
    },
    disabled: {
      type: 'boolean',
      description: 'Disable the cell',
      ...getComponentStateTable(disabled),
    },
    ellipsis: yCoreTextStoryMeta.argTypes?.ellipsis,
    lineclamp: yCoreTextStoryMeta.argTypes?.lineclamp,

    // Story Controls
    showCellSlot: {
      type: 'boolean',
      description: 'Show the "cell" slot',
      ...storyControlsTable,
    },
  },
  args: {
    sticky,
    align,
    bordered,
    item: storyItem,
    itemLabel: storyItemLabel,
    disabled,
    ellipsis: yCoreTextStoryMeta.args?.ellipsis,
    lineclamp: yCoreTextStoryMeta.args?.lineclamp,
    showCellSlot: false,
  },
} satisfies Meta<TYCoreTableCellMeta>

export default meta
type Story = StoryObj<TYCoreTableCellMeta>

export const Playground: Story = { args: {} }
