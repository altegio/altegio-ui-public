import type { Meta, StoryObj } from '@storybook/vue3'

import type { IYVueTabProps } from '~vue/ui/tab'
import { YTab } from '~vue/ui/tab'
import { YIcon } from '~vue/ui/icon'
import { YTag } from '~vue/ui/tag'
import yCoreTabStoryMeta from '~core/ui/tab/stories/Tab.stories.ts'
import { EYCoreTagVariant } from '~core/ui/tag/models/types'
import { EYSizes } from '~shared/types/global.ts'
import { yAi } from '~shared/icons'

/**
 * Vue-обертка над Core Tab
 */
const meta: Meta<IYVueTabProps> = {
  title: '✅ Tab',
  id: 'tab',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YTab, YIcon, YTag },
    setup() {
      return { args, yAi, EYCoreTagVariant, EYSizes }
    },
    template: `
      <YTab v-bind="args">
        <template v-if="args.showBeforeSlot" #before>
          <y-icon :icon="yAi" size="16px"></y-icon>
        </template>

        <template v-if="args.showAfterSlot" #after>
          <y-tag :variant="EYCoreTagVariant.ACCENT" :size="EYSizes.SMALL">Slot Tag</y-tag>
        </template>
      </YTab>
    `,
  }),
  argTypes: { ...yCoreTabStoryMeta.argTypes },
  args: { ...yCoreTabStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
