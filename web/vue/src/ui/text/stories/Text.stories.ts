import type { Meta, StoryObj } from '@storybook/vue3'

import { YText } from '~vue/ui/text'
import { type IYVueTextProps } from '~vue/ui/text/models/types'
import yCoreTextStoryMeta, {
  type IYCoreTextStoryProps,
} from '~core/ui/text/stories/Text.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueTextStoryMeta = IYVueTextProps & IYCoreTextStoryProps

/**
 * Vue wrapper for Core Text
 */
const meta: Meta<TVueTextStoryMeta> = {
  title: '✅ Text',
  id: 'text',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { YText },
    setup() {
      return { args, LOREM_IPSUM }
    },
    template: `
      <YText v-bind="args">
        {{ args.isLongText ? LOREM_IPSUM : args.text }}
      </YText>
    `,
  }),
  argTypes: { ...yCoreTextStoryMeta.argTypes },
  args: { ...yCoreTextStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
