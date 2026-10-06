import type { Meta, StoryObj } from '@storybook/vue3'

import { YIcon } from '~vue/ui/icon'
import { type IYVueIconProps } from '~vue/ui/icon/models/types'
import yCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'

type TVueIconStoryMeta = IYVueIconProps

/**
 * Vue wrapper for Core Icon
 */
const meta: Meta<TVueIconStoryMeta> = {
  title: 'Icons/✅ Icon',
  id: 'icon',
  parameters: { controls: { sort: 'alpha' } },
  component: YIcon,
  tags: [
    'vue',
    'autodocs',
  ],
  args: { ...yCoreIconStoryMeta.args },
  argTypes: { ...yCoreIconStoryMeta.argTypes },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
