import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { AltCoreRadioButtonGroupTagName as tagName } from '~shared/constants'
import {
  getComponentContentTable,
  getComponentEmitsTable,
  getComponentStateTable,
} from '~shared/.storybook/tables'
import type {
  RadioButtonGroupChangeEvent,
  TAltCoreRadioButtonGroupEvents,
} from '../models/types'
import {
  createCoreRadioButtonGroupProps,
  EAltCoreRadioButtonGroupDirection,
  type IAltCoreRadioButtonGroupProps,
} from '../models/types'
import { EAltSizes } from '~shared/types/global'
import '~core/ui/radioButtonGroup'
import '~core/ui/radioButton'
import { useArgs } from 'storybook/preview-api'
import { action } from 'storybook/actions'
import { EAltCoreLabelAlignment } from '../../label/models/types'
import altCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'

export type TAltCoreRadioButtonGroupStoryMeta =
  IAltCoreRadioButtonGroupProps & TAltCoreRadioButtonGroupEvents

const { value, size, alignment, direction } = { ...createCoreRadioButtonGroupProps() }

/**
 * ## Core RadioButtonGroup
 *
 */
const meta: Meta<TAltCoreRadioButtonGroupStoryMeta> = {
  title: '⚠️ RadioButtonGroup',
  id: 'radioButtonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({ size, alignment, direction, labelText, labelTooltipText, labelDebounce, labelTooltipActive }) => {
    const [args, updateArgs] =
      useArgs<TAltCoreRadioButtonGroupStoryMeta>()

    const { value } = args
    const onChange = (event: RadioButtonGroupChangeEvent) => {
      updateArgs({ ...args, value })

      action('change')(event)
    }

    return html`
      <alt-core-radio-button-group
        value=${ifDefined(value ?? undefined)}
        size=${ifDefined(size)}
        alignment=${ifDefined(alignment)}
        direction=${ifDefined(direction)}
        label-text=${ifDefined(labelText)}
        label-tooltip-text=${ifDefined(labelTooltipText)}
        label-debounce=${ifDefined(labelDebounce)}
        ?label-tooltip-active=${labelTooltipActive}
        @change=${onChange}
      >
        <alt-core-radio-button value="1" label-text="Radio button with value 1"
          ><div slot="annotation">Annotation text</div></alt-core-radio-button
        >

        <alt-core-radio-button value="2" label-text="Radio button with value 2"
          ><div slot="annotation">Annotation text</div></alt-core-radio-button
        >

        <alt-core-radio-button value="3" label-text="Radio button with value 3"
          ><div slot="annotation">Annotation text</div></alt-core-radio-button
        >
      </alt-core-radio-button-group>
    `
  },
  argTypes: {
    value: {
      type: 'string',
      description: 'Current group value',
      ...getComponentStateTable(value),
    },
    size: {
      ...sizeArgType([EAltSizes.SMALL, EAltSizes.MEDIUM]),
      ...getComponentStateTable(size),
    },
    direction: {
      control: { type: 'radio' },
      description: 'Radio button layout direction',
      options: Object.values(EAltCoreRadioButtonGroupDirection),
      ...getComponentStateTable(direction),
    },
    alignment: {
      control: { type: 'radio' },
      description: 'Radio button content alignment',
      options: Object.values(EAltCoreLabelAlignment),
      ...getComponentContentTable(alignment),
    },
    labelText: altCoreLabelStoryMeta.argTypes?.text,
    labelTooltipText: altCoreLabelStoryMeta.argTypes?.tooltipText,
    labelDebounce: altCoreLabelStoryMeta.argTypes?.debounce,
    labelTooltipActive: altCoreLabelStoryMeta.argTypes?.tooltipActive,
    onChange: {
      type: 'function',
      description: 'Radio selection change event',
      ...getComponentEmitsTable(),
    },
  },
  args: { ...createCoreRadioButtonGroupProps() },
} satisfies Meta<TAltCoreRadioButtonGroupStoryMeta>

export default meta
type Story = StoryObj<TAltCoreRadioButtonGroupStoryMeta>

export const Playground: Story = { args: {} }
