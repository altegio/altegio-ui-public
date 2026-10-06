import type { Meta, StoryObj } from '@storybook/vue3'

import { YTag } from '~vue/ui/tag'
import { type IYVueTagProps } from '~vue/ui/tag/models/types'
import yCoreTagStoryMeta, {
  type TYCoreTagMeta,
} from '~core/ui/tag/stories/Tag.stories'
import { computed } from 'vue'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueTagStoryMeta = IYVueTagProps & TYCoreTagMeta

/**
 * Vue-обертка над Core Tag
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
    components: { YTag },
    setup() {
      const computedText = computed(() => args.isLongText ? LOREM_IPSUM : args.text)

      return { args, computedText }
    },
    template: `
      <YTag v-bind="args">
        {{ computedText }}
      </YTag>
    `,
  }),
  argTypes: { ...yCoreTagStoryMeta.argTypes },
  args: { ...yCoreTagStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
