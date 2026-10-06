import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { YDatePicker } from '~vue/ui/datePicker'
import { type IYVueDatePickerProps } from '~vue/ui/datePicker/models/types'
import yCoreDatePickerStoryMeta, { type IYCoreDatePickerStoryProps } from '~core/ui/datePicker/stories/DatePicker.stories'

type TVueDatePickerStoryMeta = IYVueDatePickerProps & IYCoreDatePickerStoryProps

/**
 * Vue-обертка над DatePicker
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
    components: { YDatePicker },
    setup() {
      const computedErrors = computed(() => args.errors ?? args.showErrors)
      return { args, computedErrors }
    },
    template: `
      <div style="padding: 50px 50px 350px; margin: 20px; border: 1px dashed black; border-radius: 8px;">
        <div style="max-width: 300px; padding: 10px; overflow: hidden">
          <YDatePicker
            v-bind="args"
            :locale="args.localeData"
            :errors="computedErrors"
          >
          </YDatePicker>
        </div>
      </div>`,
  }),
  argTypes: { ...yCoreDatePickerStoryMeta.argTypes },
  args: { ...yCoreDatePickerStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
