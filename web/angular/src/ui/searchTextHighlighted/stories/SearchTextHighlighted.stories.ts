import type { Meta, StoryObj } from '@storybook/angular'

import { YSearchTextHighlighted } from '~ng/ui/searchTextHighlighted'
import yCoreSearchTextHighlightedStoryMeta from '~core/ui/searchTextHighlighted/stories/SearchTextHighlighted.stories'

/**
 * Angular-обертка над Core SearchTextHighlighted
 */
const meta: Meta<YSearchTextHighlighted> = {
  title: '🔍 SearchTextHighlighted',
  id: 'searchTextHighlighted',
  parameters: { controls: { sort: 'alpha' } },
  component: YSearchTextHighlighted,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <YSearchTextHighlighted
        [text]="text"
        [variant]="variant"
        [search]="search"
        [ignoredSymbols]="ignoredSymbols"
        [caseSensitive]="caseSensitive"
        [stopHighlight]="stopHighlight"
        [size]="size"
        [highlightTextVariant]="highlightTextVariant"
        [highlightTextSize]="highlightTextSize"
      >
      </YSearchTextHighlighted>`,
  }),
  argTypes: { ...yCoreSearchTextHighlightedStoryMeta.argTypes },
  args: { ...yCoreSearchTextHighlightedStoryMeta.args },
} satisfies Meta<YSearchTextHighlighted>

export default meta
type Story = StoryObj<YSearchTextHighlighted>

export const Playground: Story = { args: {} }
