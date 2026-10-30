import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { AltCoreEmptyStateTagName as tagName } from '~shared/constants'

import '~core/ui/emptyState'
import '~core/ui/button'

import {
  createCoreEmptyStateExternalProps,
  type IAltCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import { getComponentContentTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { EAltSizes } from '~shared/types/global'
import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { altMagic, altRocket, altSearch } from '~shared/icons'

export interface IAltCoreEmptyStateStoryProps extends IAltCoreEmptyStateExternalProps {
  isActionsSlotExists: boolean
}

type TAltCoreEmptyStateStoryMeta = IAltCoreEmptyStateStoryProps

const { title, description, icon, size } = createCoreEmptyStateExternalProps()

const iconOptions = {
  search: altSearch,
  rocket: altRocket,
  magic: altMagic,
}

/**
 * ## Core Empty State
 * Explains why content is missing or unavailable and suggests what to do next.
 *
 */
const meta: Meta<TAltCoreEmptyStateStoryMeta> = {
  title: '✅ Empty State',
  id: 'state',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    title,
    description,
    isActionsSlotExists,
    icon,
    size,
  }) => {
    const renderActionsSlot = () => {
      return html`
        <div slot="actions">
          <alt-core-button
            label="Primary button"
            variant="primary"
          ></alt-core-button>

          <alt-core-button
            label="Secondary button"
            variant="outline"
          ></alt-core-button>
        </div>
      `
    }

    return html`
      <div style="display: flex; justify-content: center;">
        <alt-core-empty-state
          .title=${title}
          .description=${description}
          .icon=${icon}
          .size=${size}
          style="max-width: 400px;"
        >
          ${isActionsSlotExists ? renderActionsSlot() : nothing}
        </alt-core-empty-state>
      </div>
    `
  },
  argTypes: {
    title: {
      type: 'string',
      ...getComponentContentTable(title),
    },
    description: {
      type: 'string',
      ...getComponentContentTable(description),
    },
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
      ]),
      ...getComponentStateTable(size),
    },
    icon: {
      control: { type: 'select' },
      description: 'Icon to display',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(icon?.name),
    },
    isActionsSlotExists: {
      control: { type: 'boolean' },
      description: 'Show the action buttons slot',
      ...storyControlsTable,
    },
  },
  args: {
    title: 'No results found',
    description: 'Try a different name or create a new membership type',
    isActionsSlotExists: false,
    icon,
    size,
  },
} satisfies Meta<TAltCoreEmptyStateStoryMeta>

export default meta
type Story = StoryObj<TAltCoreEmptyStateStoryMeta>

export const Playground: Story = {}
