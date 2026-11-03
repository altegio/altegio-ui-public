import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreCollapseItemTagName as tagName, AltCoreCollapseTagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreCollapseItem } from '~core/ui/collapseItem'
import type { AltCoreCollapse } from '~core/ui/collapse'
import '~core/ui/collapse'
import '~core/ui/collapseItem'

const getButton = (item: AltCoreCollapseItem) => item.shadowRoot?.querySelector<HTMLElement>('[role="button"]')

const getContent = (item: AltCoreCollapseItem) => item.shadowRoot?.querySelector<HTMLElement>('[data-content]')

const mountCollapse = async() => {
  const collapse = document.createElement(AltCoreCollapseTagName) as AltCoreCollapse
  const items = [
    'contacts',
    'visits',
  ].map((value) => {
    const item = document.createElement(tagName)
    item.value = value
    item.label = `Client ${value}`
    item.innerHTML = `<a slot="content" href="#${value}">Open ${value}</a>`
    collapse.append(item)

    return item
  })
  document.body.append(collapse)
  await waitForLitTree(collapse)

  return { collapse, items }
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreCollapseItem/Accessibility', () => {
  it('exposes the header label as a button that controls the content', async() => {
    const { collapse, items } = await mountCollapse()
    const button = getButton(items[0])

    expect(button?.getAttribute('aria-expanded')).toBe('false')
    expect(button?.getAttribute('aria-controls')).toBe(getContent(items[0])?.id)
    expect(button?.textContent).toContain('Client contacts')
    await expectNoAxeViolations(collapse, PATTERN_AXE_OPTIONS)
  })

  it('toggles with Enter and Space', async() => {
    const { collapse, items } = await mountCollapse()
    const onChange = vi.fn()
    collapse.addEventListener('collapse-change', onChange)

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getButton(items[0]))

    await userEvent.keyboard('{Enter}')
    await waitForLitTree(collapse)
    expect(getButton(items[0])?.getAttribute('aria-expanded')).toBe('true')

    await userEvent.keyboard(' ')
    await waitForLitTree(collapse)
    expect(getButton(items[0])?.getAttribute('aria-expanded')).toBe('false')
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('keeps closed content out of the tab order and the accessibility tree', async() => {
    const { collapse, items } = await mountCollapse()

    expect(getContent(items[0])?.inert).toBe(true)

    await userEvent.tab()
    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getButton(items[1]))

    collapse.value = 'contacts'
    await waitForLitTree(collapse)
    expect(getContent(items[0])?.inert).toBe(false)

    await userEvent.tab({ shift: true })
    expect(getDeepActiveElement()).toBe(items[0].querySelector('a'))
  })

  it('has no button when shallow', async() => {
    const item = document.createElement(tagName)
    item.label = 'Shallow'
    item.shallow = true
    document.body.append(item)
    await waitForLitTree(item)

    expect(getButton(item)).toBeNull()
  })
})
