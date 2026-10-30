import type { Meta, StoryObj } from '@storybook/vue3'

import { AltDropdownCell } from '~vue/ui/dropdownCell'
import { type IAltVueDropdownCellProps } from '~vue/ui/dropdownCell/models/types'
import altCoreDropdownCellStoryMeta from '~core/ui/dropdownCell/stories/DropdownCell.stories'

type TVueDropdownCellStoryMeta = IAltVueDropdownCellProps

/**
 * Vue wrapper for Core DropdownCell
 */
const meta: Meta<TVueDropdownCellStoryMeta> = {
  title: '✅ DropdownCell',
  id: 'dropdownCell',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltDropdownCell },
    setup() {
      return { args }
    },
    template: `
      <AltDropdownCell v-bind="args">
        <template #prepend>
          Prepend
        </template>

        <template #label>
          Label
        </template>

        <template #append>
          Append
        </template>
      </AltDropdownCell>
    `,
  }),
  argTypes: { ...altCoreDropdownCellStoryMeta.argTypes },
  args: { ...altCoreDropdownCellStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
