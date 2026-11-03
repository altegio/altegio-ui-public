import type { Meta, StoryObj } from '@storybook/vue3'
import { AltStatus } from '~vue/ui/status'
import type { IAltVueStatusProps } from '~vue/ui/status/models/types'
import altCoreStatusStoryMeta from '~core/ui/status/stories/Status.stories'

/**
 * Vue wrapper for Core Status. The default slot takes extra content under the text.
 */
const meta: Meta<IAltVueStatusProps> = {
  title: '✅ Status',
  id: 'status',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltStatus },
    setup() {
      return { args }
    },
    template: '<AltStatus v-bind="args" style="max-width: 566px;" />',
  }),
  argTypes: altCoreStatusStoryMeta.argTypes,
  args: altCoreStatusStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
