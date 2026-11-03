import type { Meta, StoryObj } from '@storybook/vue3'
import { AltLinearProgress } from '~vue/ui/linearProgress'
import type { IAltVueLinearProgressProps } from '~vue/ui/linearProgress/models/types'
import altCoreLinearProgressStoryMeta from '~core/ui/linearProgress/stories/LinearProgress.stories'

/**
 * Vue wrapper for Core LinearProgress
 */
const meta: Meta<IAltVueLinearProgressProps> = {
  title: '✅ LinearProgress',
  id: 'linearprogress',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltLinearProgress },
    setup() {
      return { args }
    },
    template: '<AltLinearProgress v-bind="args" style="max-width: 360px;" />',
  }),
  argTypes: altCoreLinearProgressStoryMeta.argTypes,
  args: altCoreLinearProgressStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
