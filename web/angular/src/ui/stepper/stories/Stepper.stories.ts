import type { Meta, StoryObj } from '@storybook/angular'
import { moduleMetadata } from '@storybook/angular'
import { AltStepper } from '~ng/ui/stepper'
import { AltStep } from '~ng/ui/step'
import altCoreStepperStoryMeta from '~core/ui/stepper/stories/Stepper.stories'

/**
 * Angular wrappers for Core Stepper. Works with `[(value)]`.
 */
const meta: Meta<AltStepper> = {
  title: '✅ Stepper',
  id: 'stepper',
  parameters: { controls: { sort: 'alpha' } },
  component: AltStepper,
  decorators: [moduleMetadata({ imports: [AltStep] })],
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltStepper [(value)]="value" [orientation]="orientation" [headerNav]="headerNav" [accessibleName]="accessibleName">
        <AltStep name="details" title="Details" caption="Name and contacts" [done]="true"><p>Fill in the name and the phone number.</p></AltStep>
        
        <AltStep name="services" title="Services"><p>Pick the services.</p></AltStep>
        
        <AltStep name="payment" title="Payment"><p>Choose how the client pays.</p></AltStep>
      </AltStepper>
    `,
  }),
  argTypes: altCoreStepperStoryMeta.argTypes,
  args: altCoreStepperStoryMeta.args,
}

export default meta
type Story = StoryObj<AltStepper>

export const Playground: Story = { args: {} }
