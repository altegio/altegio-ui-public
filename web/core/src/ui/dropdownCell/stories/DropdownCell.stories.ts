import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  type IYCoreDropdownCellProps,
} from '~core/ui/dropdownCell/models/types'
import {
  YCoreDropdownCellTagName as tagName,
} from '~shared/constants'

import '~core/ui/dropdownCell'

/**
 * ## Core DropdownCell
 */
const meta: Meta<IYCoreDropdownCellProps> = {
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
      <y-core-dropdown-cell>
        <div slot="label">
          DefualtSlot
        </div>
        
        <div slot="prepend">
          PrependSlot
        </div>

        <div slot="append">
          AppendSlot
        </div>
      </y-core-dropdown-cell>
    `
  },
  argTypes: {},
  args: {},
} satisfies Meta<IYCoreDropdownCellProps>

export default meta
type Story = StoryObj<IYCoreDropdownCellProps>

export const Playground: Story = { args: {} }
