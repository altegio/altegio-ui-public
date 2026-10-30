import type { Meta, StoryObj } from '@storybook/vue3'

import { AltText } from '~vue/ui/text'
import { type IAltVueTextProps } from '~vue/ui/text/models/types'
import altCoreTextStoryMeta, {
  type IAltCoreTextStoryProps,
} from '~core/ui/text/stories/Text.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

type TVueTextStoryMeta = IAltVueTextProps & IAltCoreTextStoryProps

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
    components: { AltText },
    setup() {
      return { args, LOREM_IPSUM }
    },
    template: `
      <AltText v-bind="args">
        {{ args.isLongText ? LOREM_IPSUM : args.text }}
      </AltText>
    `,
  }),
  argTypes: { ...altCoreTextStoryMeta.argTypes },
  args: { ...altCoreTextStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
