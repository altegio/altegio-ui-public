import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { AltDatePicker } from '~vue/ui/datePicker'
import { type IAltVueDatePickerProps } from '~vue/ui/datePicker/models/types'
import altCoreDatePickerStoryMeta, { type IAltCoreDatePickerStoryProps } from '~core/ui/datePicker/stories/DatePicker.stories'

type TVueDatePickerStoryMeta = IAltVueDatePickerProps & IAltCoreDatePickerStoryProps

/**
 * Vue wrapper for DatePicker
 */
const meta: Meta<TVueDatePickerStoryMeta> = {
  title: 'Inputs/✅ DatePicker',
  id: 'datePicker',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltDatePicker },
    setup() {
      const computedErrors = computed(() => args.errors ?? args.showErrors)
      return { args, computedErrors }
    },
    template: `
      <div style="padding: 50px 50px 350px; margin: 20px; border: 1px dashed black; border-radius: 8px;">
        <div style="max-width: 300px; padding: 10px; overflow: hidden">
          <AltDatePicker
            v-bind="args"
            :locale="args.localeData"
            :errors="computedErrors"
          >
          </AltDatePicker>
        </div>
      </div>`,
  }),
  argTypes: { ...altCoreDatePickerStoryMeta.argTypes },
  args: { ...altCoreDatePickerStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
