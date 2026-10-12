import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'

import '~core/ui/simpleCheckbox'

import { YCoreSimpleCheckboxTagName as tagName } from '~shared/constants'
import { EYSizes } from '~shared/types/global'
import {
  size as sizeArgType,
  hovered as hoveredArgType,
  disabled as disabledArgType,
  error as errorArgType,
  checked as checkedArgType,
} from '~shared/.storybook/argTypes'
import { getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import {
  createCoreSimpleCheckboxProps,
  type IYCoreSimpleCheckboxProps,
} from '../models/types'
import type { TYCoreSimpleCheckboxEvents } from '../models/types/events'

const { checked, indeterminate, size, disabled, error, hovered } = { ...createCoreSimpleCheckboxProps() }

type TYCoreCheckboxStoryMeta = IYCoreSimpleCheckboxProps &
  TYCoreSimpleCheckboxEvents

/**
 * ## Core SimpleCheckbox
 *
 */
const meta: Meta<TYCoreCheckboxStoryMeta> = {
  title: '⚙️ Checkbox',
  id: 'simpleCheckbox',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({ size, disabled, error, hovered }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<TYCoreCheckboxStoryMeta>()

    const { checked, indeterminate } = args
    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <y-core-simple-checkbox
        .size=${size}
        .checked=${checked}
        .indeterminate=${indeterminate}
        .disabled=${disabled}
        .error=${error}
        .hovered=${hovered}
        @checked=${onChecked}
      ></y-core-simple-checkbox>
    `
  },
  argTypes: {
    checked: {
      ...checkedArgType,
      ...getComponentStateTable(checked),
    },
    indeterminate: {
      type: 'boolean',
      description: 'Display the `indeterminate` icon, for example in permission or service trees. Does not change the `checked` value',
      ...getComponentStateTable(indeterminate),
    },
    size: {
      ...sizeArgType([
        EYSizes.SMALL,
        EYSizes.MEDIUM,
      ]),
      ...getComponentStateTable(size),
    },
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
    error: {
      ...errorArgType,
      ...getComponentStateTable(error),
    },
    hovered: {
      ...hoveredArgType,
      ...getComponentStateTable(hovered),
    },
    onChecked: {
      type: 'function',
      description: 'Checkbox change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...createCoreSimpleCheckboxProps(),
    onChecked: fn(),
  },
} satisfies Meta<TYCoreCheckboxStoryMeta>

export default meta
type Story = StoryObj<TYCoreCheckboxStoryMeta>

export const Playground: Story = {}
