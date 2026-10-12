import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/dropdownList'

import {
  createCoreDropdownListProps,
  type IYCoreDropdownListProps,
  type TYCoreDropdownListEvents,
} from '~core/ui/dropdownList/models/types'
import {
  YCoreDropdownListTagName as tagName,
} from '~shared/constants'
import {
  getComponentStateTable,
  storyControlsTable,
  getComponentEmitsTable,
} from '~shared/.storybook/tables'
import {
  items as itemsArgType,
} from '~shared/.storybook/argTypes'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

export interface IYCoreDropdownListStorySlots {
  showTopSlot: boolean
  showBottomSlot: boolean
  showListSlot: boolean
}

const { itemLabel } = createCoreDropdownListProps()

const ITEMS_COUNT = 20
const items = Array.from(Array(ITEMS_COUNT).keys())
  .map((i) => (
    {
      id: i.toString(),
      label: `Item ${i + 1}`,
    }
  ))
  .concat({
    id: ITEMS_COUNT.toString(),
    label: LOREM_IPSUM,
  })

export type TDropdownListStoryMeta = Meta<IYCoreDropdownListProps & IYCoreDropdownListStorySlots & TYCoreDropdownListEvents>

/**
 * ## Core DropdownList
 */
const meta: TDropdownListStoryMeta = {
  title: '✅ DropdownList',
  id: 'dropdownList',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    items,
    itemLabel,
    showTopSlot,
    showBottomSlot,
    showListSlot,
    onItemClick,
  }) => {
    return html`
      <y-core-dropdown-list
        .items=${items}
        .itemLabel=${itemLabel}
        @item-click=${onItemClick}
      >
        ${showTopSlot && html`
          <span slot="top">
            TopSlot
          </span>
        `}

        ${showListSlot && html`
          <div slot="list">
            ListSlot
          </div>
        `}

        ${showBottomSlot && html`
          <span slot="bottom">
            BottomSlot
          </span>
        `}
      </y-core-dropdown-list>
    `
  },
  argTypes: {
    items: {
      ...itemsArgType,
      ...getComponentStateTable(items),
    },
    itemLabel: {
      type: 'string',
      description: 'Item field used to display text in the cell',
      ...getComponentStateTable(itemLabel),
    },

    onItemClick: {
      type: 'function',
      description: 'Item click event',
      ...getComponentEmitsTable(),
    },

    // Story Controls
    showTopSlot: {
      type: 'boolean',
      description: 'Show the "top" slot',
      ...storyControlsTable,
    },
    showBottomSlot: {
      type: 'boolean',
      description: 'Show the "bottom" slot',
      ...storyControlsTable,
    },
    showListSlot: {
      type: 'boolean',
      description: 'Show the "list" slot',
      ...storyControlsTable,
    },
  },
  args: {
    items,
    itemLabel: 'label',
    showTopSlot: false,
    showBottomSlot: false,
    showListSlot: false,
    onItemClick: fn(),
  },
} satisfies TDropdownListStoryMeta

export default meta
type Story = StoryObj<TDropdownListStoryMeta>

export const Playground: Story = { args: {} }
