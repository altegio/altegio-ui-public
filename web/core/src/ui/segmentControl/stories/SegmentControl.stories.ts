import { fn } from 'storybook/test'
import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'
import { useArgs } from 'storybook/preview-api'

import { items as itemsArgType, type ITextStoryProps, size as sizeArgType } from '~shared/.storybook/argTypes'
import { getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'
import { AltCoreSegmentControlTagName as tagName } from '~shared/constants'
import { altInfo as altInfoIcon } from '~shared/icons/build/alt-info.icon'
import { EAltSizes } from '~shared/types/global'

import {
  createCoreSegmentControlProps,
  type IAltCoreSegmentControlProps,
  type TAltCoreSegmentControlEvents,
} from '../models/types'

import '~core/ui/segmentControl'

type TAltCoreSegmentControlMeta = IAltCoreSegmentControlProps & ITextStoryProps & TAltCoreSegmentControlEvents

const { options, size, value, manual } = createCoreSegmentControlProps()

/**
 * ## Core SegmentControl
 */
const meta: Meta<TAltCoreSegmentControlMeta> = {
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
      <alt-core-segment-control
        .options=${options}
        .value=${value}
        .manual=${args.manual}
        size=${ifDefined(args.size)}
        @click=${handleClick}
      ></alt-core-segment-control>
    `
  },
  argTypes: {
    options: {
      ...itemsArgType,
      ...getComponentStateTable(options),
    },
    value: {
      type: 'string',
      description: 'Active option value in manual mode',
      ...getComponentStateTable(value),
    },
    manual: {
      type: 'boolean',
      description: 'Control the active segment manually',
      ...getComponentStateTable(manual),
    },
    size: {
      ...sizeArgType([
        EAltSizes.SMALL,
        EAltSizes.MEDIUM,
        EAltSizes.LARGE,
      ]),
      ...getComponentStateTable(size),
    },
    onClick: {
      type: 'function',
      description: 'Segment click event',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    options: [
      {
        active: true,
        disabled: false,
        text: 'Segment 1',
        icon: altInfoIcon,
        value: '1',
      },
      {
        active: false,
        disabled: false,
        text: 'Segment 2',
        icon: altInfoIcon,
        value: '2',
      },
      {
        active: false,
        disabled: false,
        text: 'Segment 3',
        icon: altInfoIcon,
        value: '3',
      },
    ],
    size: EAltSizes.SMALL,
    onClick: fn(),
  },
} satisfies Meta<TAltCoreSegmentControlMeta>

export default meta
type Story = StoryObj<TAltCoreSegmentControlMeta>

export const Playground: Story = { args: {} }
