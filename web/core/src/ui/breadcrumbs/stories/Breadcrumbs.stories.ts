import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import { createCoreBreadcrumbsProps, type IAltCoreBreadcrumbsProps } from '~core/ui/breadcrumbs/models/types'
import { AltCoreBreadcrumbsTagName as tagName } from '~shared/constants'
import { getComponentContentTable } from '~shared/.storybook/tables'

import '~core/ui/breadcrumbs'
import '~core/ui/breadcrumbsItem'

const { accessibleName } = createCoreBreadcrumbsProps()

/**
 * ## Core Breadcrumbs
 * The trail of pages that leads to the current one (WAI-ARIA breadcrumb pattern).
 *
 * - `alt-core-breadcrumbs` is a navigation landmark named "Breadcrumb"; `accessibleName` renames it.
 * - Each `alt-core-breadcrumbs-item` is a link with `href`, or plain text without it.
 * - The current page gets `aria-current="page"`: the item marked `current`, or else the last item.
 * - Separators are decorative and mirror in a right-to-left layout.
 * - In a single-page app, listen to `click` on an item, call `preventDefault()` and navigate with the router.
 */
const meta: Meta<IAltCoreBreadcrumbsProps> = {
  title: '✅ Breadcrumbs',
  id: 'breadcrumbs',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-breadcrumbs .accessibleName=${args.accessibleName}>
      <alt-core-breadcrumbs-item href="#settings">Settings</alt-core-breadcrumbs-item>

      <alt-core-breadcrumbs-item href="#settings/staff">Team members</alt-core-breadcrumbs-item>

      <alt-core-breadcrumbs-item href="#settings/staff/42">Anna Smith</alt-core-breadcrumbs-item>
    </alt-core-breadcrumbs>
  `,
  argTypes: {
    accessibleName: {
      control: { type: 'text' },
      description: 'Accessible name of the navigation landmark, "Breadcrumb" by default',
      ...getComponentContentTable(accessibleName),
    },
  },
  args: { accessibleName },
}

export default meta
type Story = StoryObj<IAltCoreBreadcrumbsProps>

export const Playground: Story = {}

export const CurrentWithoutLink: Story = {
  parameters: { docs: { description: { story: 'The current page as plain text, marked explicitly, and a long trail that wraps.' } } },
  render: () => html`
    <div style="max-width: 360px;">
      <alt-core-breadcrumbs>
        <alt-core-breadcrumbs-item href="#">Main</alt-core-breadcrumbs-item>

        <alt-core-breadcrumbs-item href="#analytics">Analytics</alt-core-breadcrumbs-item>

        <alt-core-breadcrumbs-item href="#analytics/reports">Reports</alt-core-breadcrumbs-item>

        <alt-core-breadcrumbs-item current>Revenue by team member</alt-core-breadcrumbs-item>
      </alt-core-breadcrumbs>
    </div>
  `,
}
