import { html } from 'lit'
import { fn } from '@storybook/test'
import { useArgs } from '@storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import '~core/ui/simpleToggle'

import { createCoreSimpleToggleProps, createCoreSimpleToggleExternalProps, type IYCoreSimpleToggleProps } from '../models/types'
import { type TYCoreSimpleToggleEvents } from '../models/types/events'
import { YCoreSimpleToggleTagName as tagName } from '~shared/constants'

import {
  size as sizeArgType,
  disabled as disabledArgType,
  hovered as hoveredArgType,
  onCheckedEmit as onCheckedEmitArgType,
} from '~shared/.storybook/argTypes'

import { getComponentStateTable } from '~shared/.storybook/tables'
import { EYSizes } from '~shared/types/global'

const { checked, disabled, size, hovered } = createCoreSimpleToggleProps()

type TYCoreToggleStoryMeta = IYCoreSimpleToggleProps & TYCoreSimpleToggleEvents

/**
 * ## Core SimpleToggle
 *
 * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-DS-%7C-Testing?node-id=594-29290&t=wZdipmZtbbg9NfuM-4)
 */
const meta: Meta<TYCoreToggleStoryMeta> = {
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
    ] = useArgs<TYCoreToggleStoryMeta>()

    const { checked } = args
    const onChange = () => {
      args.onChecked()
      updateArgs({ ...args, checked: !checked })
    }

    return html`
      <y-core-simple-toggle
        .size=${size}
        .checked=${checked}
        .hovered=${hovered}
        .disabled=${disabled}
        @checked=${onChange}
      >

      </y-core-simple-toggle>
    `
  },
  argTypes: {
    checked: {
      type: 'boolean',
      description: 'Активное состояние',
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
        EYSizes.SMALL,
        EYSizes.MEDIUM,
      ]),
      ...getComponentStateTable(size),
    },
    onChecked: onCheckedEmitArgType,
  },
  args: {
    ...createCoreSimpleToggleExternalProps(),
    onChecked: fn(),
  },
} satisfies Meta<TYCoreToggleStoryMeta>

export default meta
type Story = StoryObj<TYCoreToggleStoryMeta>

export const Playground: Story = { }
