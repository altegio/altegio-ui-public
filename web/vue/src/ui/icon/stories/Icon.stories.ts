import type { Meta, StoryObj } from '@storybook/vue3'

import { AltIcon } from '~vue/ui/icon'
import { type IAltVueIconProps } from '~vue/ui/icon/models/types'
import altCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'

type TVueIconStoryMeta = IAltVueIconProps

/**
 * Vue wrapper for Core Icon
 */
const meta: Meta<TVueIconStoryMeta> = {
  title: 'Icons/✅ Icon',
  id: 'icon',
  parameters: { controls: { sort: 'alpha' } },
  component: AltIcon,
  tags: [
    'vue',
    'autodocs',
  ],
  args: { ...altCoreIconStoryMeta.args },
  argTypes: { ...altCoreIconStoryMeta.argTypes },
}

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {}
