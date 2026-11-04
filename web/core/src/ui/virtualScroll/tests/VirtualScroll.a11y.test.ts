import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreVirtualScrollTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreVirtualScroll } from '~core/ui/virtualScroll'
import type { IAltCoreVirtualScrollRange, VirtualScrollRangeChangeEvent } from '~core/ui/virtualScroll/models/types'
import '~core/ui/virtualScroll'

/** Renders the rows of the current range, as the framework wrappers do */
const renderRows = (virtualScroll: AltCoreVirtualScroll, { start, end }: IAltCoreVirtualScrollRange) => {
  virtualScroll.replaceChildren(...Array.from({ length: end - start }, (_, offset) => {
    const row = document.createElement('div')
    row.setAttribute('role', 'listitem')
    row.setAttribute('aria-posinset', String(start + offset + 1))
    row.setAttribute('aria-setsize', String(virtualScroll.itemCount))
    row.style.height = `${virtualScroll.itemSize}px`
    row.textContent = `Client ${start + offset + 1}`

    return row
  }))
}

const mountVirtualScroll = async(props: Partial<AltCoreVirtualScroll> = {}) => {
  const virtualScroll = document.createElement(tagName)
  const onRange = vi.fn((range: IAltCoreVirtualScrollRange) => { renderRows(virtualScroll, range) })
  virtualScroll.addEventListener('range-change', (event) => { onRange((event as VirtualScrollRangeChangeEvent).detail) })
  Object.assign(virtualScroll, { itemCount: 1000, itemSize: 40, overscan: 2, accessibleName: 'Clients', ...props })
  virtualScroll.style.height = '200px'
  document.body.append(virtualScroll)
  await waitForLitTree(virtualScroll)
  await vi.waitFor(() => { expect(onRange).toHaveBeenCalled() })

  return { virtualScroll, onRange }
}

const getViewport = (virtualScroll: AltCoreVirtualScroll) => virtualScroll.shadowRoot!.querySelector<HTMLElement>('[part="viewport"]')!

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreVirtualScroll/Accessibility', () => {
  it('asks for the rows in view plus the overscan and keeps the full scroll height', async() => {
    const { virtualScroll } = await mountVirtualScroll()

    expect([virtualScroll.start, virtualScroll.end]).toEqual([0, 7])
    expect(virtualScroll.children).toHaveLength(7)
    expect(getViewport(virtualScroll).scrollHeight).toBe(40000)
    expect(virtualScroll.shadowRoot?.querySelector('[role="list"]')?.getAttribute('aria-label')).toBe('Clients')
    await expectNoAxeViolations(virtualScroll, PATTERN_AXE_OPTIONS)
  })

  it('moves the range while scrolling and offsets the rows', async() => {
    const { virtualScroll, onRange } = await mountVirtualScroll()

    getViewport(virtualScroll).scrollTop = 4000
    await vi.waitFor(() => { expect(virtualScroll.start).toBe(98) })
    await waitForLitTree(virtualScroll)

    expect(virtualScroll.end).toBe(107)
    expect(onRange).toHaveBeenLastCalledWith({ start: 98, end: 107 })
    expect(virtualScroll.shadowRoot?.querySelector<HTMLElement>('[role="list"]')?.style.transform).toBe('translateY(3920px)')
    expect(virtualScroll.firstElementChild?.textContent).toBe('Client 99')
  })

  it('scrolls to an index and clamps it', async() => {
    const { virtualScroll } = await mountVirtualScroll()

    virtualScroll.scrollToIndex(500)
    await vi.waitFor(() => { expect(getViewport(virtualScroll).scrollTop).toBe(20000) })

    virtualScroll.scrollToIndex(5000)
    await vi.waitFor(() => { expect(virtualScroll.end).toBe(1000) })
  })

  it('is a tab stop that scrolls with the keyboard', async() => {
    const { virtualScroll } = await mountVirtualScroll()
    const viewport = getViewport(virtualScroll)

    await vi.waitFor(() => { expect(viewport.tabIndex).toBe(0) })
    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(viewport)
    await userEvent.keyboard('{End}')
    await vi.waitFor(() => { expect(virtualScroll.end).toBe(1000) })
    await userEvent.keyboard('{Home}')
    await vi.waitFor(() => { expect(virtualScroll.start).toBe(0) })
  })

  it('leaves editing keys inside a row to the focused control', async() => {
    const { virtualScroll } = await mountVirtualScroll()
    const input = document.createElement('input')
    virtualScroll.firstElementChild!.append(input)
    const event = new KeyboardEvent('keydown', { key: 'End', bubbles: true, composed: true, cancelable: true })

    input.dispatchEvent(event)

    expect(event.defaultPrevented).toBe(false)
    expect(getViewport(virtualScroll).scrollTop).toBe(0)
  })

  it('shrinks the range when the item count drops', async() => {
    const { virtualScroll } = await mountVirtualScroll()

    virtualScroll.itemCount = 3
    await vi.waitFor(() => { expect(virtualScroll.end).toBe(3) })
    expect(getViewport(virtualScroll).hasAttribute('tabindex')).toBe(false)
  })
})
