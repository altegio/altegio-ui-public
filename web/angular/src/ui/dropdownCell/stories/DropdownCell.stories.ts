import type { Meta, StoryObj } from '@storybook/angular'

import { YDropdownCell } from '~ng/ui/dropdownCell'
import yCoreDropdownCellStoryMeta from '~core/ui/dropdownCell/stories/DropdownCell.stories'

/**
 * Angular-обертка над Core DropdownCell
 */
const meta: Meta<YDropdownCell> = {
  title: '✅ DropdownCell',
  id: 'dropdownCell',
  parameters: { controls: { sort: 'alpha' } },
  component: YDropdownCell,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YDropdownCell>
        <div label>
          Label
        </div>
        
        <div prepend>
          Prepend
        </div>

        <div append>
          Append
        </div>
      </YDropdownCell>`,
  }),
  argTypes: { ...yCoreDropdownCellStoryMeta.argTypes },
  args: { ...yCoreDropdownCellStoryMeta.args },
} satisfies Meta<YDropdownCell>

export default meta
type Story = StoryObj<YDropdownCell>

export const Playground: Story = { args: {} }
