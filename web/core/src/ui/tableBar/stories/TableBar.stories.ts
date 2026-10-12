import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/tableBar'

import {
  type IYCoreTableBarProps,
} from '~core/ui/tableBar/models/types'
import {
  YCoreTableBarTagName as tagName,
} from '~shared/constants'

/**
 * ## Core TableBar
 */
const meta: Meta<IYCoreTableBarProps> = {
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
      <y-core-table-bar></y-core-table-bar>
    `
  },
  argTypes: {},
  args: {},
} satisfies Meta<IYCoreTableBarProps>

export default meta
type Story = StoryObj<IYCoreTableBarProps>

export const Playground: Story = { args: {} }
