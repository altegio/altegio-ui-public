import type { Meta, StoryObj } from '@storybook/vue3'

import { AltCardRadio } from '~vue/ui/cardRadio'
import { type IAltVueCardRadioProps } from '~vue/ui/cardRadio/models/types'
import altCoreCardRadioStoryMeta from '~core/ui/cardRadio/stories/CardRadio.stories'

type TVueCardRadioStoryMeta = IAltVueCardRadioProps

/**
 * Vue wrapper for Core CardRadio
 * Helper component used by CardButton and CardSelect
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
    components: { AltCardRadio },
    setup() {
      return { args }
    },
    template: `
      <AltCardRadio
        v-bind="args"
        style="border: 1px dashed;"
      />
    `,
  }),
  argTypes: { ...altCoreCardRadioStoryMeta.argTypes },
  args: { ...altCoreCardRadioStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
