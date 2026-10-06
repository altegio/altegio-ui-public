import { fn } from '@storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import {
  type ITextStoryProps,
  active as activeArgType,
  disabled as disabledArgType,
  hovered as hoveredArgType,
  size as sizeArgType,
} from '~shared/.storybook/argTypes'
import {
  getComponentContentTable,
  getComponentEmitsTable,
  getComponentStateTable,
  storyControlsTable,
} from '~shared/.storybook/tables'
import {
  YCoreSegmentOptionTagName as tagName,
} from '~shared/constants'
import { yInfo, yRocket } from '~shared/icons'
import { EYSizes } from '~shared/types/global'

import {
  type TYCoreSegmentOptionEvents,
  type IYCoreSegmentOptionProps,
  createCoreSegmentOptionProps,
} from '~core/ui/segmentOption/models/types'

import '~core/ui/segmentOption'

export interface IYCoreSegmentOptionStoryProps extends ITextStoryProps {
  showIcon: boolean
  text: string
}

type TYCoreSegmentOptionMeta = IYCoreSegmentOptionProps & IYCoreSegmentOptionStoryProps & TYCoreSegmentOptionEvents

const { active, disabled, hovered, icon, size } = createCoreSegmentOptionProps()

const iconOptions = {
  info: yInfo,
  rocket: yRocket,
}

/**
 * ## Core SegmentOption
 *
 * * Ссылка на [Figma](https://www.figma.com/design/0eI55yqAEchWUmRQCIQVYu/YC-Web-%7C-Components-(IN-PROGRESS)?node-id=1951-4023&t=gYQc2Dy7GgoQzXEK-0)
 */
const meta: Meta<TYCoreSegmentOptionMeta> = {
  title: '⚙️ SegmentOption',
  id: 'segmentOption',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    active,
    disabled,
    hovered,
    showIcon,
    size,
    icon,
    text,
    value,
    onClick,
  }) => {
    return html`
      <y-core-segment-option
        ?active=${active}
        ?disabled=${disabled}
        .hovered=${hovered}
        .icon=${showIcon ? icon : undefined}
        size=${ifDefined(size)}
        value=${value}
        @click-option=${onClick}
      >
        ${text}
      </y-core-segment-option>
    `
  },
  argTypes: {
    active: {
      ...activeArgType,
      ...getComponentStateTable(active),
    },
    disabled: {
      ...disabledArgType,
      ...getComponentStateTable(disabled),
    },
    hovered: {
      ...hoveredArgType,
      ...getComponentStateTable(hovered),
    },
    icon: {
      control: { type: 'select' },
      description: 'Управляет отображаемой в кнопке иконкой',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(icon),
    },
    size: {
      ...sizeArgType([
        EYSizes.SMALL,
        EYSizes.MEDIUM,
        EYSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },

    // Story Controls
    showIcon: {
      type: 'boolean',
      description: 'Для просмотра варианта сегмента с иконкой',
      ...storyControlsTable,
    },
    text: {
      type: 'string',
      description: 'Текст который будет отображаться в компоненте через слот',
      ...storyControlsTable,
    },
    onClick: {
      type: 'function',
      description: 'Событие клика на сегмент',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...createCoreSegmentOptionProps(),
    icon: iconOptions.info,
    showIcon: false,
    text: 'Сегмент',
    value: '',
    onClick: fn(),
  },
} satisfies Meta<TYCoreSegmentOptionMeta>

export default meta
type Story = StoryObj<TYCoreSegmentOptionMeta>

export const Playground: Story = { args: {} }
