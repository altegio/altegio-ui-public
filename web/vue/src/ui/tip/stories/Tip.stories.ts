import type { Meta, StoryObj } from '@storybook/vue3'

import { AltButton } from '~vue/index'
import { AltTip } from '~vue/ui/tip'
import { type IAltVueTipProps } from '~vue/ui/tip/models/types'
import altCoreTipStoryMeta from '~core/ui/tip/stories/Tip.stories'

type TVueTipStoryMeta = IAltVueTipProps

/**
 * Vue wrapper for Tip
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
    components: { AltTip, AltButton },
    setup() {
      return { args }
    },
    template: `
      <div style="width: 300px; height: 300px; border: 1px dashed; display: flex; justify-content: center; align-items: center;border-radius: 10px;">
        <AltTip v-bind="args">
          <template #activator>
            <AltButton label="Click me" />
          </template>
          
          <template #content>{{ args.tipContent }}</template>
        </AltTip>
      </div>
    `,
  }),
  argTypes: { ...altCoreTipStoryMeta.argTypes },
  args: { ...altCoreTipStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
