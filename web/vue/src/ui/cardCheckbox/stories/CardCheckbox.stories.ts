import type { Meta, StoryObj } from '@storybook/vue3'

import { AltCardCheckbox } from '~vue/ui/cardCheckbox'
import { type IAltVueCardCheckboxProps } from '~vue/ui/cardCheckbox/models/types'
import altCoreCardCheckboxStoryMeta from '~core/ui/cardCheckbox/stories/CardCheckbox.stories'

type TVueCardCheckboxStoryMeta = IAltVueCardCheckboxProps

/**
 * Vue wrapper for Core CardCheckbox
 * Helper component used by CardButton and CardSelect
 */
const meta: Meta<TVueCardCheckboxStoryMeta> = {
  title: 'Cards/Partials/✅ CardCheckbox',
  id: 'cardCheckbox',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltCardCheckbox },
    setup() {
      return { args }
    },
    template: `
      <AltCardCheckbox
        v-bind="args"
        style="border: 1px dashed;"
      />
    `,
  }),
  argTypes: { ...altCoreCardCheckboxStoryMeta.argTypes },
  args: { ...altCoreCardCheckboxStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
