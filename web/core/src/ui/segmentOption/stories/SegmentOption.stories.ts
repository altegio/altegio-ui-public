import { fn } from 'storybook/test'
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
  AltCoreSegmentOptionTagName as tagName,
} from '~shared/constants'
import { altInfo, altRocket } from '~shared/icons'
import { EAltSizes } from '~shared/types/global'

import {
  type TAltCoreSegmentOptionEvents,
  type IAltCoreSegmentOptionProps,
  createCoreSegmentOptionProps,
} from '~core/ui/segmentOption/models/types'

import '~core/ui/segmentOption'

export interface IAltCoreSegmentOptionStoryProps extends ITextStoryProps {
  showIcon: boolean
  text: string
}

type TAltCoreSegmentOptionMeta = IAltCoreSegmentOptionProps & IAltCoreSegmentOptionStoryProps & TAltCoreSegmentOptionEvents

const { active, disabled, hovered, icon, size } = createCoreSegmentOptionProps()

const iconOptions = {
  info: altInfo,
  rocket: altRocket,
}

/**
 * ## Core SegmentOption
 *
 */
const meta: Meta<TAltCoreSegmentOptionMeta> = {
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
      <alt-core-segment-option
        ?active=${active}
        ?disabled=${disabled}
        .hovered=${hovered}
        .icon=${showIcon ? icon : undefined}
        size=${ifDefined(size)}
        value=${value}
        @click-option=${onClick}
      >
        ${text}
      </alt-core-segment-option>
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
      description: 'Icon displayed in the button',
      options: Object.keys(iconOptions),
      mapping: iconOptions,
      ...getComponentContentTable(icon),
    },
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
        EAltSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },

    // Story Controls
    showIcon: {
      type: 'boolean',
      description: 'Show the segment with an icon',
      ...storyControlsTable,
    },
    text: {
      type: 'string',
      description: 'Text displayed through the component slot',
      ...storyControlsTable,
    },
    onClick: {
      type: 'function',
      description: 'Segment click event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    ...createCoreSegmentOptionProps(),
    icon: iconOptions.info,
    showIcon: false,
    text: 'Segment',
    value: '',
    onClick: fn(),
  },
} satisfies Meta<TAltCoreSegmentOptionMeta>

export default meta
type Story = StoryObj<TAltCoreSegmentOptionMeta>

export const Playground: Story = { args: {} }
