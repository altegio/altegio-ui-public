import type { Meta, StoryObj } from '@storybook/vue3'

import { AltError } from '~vue/ui/error'
import { type IAltVueErrorProps } from '~vue/ui/error/models/types'
import altCoreErrorStoryMeta, { type IAltCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import { computed } from 'vue'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueErrorStoryMeta = IAltVueErrorProps & IAltCoreErrorStoryProps

/**
 * Vue wrapper for Core Error
 */
const meta: Meta<TVueErrorStoryMeta> = {
  title: '⚙️ Error',
  id: 'error',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltError },
    setup() {
      const computedError = computed(() => {
        if (args.isLongText) {
          return args.showErrors.length > 1
            ? [
              LOREM_IPSUM,
              LOREM_IPSUM,
            ]
            : [LOREM_IPSUM]
        }
        return args.errors || args.showErrors
      })
      return { args, computedError }
    },
    template: '<AltError v-bind="args" :errors="computedError" />',
  }),
  argTypes: { ...altCoreErrorStoryMeta.argTypes },
  args: { ...altCoreErrorStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
