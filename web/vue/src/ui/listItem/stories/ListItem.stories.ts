import type { Meta, StoryObj } from '@storybook/vue3'
import { AltList } from '~vue/ui/list'
import { AltListItem } from '~vue/ui/listItem'
import { AltIcon } from '~vue/ui/icon'
import type { IAltVueListItemProps } from '~vue/ui/listItem/models/types'
import altCoreListItemStoryMeta, { type IAltCoreListItemStoryProps } from '~core/ui/listItem/stories/ListItem.stories'
import { altChevronRight, altProfile } from '~shared/icons'

type TVueListItemStoryMeta = IAltVueListItemProps & Pick<IAltCoreListItemStoryProps, 'isStartSlotExists' | 'isEndSlotExists'>

/**
 * Vue wrapper for Core List Item.
 *
 * Listen to the native `@click`; it does not fire while the item is disabled.
 */
const meta: Meta<TVueListItemStoryMeta> = {
  title: '✅ List/ListItem',
  id: 'listItem',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltList, AltListItem, AltIcon },
    setup() {
      return { args, altChevronRight, altProfile }
    },
    template: `
      <AltList style="max-width: 360px;">
        <AltListItem v-bind="args">
          <template v-if="args.isStartSlotExists" #start>
            <AltIcon :icon="altProfile" size="20px" />
          </template>

          <template v-if="args.isEndSlotExists" #end>
            <AltIcon :icon="altChevronRight" size="16px" />
          </template>
        </AltListItem>
      </AltList>
    `,
  }),
  argTypes: altCoreListItemStoryMeta.argTypes,
  args: altCoreListItemStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
