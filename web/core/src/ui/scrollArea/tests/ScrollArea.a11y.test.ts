import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreScrollAreaTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreScrollArea } from '~core/ui/scrollArea'
import type { ScrollAreaScrollEvent } from '~core/ui/scrollArea/models/types'
import '~core/ui/scrollArea'

const mountScrollArea = async(props: Partial<AltCoreScrollArea> = {}, contentHeight = 1000) => {
  const scrollArea = document.createElement(tagName)
  Object.assign(scrollArea, props)
  scrollArea.style.height = '100px'
  scrollArea.innerHTML = `<div style="height: ${contentHeight}px; width: 2000px;">Content</div>`
  document.body.append(scrollArea)
  await waitForLitTree(scrollArea)
  await vi.waitFor(() => { expect(getViewport(scrollArea).hasAttribute('tabindex')).toBe(contentHeight > 100) })

  return scrollArea
}

const getViewport = (scrollArea: AltCoreScrollArea) => scrollArea.shadowRoot!.querySelector<HTMLElement>('[part="viewport"]')!

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreScrollArea/Accessibility', () => {
  it('makes an overflowing viewport a named region in the tab order that scrolls with the arrow keys', async() => {
    const scrollArea = await mountScrollArea({ accessibleName: 'Terms' })
    const viewport = getViewport(scrollArea)

    expect(viewport.getAttribute('role')).toBe('region')
    expect(viewport.getAttribute('aria-label')).toBe('Terms')
    expect(viewport.tabIndex).toBe(0)

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(viewport)
    await userEvent.keyboard('{ArrowDown}')
    await vi.waitFor(() => { expect(viewport.scrollTop).toBeGreaterThan(0) })
    await expectNoAxeViolations(scrollArea, PATTERN_AXE_OPTIONS)
  })

  it('leaves a viewport that does not overflow out of the tab order and unnamed', async() => {
    const scrollArea = await mountScrollArea({}, 50)
    const viewport = getViewport(scrollArea)

    expect(viewport.hasAttribute('tabindex')).toBe(false)
    expect(viewport.hasAttribute('role')).toBe(false)
  })

  it('scrolls only the axes of its orientation', async() => {
    const vertical = await mountScrollArea()
    expect(getComputedStyle(getViewport(vertical)).overflowX).toBe('hidden')

    vertical.orientation = 'both'
    await waitForLitTree(vertical)
    expect(getComputedStyle(getViewport(vertical)).overflowX).toBe('auto')

    vertical.orientation = 'horizontal'
    await waitForLitTree(vertical)
    expect(getComputedStyle(getViewport(vertical)).overflowY).toBe('hidden')
  })

  it('reads and sets the position and reports scrolling', async() => {
    const scrollArea = await mountScrollArea({ orientation: 'both' })
    const onScroll = vi.fn()
    scrollArea.addEventListener('scroll-change', onScroll)

    scrollArea.setScrollPosition('vertical', 450)
    await vi.waitFor(() => { expect(onScroll).toHaveBeenCalled() })
    expect(scrollArea.getScrollPosition()).toMatchObject({ top: 450, topRatio: 0.5 })
    expect((onScroll.mock.lastCall?.[0] as ScrollAreaScrollEvent).detail.top).toBe(450)

    scrollArea.setScrollPercentage('vertical', 1)
    await vi.waitFor(() => { expect(scrollArea.getScrollPosition().topRatio).toBe(1) })

    scrollArea.setScrollPercentage('horizontal', 2)
    await vi.waitFor(() => { expect(scrollArea.getScrollPosition().leftRatio).toBe(1) })
  })
})
