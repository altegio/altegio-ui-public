import type { Meta, StoryObj } from '@storybook/vue3'

import { YError } from '~vue/ui/error'
import { type IYVueErrorProps } from '~vue/ui/error/models/types'
import yCoreErrorStoryMeta, { type IYCoreErrorStoryProps } from '~core/ui/error/stories/Error.stories'
import { computed } from 'vue'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueErrorStoryMeta = IYVueErrorProps & IYCoreErrorStoryProps

/**
 * Vue-обертка над Core Error
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
    components: { YError },
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
    template: '<YError v-bind="args" :errors="computedError" />',
  }),
  argTypes: { ...yCoreErrorStoryMeta.argTypes },
  args: { ...yCoreErrorStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
