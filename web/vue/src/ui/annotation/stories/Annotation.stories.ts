import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { AltAnnotation } from '~vue/ui/annotation'
import { type IAltVueAnnotationProps } from '~vue/ui/annotation/models/types'
import altCoreAnnotationStoryMeta, { type IAltCoreAnnotationStoryProps } from '~core/ui/annotation/stories/Annotation.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueAnnotationStoryMeta = IAltVueAnnotationProps & IAltCoreAnnotationStoryProps

/**
 * Vue wrapper for Core Annotation
 */
const meta: Meta<TVueAnnotationStoryMeta> = {
  title: '⚙️ Annotation',
  id: 'annotation',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltAnnotation },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.text))

      return {
        args,
        computedText,
      }
    },
    template: `
      <AltAnnotation v-bind="args">
        {{ computedText }}
      </AltAnnotation>
    `,
  }),
  argTypes: { ...altCoreAnnotationStoryMeta.argTypes },
  args: { ...altCoreAnnotationStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
