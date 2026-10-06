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
 * Vue-обертка над DropdownList
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
            <p>Свой шаблон для списка</p>

            <ul>
              <li v-for="item in items" :key="item.id">
                Новый элемент: {{ item[itemLabel] }}
              </li>
            </ul>
          </div>
        </template>

        <template v-if="args.showItemOuterSlot" #item-outer="{ item, itemLabel }">
          <p>
            Свой шаблон для всех элементов без ячейки списка:
            {{ item[itemLabel] }}
          </p>
        </template>

        <template v-if="args.showItemInnerSlot" #item-inner="{ item, itemLabel }">
          <p>
            Свой шаблон для всех элементов внутри ячейки списка:
            {{ item[itemLabel] }}
          </p>
        </template>

        <template v-if="args.showItem2OuterSlot" #item-outer-2="{ item, itemLabel }">
          <p>
            Свой шаблон для второго элемента без ячейки списка:
            {{ item[itemLabel] }}
          </p>
        </template>

        <template v-if="args.showItem2InnerSlot" #item-inner-2="{ item, itemLabel }">
          <p>
            Свой шаблон для второго элемента внутри ячейки списка:
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
      description: 'Показать слот "item-outer"',
      ...storyControlsTable,
    },
    showItemInnerSlot: {
      type: 'boolean',
      description: 'Показать слот "item-inner"',
      ...storyControlsTable,
    },
    showItem2OuterSlot: {
      type: 'boolean',
      description: 'Показать слот "item-2-outer"',
      ...storyControlsTable,
    },
    showItem2InnerSlot: {
      type: 'boolean',
      description: 'Показать слот "item-2-inner"',
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
