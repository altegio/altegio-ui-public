import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'

import {
  createCoreStepperProps,
  EAltCoreStepperOrientation,
  type IAltCoreStepperProps,
  type TAltCoreStepperEvents,
} from '~core/ui/stepper/models/types'
import { AltCoreStepperTagName as tagName } from '~shared/constants'
import { getComponentContentTable, getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'

import '~core/ui/stepper'
import '~core/ui/step'

type TAltCoreStepperStoryMeta = IAltCoreStepperProps & TAltCoreStepperEvents

const { value, orientation, headerNav, accessibleName } = createCoreStepperProps()

/**
 * ## Core Stepper
 * A wizard that splits a long task into steps.
 *
 * - Put `alt-core-step` children with a `name` and a `title`; `caption`, `done`, `error` and `disabled` describe each step.
 * - `value` is the name of the current step, the first step by default. Only the current step's content is shown.
 * - The header is an ordered list named "Steps": the current step has `aria-current="step"`, and done and failed steps
 *   tell screen readers their state.
 * - `headerNav` turns the headers of enabled steps into buttons. `next()` and `previous()` move to the neighbouring enabled step.
 * - `change` fires with `{ value }` when the step changes from the header or these methods.
 */
const meta: Meta<TAltCoreStepperStoryMeta> = {
  title: '✅ Stepper',
  id: 'stepper',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-stepper
      .value=${args.value}
      .orientation=${args.orientation}
      .headerNav=${args.headerNav}
      .accessibleName=${args.accessibleName}
      @change=${action('change')}
    >
      <alt-core-step name="details" title="Details" caption="Name and contacts" done>
        <p>Fill in the name and the phone number.</p>
      </alt-core-step>

      <alt-core-step name="services" title="Services" caption="What the client books">
        <p>Pick the services.</p>
      </alt-core-step>

      <alt-core-step name="payment" title="Payment">
        <p>Choose how the client pays.</p>
      </alt-core-step>
    </alt-core-stepper>
  `,
  argTypes: {
    value: {
      control: { type: 'select' },
      options: ['details', 'services', 'payment'],
      description: 'Name of the current step',
      ...getComponentContentTable(value),
    },
    orientation: {
      control: { type: 'inline-radio' },
      options: Object.values(EAltCoreStepperOrientation),
      description: 'Header above the content, or beside it',
      ...getComponentStateTable(orientation),
    },
    headerNav: {
      control: { type: 'boolean' },
      description: 'Lets the user open a step from its header',
      ...getComponentStateTable(headerNav),
    },
    accessibleName: {
      control: { type: 'text' },
      description: 'Accessible name of the header list, "Steps" by default',
      ...getComponentContentTable(accessibleName),
    },
    onChange: {
      type: 'function',
      description: 'Fires with `{ value }` when the current step changes',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    value: 'services',
    orientation,
    headerNav: true,
    accessibleName,
  },
}

export default meta
type Story = StoryObj<TAltCoreStepperStoryMeta>

export const Playground: Story = {}

export const Vertical: Story = {
  parameters: { docs: { description: { story: 'Headers beside the content, with a failed and a disabled step.' } } },
  render: () => html`
    <alt-core-stepper orientation="vertical" value="check">
      <alt-core-step name="upload" title="Upload" done><p>The file is uploaded.</p></alt-core-step>

      <alt-core-step name="check" title="Check" caption="3 rows have errors" error><p>Fix the rows and upload again.</p></alt-core-step>

      <alt-core-step name="import" title="Import" disabled><p>Import the clients.</p></alt-core-step>
    </alt-core-stepper>
  `,
}
