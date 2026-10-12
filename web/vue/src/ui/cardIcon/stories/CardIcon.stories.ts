import type { Meta, StoryObj } from '@storybook/vue3'

import { YCardIcon } from '~vue/ui/cardIcon'
import { type IYVueCardIconProps } from '~vue/ui/cardIcon/models/types'
import yCoreCardIconStoryMeta from '~core/ui/cardIcon/stories/CardIcon.stories'

type TVueCardIconStoryMeta = IYVueCardIconProps

/**
 * Vue wrapper for Core CardIcon
 * вспомогательный компонент для CardButton/CardSelect
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
    components: { YCardIcon },
    setup() {
      return { args }
    },
    template: `
      <YCardIcon
        v-bind="args"
        style="border: 1px dashed;"
      ></YCardIcon>
    `,
  }),
  argTypes: { ...yCoreCardIconStoryMeta.argTypes },
  args: { ...yCoreCardIconStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
