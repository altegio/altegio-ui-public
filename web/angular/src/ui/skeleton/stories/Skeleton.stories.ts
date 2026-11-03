import type { Meta, StoryObj } from '@storybook/angular'
import { AltSkeleton } from '~ng/ui/skeleton'
import altCoreSkeletonStoryMeta from '~core/ui/skeleton/stories/Skeleton.stories'

/**
 * Angular wrapper for Core Skeleton.
 *
 * `<AltSkeleton>` is a block: a class on it sets the width, while `size` or `height` sets the height.
 */
const meta: Meta<AltSkeleton> = {
  title: '✅ Skeleton',
  id: 'skeleton',
  parameters: { controls: { sort: 'alpha' } },
  component: AltSkeleton,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltSkeleton
        [size]="size"
        [shape]="shape"
        [width]="width"
        [height]="height"
      ></AltSkeleton>
    `,
  }),
  argTypes: altCoreSkeletonStoryMeta.argTypes,
  args: altCoreSkeletonStoryMeta.args,
}

export default meta
type Story = StoryObj<AltSkeleton>

export const Playground: Story = { args: {} }
