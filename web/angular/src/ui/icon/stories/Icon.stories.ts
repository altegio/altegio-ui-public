import type { Meta, StoryObj } from '@storybook/angular'

import { AltIcon } from '~ng/ui/icon'
import altCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'

/**
 * Angular wrapper for Core Icon
 */
const meta: Meta<AltIcon> = {
  title: 'Icons/🔍 Icon',
  id: 'icon',
  parameters: { controls: { sort: 'alpha' } },
  component: AltIcon,
  tags: [
    'angular',
    'autodocs',
  ],
  argTypes: altCoreIconStoryMeta.argTypes,
  args: altCoreIconStoryMeta.args,
}

export default meta
type Story = StoryObj<AltIcon>

export const Default: Story = { args: {} }
