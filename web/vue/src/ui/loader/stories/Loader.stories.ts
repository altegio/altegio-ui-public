import type { Meta, StoryObj } from '@storybook/vue3'

import altLoaderStoryMeta from '~core/ui/loader/stories/Loader.stories'
import { AltLoader } from '~vue/ui/loader'
import { type IAltVueLoaderProps } from '~vue/ui/loader/models/types'

type TVueLoaderStoryMeta = IAltVueLoaderProps

/**
 * Vue wrapper for Core Loader
 */
const meta: Meta<TVueLoaderStoryMeta> = {
  title: '⚠️ Loader',
  id: 'loader',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltLoader },
    setup() {
      return { args }
    },
    template: `
      <AltLoader v-bind="args"></AltLoader>
    `,
  }),
  argTypes: altLoaderStoryMeta.argTypes,
  args: altLoaderStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
