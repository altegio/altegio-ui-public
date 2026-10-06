import { html } from 'lit'
import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { useArgs } from '@storybook/preview-api'

import '~core/ui/simpleRadioButton'

import { YCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'
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
  createCoreSimpleRadioButtonProps,
  type IYCoreSimpleRadioButtonProps,
  type TYCoreSimpleRadioButtonEvents,
} from '~core/ui/simpleRadioButton/models/types'

const { checked, size, disabled, error, hovered, name } = { ...createCoreSimpleRadioButtonProps() }

type TYCoreSimpleRadioButtonStoryMeta = IYCoreSimpleRadioButtonProps &
  TYCoreSimpleRadioButtonEvents

/**
 * ## Core SimpleRadioButton
 *
 */
const meta: Meta<TYCoreSimpleRadioButtonStoryMeta> = {
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
    ] = useArgs<TYCoreSimpleRadioButtonStoryMeta>()

    const { checked } = args
    const onChecked = () => {
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <y-core-simple-radio-button
        .size=${size}
        .checked=${checked}
        .disabled=${disabled}
        .name=${name}
        .error=${error}
        .hovered=${hovered}
        @checked=${onChecked}
      ></y-core-simple-radio-button>
    `
  },
  argTypes: {
    checked: {
      ...checkedArgType,
      ...getComponentStateTable(checked),
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
      description: 'Radio button change event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...createCoreSimpleRadioButtonProps(),
    onChecked: fn(),
  },
} satisfies Meta<TYCoreSimpleRadioButtonStoryMeta>

export default meta
type Story = StoryObj<TYCoreSimpleRadioButtonStoryMeta>

export const Playground: Story = {}
