import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreSimpleChipProps,
  EYCoreSimpleChipVariant,
  type IYCoreSimpleChipProps,
  type TYCoreSimpleChipEvents,
} from '~core/ui/simpleChip/models/types'

import '~core/ui/simpleChip'

import {
  YCoreSimpleChipTagName as tagName,
} from '~shared/constants'
import { getComponentStateTable } from '~shared/.storybook/tables'

const { size, variant, disabled } = createCoreSimpleChipProps()
import {
  disabled as disabledArgType,
  onClick,
} from '~shared/.storybook/argTypes'
import { EYSizes } from '~shared/types/global'
import { fn } from '@storybook/test'

/**
 * ## Core Chip
 */
const meta: Meta<IYCoreSimpleChipProps & TYCoreSimpleChipEvents> = {
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
      <y-core-simple-chip
        .size=${size}
        .variant=${variant}
        .disabled=${disabled}
        @click-icon=${onClickIconEmit}
      >
        Chip text
      </y-core-simple-chip>
    `
  },
  argTypes: {
    size: {
      control: 'select',
      options: [
        EYSizes.SMALL,
        EYSizes.MEDIUM,
      ],
      description: 'Tag size',
      ...getComponentStateTable(size),

    },
    variant: {
      control: 'select',
      options: Object.values(EYCoreSimpleChipVariant),
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
} satisfies Meta<IYCoreSimpleChipProps & TYCoreSimpleChipEvents>

export default meta
type Story = StoryObj<IYCoreSimpleChipProps>

export const Playground: Story = { args: {} }
