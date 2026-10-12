import type { Meta, StoryObj } from '@storybook/vue3'

import { YFieldAvatar } from '~vue/ui/fieldAvatar'
import { type IYVueFieldAvatarProps } from '~vue/ui/fieldAvatar/models/types'
import yCoreFieldAvatarStoryMeta from '~core/ui/fieldAvatar/stories/FieldAvatar.stories'

type TVueFieldAvatarStoryMeta = IYVueFieldAvatarProps

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
    components: { YFieldAvatar },
    setup() {
      return { args }
    },
    template: `
      <YFieldAvatar v-bind="args" style="border: 1px dashed;width: min-content;"></YFieldAvatar>
    `,
  }),
  argTypes: { ...yCoreFieldAvatarStoryMeta.argTypes },
  args: { ...yCoreFieldAvatarStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
