import type { Meta, StoryObj } from '@storybook/vue3'

import { YDropdownCell } from '~vue/ui/dropdownCell'
import { type IYVueDropdownCellProps } from '~vue/ui/dropdownCell/models/types'
import yCoreDropdownCellStoryMeta from '~core/ui/dropdownCell/stories/DropdownCell.stories'

type TVueDropdownCellStoryMeta = IYVueDropdownCellProps

/**
 * Vue-обертка над Core DropdownCell
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
    components: { YDropdownCell },
    setup() {
      return { args }
    },
    template: `
      <YDropdownCell v-bind="args">
        <template #prepend>
          Prepend
        </template>

        <template #label>
          Label
        </template>

        <template #append>
          Append
        </template>
      </YDropdownCell>
    `,
  }),
  argTypes: { ...yCoreDropdownCellStoryMeta.argTypes },
  args: { ...yCoreDropdownCellStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
