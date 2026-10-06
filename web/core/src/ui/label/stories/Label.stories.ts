import { html } from 'lit/static-html.js'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreLabelExternalProps,
  createCoreLabelInternalProps,
  EYCoreLabelAlignment,
  type IYCoreLabelInternalProps,
  type IYCoreLabelExternalProps,
} from '~core/ui/label/models/types'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { YCoreLabelTagName as tagName } from '~shared/constants'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types/external'
import type { ITextStoryProps } from '~shared/.storybook/argTypes'
import {
  disabled as disabledArgType,
  required as requiredArgType,
  isLongText as isLongTextArgType,
} from '~shared/.storybook/argTypes'
import {
  getComponentContentTable,
  getComponentStateTable,
  getComponentSlotsTable,
} from '~shared/.storybook/tables'
import yCoreDropdownStoryMeta from '~core/ui/dropdown/stories/Dropdown.stories'

import '~core/ui/label'

export interface IYCoreLabelStoryProps extends ITextStoryProps {}

export interface IYCoreLabelStorySlots {
  tooltipContentSlot: string
}

type IYCoreLabelStoryMeta = IYCoreLabelExternalProps &
  IYCoreLabelInternalProps &
  IYCoreLabelStoryProps &
  IYCoreLabelStorySlots

const { debounce, alignment, wrap, required, text, tooltipText, tooltipActive, size, variant, tooltipPlacement } = {
  ...createCoreLabelExternalProps(),
  ...createCoreLabelInternalProps(),
}

/**
 * ## Label
 * Label for input fields
 */
const meta: Meta<IYCoreLabelStoryMeta> = {
  title: '⚙️️ Label',
  id: 'label',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({
    disabled,
    required,
    text,
    tooltipText,
    isLongText,
    wrap,
    alignment,
    tooltipActive,
    size,
    variant,
    tooltipPlacement,
    tooltipContentSlot,
  }) => html`
    <y-core-label
      .text=${isLongText ? LOREM_IPSUM : text}
      .tooltipText=${isLongText ? LOREM_IPSUM : tooltipText}
      .alignment=${alignment}
      .tooltipActive=${tooltipActive}
      .size=${size}
      .variant=${variant}
      .wrap=${wrap}
      .disabled=${disabled}
      .required=${required}
      .tooltipPlacement=${tooltipPlacement}
    >
      <span slot="tooltip-content">${tooltipContentSlot}</span> 
    </y-core-label>
  `,
  argTypes: {
    disabled: disabledArgType,
    required: requiredArgType,
    debounce: {
      type: 'number',
      description: 'Delay before updating label ellipsis when space is limited; reduces layout calculations and rendering',
      ...getComponentContentTable(debounce),
    },
    text: {
      type: 'string',
      description: 'Label text',
      ...getComponentContentTable(text),
    },
    tooltipText: {
      type: 'string',
      description: 'Hint text',
      ...getComponentContentTable(tooltipText),
    },
    wrap: {
      type: 'boolean',
      description: 'Wrap label text',
      ...getComponentContentTable(wrap),
    },
    alignment: {
      control: 'select',
      description: 'Content alignment',
      options: Object.values(EYCoreLabelAlignment),
      ...getComponentContentTable(alignment),
    },
    tooltipActive: {
      type: 'boolean',
      description: 'Tooltip active state',
      ...getComponentStateTable(tooltipActive),
    },
    size: {
      control: 'select',
      description: 'Label size',
      options: Object.values([
        EYCoreTextSize.A2_REGULAR,
        EYCoreTextSize.P2_REGULAR,
      ]),
      ...getComponentContentTable(size),
    },
    variant: {
      control: 'select',
      description: 'Label variant',
      options: Object.values([
        EYCoreTextVariant.PRIMARY,
        EYCoreTextVariant.SECONDARY,
      ]),
      ...getComponentContentTable(variant),
    },
    tooltipContentSlot: {
      type: 'string',
      description:
        '**Tooltip content slot**\n\nDisplayed when tooltipText is empty.',
      ...getComponentSlotsTable('tooltip-content', 'nothing'),
    },

    // Story Controls
    isLongText: isLongTextArgType,
    tooltipPlacement: yCoreDropdownStoryMeta.argTypes?.placement,
  },
  args: {
    ...createCoreLabelExternalProps(),
    text: 'Label',
    tooltipText: 'Tooltip',
    isLongText: false,
    debounce,
    alignment,
    wrap,
    required,
    size,
    variant,
    tooltipActive,
    tooltipPlacement,
    tooltipContentSlot: 'Content in the tooltip-content slot',
  },
} satisfies Meta<IYCoreLabelStoryMeta>

export default meta
type Story = StoryObj<IYCoreLabelStoryMeta>

export const Playground: Story = { args: { tooltipActive: true } }
