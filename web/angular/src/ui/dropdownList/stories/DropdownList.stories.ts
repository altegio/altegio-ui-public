import type { Meta, StoryObj } from '@storybook/angular'
import { YDropdownList } from '~ng/ui/dropdownList'
import yCoreDropdownListStoryMeta from '~core/ui/dropdownList/stories/DropdownList.stories'
import { action } from '@storybook/addon-actions'
import {
  type YNgDropdownListItemClickEvent,
} from '~ng/ui/dropdownList/models/types'

/**
 * Angular-обертка над Core DropdownList
 */
const meta: Meta<YDropdownList> = {
  title: '✅ DropdownList',
  id: 'dropdownList',
  parameters: { controls: { sort: 'alpha' } },
  component: YDropdownList,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const handlers = {
      onItemClick: (e: YNgDropdownListItemClickEvent) => {
        action('itemClick')(e)
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
      },
      template: `
        <YDropdownList
          [items]="items"
          [itemLabel]="itemLabel"
          [minWidth]="minWidth"
          [noMaxHeight]="noMaxHeight"
          (item-click)="onItemClick($event)"
        >
          @if (showTopSlot) {
            <div dropdown-list-top>
              Top Slot
            </div>
          }

          @if (showListSlot) {
            <div dropdown-list-list>
              List Slot
            </div>
          }

          @if (showBottomSlot) {
            <div dropdown-list-bottom>
              Bottom Slot
            </div>
          }
        </YDropdownList>`,
    }
  },
  argTypes: { ...yCoreDropdownListStoryMeta.argTypes },
  args: { ...yCoreDropdownListStoryMeta.args },
} satisfies Meta<YDropdownList>

export default meta
type Story = StoryObj<YDropdownList>

export const Playground: Story = { args: {} }
