import type { Meta, StoryObj } from '@storybook/vue3'

import { AltSegmentControl } from '~vue/ui/segmentControl'
import { type IAltVueSegmentControlProps } from '~vue/ui/segmentControl/models/types'
import altSegmentControlStoryMeta from '~core/ui/segmentControl/stories/SegmentControl.stories'
import { useArgs } from 'storybook/preview-api'

type TVueSegmentControlStoryMeta = IAltVueSegmentControlProps

/**
 * Vue wrapper for Core SegmentControl
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
      components: { AltSegmentControl },
      setup() {
        const updateValue = (newValue: string | undefined) => {
          updateArgs({ value: newValue })
        }

        return { args, updateValue }
      },
      template: `
        <AltSegmentControl
         v-bind="args"
         :modelValue="args.value"
         @update:modelValue="updateValue"
       >
        </AltSegmentControl>
      `,
    }
  },
  argTypes: { ...altSegmentControlStoryMeta.argTypes },
  args: { ...altSegmentControlStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
