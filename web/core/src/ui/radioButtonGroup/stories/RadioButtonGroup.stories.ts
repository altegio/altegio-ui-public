import type { Meta, StoryObj } from '@storybook/web-components'
import { html } from 'lit'
import { ifDefined } from 'lit/directives/if-defined.js'

import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { YCoreRadioButtonGroupTagName as tagName } from '~shared/constants'
import {
  getComponentContentTable,
  getComponentEmitsTable,
  getComponentStateTable,
} from '~shared/.storybook/tables'
import type {
  RadioButtonGroupChangeEvent,
  TYCoreRadioButtonGroupEvents,
} from '../models/types'
import {
  createCoreRadioButtonGroupProps,
  EYCoreRadioButtonGroupDirection,
  type IYCoreRadioButtonGroupProps,
} from '../models/types'
import { EYSizes } from '~shared/types/global'
import '~core/ui/radioButtonGroup'
import '~core/ui/radioButton'
import { useArgs } from '@storybook/preview-api'
import { action } from '@storybook/addon-actions'
import { EYCoreLabelAlignment } from '../../label/models/types'
import yCoreLabelStoryMeta from '~core/ui/label/stories/Label.stories'

export type TYCoreRadioButtonGroupStoryMeta =
  IYCoreRadioButtonGroupProps & TYCoreRadioButtonGroupEvents

const { value, size, alignment, direction } = { ...createCoreRadioButtonGroupProps() }

/**
 * ## Core RadioButtonGroup
 *
 */
const meta: Meta<TYCoreRadioButtonGroupStoryMeta> = {
  title: '⚠️ RadioButtonGroup',
  id: 'radioButtonGroup',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: ['core', 'autodocs'],
  render: ({ size, alignment, direction, labelText, labelTooltipText, labelDebounce, labelTooltipActive }) => {
    const [args, updateArgs] =
      useArgs<TYCoreRadioButtonGroupStoryMeta>()

    const { value } = args
    const onChange = (event: RadioButtonGroupChangeEvent) => {
      updateArgs({ ...args, value })

      action('change')(event)
    }

    return html`
      <y-core-radio-button-group
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
        <y-core-radio-button value="1" label-text="Radio button with value 1"
          ><div slot="annotation">Annotation text</div></y-core-radio-button
        >

        <y-core-radio-button value="2" label-text="Radio button with value 2"
          ><div slot="annotation">Annotation text</div></y-core-radio-button
        >

        <y-core-radio-button value="3" label-text="Radio button with value 3"
          ><div slot="annotation">Annotation text</div></y-core-radio-button
        >
      </y-core-radio-button-group>
    `
  },
  argTypes: {
    value: {
      type: 'string',
      description: 'Current group value',
      ...getComponentStateTable(value),
    },
    size: {
      ...sizeArgType([EYSizes.SMALL, EYSizes.MEDIUM]),
      ...getComponentStateTable(size),
    },
    direction: {
      control: { type: 'radio' },
      description: 'Radio button layout direction',
      options: Object.values(EYCoreRadioButtonGroupDirection),
      ...getComponentStateTable(direction),
    },
    alignment: {
      control: { type: 'radio' },
      description: 'Radio button content alignment',
      options: Object.values(EYCoreLabelAlignment),
      ...getComponentContentTable(alignment),
    },
    labelText: yCoreLabelStoryMeta.argTypes?.text,
    labelTooltipText: yCoreLabelStoryMeta.argTypes?.tooltipText,
    labelDebounce: yCoreLabelStoryMeta.argTypes?.debounce,
    labelTooltipActive: yCoreLabelStoryMeta.argTypes?.tooltipActive,
    onChange: {
      type: 'function',
      description: 'Radio selection change event',
      ...getComponentEmitsTable(),
    },
  },
  args: { ...createCoreRadioButtonGroupProps() },
} satisfies Meta<TYCoreRadioButtonGroupStoryMeta>

export default meta
type Story = StoryObj<TYCoreRadioButtonGroupStoryMeta>

export const Playground: Story = { args: {} }
