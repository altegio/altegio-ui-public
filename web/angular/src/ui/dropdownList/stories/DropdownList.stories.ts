import type { Meta, StoryObj } from '@storybook/angular'
import { AltDropdownList } from '~ng/ui/dropdownList'
import altCoreDropdownListStoryMeta from '~core/ui/dropdownList/stories/DropdownList.stories'
import { action } from 'storybook/actions'
import {
  type AltNgDropdownListItemClickEvent,
} from '~ng/ui/dropdownList/models/types'

/**
 * Angular wrapper for Core DropdownList
 */
const meta: Meta<AltDropdownList> = {
  title: '✅ DropdownList',
  id: 'dropdownList',
  parameters: { controls: { sort: 'alpha' } },
  component: AltDropdownList,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => {
    const handlers = {
      onItemClick: (e: AltNgDropdownListItemClickEvent) => {
        action('itemClick')(e)
      },
    }

    return {
      props: {
        ...args,
        ...handlers,
      },
      template: `
        <AltDropdownList
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
        </AltDropdownList>`,
    }
  },
  argTypes: { ...altCoreDropdownListStoryMeta.argTypes },
  args: { ...altCoreDropdownListStoryMeta.args },
} satisfies Meta<AltDropdownList>

export default meta
type Story = StoryObj<AltDropdownList>

export const Playground: Story = { args: {} }
