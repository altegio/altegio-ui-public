import { html } from 'lit'
import type { Meta, StoryObj } from '@storybook/web-components'
import { omit } from 'radash'

import '~core/ui/searchTextHighlighted'

import {
  createCoreSearchTextHighlightedProps,
  type IYCoreSearchTextHighlightedProps,
} from '~core/ui/searchTextHighlighted/models/types'
import {
  YCoreSearchTextHighlightedTagName as tagName,
} from '~shared/constants'
import yCoreTextStoryMeta from '~core/ui/text/stories/Text.stories'
import { getComponentContentTable, getComponentStateTable } from '~shared/.storybook/tables'

const { text, search, ignoredSymbols, stopHighlight, caseSensitive } = createCoreSearchTextHighlightedProps()

/**
 * ## Core SearchTextHighlighted
 */
const meta: Meta<IYCoreSearchTextHighlightedProps> = {
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
      <y-core-search-text-highlighted
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
      </y-core-search-text-highlighted>
    `
  },
  argTypes: {
    ...omit(yCoreTextStoryMeta.argTypes ?? {}, ['text', 'isLongText']),
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
      ...yCoreTextStoryMeta.argTypes?.variant,
      description: 'Highlighted text style',
    },
    highlightTextSize: {
      ...yCoreTextStoryMeta.argTypes?.size,
      description: 'Highlighted text size',
    },
  },
  args: {
    ...omit(yCoreTextStoryMeta.args ?? {}, ['text', 'isLongText']),
    search: '',
    text: '999) 157-91-72',
    caseSensitive,
    stopHighlight: false,
    ignoredSymbols: ['-', 's', '(', ')', ' '],
    highlightTextVariant: yCoreTextStoryMeta.args?.variant,
    highlightTextSize: yCoreTextStoryMeta.args?.size,
  },
} satisfies Meta<IYCoreSearchTextHighlightedProps>

export default meta
type Story = StoryObj<IYCoreSearchTextHighlightedProps>

export const Playground: Story = { args: {} }
