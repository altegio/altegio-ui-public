import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit } from 'radash'

import '~core/ui/searchTextHighlighted'

import {
  createCoreSearchTextHighlightedProps,
  type IAltCoreSearchTextHighlightedProps,
} from '~core/ui/searchTextHighlighted/models/types'
import {
  AltCoreSearchTextHighlightedTagName as tagName,
} from '~shared/constants'
import altCoreTextStoryMeta from '~core/ui/text/stories/Text.stories'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'

const { text, search, ignoredSymbols, stopHighlight, caseSensitive } = createCoreSearchTextHighlightedProps()

/**
 * ## Core SearchTextHighlighted
 */
const meta: Meta<IAltCoreSearchTextHighlightedProps> = {
  title: '⚠️ SearchTextHighlighted',
  id: 'searchTextHighlighted',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: ({ text, variant, search, ignoredSymbols, stopHighlight, size, highlightTextVariant, highlightTextSize, caseSensitive }) => {
    return html`
      <alt-core-search-text-highlighted
        .text=${text}
        .variant=${variant}
        .search=${search}
        .ignoredSymbols=${ignoredSymbols}
        .caseSensitive=${caseSensitive}
        .stopHighlight=${stopHighlight}
        .size=${size}
        .highlightTextVariant=${highlightTextVariant}
        .highlightTextSize=${highlightTextSize}
      >
      </alt-core-search-text-highlighted>
    `
  },
  argTypes: {
    ...omit(altCoreTextStoryMeta.argTypes ?? {}, ['text', 'isLongText']),
    search: {
      type: 'string',
      description: 'Search query fragment',
      ...getComponentContentTable(search),
    },
    text: {
      type: 'string',
      description: 'Text to search',
      ...getComponentContentTable(text),
    },
    caseSensitive: {
      type: 'boolean',
      description: 'Enable case-sensitive highlighting',
      ...getComponentStateTable(caseSensitive),
    },
    stopHighlight: {
      type: 'boolean',
      description: 'Disable text highlighting',
      ...getComponentStateTable(stopHighlight),
    },
    ignoredSymbols: {
      control: { type: 'object' },
      description: 'Characters ignored during input',
      ...getComponentStateTable(ignoredSymbols),
    },
    highlightTextVariant: {
      ...altCoreTextStoryMeta.argTypes?.variant,
      description: 'Highlighted text style',
    },
    highlightTextSize: {
      ...altCoreTextStoryMeta.argTypes?.size,
      description: 'Highlighted text size',
    },
  },
  args: {
    ...omit(altCoreTextStoryMeta.args ?? {}, ['text', 'isLongText']),
    search: '',
    text: '999) 157-91-72',
    caseSensitive,
    stopHighlight: false,
    ignoredSymbols: ['-', 's', '(', ')', ' '],
    highlightTextVariant: altCoreTextStoryMeta.args?.variant,
    highlightTextSize: altCoreTextStoryMeta.args?.size,
  },
} satisfies Meta<IAltCoreSearchTextHighlightedProps>

export default meta
type Story = StoryObj<IAltCoreSearchTextHighlightedProps>

export const Playground: Story = { args: {} }
