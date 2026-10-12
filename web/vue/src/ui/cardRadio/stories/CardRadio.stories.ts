import type { Meta, StoryObj } from '@storybook/vue3'

import { YCardRadio } from '~vue/ui/cardRadio'
import { type IYVueCardRadioProps } from '~vue/ui/cardRadio/models/types'
import yCoreCardRadioStoryMeta from '~core/ui/cardRadio/stories/CardRadio.stories'

type TVueCardRadioStoryMeta = IYVueCardRadioProps

/**
 * Vue wrapper for Core CardRadio
 * вспомогательный компонент для CardButton/CardSelect
 */
const meta: Meta<TVueCardRadioStoryMeta> = {
  title: 'Cards/Partials/✅ CardRadio',
  id: 'cardRadio',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YCardRadio },
    setup() {
      return { args }
    },
    template: `
      <YCardRadio
        v-bind="args"
        style="border: 1px dashed;"
      />
    `,
  }),
  argTypes: { ...yCoreCardRadioStoryMeta.argTypes },
  args: { ...yCoreCardRadioStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
