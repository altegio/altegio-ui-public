import type { Meta, StoryObj } from '@storybook/vue3'

import { YSearchTextHighlighted } from '~vue/ui/searchTextHighlighted'
import { type IYVueSearchTextHighlightedProps } from '~vue/ui/searchTextHighlighted/models/types'
import yCoreSearchTextHighlightedStoryMeta from '~core/ui/searchTextHighlighted/stories/SearchTextHighlighted.stories'

type TVueSearchTextHighlightedStoryMeta = IYVueSearchTextHighlightedProps

/**
 * Vue-обертка над Core SearchTextHighlighted
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
    components: { YSearchTextHighlighted },
    setup() {
      return { args }
    },
    template: `
      <YSearchTextHighlighted v-bind="args" />
    `,
  }),
  argTypes: { ...yCoreSearchTextHighlightedStoryMeta.argTypes },
  args: { ...yCoreSearchTextHighlightedStoryMeta.args },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
