import { html } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from 'storybook/preview-api'

import '~core/ui/simpleCheckbox'

import { AltCoreSimpleCheckboxTagName as tagName } from '~shared/constants'
import { EAltSizes } from '~shared/types/global'
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
  type IAltCoreSimpleCheckboxProps,
} from '../models/types'
import type { TAltCoreSimpleCheckboxEvents } from '../models/types/events'

const { checked, indeterminate, size, disabled, error, hovered } = { ...createCoreSimpleCheckboxProps() }

type TAltCoreCheckboxStoryMeta = IAltCoreSimpleCheckboxProps &
  TAltCoreSimpleCheckboxEvents

/**
 * ## Core SimpleCheckbox
 *
 */
const meta: Meta<TAltCoreCheckboxStoryMeta> = {
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
    ] = useArgs<TAltCoreCheckboxStoryMeta>()

    const { checked, indeterminate } = args
    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <alt-core-simple-checkbox
        .size=${size}
        .checked=${checked}
        .indeterminate=${indeterminate}
        .disabled=${disabled}
        .error=${error}
        .hovered=${hovered}
        @checked=${onChecked}
      ></alt-core-simple-checkbox>
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
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
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
} satisfies Meta<TAltCoreCheckboxStoryMeta>

export default meta
type Story = StoryObj<TAltCoreCheckboxStoryMeta>

export const Playground: Story = {}
