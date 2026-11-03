import type { Meta, StoryObj } from '@storybook/vue3'

import { AltFieldAvatar } from '~vue/ui/fieldAvatar'
import { type IAltVueFieldAvatarProps } from '~vue/ui/fieldAvatar/models/types'
import altCoreFieldAvatarStoryMeta from '~core/ui/fieldAvatar/stories/FieldAvatar.stories'

type TVueFieldAvatarStoryMeta = IAltVueFieldAvatarProps

/**
 * Vue wrapper for Core FieldAvatar
 */
const meta: Meta<TVueFieldAvatarStoryMeta> = {
  title: 'Inputs/Partials/⚠️ FieldAvatar',
  id: 'fieldAvatar',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltFieldAvatar },
    setup() {
      return { args }
    },
    template: `
      <AltFieldAvatar v-bind="args" style="border: 1px dashed;width: min-content;"></AltFieldAvatar>
    `,
  }),
  argTypes: { ...altCoreFieldAvatarStoryMeta.argTypes },
  args: { ...altCoreFieldAvatarStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
