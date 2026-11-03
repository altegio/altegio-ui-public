import type { Meta, StoryObj } from '@storybook/angular'

import altLoaderStoryMeta from '~core/ui/loader/stories/Loader.stories'

import type { IAltNgLoaderProps } from '~ng/ui/loader/models/types'
import { AltLoader } from '~ng/ui/loader'

const meta: Meta<IAltNgLoaderProps> = {
  title: '🔍 Loader',
  id: 'loader',
  parameters: { controls: { sort: 'alpha' } },
  component: AltLoader,
  tags: [
    'angular',
    'autodocs',
  ],
  argTypes: altLoaderStoryMeta.argTypes,
  args: altLoaderStoryMeta.args,
} satisfies Meta<IAltNgLoaderProps>

export default meta
type Story = StoryObj<AltLoader>

export const Playground: Story = { args: {} }
