import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { useArgs } from '@storybook/preview-api'

import { items as itemsArgType, type ITextStoryProps, size as sizeArgType } from '~shared/.storybook/argTypes'
import { getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import { YCoreSegmentControlTagName as tagName } from '~shared/constants'
import { yInfo as yInfoIcon } from '~shared/icons/build/y-info.icon'
import { EYSizes } from '~shared/types/global'

import {
  createCoreSegmentControlProps,
  type IYCoreSegmentControlProps,
  type TYCoreSegmentControlEvents,
} from '../models/types'

import '~core/ui/segmentControl'

type TYCoreSegmentControlMeta = IYCoreSegmentControlProps & ITextStoryProps & TYCoreSegmentControlEvents

const { options, size, value, manual } = createCoreSegmentControlProps()

/**
 * ## Core SegmentControl
 */
const meta: Meta<TYCoreSegmentControlMeta> = {
  title: '✅ SegmentControl',
  id: 'segmentControl',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => {
    const [{ options, value }, updateArgs] = useArgs()

    const handleClick = (event: Event) => {
      const customEvent = event as CustomEvent<{ value: string }>
      const newValue = customEvent.detail.value

      updateArgs({ value: newValue })

      args.onClick(event)
    }

    return html`
      <y-core-segment-control
        .options=${options}
        .value=${value}
        .manual=${args.manual}
        size=${ifDefined(args.size)}
        @click=${handleClick}
      ></y-core-segment-control>
    `
  },
  argTypes: {
    options: {
      ...itemsArgType,
      ...getComponentStateTable(options),
    },
    value: {
      type: 'string',
      description: 'Значение активного option при включенном режиме manual',
      ...getComponentStateTable(value),
    },
    manual: {
      type: 'boolean',
      description: 'Ручной режим управления активным сегментом',
      ...getComponentStateTable(manual),
    },
    size: {
      ...sizeArgType([
        EYSizes.SMALL,
        EYSizes.MEDIUM,
        EYSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },
    onClick: {
      type: 'function',
      description: 'Событие клика на сегмент',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    options: [
      {
        active: true,
        disabled: false,
        text: 'Сегмент 1',
        icon: yInfoIcon,
        value: '1',
      },
      {
        active: false,
        disabled: false,
        text: 'Сегмент 2',
        icon: yInfoIcon,
        value: '2',
      },
      {
        active: false,
        disabled: false,
        text: 'Сегмент 3',
        icon: yInfoIcon,
        value: '3',
      },
    ],
    size: EYSizes.SMALL,
    onClick: fn(),
  },
} satisfies Meta<TYCoreSegmentControlMeta>

export default meta
type Story = StoryObj<TYCoreSegmentControlMeta>

export const Playground: Story = { args: {} }
