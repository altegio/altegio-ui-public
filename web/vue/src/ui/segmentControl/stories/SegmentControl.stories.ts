import type { Meta, StoryObj } from '@storybook/vue3'

import { YSegmentControl } from '~vue/ui/segmentControl'
import { type IYVueSegmentControlProps } from '~vue/ui/segmentControl/models/types'
import ySegmentControlStoryMeta from '~core/ui/segmentControl/stories/SegmentControl.stories'
import { useArgs } from '@storybook/preview-api'

type TVueSegmentControlStoryMeta = IYVueSegmentControlProps

/**
 * Vue-обертка над Core SegmentControl
 */
const meta: Meta<TVueSegmentControlStoryMeta> = {
  title: '✅ SegmentControl',
  id: 'segmentControl',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => {
    const [, updateArgs] = useArgs()

    return {
      components: { YSegmentControl },
      setup() {
        const updateValue = (newValue: string | undefined) => {
          updateArgs({ value: newValue })
        }

        return { args, updateValue }
      },
      template: `
        <YSegmentControl
         v-bind="args"
         :modelValue="args.value"
         @update:modelValue="updateValue"
       >
        </YSegmentControl>
      `,
    }
  },
  argTypes: { ...ySegmentControlStoryMeta.argTypes },
  args: { ...ySegmentControlStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
