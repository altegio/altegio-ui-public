import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreLinearProgressProps,
  EAltCoreLinearProgressVariant,
  type IAltCoreLinearProgressProps,
} from '~core/ui/linearProgress/models/types'
import { AltCoreLinearProgressTagName as tagName } from '~shared/constants'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'
import { size as sizeArgType } from '~shared/.storybook/argTypes'
import { EAltSizes } from '~shared/types/global'

import '~core/ui/linearProgress'

const { value, max, indeterminate, size, variant, accessibleName, valueText } = createCoreLinearProgressProps()

/**
 * ## Core LinearProgress
 * A bar that shows how far a task has progressed.
 *
 * - `value` runs from 0 to `max` (100 by default) and is kept in that range.
 * - `indeterminate` shows a running bar when the amount of work is unknown.
 * - The host is a WAI-ARIA `progressbar`: give it a name with `accessibleName`, `aria-label` or `aria-labelledby`.
 *   `valueText` replaces the announced number, for example "Step 2 of 5".
 * - The indeterminate animation stops when the user prefers reduced motion.
 */
const meta: Meta<IAltCoreLinearProgressProps> = {
  title: '✅ LinearProgress',
  id: 'linearprogress',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-linear-progress
      .value=${args.value}
      .max=${args.max}
      .indeterminate=${args.indeterminate}
      .size=${args.size}
      .variant=${args.variant}
      .accessibleName=${args.accessibleName}
      .valueText=${args.valueText}
      style="max-width: 360px;"
    ></alt-core-linear-progress>
  `,
  argTypes: {
    value: {
      control: { type: 'number' },
      description: 'Progress from 0 to `max`',
      ...getComponentContentTable(value),
    },
    max: {
      control: { type: 'number' },
      description: 'Value of a finished task',
      ...getComponentContentTable(max),
    },
    indeterminate: {
      control: { type: 'boolean' },
      description: 'Shows a running bar without a value',
      ...getComponentStateTable(indeterminate),
    },
    size: {
      ...sizeArgType([EAltSizes.SMALL, EAltSizes.MEDIUM]),
      description: 'Bar height: `small` 4px, `medium` 8px',
      ...getComponentStateTable(size),
    },
    variant: {
      control: { type: 'inline-radio' },
      options: Object.values(EAltCoreLinearProgressVariant),
      description: 'Bar color',
      ...getComponentStateTable(variant),
    },
    accessibleName: {
      control: { type: 'text' },
      description: 'Accessible name of the progress bar',
      ...getComponentContentTable(accessibleName),
    },
    valueText: {
      control: { type: 'text' },
      description: 'Text announced instead of the number',
      ...getComponentContentTable(valueText),
    },
  },
  args: {
    value: 40,
    max,
    indeterminate,
    size,
    variant,
    accessibleName: 'Uploading files',
    valueText,
  },
}

export default meta
type Story = StoryObj<IAltCoreLinearProgressProps>

export const Playground: Story = {}

export const Variants: Story = {
  parameters: { docs: { description: { story: 'Sizes and colors, and an indeterminate bar.' } } },
  render: () => html`
    <div style="display: grid; gap: 16px; max-width: 360px;">
      <alt-core-linear-progress value="25" accessible-name="Accent"></alt-core-linear-progress>
      
      <alt-core-linear-progress value="50" size="medium" accessible-name="Accent, medium"></alt-core-linear-progress>
      
      <alt-core-linear-progress value="100" variant="positive" accessible-name="Positive"></alt-core-linear-progress>
      
      <alt-core-linear-progress value="75" variant="negative" accessible-name="Negative"></alt-core-linear-progress>
      
      <alt-core-linear-progress indeterminate accessible-name="Loading"></alt-core-linear-progress>
    </div>
  `,
}
