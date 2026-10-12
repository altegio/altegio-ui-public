import { html, nothing } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { YCoreEmptyStateTagName as tagName } from '~shared/constants'

import '~core/ui/emptyState'
import '~core/ui/button'

import {
  createCoreEmptyStateExternalProps,
  type IYCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import { getComponentContentTable, getComponentStateTable, storyControlsTable } from '~shared/.storybook/tables'
import { EYSizes } from '~shared/types/global'
import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { yMagic, yRocket, ySearch } from '~shared/icons'

export interface IYCoreEmptyStateStoryProps extends IYCoreEmptyStateExternalProps {
  isActionsSlotExists: boolean
}

type TYCoreEmptyStateStoryMeta = IYCoreEmptyStateStoryProps

const { title, description, icon, size } = createCoreEmptyStateExternalProps()

const iconOptions = {
  search: ySearch,
  rocket: yRocket,
  magic: yMagic,
}

/**
 * ## Core Empty State
 * Explains why content is missing or unavailable and suggests what to do next.
 *
 */
const meta: Meta<TYCoreEmptyStateStoryMeta> = {
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
          <y-core-button
            label="Primary button"
            variant="primary"
          ></y-core-button>

          <y-core-button
            label="Secondary button"
            variant="outline"
          ></y-core-button>
        </div>
      `
    }

    return html`
      <div style="display: flex; justify-content: center;">
        <y-core-empty-state
          .title=${title}
          .description=${description}
          .icon=${icon}
          .size=${size}
          style="max-width: 400px;"
        >
          ${isActionsSlotExists ? renderActionsSlot() : nothing}
        </y-core-empty-state>
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
        EYSizes.SMALL,
        EYSizes.MEDIUM,
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
} satisfies Meta<TYCoreEmptyStateStoryMeta>

export default meta
type Story = StoryObj<TYCoreEmptyStateStoryMeta>

export const Playground: Story = {}
