import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/counter'
import { AltCoreCounterTagName as tagName } from '~shared/constants'
import {
  type IAltCoreCounterExternalProps,
  createCoreCounterProps,
  createCoreCounterExternalProps,
  EAltCoreCounterVariant,
} from '~core/ui/counter/models/types'
import {
  size as sizeArgType,
  disabled as disabledArgType,
} from '~shared/.storybook/argTypes'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { EAltSizes } from '~shared/types/global'

const { size, value, disabled, variant, withPlusSign, locator } = createCoreCounterProps()

/**
 * ## Core Counter
 * Counter component
 */

const meta: Meta<IAltCoreCounterExternalProps> = {
  title: '✅ Counter',
  id: 'counter',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    size,
    value,
    variant,
    disabled,
    withPlusSign,
    locator,
  }) => {
    return html`
      <alt-core-counter
        .size=${size}
        .value=${value}
        .variant=${variant}
        .disabled=${disabled}
        .withPlusSign=${withPlusSign}
        .locator=${locator}
      ></alt-core-counter>
    `
  },
  argTypes: {
    locator: {
      type: 'string',
      description: 'Data locator',
      ...getComponentStateTable(locator),
    },
    value: {
      type: 'number',
      description: 'Counter value',
      control: {
        type: 'number',
        min: 0,
        max: 9999,
        step: 1,
      },
      ...getComponentContentTable(value),
    },
    withPlusSign: {
      control: 'boolean',
      description: 'Add a plus sign before the number',
      type: 'boolean',
      ...getComponentStateTable(withPlusSign),
    },
    variant: {
      control: 'select',
      options: Object.values(EAltCoreCounterVariant),
      description: 'Component color',
      ...getComponentStateTable(variant),
    },
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
      ]),
      description: 'Component size',
      ...getComponentStateTable(size),
    },
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
  },
  args: { ...createCoreCounterExternalProps() },
} satisfies Meta<IAltCoreCounterExternalProps>

export default meta
type Story = StoryObj<IAltCoreCounterExternalProps>

export const Playground: Story = { args: {} }
