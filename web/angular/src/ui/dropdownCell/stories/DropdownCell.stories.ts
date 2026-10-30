import type { Meta, StoryObj } from '@storybook/angular'

import { AltDropdownCell } from '~ng/ui/dropdownCell'
import altCoreDropdownCellStoryMeta from '~core/ui/dropdownCell/stories/DropdownCell.stories'

/**
 * Angular wrapper for Core DropdownCell
 */
const meta: Meta<AltDropdownCell> = {
  title: '✅ DropdownCell',
  id: 'dropdownCell',
  parameters: { controls: { sort: 'alpha' } },
  component: AltDropdownCell,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltDropdownCell>
        <div label>
          Label
        </div>
        
        <div prepend>
          Prepend
        </div>

        <div append>
          Append
        </div>
      </AltDropdownCell>`,
  }),
  argTypes: { ...altCoreDropdownCellStoryMeta.argTypes },
  args: { ...altCoreDropdownCellStoryMeta.args },
} satisfies Meta<AltDropdownCell>

export default meta
type Story = StoryObj<AltDropdownCell>

export const Playground: Story = { args: {} }
