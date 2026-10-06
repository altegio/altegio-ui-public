import type { Meta, StoryObj } from '@storybook/vue3'
import { YCounter } from '~vue/ui/counter'
import { type IYVueCounterProps } from '~vue/ui/counter/models/types'

import YCoreCounterStoryMeta from '~core/ui/counter/stories/Counter.stories'

type TVueCounterStoryMeta = IYVueCounterProps

/**
 * Vue-обертка над Core Counter
 */
const meta: Meta<TVueCounterStoryMeta> = {
  title: '✅ Counter',
  id: 'counter',
  parameters: { controls: { sort: 'alpha' } },
  render: (args) => ({
    components: { YCounter },
    setup() {
      return { args }
    },
    template: `
      <YCounter v-bind="args" />
    `,
  }),
  tags: [
    'vue',
    'autodocs',
  ],
  argTypes: { ...YCoreCounterStoryMeta.argTypes },
  args: { ...YCoreCounterStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
