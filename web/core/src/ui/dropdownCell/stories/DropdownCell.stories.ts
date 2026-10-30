import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  type IAltCoreDropdownCellProps,
} from '~core/ui/dropdownCell/models/types'
import {
  AltCoreDropdownCellTagName as tagName,
} from '~shared/constants'

import '~core/ui/dropdownCell'

/**
 * ## Core DropdownCell
 */
const meta: Meta<IAltCoreDropdownCellProps> = {
  title: '✅ DropdownCell',
  id: 'dropdownCell',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: () => {
    return html`
      <alt-core-dropdown-cell>
        <div slot="label">
          DefualtSlot
        </div>
        
        <div slot="prepend">
          PrependSlot
        </div>

        <div slot="append">
          AppendSlot
        </div>
      </alt-core-dropdown-cell>
    `
  },
  argTypes: {},
  args: {},
} satisfies Meta<IAltCoreDropdownCellProps>

export default meta
type Story = StoryObj<IAltCoreDropdownCellProps>

export const Playground: Story = { args: {} }
