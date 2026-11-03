import type { Meta, StoryObj } from '@storybook/vue3'
import { AltScrollArea } from '~vue/ui/scrollArea'
import type { IAltVueScrollAreaProps } from '~vue/ui/scrollArea/models/types'
import altCoreScrollAreaStoryMeta from '~core/ui/scrollArea/stories/ScrollArea.stories'
import { LOREM_IPSUM } from '~shared/.storybook/constants'

/**
 * Vue wrapper for Core ScrollArea.
 *
 * A `class` or `style` on `<AltScrollArea>` reaches the core element, so give it a `height` or `max-height` there.
 * The component exposes `getScrollPosition`, `setScrollPosition` and `setScrollPercentage`.
 */
const meta: Meta<IAltVueScrollAreaProps> = {
  title: '✅ ScrollArea',
  id: 'scrollarea',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltScrollArea },
    setup() {
      return { args, paragraphs: [1, 2, 3, 4], text: LOREM_IPSUM }
    },
    template: `
      <AltScrollArea v-bind="args" style="height: 200px; max-width: 360px;">
        <p v-for="paragraph in paragraphs" :key="paragraph" style="margin: 0 0 12px;">{{ text }}</p>
      </AltScrollArea>
    `,
  }),
  argTypes: altCoreScrollAreaStoryMeta.argTypes,
  args: altCoreScrollAreaStoryMeta.args,
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
