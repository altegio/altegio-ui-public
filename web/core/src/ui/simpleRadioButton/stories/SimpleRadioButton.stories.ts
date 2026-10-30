import { html } from 'lit'
import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from 'storybook/preview-api'

import '~core/ui/simpleRadioButton'

import { AltCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'
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
  createCoreSimpleRadioButtonProps,
  type IAltCoreSimpleRadioButtonProps,
  type TAltCoreSimpleRadioButtonEvents,
} from '~core/ui/simpleRadioButton/models/types'

const { checked, size, disabled, error, hovered, name } = { ...createCoreSimpleRadioButtonProps() }

type TAltCoreSimpleRadioButtonStoryMeta = IAltCoreSimpleRadioButtonProps &
  TAltCoreSimpleRadioButtonEvents

/**
 * ## Core SimpleRadioButton
 *
 */
const meta: Meta<TAltCoreSimpleRadioButtonStoryMeta> = {
  title: '⚙️ RadioButton',
  id: 'simpleRadioButton',
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
    ] = useArgs<TAltCoreSimpleRadioButtonStoryMeta>()

    const { checked } = args
    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <alt-core-simple-radio-button
        .size=${size}
        .checked=${checked}
        .disabled=${disabled}
        .name=${name}
        .error=${error}
        .hovered=${hovered}
        @checked=${onChecked}
      ></alt-core-simple-radio-button>
    `
  },
  argTypes: {
    checked: {
      ...checkedArgType,
      ...getComponentStateTable(checked),
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
      description: 'Radio button change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...createCoreSimpleRadioButtonProps(),
    onChecked: fn(),
  },
} satisfies Meta<TAltCoreSimpleRadioButtonStoryMeta>

export default meta
type Story = StoryObj<TAltCoreSimpleRadioButtonStoryMeta>

export const Playground: Story = {}
