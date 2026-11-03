import type { Meta, StoryObj } from '@storybook/vue3'
import { AltList } from '~vue/ui/list'
import { AltListItem } from '~vue/ui/listItem'
import { AltIcon } from '~vue/ui/icon'
import type { IAltVueListProps } from '~vue/ui/list/models/types'
import altCoreListStoryMeta from '~core/ui/list/stories/List.stories'
import { altCopy, altEdit, altTrash } from '~shared/icons'

/**
 * Vue wrapper for Core List
 */
const meta: Meta<IAltVueListProps> = {
  title: '✅ List',
  id: 'list',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltList, AltListItem, AltIcon },
    setup() {
      return { args, altCopy, altEdit, altTrash }
    },
    template: `
      <AltList v-bind="args" aria-label="Record actions" style="max-width: 240px;">
        <AltListItem label="Edit" clickable>
          <template #start>
            <AltIcon :icon="altEdit" size="16px" />
          </template>
        </AltListItem>

        <AltListItem label="Duplicate" clickable disabled>
          <template #start>
            <AltIcon :icon="altCopy" size="16px" />
          </template>
        </AltListItem>

        <AltListItem clickable>
          Delete
          <template #caption>The record cannot be restored</template>
          
          <template #start>
            <AltIcon :icon="altTrash" size="16px" />
          </template>
        </AltListItem>
      </AltList>
    `,
  }),
  argTypes: altCoreListStoryMeta.argTypes,
  args: altCoreListStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
