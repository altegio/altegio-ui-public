import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreSimpleChipProps,
  EAltCoreSimpleChipVariant,
  type IAltCoreSimpleChipProps,
  type TAltCoreSimpleChipEvents,
} from '~core/ui/simpleChip/models/types'

import '~core/ui/simpleChip'

import {
  AltCoreSimpleChipTagName as tagName,
} from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'

const { size, variant, disabled } = createCoreSimpleChipProps()
import {
  disabled as disabledArgType,
  onClick,
} from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'
import { fn } from 'storybook/test'

/**
 * ## Core Chip
 */
const meta: Meta<IAltCoreSimpleChipProps & TAltCoreSimpleChipEvents> = {
  title: '⚠️ Chip',
  id: 'quark-chip',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    size,
    variant,
    disabled,
    onClickIconEmit,
  }) => {
    return html`
      <alt-core-simple-chip
        .size=${size}
        .variant=${variant}
        .disabled=${disabled}
        @click-icon=${onClickIconEmit}
      >
        Chip text
      </alt-core-simple-chip>
    `
  },
  argTypes: {
    size: {
      control: 'select',
      options: [
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
      ],
      description: 'Tag size',
      ...getComponentStateTable(size),

    },
    variant: {
      control: 'select',
      options: Object.values(EAltCoreSimpleChipVariant),
      description: 'Tag variant',
      ...getComponentStateTable(variant),
    },
    disabled: {
      ...getComponentStateTable(disabled),
      ...disabledArgType,
    },
    onClickIconEmit: {
      ...onClick,
      description: 'Emitted when the close icon is clicked',
    },
  },
  args: {
    variant,
    size,
    disabled,
    onClickIconEmit: fn(),
  },
} satisfies Meta<IAltCoreSimpleChipProps & TAltCoreSimpleChipEvents>

export default meta
type Story = StoryObj<IAltCoreSimpleChipProps>

export const Playground: Story = { args: {} }
