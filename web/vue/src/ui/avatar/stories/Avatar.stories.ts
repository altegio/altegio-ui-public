import type { Meta, StoryObj } from '@storybook/vue3'

import { AltAvatar } from '~vue/ui/avatar'
import { type IAltVueAvatarProps } from '~vue/ui/avatar/models/types'
import altCoreAvatarStoryMeta from '~core/ui/avatar/stories/Avatar.stories'

type TVueAvatarStoryMeta = IAltVueAvatarProps

/**
 * ## Vue wrapper for Core Avatar
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
const meta: Meta<TVueAvatarStoryMeta> = {
  title: '⚠️ Avatar',
  id: 'avatar',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltAvatar },
    setup() {
      return { args }
    },
    template: `
      <AltAvatar v-bind="args" />
    `,
  }),
  argTypes: { ...altCoreAvatarStoryMeta.argTypes },
  args: { ...altCoreAvatarStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
