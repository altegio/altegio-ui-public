import type { Meta, StoryObj } from '@storybook/vue3'

import { YButton } from '~vue/index'
import { YTip } from '~vue/ui/tip'
import { type IYVueTipProps } from '~vue/ui/tip/models/types'
import yCoreTipStoryMeta from '~core/ui/tip/stories/Tip.stories'

type TVueTipStoryMeta = IYVueTipProps

/**
 * Vue-обертка над Tip
 */
const meta: Meta<TVueTipStoryMeta> = {
  title: '⚠️ Tip',
  id: 'tip',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YTip, YButton },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
        <YTip v-bind="args">
          <template #activator>
            <YButton label="Нажмите меня" />
          </template>
          
          <template #content>{{ args.tipContent }}</template>
        </YTip>
      </div>
    `,
  }),
  argTypes: { ...yCoreTipStoryMeta.argTypes },
  args: { ...yCoreTipStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
