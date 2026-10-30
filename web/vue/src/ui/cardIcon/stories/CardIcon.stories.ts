import type { Meta, StoryObj } from '@storybook/vue3'

import { AltCardIcon } from '~vue/ui/cardIcon'
import { type IAltVueCardIconProps } from '~vue/ui/cardIcon/models/types'
import altCoreCardIconStoryMeta from '~core/ui/cardIcon/stories/CardIcon.stories'

type TVueCardIconStoryMeta = IAltVueCardIconProps

/**
 * Vue wrapper for Core CardIcon
 * Helper component used by CardButton and CardSelect
 */
const meta: Meta<TVueCardIconStoryMeta> = {
  title: 'Cards/Partials/✅ CardIcon',
  id: 'cardIcon',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltCardIcon },
    setup() {
      return { args }
    },
    template: `
      <AltCardIcon
        v-bind="args"
        style="border: 1px dashed;"
      ></AltCardIcon>
    `,
  }),
  argTypes: { ...altCoreCardIconStoryMeta.argTypes },
  args: { ...altCoreCardIconStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
