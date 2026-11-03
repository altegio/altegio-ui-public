import type { Meta, StoryObj } from '@storybook/vue3'

import { AltSearchTextHighlighted } from '~vue/ui/searchTextHighlighted'
import { type IAltVueSearchTextHighlightedProps } from '~vue/ui/searchTextHighlighted/models/types'
import altCoreSearchTextHighlightedStoryMeta from '~core/ui/searchTextHighlighted/stories/SearchTextHighlighted.stories'

type TVueSearchTextHighlightedStoryMeta = IAltVueSearchTextHighlightedProps

/**
 * Vue wrapper for Core SearchTextHighlighted
 */
const meta: Meta<TVueSearchTextHighlightedStoryMeta> = {
  title: '⚠️ SearchTextHighlighted',
  id: 'searchTextHighlighted',
  parameters: { controls: { sort: 'alpha' } },
  tags: [
    'vue',
    'autodocs',
  ],
  render: (args) => ({
    components: { AltSearchTextHighlighted },
    setup() {
      return { args }
    },
    template: `
      <AltSearchTextHighlighted v-bind="args" />
    `,
  }),
  argTypes: { ...altCoreSearchTextHighlightedStoryMeta.argTypes },
  args: { ...altCoreSearchTextHighlightedStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
