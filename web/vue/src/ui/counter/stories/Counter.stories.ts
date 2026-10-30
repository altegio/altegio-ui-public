import type { Meta, StoryObj } from '@storybook/vue3'
import { AltCounter } from '~vue/ui/counter'
import { type IAltVueCounterProps } from '~vue/ui/counter/models/types'

import AltCoreCounterStoryMeta from '~core/ui/counter/stories/Counter.stories'

type TVueCounterStoryMeta = IAltVueCounterProps

/**
 * Vue wrapper for Core Counter
 */
const meta: Meta<TVueCounterStoryMeta> = {
  title: '✅ Counter',
  id: 'counter',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { AltCounter },
    setup() {
      return { args }
    },
    template: `
      <AltCounter v-bind="args" />
    `,
  }),
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: { ...AltCoreCounterStoryMeta.argTypes },
  args: { ...AltCoreCounterStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
