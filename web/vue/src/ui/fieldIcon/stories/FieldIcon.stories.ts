import type { Meta, StoryObj } from '@storybook/vue3'

import { YFieldIcon } from '~vue/ui/fieldIcon'
import { type IYVueFieldIconProps } from '~vue/ui/fieldIcon/models/types'
import yCoreFieldIconStoryMeta from '~core/ui/fieldIcon/stories/FieldIcon.stories'

type TVueFieldIconStoryMeta = IYVueFieldIconProps

/**
 * Vue-обертка над Core FieldIcon
 */
const meta: Meta<TVueFieldIconStoryMeta> = {
  title: 'Inputs/Partials/⚠️ FieldIcon',
  id: 'fieldIcon',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YFieldIcon },
    setup() {
      return { args }
    },
    template: `
      <YFieldIcon v-bind="args" style="border: 1px dashed;width: min-content;"></YFieldIcon>
    `,
  }),
  argTypes: { ...yCoreFieldIconStoryMeta.argTypes },
  args: { ...yCoreFieldIconStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
