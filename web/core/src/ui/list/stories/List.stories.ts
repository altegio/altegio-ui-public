import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'

import { createCoreListProps, type IAltCoreListProps } from '~core/ui/list/models/types'
import { AltCoreListTagName as tagName } from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'
import { altCopy, altEdit, altPrint, altTrash } from '~shared/icons'

import '~core/ui/list'
import '~core/ui/listItem'
import '~core/ui/icon'
import '~core/ui/avatar'
import '~core/ui/tag'

const { separator } = createCoreListProps()

/**
 * ## Core List
 * A vertical list of `alt-core-list-item` rows: static content, actions or navigation links.
 *
 * - The list has `role="list"` and each item `role="listitem"`; give the list an `aria-label` when nothing else names it.
 * - Interactive rows are native buttons or links, so <kbd>Tab</kbd> moves between them and <kbd>Enter</kbd>/<kbd>Space</kbd> activate them.
 */
const meta: Meta<IAltCoreListProps> = {
  title: '✅ List',
  id: 'list',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-list .separator=${args.separator} aria-label="Staff" style="max-width: 360px;">
      <alt-core-list-item label="Anna Smith" caption="Senior stylist" clickable @click=${action('click')}>
        <alt-core-avatar slot="start" initials="AS" size="small"></alt-core-avatar>

        <alt-core-tag slot="end" variant="success" size="small">On shift</alt-core-tag>
      </alt-core-list-item>

      <alt-core-list-item label="Mark Brown" caption="Barber" clickable active @click=${action('click')}>
        <alt-core-avatar slot="start" initials="MB" size="small"></alt-core-avatar>
      </alt-core-list-item>

      <alt-core-list-item label="Lena Gray" caption="On vacation" clickable disabled @click=${action('click')}>
        <alt-core-avatar slot="start" initials="LG" size="small"></alt-core-avatar>
      </alt-core-list-item>
    </alt-core-list>
  `,
  argTypes: {
    separator: {
      control: { type: 'boolean' },
      description: 'Draws a line between the items',
      ...getComponentStateTable(separator),
    },
  },
  args: { separator },
}

export default meta
type Story = StoryObj<IAltCoreListProps>

export const Playground: Story = {}

export const ActionMenu: Story = {
  parameters: { docs: { description: { story: 'Clickable rows with icons, for example inside a dropdown.' } } },
  render: () => html`
    <alt-core-list aria-label="Record actions" style="max-width: 240px;">
      <alt-core-list-item label="Edit" clickable @click=${action('edit')}>
        <alt-core-icon slot="start" .icon=${altEdit} size="16px"></alt-core-icon>
      </alt-core-list-item>

      <alt-core-list-item label="Duplicate" clickable @click=${action('duplicate')}>
        <alt-core-icon slot="start" .icon=${altCopy} size="16px"></alt-core-icon>
      </alt-core-list-item>

      <alt-core-list-item label="Print" clickable disabled @click=${action('print')}>
        <alt-core-icon slot="start" .icon=${altPrint} size="16px"></alt-core-icon>
      </alt-core-list-item>

      <alt-core-list-item label="Delete" clickable @click=${action('delete')}>
        <alt-core-icon slot="start" .icon=${altTrash} size="16px"></alt-core-icon>
      </alt-core-list-item>
    </alt-core-list>
  `,
}

export const Navigation: Story = {
  parameters: { docs: { description: { story: 'Link rows; the current page is `active`.' } } },
  render: () => html`
    <nav aria-label="Settings">
      <alt-core-list style="max-width: 240px;">
        <alt-core-list-item label="General" href="#general" active></alt-core-list-item>

        <alt-core-list-item label="Online booking" href="#booking"></alt-core-list-item>

        <alt-core-list-item label="Notifications" href="#notifications"></alt-core-list-item>
      </alt-core-list>
    </nav>
  `,
}

export const StaticContent: Story = {
  parameters: { docs: { description: { story: 'Non-interactive rows with a separator and top-aligned sections.' } } },
  render: () => html`
    <alt-core-list separator aria-label="Visit details" style="max-width: 360px;">
      <alt-core-list-item caption="Service" align="start">
        Haircut and styling, long hair
        <span slot="end">$45</span>
      </alt-core-list-item>

      <alt-core-list-item caption="Specialist" label="Anna Smith"></alt-core-list-item>

      <alt-core-list-item caption="Time" label="12 May, 14:00–15:30"></alt-core-list-item>
    </alt-core-list>
  `,
}
