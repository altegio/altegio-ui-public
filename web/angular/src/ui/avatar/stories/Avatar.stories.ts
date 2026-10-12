import type { Meta, StoryObj } from '@storybook/angular'

import { YAvatar } from '~ng/ui/avatar'
import yCoreAvatarStoryMeta from '~core/ui/avatar/stories/Avatar.stories'

/**
 * ## Angular wrapper for YAvatar
 *
 * Displays a user avatar.
 *
 * ### Use cases
 * - Display a user photo
 * - Display initials when no photo is available
 * - Choose a size to suit the context
 *
 * ### Note
 * Use https://i.pravatar.cc for sample avatar images
 * Several image sizes are available, for example:
 * - https://i.pravatar.cc/150
 * - https://i.pravatar.cc/300
 * - https://i.pravatar.cc/500
 */
const meta: Meta<YAvatar> = {
  title: '⚠️ Avatar',
  id: 'avatar',
  parameters: { controls: { sort: 'alpha' } },
  component: YAvatar,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YAvatar
        [photo]="photo"
        [initials]="initials"
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
      />
    `,
  }),
  argTypes: { ...yCoreAvatarStoryMeta.argTypes },
  args: { ...yCoreAvatarStoryMeta.args },
} satisfies Meta<YAvatar>

export default meta
type Story = StoryObj<YAvatar>

export const Playground: Story = { args: {} }
