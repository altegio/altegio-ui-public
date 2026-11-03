import type { Meta, StoryObj } from '@storybook/vue3'
import { AltVirtualScroll } from '~vue/ui/virtualScroll'
import type { IAltVueVirtualScrollProps } from '~vue/ui/virtualScroll/models/types'
import altCoreVirtualScrollStoryMeta from '~core/ui/virtualScroll/stories/VirtualScroll.stories'

type TVirtualScrollStoryArgs = Omit<IAltVueVirtualScrollProps<string>, 'items'> & { itemCount: number }

const { itemCount, itemSize, overscan, accessibleName } = altCoreVirtualScrollStoryMeta.argTypes ?? {}
const { itemCount: count, itemSize: size, overscan: overscanArg, accessibleName: name } = altCoreVirtualScrollStoryMeta.args ?? {}

/**
 * Vue wrapper for Core VirtualScroll.
 *
 * Pass `items` and render a row in the default slot, which gets `{ item, index }`. The wrapper renders only the rows in view,
 * each `itemSize` pixels high with `role="listitem"`, `aria-posinset` and `aria-setsize`.
 * A `class` or `style` on `<AltVirtualScroll>` sets its height. The component exposes `scrollToIndex`.
 */
const meta: Meta<TVirtualScrollStoryArgs> = {
  title: '✅ VirtualScroll',
  id: 'virtualscroll',
  parameters: { controls: { sort: 'alpha' } },
  tags: ['vue', 'autodocs'],
  render: (args) => ({
    components: { AltVirtualScroll },
    setup() {
      const items = Array.from({ length: args.itemCount }, (_, index) => `Client ${index + 1}`)

      return { args, items }
    },
    template: `
      <AltVirtualScroll
        :items="items"
        :item-size="args.itemSize"
        :overscan="args.overscan"
        :accessible-name="args.accessibleName"
        style="height: 240px; max-width: 360px; border: 1px solid var(--alt-core-color-stroke-primary-low);"
      >
        <template #default="{ item }">
          <div style="display: flex; align-items: center; height: 100%; padding: 0 12px;">{{ item }}</div>
        </template>
      </AltVirtualScroll>
    `,
  }),
  argTypes: { itemCount, itemSize, overscan, accessibleName },
  args: { itemCount: count, itemSize: size, overscan: overscanArg, accessibleName: name },
}

export default meta

type Story = StoryObj<typeof meta>

export const Playground: Story = {}
