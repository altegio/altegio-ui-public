import type { Meta, StoryObj } from '@storybook/angular'

import { YIcon } from '~ng/ui/icon'
import yCoreIconStoryMeta from '~core/ui/icon/stories/Icon.stories'

/**
 * Angular-обертка над Core Icon
 */
const meta: Meta<YIcon> = {
  title: 'Icons/🔍 Icon',
  id: 'icon',
  parameters: { controls: { sort: 'alpha' } },
  component: YIcon,
  tags: [
    'angular',
    'autodocs',
  ],
  argTypes: yCoreIconStoryMeta.argTypes,
  args: yCoreIconStoryMeta.args,
}

export default meta
type Story = StoryObj<YIcon>

export const Default: Story = { args: {} }
