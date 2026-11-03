import { afterEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { AltCoreVirtualScrollTagName as tagName } from '~shared/constants'
import { AltVirtualScroll } from '~vue/ui/virtualScroll'
import type { AltCoreVirtualScroll } from '~core/ui/virtualScroll'

const items = Array.from({ length: 1000 }, (_, index) => `Client ${index + 1}`)

let wrapper: VueWrapper | undefined

const mountVirtualScroll = async(props: Record<string, unknown> = {}) => {
  wrapper = mount(AltVirtualScroll, {
    props: { items, itemSize: 40, overscan: 2, accessibleName: 'Clients', ...props },
    attrs: { style: 'height: 200px;' },
    slots: { default: ({ item, index }: { item: unknown; index: number }) => h('span', `${index}: ${String(item)}`) },
    attachTo: document.body,
  })

  const coreElement = wrapper.find(tagName).element as AltCoreVirtualScroll
  await vi.waitFor(() => { expect(wrapper?.emitted('range-change')).toBeTruthy() })
  await wrapper.vm.$nextTick()

  return { wrapper, coreElement }
}

const getRows = (coreElement: AltCoreVirtualScroll) => Array.from(coreElement.children) as HTMLElement[]

afterEach(() => {
  wrapper?.unmount()
})

describe(
  'Vue/AltVirtualScroll',
  () => {
    it(
      'Should pass the props and the item count to the core component',
      async() => {
        const { coreElement } = await mountVirtualScroll()

        expect(coreElement.itemCount).toBe(1000)
        expect(coreElement.itemSize).toBe(40)
        expect(coreElement.overscan).toBe(2)
        expect(coreElement.accessibleName).toBe('Clients')
      },
    )

    it(
      'Should render only the rows in range as list items of a fixed height',
      async() => {
        const { coreElement } = await mountVirtualScroll()
        const rows = getRows(coreElement)

        expect(rows).toHaveLength(7)
        expect(rows[0].getAttribute('role')).toBe('listitem')
        expect(rows[0].getAttribute('aria-posinset')).toBe('1')
        expect(rows[0].getAttribute('aria-setsize')).toBe('1000')
        expect(rows[0].style.height).toBe('40px')
        expect(rows[0].textContent).toBe('0: Client 1')
      },
    )

    it(
      'Should render the next rows after scrolling and expose "scrollToIndex"',
      async() => {
        const { wrapper, coreElement } = await mountVirtualScroll();
(wrapper.vm as unknown as Pick<AltCoreVirtualScroll, 'scrollToIndex'>).scrollToIndex(500)

        await vi.waitFor(() => { expect(getRows(coreElement)[0]?.getAttribute('aria-posinset')).toBe('499') })
        expect(getRows(coreElement)[0].textContent).toBe('498: Client 499')
      },
    )

    it(
      'Should key rows with "itemKey"',
      async() => {
        const itemKey = vi.fn((item: string) => item)
        await mountVirtualScroll({ itemKey })

        expect(itemKey).toHaveBeenCalledWith('Client 1', 0)
      },
    )
  },
)
