import type { Meta, StoryObj } from '@storybook/vue3'

import type { IAltVueTabProps } from '~vue/ui/tab'
import { AltTab } from '~vue/ui/tab'
import { AltIcon } from '~vue/ui/icon'
import { AltTag } from '~vue/ui/tag'
import altCoreTabStoryMeta from '~core/ui/tab/stories/Tab.stories.ts'
import { EAltCoreTagVariant } from '~core/ui/tag/models/types'
import { EAltSizes } from '~shared/types/global.ts'
import { altAi } from '~shared/icons'

/**
 * Vue wrapper for Core Tab
 */
const meta: Meta<IAltVueTabProps> = {
  title: '✅ Tab',
  id: 'tab',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltTab, AltIcon, AltTag },
    setup() {
      return { args, altAi, EAltCoreTagVariant, EAltSizes }
    },
    template: `
      <AltTab v-bind="args">
        <template v-if="args.showBeforeSlot" #before>
          <alt-icon :icon="altAi" size="16px"></alt-icon>
        </template>

        <template v-if="args.showAfterSlot" #after>
          <alt-tag :variant="EAltCoreTagVariant.ACCENT" :size="EAltSizes.SMALL">Slot Tag</alt-tag>
        </template>
      </AltTab>
    `,
  }),
  argTypes: { ...altCoreTabStoryMeta.argTypes },
  args: { ...altCoreTabStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
