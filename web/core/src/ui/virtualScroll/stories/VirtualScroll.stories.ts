import { html } from 'lit'
import { repeat } from 'lit/directives/repeat.js'
import { useArgs } from 'storybook/preview-api'
import type { Meta, StoryObj } from '@storybook/web-components'

import {
  createCoreVirtualScrollProps,
  type IAltCoreVirtualScrollProps,
  type TAltCoreVirtualScrollEvents,
  type VirtualScrollRangeChangeEvent,
} from '~core/ui/virtualScroll/models/types'
import { AltCoreVirtualScrollTagName as tagName } from '~shared/constants'
import { getComponentContentTable, getComponentEmitsTable } from '~shared/.storybook/tables'

import '~core/ui/virtualScroll'

type TAltCoreVirtualScrollStoryMeta = IAltCoreVirtualScrollProps & TAltCoreVirtualScrollEvents & { start: number; end: number }

const { itemCount, itemSize, overscan, accessibleName } = createCoreVirtualScrollProps()

/**
 * ## Core VirtualScroll
 * A list that renders only the rows in view, for thousands of rows of the same height.
 *
 * - Set `itemCount` and `itemSize` (pixels); give the host a `height`.
 * - Listen to `range-change` and render the items from `start` to `end` into the default slot, each `itemSize` pixels high.
 *   The Vue and Angular wrappers take `items` and a template instead.
 * - Give each row `role="listitem"`, `aria-posinset` and `aria-setsize`; `accessibleName` names the list.
 * - `scrollToIndex(index, behavior)` brings a row into view.
 */
const meta: Meta<TAltCoreVirtualScrollStoryMeta> = {
  title: '✅ VirtualScroll',
  id: 'virtualscroll',
  parameters: { controls: { sort: 'alpha' } },
  component: tagName,
  tags: [
    'core',
    'autodocs',
  ],
  render: function Render(args) {
    const [{ start, end }, updateArgs] = useArgs<TAltCoreVirtualScrollStoryMeta>()
    const rows = Array.from({ length: Math.max(end - start, 0) }, (_, offset) => start + offset)

    return html`
      <alt-core-virtual-scroll
        .itemCount=${args.itemCount}
        .itemSize=${args.itemSize}
        .overscan=${args.overscan}
        .accessibleName=${args.accessibleName}
        style="height: 240px; max-width: 360px; border: 1px solid var(--alt-core-color-stroke-primary-low);"
        @range-change=${(event: VirtualScrollRangeChangeEvent) => { updateArgs(event.detail) }}
      >
        ${repeat(rows, (index) => index, (index) => html`
          <div
            role="listitem"
            aria-posinset=${index + 1}
            aria-setsize=${args.itemCount}
            style="box-sizing: border-box; display: flex; align-items: center; height: ${args.itemSize}px; padding: 0 12px;"
          >Client ${index + 1}</div>
        `)}
      </alt-core-virtual-scroll>
    `
  },
  argTypes: {
    itemCount: {
      control: { type: 'number' },
      description: 'Number of items',
      ...getComponentContentTable(itemCount),
    },
    itemSize: {
      control: { type: 'number' },
      description: 'Height of every item, in pixels',
      ...getComponentContentTable(itemSize),
    },
    overscan: {
      control: { type: 'number' },
      description: 'Items rendered beyond each edge of the view',
      ...getComponentContentTable(overscan),
    },
    accessibleName: {
      control: { type: 'text' },
      description: 'Accessible name of the list',
      ...getComponentContentTable(accessibleName),
    },
    onRangeChange: {
      type: 'function',
      description: 'Fires with `{ start, end }` when another slice of items comes into view',
      ...getComponentEmitsTable(),
    },
    start: { table: { disable: true } },
    end: { table: { disable: true } },
  },
  args: {
    itemCount: 10000,
    itemSize,
    overscan,
    accessibleName: 'Clients',
    start: 0,
    end: 0,
  },
}

export default meta
type Story = StoryObj<TAltCoreVirtualScrollStoryMeta>

export const Playground: Story = {}
