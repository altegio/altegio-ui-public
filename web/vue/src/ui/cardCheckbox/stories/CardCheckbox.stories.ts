import type { Meta, StoryObj } from '@storybook/vue3'

import { YCardCheckbox } from '~vue/ui/cardCheckbox'
import { type IYVueCardCheckboxProps } from '~vue/ui/cardCheckbox/models/types'
import yCoreCardCheckboxStoryMeta from '~core/ui/cardCheckbox/stories/CardCheckbox.stories'

type TVueCardCheckboxStoryMeta = IYVueCardCheckboxProps

/**
 * Vue-обертка над Core CardCheckbox
 * вспомогательный компонент для CardButton/CardSelect
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
    components: { YCardCheckbox },
    setup() {
      return { args }
    },
    template: `
      <YCardCheckbox
        v-bind="args"
        style="border: 1px dashed;"
      />
    `,
  }),
  argTypes: { ...yCoreCardCheckboxStoryMeta.argTypes },
  args: { ...yCoreCardCheckboxStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
