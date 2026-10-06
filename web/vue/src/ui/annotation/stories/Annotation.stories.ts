import type { Meta, StoryObj } from '@storybook/vue3'
import { computed } from 'vue'

import { YAnnotation } from '~vue/ui/annotation'
import { type IYVueAnnotationProps } from '~vue/ui/annotation/models/types'
import yCoreAnnotationStoryMeta, { type IYCoreAnnotationStoryProps } from '~core/ui/annotation/stories/Annotation.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueAnnotationStoryMeta = IYVueAnnotationProps & IYCoreAnnotationStoryProps

/**
 * Vue-обертка над Core Annotation
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
    components: { YAnnotation },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : String(args.text))

      return {
        args,
        computedText,
      }
    },
    template: `
      <YAnnotation v-bind="args">
        {{ computedText }}
      </YAnnotation>
    `,
  }),
  argTypes: { ...yCoreAnnotationStoryMeta.argTypes },
  args: { ...yCoreAnnotationStoryMeta.args },
}

export default meta
type Story = StoryObj<typeof meta>

export const Playground: Story = {}
