import type { Meta, StoryObj } from '@storybook/angular'

import { AltAvatar } from '~ng/ui/avatar'
import altCoreAvatarStoryMeta from '~core/ui/avatar/stories/Avatar.stories'

/**
 * ## Angular wrapper for AltAvatar
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
const meta: Meta<AltAvatar> = {
  title: '⚠️ Avatar',
  id: 'avatar',
  parameters: { controls: { sort: 'alpha' } },
  component: AltAvatar,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltAvatar
        [photo]="photo"
        [initials]="initials"
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
      />
    `,
  }),
  argTypes: { ...altCoreAvatarStoryMeta.argTypes },
  args: { ...altCoreAvatarStoryMeta.args },
} satisfies Meta<AltAvatar>

export default meta
type Story = StoryObj<AltAvatar>

export const Playground: Story = { args: {} }
