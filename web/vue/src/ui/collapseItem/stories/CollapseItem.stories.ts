import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from 'storybook/actions'
import { useArgs } from 'storybook/preview-api'
import type { CollapseItemClickEvent } from '~core/ui/collapseItem/models/types'
import { AltCollapseItem } from '~vue/ui/collapseItem'
import { type IAltVueCollapseItemProps } from '~vue/ui/collapseItem/models/types'
import { AltAvatar } from '~vue/ui/avatar'
import { AltIcon } from '~vue/ui/icon'
import { AltTag } from '~vue/ui/tag'
import altCoreCollapseItemStoryMeta, { type TAltCoreCollapseItemMeta } from '~core/ui/collapseItem/stories/CollapseItem.stories'
import { altCopy, altDragAndDrop, altInfo } from '~shared/icons'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueCollapseItemStoryMeta = IAltVueCollapseItemProps & TAltCoreCollapseItemMeta

/**
 * Vue wrapper for Core CollapseItem
 */
const meta: Meta<TVueCollapseItemStoryMeta> = {
  title: '✅ CollapseItem',
  id: 'collapseItem',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { AltCollapseItem, AltIcon, AltTag, AltAvatar },
      setup() {
        const handleCollapseItemClick = (event: CollapseItemClickEvent) => {
          updateArgs({ opened: !args.opened })

          action('collapse-item-click')(event)
        }
        return { args, handleCollapseItemClick, altCopy, altDragAndDrop, altInfo, content: LOREM_IPSUM + LOREM_IPSUM }
      },
      template: `
        <AltCollapseItem v-bind="args" @collapse-item-click="handleCollapseItemClick">
          <template v-if="args.showAfterSlot" #after>
            <AltIcon :icon="altCopy" size="16px" />
          </template>

          <template v-if="args.showBeforeSlot" #before>
            <AltIcon :icon="altDragAndDrop" size="16px" />
          </template>

          <template v-if="args.showAvatarSlot" #avatar>
            <AltAvatar photo="https://i.pravatar.cc/300" size="small" />
          </template>

          <template v-if="args.showMainSlot" #main>
            MainSlot
          </template>

          <template v-if="args.showLabelSlot" #label>
            <div style="display: flex; align-items: center;gap: 8px;">
              <span>LabelSlot</span>
              
              <AltTag size="small" variant="accent">TagLabel</AltTag>
              
              <AltIcon :icon="altInfo" size="16px" />
            </div>
          </template>

          <template v-if="args.showAnnotationSlot" #annotation>
            AnnotationSlot
          </template>

          <template v-if="args.showContentSlot" #content>
            {{ args.loading ? 'CONTENT IS LOADING' : content }}
          </template>
        </AltCollapseItem>
      `,
    }
  },
  argTypes: { ...altCoreCollapseItemStoryMeta.argTypes },
  args: { ...altCoreCollapseItemStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
