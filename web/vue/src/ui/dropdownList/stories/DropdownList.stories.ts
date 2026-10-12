import type { Meta, StoryObj } from '@storybook/vue3'

import { YDropdownList } from '~vue/ui/dropdownList'
import { type IYVueDropdownListProps } from '~vue/ui/dropdownList/models/types'
import yCoreDropdownListStoryMeta from '~core/ui/dropdownList/stories/DropdownList.stories'
import {
  storyControlsTable,
} from '~shared/.storybook/tables'

type TDropdownListStoryMeta = IYVueDropdownListProps & {
  showItemOuterSlot: boolean
  showItemInnerSlot: boolean
  showItem2OuterSlot: boolean
  showItem2InnerSlot: boolean
}

/**
 * Vue wrapper for DropdownList
 */
const meta: Meta<TDropdownListStoryMeta> = {
  title: '✅ DropdownList',
  id: 'dropdownList',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YDropdownList },
    setup() {
      return { args }
    },
    template: `
      <YDropdownList
        v-bind="args"
        @item-click="args.onItemEmit"
      >
        <template v-if="args.showTopSlot" #top>
          <span>
            Top Slot
          </span>
        </template>

        <template v-if="args.showListSlot" #list="{ items, itemLabel }">
          <div>
            <p>Custom list template</p>

            <ul>
              <li v-for="item in items" :key="item.id">
                New item: {{ item[itemLabel] }}
              </li>
            </ul>
          </div>
        </template>

        <template v-if="args.showItemOuterSlot" #item-outer="{ item, itemLabel }">
          <p>
            Custom template outside the cell for every item:
            {{ item[itemLabel] }}
          </p>
        </template>

        <template v-if="args.showItemInnerSlot" #item-inner="{ item, itemLabel }">
          <p>
            Custom template inside the cell for every item:
            {{ item[itemLabel] }}
          </p>
        </template>

        <template v-if="args.showItem2OuterSlot" #item-outer-2="{ item, itemLabel }">
          <p>
            Custom template outside the cell for the second item:
            {{ item[itemLabel] }}
          </p>
        </template>

        <template v-if="args.showItem2InnerSlot" #item-inner-2="{ item, itemLabel }">
          <p>
            Custom template inside the cell for the second item:
            {{ item[itemLabel] }}
          </p>
        </template>

        <template v-if="args.showBottomSlot" #bottom>
          <span>
            Bottom Slot
          </span>
        </template>
      </YDropdownList>
    `,
  }),
  argTypes: {
    ...yCoreDropdownListStoryMeta.argTypes,

    // Story Controls
    showItemOuterSlot: {
      type: 'boolean',
      description: 'Show the "item-outer" slot',
      ...storyControlsTable,
    },
    showItemInnerSlot: {
      type: 'boolean',
      description: 'Show the "item-inner" slot',
      ...storyControlsTable,
    },
    showItem2OuterSlot: {
      type: 'boolean',
      description: 'Show the "item-2-outer" slot',
      ...storyControlsTable,
    },
    showItem2InnerSlot: {
      type: 'boolean',
      description: 'Show the "item-2-inner" slot',
      ...storyControlsTable,
    },
  },
  args: {
    ...yCoreDropdownListStoryMeta.args,
    showItemOuterSlot: false,
    showItemInnerSlot: false,
    showItem2OuterSlot: false,
    showItem2InnerSlot: false,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
