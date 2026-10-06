import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import { YCoreButtonGroupTagName as tagName } from '~shared/constants'
import {
  createCoreButtonGroupProps,
  EYCoreButtonGroupVariant,
  type IYCoreButtonGroupProps,
} from '~core/ui/buttonGroup/models/types'

import {
  getComponentStateTable,
} from '~shared/.storybook/tables'


import { ifDefined } from 'lit/directives/if-defined.js'

import '~core/ui/buttonGroup'
import '~core/ui/button'

import { yInfo, yRocket } from '~shared/icons'

import {
  size as sizeArgType,
} from '~shared/.storybook/argTypes'
import { EYSizes } from '~shared/types/global'

export interface IButtonGroupStoryProps extends IYCoreButtonGroupProps {}

type TButtonGroupStoryMeta = Meta<IYCoreButtonGroupProps>

const { size, variant } = { ...createCoreButtonGroupProps() }


/**
 * ## Core ButtonGroup
 *
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components-(IN-PROGRESS)?node-id=2503-5950&m=dev)
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
      <y-core-button-group
        size=${ifDefined(size)}
        variant=${ifDefined(variant)}
      >
        ${Array.from({ length: count }, (_, index) => html`
          <y-core-button
            label='Item'
            .iconLeft=${withIcon && index === 0 ? yInfo : undefined}
            .iconRight=${withIcon && index === count - 1 ? yRocket : undefined}
          ></y-core-button>
        `)}
      </y-core-button-group>
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
        EYSizes.SMALL,
        EYSizes.MEDIUM,
        EYSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },
    variant: {
      control: { type: 'select' },
      description:
        '**Вариант стилизации кнопки**\n\n- `primary` - основная кнопка с акцентным цветом\n- `outline` - кнопка с прозрачным фоном и обводкой\n- `outline-filled` - кнопка с белым фоном и обводкой',
      options: Object.values(EYCoreButtonGroupVariant),
      ...getComponentStateTable(variant),
    },
  },
  args: { ...createCoreButtonGroupProps() },
} satisfies TButtonGroupStoryMeta

export default meta
type Story = StoryObj<TButtonGroupStoryMeta>

export const Playground: Story = { args: {} }
