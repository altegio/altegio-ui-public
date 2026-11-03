import type { Meta, StoryObj } from '@storybook/vue3'
import { AltSkeleton } from '~vue/ui/skeleton'
import type { IAltVueSkeletonProps } from '~vue/ui/skeleton/models/types'
import altCoreSkeletonStoryMeta from '~core/ui/skeleton/stories/Skeleton.stories'

/**
 * Vue wrapper for Core Skeleton
 */
const meta: Meta<IAltVueSkeletonProps> = {
  title: '✅ Skeleton',
  id: 'skeleton',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltSkeleton },
    setup() {
      return { args }
    },
    template: '<AltSkeleton v-bind="args" />',
  }),
  argTypes: altCoreSkeletonStoryMeta.argTypes,
  args: altCoreSkeletonStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
