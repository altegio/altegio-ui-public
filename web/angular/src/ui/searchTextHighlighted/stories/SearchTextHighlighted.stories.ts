import type { Meta, StoryObj } from '@storybook/angular'

import { AltSearchTextHighlighted } from '~ng/ui/searchTextHighlighted'
import altCoreSearchTextHighlightedStoryMeta from '~core/ui/searchTextHighlighted/stories/SearchTextHighlighted.stories'

/**
 * Angular wrapper for Core SearchTextHighlighted
 */
const meta: Meta<AltSearchTextHighlighted> = {
  title: '🔍 SearchTextHighlighted',
  id: 'searchTextHighlighted',
  parameters: { controls: { sort: 'alpha' } },
  component: AltSearchTextHighlighted,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args },
    template: `
      <AltSearchTextHighlighted
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
      </AltSearchTextHighlighted>`,
  }),
  argTypes: { ...altCoreSearchTextHighlightedStoryMeta.argTypes },
  args: { ...altCoreSearchTextHighlightedStoryMeta.args },
} satisfies Meta<AltSearchTextHighlighted>

export default meta
type Story = StoryObj<AltSearchTextHighlighted>

export const Playground: Story = { args: {} }
