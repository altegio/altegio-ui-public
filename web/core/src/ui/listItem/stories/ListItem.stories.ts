import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'

import {
  createCoreListItemProps,
  EAltCoreListItemAlign,
  type IAltCoreListItemProps,
} from '~core/ui/listItem/models/types'
import { AltCoreListItemTagName as tagName } from '~shared/constants'
import {
  getComponentContentTable,
  getComponentSlotsTable,
  getComponentStateTable,
  storyControlsTable,
} from '~shared/.storybook/tables'
import { altChevronRight, altProfile } from '~shared/icons'

import '~core/ui/list'
import '~core/ui/listItem'
import '~core/ui/icon'

export interface IAltCoreListItemStoryProps extends IAltCoreListItemProps {
  isStartSlotExists: boolean
  isEndSlotExists: boolean
}

const {
  label,
  caption,
  clickable,
  href,
  target,
  disabled,
  active,
  align,
} = createCoreListItemProps()

/**
 * ## Core List Item
 * A row of `alt-core-list`: a label with an optional caption and `start`/`end` sections.
 *
 * - `clickable` renders a native button and `href` renders a link, so both work with the keyboard and emit the native `click` event.
 * - `disabled` blocks clicks, including clicks on slotted content.
 * - `active` highlights the row and sets `aria-current="true"`.
 */
const meta: Meta<IAltCoreListItemStoryProps> = {
  title: '✅ List/ListItem',
  id: 'listItem',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-list style="max-width: 360px;">
      <alt-core-list-item
        .label=${args.label}
        .caption=${args.caption}
        .clickable=${args.clickable}
        .href=${args.href}
        .target=${args.target}
        .disabled=${args.disabled}
        .active=${args.active}
        .align=${args.align}
        @click=${action('click')}
      >
        ${args.isStartSlotExists ? html`<alt-core-icon slot="start" .icon=${altProfile} size="20px"></alt-core-icon>` : nothing}
        ${args.isEndSlotExists ? html`<alt-core-icon slot="end" .icon=${altChevronRight} size="16px"></alt-core-icon>` : nothing}
      </alt-core-list-item>
    </alt-core-list>
  `,
  argTypes: {
    label: {
      type: 'string',
      description: 'Main text. The default slot replaces it',
      ...getComponentContentTable(label),
    },
    caption: {
      type: 'string',
      description: 'Secondary text under the label. The `caption` slot replaces it',
      ...getComponentContentTable(caption),
    },
    clickable: {
      control: { type: 'boolean' },
      description: 'Renders the row as a button',
      ...getComponentStateTable(clickable),
    },
    href: {
      type: 'string',
      description: 'Renders the row as a link',
      ...getComponentContentTable(href),
    },
    target: {
      type: 'string',
      description: 'Link target',
      ...getComponentContentTable(target),
    },
    disabled: {
      control: { type: 'boolean' },
      description: 'Blocks interaction',
      ...getComponentStateTable(disabled),
    },
    active: {
      control: { type: 'boolean' },
      description: 'Highlights the row as the current one',
      ...getComponentStateTable(active),
    },
    align: {
      control: { type: 'inline-radio' },
      options: Object.values(EAltCoreListItemAlign),
      description: 'Vertical alignment of the sections',
      ...getComponentStateTable(align),
    },
    isStartSlotExists: {
      control: { type: 'boolean' },
      description: 'Fill the `start` slot',
      ...storyControlsTable,
      ...getComponentSlotsTable('start', 'empty'),
    },
    isEndSlotExists: {
      control: { type: 'boolean' },
      description: 'Fill the `end` slot',
      ...storyControlsTable,
      ...getComponentSlotsTable('end', 'empty'),
    },
  },
  args: {
    label: 'Anna Smith',
    caption: 'Senior stylist',
    clickable: true,
    href,
    target,
    disabled,
    active,
    align,
    isStartSlotExists: true,
    isEndSlotExists: true,
  },
}

export default meta
type Story = StoryObj<IAltCoreListItemStoryProps>

export const Playground: Story = {}
