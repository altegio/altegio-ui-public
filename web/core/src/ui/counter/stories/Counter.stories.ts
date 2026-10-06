import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/counter'
import { YCoreCounterTagName as tagName } from '~shared/constants'
import {
  type IYCoreCounterExternalProps,
  createCoreCounterProps,
  createCoreCounterExternalProps,
  EYCoreCounterVariant,
} from '~core/ui/counter/models/types'
import {
  size as sizeArgType,
  disabled as disabledArgType,
} from '~shared/.storybook/argTypes'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { EYSizes } from '~shared/types/global'

const { size, value, disabled, variant, withPlusSign, locator } = createCoreCounterProps()

/**
 * ## Core Counter
 * Базовый counter
 */

const meta: Meta<IYCoreCounterExternalProps> = {
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
      <y-core-counter
        .size=${size}
        .value=${value}
        .variant=${variant}
        .disabled=${disabled}
        .withPlusSign=${withPlusSign}
        .locator=${locator}
      ></y-core-counter>
    `
  },
  argTypes: {
    locator: {
      type: 'string',
      description: 'Локатор',
      ...getComponentStateTable(locator),
    },
    value: {
      type: 'number',
      description: 'Значение счетчика',
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
      description: 'Добавить знак + перед числом',
      type: 'boolean',
      ...getComponentStateTable(withPlusSign),
    },
    variant: {
      control: 'select',
      options: Object.values(EYCoreCounterVariant),
      description: 'Параметр отвечает за цвет компонента',
      ...getComponentStateTable(variant),
    },
    size: {
      ...sizeArgType([
        EYSizes.SMALL,
        EYSizes.MEDIUM,
      ]),
      description: 'Параметр отвечает за размер компонента',
      ...getComponentStateTable(size),
    },
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
  },
  args: { ...createCoreCounterExternalProps() },
} satisfies Meta<IYCoreCounterExternalProps>

export default meta
type Story = StoryObj<IYCoreCounterExternalProps>

export const Playground: Story = { args: {} }
