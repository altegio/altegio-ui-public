import { html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import type { Meta, StoryObj } from '@storybook/web-components'
import { action } from 'storybook/actions'

import {
  createCoreScrollAreaProps,
  EAltCoreScrollAreaOrientation,
  type IAltCoreScrollAreaProps,
  type TAltCoreScrollAreaEvents,
} from '~core/ui/scrollArea/models/types'
import { AltCoreScrollAreaTagName as tagName } from '~shared/constants'
import { LOREM_IPSUM } from '~shared/.storybook/constants'
import { getComponentContentTable, getComponentEmitsTable, getComponentStateTable } from '~shared/.storybook/tables'

import '~core/ui/scrollArea'

type TAltCoreScrollAreaStoryMeta = IAltCoreScrollAreaProps & TAltCoreScrollAreaEvents

const { orientation, accessibleName } = createCoreScrollAreaProps()

/**
 * ## Core ScrollArea
 * A scrolling container with thin scrollbars and native scrolling.
 *
 * - Give the host a `height` or `max-height`; `orientation` picks the axes that scroll.
 * - When the content overflows, the viewport is a tab stop, so the arrow keys scroll content without links or buttons.
 *   `accessibleName` makes it a named region.
 * - `scroll-change` fires with `{ top, left, topRatio, leftRatio }`. `getScrollPosition()`, `setScrollPosition(axis, offset, behavior)`
 *   and `setScrollPercentage(axis, ratio, behavior)` read and set the position.
 */
const meta: Meta<TAltCoreScrollAreaStoryMeta> = {
  title: '✅ ScrollArea',
  id: 'scrollarea',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: (args) => html`
    <alt-core-scroll-area
      .orientation=${args.orientation}
      .accessibleName=${args.accessibleName}
      style="height: 200px; max-width: 360px;"
      @scroll-change=${action('scroll-change')}
    >
      ${repeat([1, 2, 3, 4], (paragraph) => paragraph, () => html`<p style="margin: 0 0 12px;">${LOREM_IPSUM}</p>`)}
    </alt-core-scroll-area>
  `,
  argTypes: {
    orientation: {
      control: { type: 'inline-radio' },
      options: Object.values(EAltCoreScrollAreaOrientation),
      description: 'Axes that scroll',
      ...getComponentStateTable(orientation),
    },
    accessibleName: {
      control: { type: 'text' },
      description: 'Makes the viewport a region with this name',
      ...getComponentContentTable(accessibleName),
    },
    onScrollChange: {
      type: 'function',
      description: 'Fires with `{ top, left, topRatio, leftRatio }` while the content scrolls',
      ...getComponentEmitsTable(),
    },
  },
  args: {
    orientation,
    accessibleName: 'Terms of service',
  },
}

export default meta
type Story = StoryObj<TAltCoreScrollAreaStoryMeta>

export const Playground: Story = {}
