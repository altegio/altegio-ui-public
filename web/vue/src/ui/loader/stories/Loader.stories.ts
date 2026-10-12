import type { Meta, StoryObj } from '@storybook/vue3'

import yLoaderStoryMeta from '~core/ui/loader/stories/Loader.stories'
import { YLoader } from '~vue/ui/loader'
import { type IYVueLoaderProps } from '~vue/ui/loader/models/types'

type TVueLoaderStoryMeta = IYVueLoaderProps

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
    components: { YLoader },
    setup() {
      return { args }
    },
    template: `
      <YLoader v-bind="args"></YLoader>
    `,
  }),
  argTypes: yLoaderStoryMeta.argTypes,
  args: yLoaderStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
