import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/tableBar'

import {
  type IAltCoreTableBarProps,
} from '~core/ui/tableBar/models/types'
import {
  AltCoreTableBarTagName as tagName,
} from '~shared/constants'

/**
 * ## Core TableBar
 */
const meta: Meta<IAltCoreTableBarProps> = {
  title: 'TableBar',
  id: 'tableBar',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: () => {
    return html`
      <alt-core-table-bar></alt-core-table-bar>
    `
  },
  argTypes: {},
  args: {},
} satisfies Meta<IAltCoreTableBarProps>

export default meta
type Story = StoryObj<IAltCoreTableBarProps>

export const Playground: Story = { args: {} }
