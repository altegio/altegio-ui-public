import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import { AltCoreButtonGroupTagName as tagName } from '~shared/constants'
import {
  createCoreButtonGroupProps,
  EAltCoreButtonGroupVariant,
  type IAltCoreButtonGroupProps,
} from '~core/ui/buttonGroup/models/types'

import {
  getComponentStateTable,
} from '~shared/.storybook/tables'


import { ifDefined } from 'lit/directives/if-defined.js'

import '~core/ui/buttonGroup'
import '~core/ui/button'

import { altInfo, altRocket } from '~shared/icons'

import {
  size as sizeArgType,
} from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'

export interface IButtonGroupStoryProps extends IAltCoreButtonGroupProps {}

type TButtonGroupStoryMeta = Meta<IAltCoreButtonGroupProps>

const { size, variant } = { ...createCoreButtonGroupProps() }


/**
 * ## Core ButtonGroup
 *
 */
const meta: TButtonGroupStoryMeta = {
  title: '✅ ButtonGroup',
  id: 'buttonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    size,
    variant,
  }) => {
    const createButtonGroup = (count: number, withIcon = false) => html`
      <alt-core-button-group
        size=${ifDefined(size)}
        variant=${ifDefined(variant)}
      >
        ${Array.from({ length: count }, (_, index) => html`
          <alt-core-button
            label='Item'
            .iconLeft=${withIcon && index === 0 ? altInfo : undefined}
            .iconRight=${withIcon && index === count - 1 ? altRocket : undefined}
          ></alt-core-button>
        `)}
      </alt-core-button-group>
    `

    const groups = [2, 3, 4, 5].map((count) => createButtonGroup(count))

    return html`
      <div style="display: flex; flex-direction: column; gap: 16px;">
        <h3>ButtonGroup</h3>
        ${groups}
      </div>
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
      description:
        '**Button style**\n\n- `primary`: accent-colored button\n- `outline`: transparent background with a border\n- `outline-filled`: white background with a border',
      options: Object.values(EAltCoreButtonGroupVariant),
      ...getComponentStateTable(variant),
    },
  },
  args: { ...createCoreButtonGroupProps() },
} satisfies TButtonGroupStoryMeta

export default meta
type Story = StoryObj<TButtonGroupStoryMeta>

export const Playground: Story = { args: {} }
