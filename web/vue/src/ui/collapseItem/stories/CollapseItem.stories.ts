import type { Meta, StoryObj } from '@storybook/vue3'
import { action } from '@storybook/addon-actions'
import { useArgs } from '@storybook/preview-api'
import type { CollapseItemClickEvent } from '~core/ui/collapseItem/models/types'
import { YCollapseItem } from '~vue/ui/collapseItem'
import { type IYVueCollapseItemProps } from '~vue/ui/collapseItem/models/types'
import { YAvatar } from '~vue/ui/avatar'
import { YIcon } from '~vue/ui/icon'
import { YTag } from '~vue/ui/tag'
import yCoreCollapseItemStoryMeta, { type TYCoreCollapseItemMeta } from '~core/ui/collapseItem/stories/CollapseItem.stories'
import { yCopy, yDragAndDrop, yInfo } from '~shared/icons'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueCollapseItemStoryMeta = IYVueCollapseItemProps & TYCoreCollapseItemMeta

/**
 * Vue-обертка над Core CollapseItem
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
      components: { YCollapseItem, YIcon, YTag, YAvatar },
      setup() {
        const handleCollapseItemClick = (event: CollapseItemClickEvent) => {
          updateArgs({ opened: !args.opened })

          action('collapse-item-click')(event)
        }
        return { args, handleCollapseItemClick, yCopy, yDragAndDrop, yInfo, content: LOREM_IPSUM + LOREM_IPSUM }
      },
      template: `
        <YCollapseItem v-bind="args" @collapse-item-click="handleCollapseItemClick">
          <template v-if="args.showAfterSlot" #after>
            <YIcon :icon="yCopy" size="16px" />
          </template>

          <template v-if="args.showBeforeSlot" #before>
            <YIcon :icon="yDragAndDrop" size="16px" />
          </template>

          <template v-if="args.showAvatarSlot" #avatar>
            <YAvatar photo="https://i.pravatar.cc/300" size="small" />
          </template>

          <template v-if="args.showMainSlot" #main>
            MainSlot
          </template>

          <template v-if="args.showLabelSlot" #label>
            <div style="display: flex; align-items: center;gap: 8px;">
              <span>LabelSlot</span>
              
              <YTag size="small" variant="accent">TagLabel</YTag>
              
              <YIcon :icon="yInfo" size="16px" />
            </div>
          </template>

          <template v-if="args.showAnnotationSlot" #annotation>
            AnnotationSlot
          </template>

          <template v-if="args.showContentSlot" #content>
            {{ args.loading ? 'CONTENT IS LOADING' : content }}
          </template>
        </YCollapseItem>
      `,
    }
  },
  argTypes: { ...yCoreCollapseItemStoryMeta.argTypes },
  args: { ...yCoreCollapseItemStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
