import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { getComponentStateTable } from '~shared/.storybook/tables'
import { AltCoreLoaderTagName as tagName } from '~shared/constants'
import { EAltSizes } from '~shared/types/global'

import {
  type IAltCoreLoaderProps,
  createCoreLoaderProps,
  EAltCoreLoaderVariant,
} from '../models/types'

import '~core/ui/loader'

const { size, variant } = createCoreLoaderProps()

/**
 * ## Core Loader
 *
 */
const meta: Meta<IAltCoreLoaderProps> = {
  title: 'Loader',
  id: 'loader',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({ size, variant }) => {
    return html`
      <alt-core-loader
        data-testid=${tagName}
        size=${ifDefined(size)}
        variant=${ifDefined(variant)}
      ></alt-core-loader>
    `
  },
  argTypes: {
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
        EAltSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },
    variant: {
      control: { type: 'select' },
      description: 'Button style',
      options: Object.values(EAltCoreLoaderVariant),
      ...getComponentStateTable(variant),
    },
  },
  args: { ...createCoreLoaderProps() },
} satisfies Meta<IAltCoreLoaderProps>

export default meta
type Story = StoryObj<IAltCoreLoaderProps>

export const Playground: Story = {}
