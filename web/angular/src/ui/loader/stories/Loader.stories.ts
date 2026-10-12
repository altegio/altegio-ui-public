import type { Meta, StoryObj } from '@storybook/angular'

import yLoaderStoryMeta from '~core/ui/loader/stories/Loader.stories'

import type { IYNgLoaderProps } from '~ng/ui/loader/models/types'
import { YLoader } from '~ng/ui/loader'

const meta: Meta<IYNgLoaderProps> = {
  title: '🔍 Loader',
  id: 'loader',
  parameters: { controls: { sort: 'alpha' } },
  component: YLoader,
  tags: [
    'angular',
    'autodocs',
  ],
  argTypes: yLoaderStoryMeta.argTypes,
  args: yLoaderStoryMeta.args,
} satisfies Meta<IYNgLoaderProps>

export default meta
type Story = StoryObj<YLoader>

export const Playground: Story = { args: {} }
