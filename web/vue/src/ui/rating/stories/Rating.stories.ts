import type { Meta, StoryObj } from '@storybook/vue3'
import { ref } from 'vue'
import { omit } from 'radash'
import { AltRating } from '~vue/ui/rating'
import type { IAltVueRatingProps } from '~vue/ui/rating/models/types'
import altCoreRatingStoryMeta from '~core/ui/rating/stories/Rating.stories'

/**
 * Vue wrapper for Core Rating. Use `v-model` for the score.
 */
const meta: Meta<IAltVueRatingProps> = {
  title: '✅ Rating',
  id: 'rating',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltRating },
    setup() {
      const score = ref(args.modelValue)

      return { args, score }
    },
    template: '<AltRating v-bind="args" v-model="score" />',
  }),
  argTypes: {
    ...omit(altCoreRatingStoryMeta.argTypes ?? {}, ['value', 'onChange']),
    modelValue: { ...altCoreRatingStoryMeta.argTypes?.value },
  },
  args: {
    ...omit(altCoreRatingStoryMeta.args ?? {}, ['value']),
    modelValue: altCoreRatingStoryMeta.args?.value,
  },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
