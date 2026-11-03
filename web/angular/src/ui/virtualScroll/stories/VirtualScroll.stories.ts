import type { Meta, StoryObj } from '@storybook/angular'
import { AltVirtualScroll } from '~ng/ui/virtualScroll'
import altCoreVirtualScrollStoryMeta from '~core/ui/virtualScroll/stories/VirtualScroll.stories'

type TVirtualScrollStoryArgs = Pick<AltVirtualScroll<string>, 'itemSize' | 'overscan' | 'accessibleName'> & { itemCount: number }

const { itemCount, itemSize, overscan, accessibleName } = altCoreVirtualScrollStoryMeta.argTypes ?? {}
const { itemCount: count, itemSize: size, overscan: overscanArg, accessibleName: name } = altCoreVirtualScrollStoryMeta.args ?? {}

/**
 * Angular wrapper for Core VirtualScroll.
 *
 * Pass `items` and an `ng-template` for a row; it gets the item as `$implicit` and its `index`. The wrapper renders only
 * the rows in view, each `itemSize` pixels high with `role="listitem"`, `aria-posinset` and `aria-setsize`.
 * `<AltVirtualScroll>` is a block: give it a `height`. It emits `rangeChange` and has `scrollToIndex` for a `@ViewChild`.
 */
const meta: Meta<TVirtualScrollStoryArgs> = {
  title: '✅ VirtualScroll',
  id: 'virtualscroll',
  parameters: { controls: { sort: 'alpha' } },
  component: AltVirtualScroll,
  tags: [
    'angular',
    'autodocs',
  ],
  render: (args) => ({
    props: { ...args, items: Array.from({ length: args.itemCount }, (_, index) => `Client ${index + 1}`) },
    template: `
      <AltVirtualScroll
        [items]="items"
        [itemSize]="itemSize"
        [overscan]="overscan"
        [accessibleName]="accessibleName"
        style="height: 240px; max-width: 360px; border: 1px solid var(--alt-core-color-stroke-primary-low);"
      >
        <ng-template let-item>
          <div style="display: flex; align-items: center; height: 100%; padding: 0 12px;">{{ item }}</div>
        </ng-template>
      </AltVirtualScroll>
    `,
  }),
  argTypes: { itemCount, itemSize, overscan, accessibleName },
  args: { itemCount: count, itemSize: size, overscan: overscanArg, accessibleName: name },
}

export default meta
type Story = StoryObj<TVirtualScrollStoryArgs>

export const Playground: Story = { args: {} }
