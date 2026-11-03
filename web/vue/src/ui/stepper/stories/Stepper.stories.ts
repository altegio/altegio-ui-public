import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { omit } from 'radash'
import { AltStepper } from '~vue/ui/stepper'
import { AltStep } from '~vue/ui/step'
import type { IAltVueStepperProps } from '~vue/ui/stepper/models/types'
import altCoreStepperStoryMeta from '~core/ui/stepper/stories/Stepper.stories'

/**
 * Vue wrappers for Core Stepper. Use `v-model` for the current step; `next()` and `previous()` are exposed on the ref.
 */
const meta: Meta<IAltVueStepperProps> = {
  title: '✅ Stepper',
  id: 'stepper',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltStepper, AltStep },
    setup() {
      const step = ref(args.modelValue)

      return { args, step }
    },
    template: `
      <AltStepper v-bind="args" v-model="step">
        <AltStep name="details" title="Details" caption="Name and contacts" done><p>Fill in the name and the phone number.</p></AltStep>
        
        <AltStep name="services" title="Services"><p>Pick the services.</p></AltStep>
        
        <AltStep name="payment" title="Payment"><p>Choose how the client pays.</p></AltStep>
      </AltStepper>
    `,
  }),
  argTypes: {
    ...omit(altCoreStepperStoryMeta.argTypes ?? {}, ['value', 'onChange']),
    modelValue: { ...altCoreStepperStoryMeta.argTypes?.value },
  },
  args: {
    ...omit(altCoreStepperStoryMeta.args ?? {}, ['value']),
    modelValue: altCoreStepperStoryMeta.args?.value,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
