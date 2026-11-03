import type { Meta, StoryObj } from '@storybook/vue3'
import { omit } from 'radash'
import { ref } from 'vue'
import { action } from 'storybook/actions'
import { AltDateRange } from '~vue/ui/dateRange'
import type { IAltVueDateRangeProps, TAltVueDateRangeValue } from '~vue/ui/dateRange/models/types'
import altCoreDateRangeStoryMeta from '~core/ui/dateRange/stories/DateRange.stories'

type TAltVueDateRangeStoryProps = Omit<IAltVueDateRangeProps, 'modelValue'> & {
  from: string | undefined
  to: string | undefined
}

/**
 * Vue wrapper for Core DateRange.
 *
 * `v-model` holds `{ from, to }`: `YYYY-MM-DD` strings, or `null` while the field is empty.
 */
const meta: Meta<TAltVueDateRangeStoryProps> = {
  title: 'Inputs/✅ DateRange',
  id: 'dateRange',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltDateRange },
    setup() {
      const { from, to, ...props } = args
      const period = ref<TAltVueDateRangeValue>({ from: from ?? null, to: to ?? null })

      const handleUpdateModelValue = (value: TAltVueDateRangeValue) => {
        period.value = value
        action('update:modelValue')(value)
      }

      return { props, period, handleUpdateModelValue }
    },
    template: `
      <div style="max-width: 320px; padding-bottom: 360px;">
        <AltDateRange v-bind="props" :model-value="period" @update:model-value="handleUpdateModelValue" />

        <p>{{ period.from ?? '—' }} – {{ period.to ?? '—' }}</p>
      </div>
    `,
  }),
  argTypes: omit(altCoreDateRangeStoryMeta.argTypes ?? {}, ['onChange']),
  args: altCoreDateRangeStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
