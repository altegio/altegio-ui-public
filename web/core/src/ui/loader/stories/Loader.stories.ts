import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { getComponentStateTable } from '~shared/.storybook/tables'
import { YCoreLoaderTagName as tagName } from '~shared/constants'
import { EYSizes } from '~shared/types/global'

import {
  type IYCoreLoaderProps,
  createCoreLoaderProps,
  EYCoreLoaderVariant,
} from '../models/types'

import '~core/ui/loader'

const { size, variant } = createCoreLoaderProps()

/**
 * ## Core Loader
 *
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-|-Components-(IN-PROGRESS)?node-id=1359-2918&p=f&t=Kx0H6q9cba8lY24I-0)
 */
const meta: Meta<IYCoreLoaderProps> = {
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
      <y-core-loader
        data-testid=${tagName}
        size=${ifDefined(size)}
        variant=${ifDefined(variant)}
      ></y-core-loader>
    `
  },
  argTypes: {
    size: {
      ...sizeArgType([
        EYSizes.SMALL,
        EYSizes.MEDIUM,
        EYSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },
    variant: {
      control: { type: 'select' },
      description: 'Стиль кнопки',
      options: Object.values(EYCoreLoaderVariant),
      ...getComponentStateTable(variant),
    },
  },
  args: { ...createCoreLoaderProps() },
} satisfies Meta<IYCoreLoaderProps>

export default meta
type Story = StoryObj<IYCoreLoaderProps>

export const Playground: Story = {}
