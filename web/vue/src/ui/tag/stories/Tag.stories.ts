import type { Meta, StoryObj } from '@storybook/vue3'

import { AltTag } from '~vue/ui/tag'
import { type IAltVueTagProps } from '~vue/ui/tag/models/types'
import altCoreTagStoryMeta, {
  type TAltCoreTagMeta,
} from '~core/ui/tag/stories/Tag.stories'
import { computed } from 'vue'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueTagStoryMeta = IAltVueTagProps & TAltCoreTagMeta

/**
 * Vue wrapper for Core Tag
 */
const meta: Meta<TVueTagStoryMeta> = {
  title: '✅ Tag',
  id: 'tag',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltTag },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : args.text)

      return { args, computedText }
    },
    template: `
      <AltTag v-bind="args">
        {{ computedText }}
      </AltTag>
    `,
  }),
  argTypes: { ...altCoreTagStoryMeta.argTypes },
  args: { ...altCoreTagStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
