import { html } from 'lit'
import { fn } from 'storybook/test'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/simpleToggle'

import { createCoreSimpleToggleProps, createCoreSimpleToggleExternalProps, type IAltCoreSimpleToggleProps } from '../models/types'
import { type TAltCoreSimpleToggleEvents } from '../models/types/events'
import { AltCoreSimpleToggleTagName as tagName } from '~shared/constants'

import {
  size as sizeArgType,
  disabled as disabledArgType,
  hovered as hoveredArgType,
  onCheckedEmit as onCheckedEmitArgType,
} from '~shared/.storybook/argTypes'

import { getComponentStateTable } from '~shared/.storybook/tables'
import { EAltSizes } from '~shared/types/global'

const { checked, disabled, size, hovered } = createCoreSimpleToggleProps()

type TAltCoreToggleStoryMeta = IAltCoreSimpleToggleProps & TAltCoreSimpleToggleEvents

/**
 * ## Core SimpleToggle
 *
 */
const meta: Meta<TAltCoreToggleStoryMeta> = {
  title: '⚙️ Toggle',
  id: 'simpleToggle',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    size,
    hovered,
  }) => {
    const [
      args,
      updateArgs,
    ] = useArgs<TAltCoreToggleStoryMeta>()

    const { checked } = args
    const onChange = () => {
      args.onChecked()
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <alt-core-simple-toggle
        .size=${size}
        .checked=${checked}
        .hovered=${hovered}
        .disabled=${disabled}
        @checked=${onChange}
      >

      </alt-core-simple-toggle>
    `
  },
  argTypes: {
    checked: {
      type: 'boolean',
      description: 'Active state',
      ...getComponentStateTable(checked),
    },
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
    hovered: {
      ...hoveredArgType,
      ...getComponentStateTable(hovered),
    },
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
      ]),
      ...getComponentStateTable(size),
    },
    onChecked: onCheckedEmitArgType,
  },
  args: {
    ...createCoreSimpleToggleExternalProps(),
    onChecked: fn(),
  },
} satisfies Meta<TAltCoreToggleStoryMeta>

export default meta
type Story = StoryObj<TAltCoreToggleStoryMeta>

export const Playground: Story = { }
