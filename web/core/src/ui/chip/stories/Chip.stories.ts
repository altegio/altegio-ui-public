import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'

import { EYSizes } from '~shared/types/global'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import {
  active as activeArgType,
  disabled as disabledArgType,
} from '~shared/.storybook/argTypes'

import '~core/ui/chip'
import { yInfo, yMagic } from '~shared/icons'

import {
  YCoreChipTagName as tagName,
} from '~shared/constants'

import {
  createCoreChipProps,
  type IYCoreChipProps,
} from '~core/ui/chip/models/types'

const iconOptions = {
  'без иконки': undefined,
  info: yInfo,
  magic: yMagic,
}

const { labelText, size, active, disabled } = createCoreChipProps()

type TChipStoryMeta = IYCoreChipProps & {
  onClick: (event: Event) => void
}

/**
 * ## Core Chip
 */
const meta: Meta<TChipStoryMeta> = {
  title: '✅ Chip',
  id: 'chip',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    labelText,
    iconLeft,
    size,
    active,
    disabled,
  }) => {
    const [, updateArgs] = useArgs()

    const handleClick = () => {
      updateArgs({ active: !active })
      action('click')({ active })
    }

    return html`
      <y-core-chip
        .labelText=${labelText}
        .iconLeft=${iconLeft}
        .size=${size}
        .active=${active}
        .disabled=${disabled}
        @click=${handleClick}
      ></y-core-chip>
    `
  },
  argTypes: {
    labelText: {
      control: 'text',
      description: 'Текст Chip',
      ...getComponentContentTable(labelText),
    },
    iconLeft: {
      control: 'select',
      description: 'Отображение иконки слева',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(),
    },
    size: {
      control: 'select',
      options: [
        EYSizes.SMALL,
        EYSizes.LARGE,
      ],
      description: 'Размер Chip',
      ...getComponentStateTable(size),
    },
    active: {
      ...getComponentStateTable(active),
      ...activeArgType,
      description: 'Делает компонент выбранным',
    },
    disabled: {
      ...getComponentStateTable(disabled),
      ...disabledArgType,
    },
  },
  args: {
    size,
    labelText: 'Label',
    active: false,
    disabled: false,
    iconLeft: yInfo,
  },
} satisfies Meta<TChipStoryMeta>

export default meta
type Story = StoryObj<IYCoreChipProps>

export const Playground: Story = { args: {} }
