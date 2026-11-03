import type { Meta, StoryObj } from '@storybook/vue3'

import { AltFieldIcon } from '~vue/ui/fieldIcon'
import { type IAltVueFieldIconProps } from '~vue/ui/fieldIcon/models/types'
import altCoreFieldIconStoryMeta from '~core/ui/fieldIcon/stories/FieldIcon.stories'

type TVueFieldIconStoryMeta = IAltVueFieldIconProps

/**
 * Vue wrapper for Core FieldIcon
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
    components: { AltFieldIcon },
    setup() {
      return { args }
    },
    template: `
      <AltFieldIcon v-bind="args" style="border: 1px dashed;width: min-content;"></AltFieldIcon>
    `,
  }),
  argTypes: { ...altCoreFieldIconStoryMeta.argTypes },
  args: { ...altCoreFieldIconStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
