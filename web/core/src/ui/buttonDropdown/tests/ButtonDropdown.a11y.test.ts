import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreButtonDropdownTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import { getFocusTarget } from '~core/utils/a11y/focus-target'
import type { AltCoreButtonDropdown } from '~core/ui/buttonDropdown'
import type { ItemClickEvent } from '~core/ui/buttonDropdown/models/types'
import '~core/ui/buttonDropdown'

const items = [
  { id: 'edit', label: 'Edit' },
  { id: 'copy', label: 'Copy' },
  { id: 'delete', label: 'Delete' },
]

const mountButtonDropdown = async(props: Partial<AltCoreButtonDropdown> = {}, innerHTML = '') => {
  const dropdown = document.createElement(tagName)
  Object.assign(dropdown, { label: 'Actions', items, ...props })
  dropdown.innerHTML = innerHTML
  document.body.append(dropdown)
  await waitForLitTree(dropdown)

  return dropdown
}

const getActivator = (dropdown: AltCoreButtonDropdown) => {
  const button = dropdown.shadowRoot?.querySelector('alt-core-button')

  return button ? getFocusTarget(button) : undefined
}

const getMenu = (dropdown: AltCoreButtonDropdown) => dropdown.shadowRoot?.querySelector('[role="menu"]')

const getMenuItems = (dropdown: AltCoreButtonDropdown) => Array.from(dropdown.shadowRoot?.querySelectorAll<HTMLElement>('[role="menuitem"]') ?? [])

const getFocusedLabel = () => getDeepActiveElement()?.querySelector('[slot="label"]')?.textContent.trim()

const openWithKeyboard = async(dropdown: AltCoreButtonDropdown, key = '{Enter}') => {
  await userEvent.tab()
  await userEvent.keyboard(key)
  await waitForLitTree(dropdown)
  await vi.waitFor(() => { expect(getMenuItems(dropdown)).toContain(getDeepActiveElement()) })
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreButtonDropdown/Accessibility', () => {
  it('makes the button a menu button', async() => {
    const dropdown = await mountButtonDropdown()
    const activator = getActivator(dropdown)

    expect(activator?.getAttribute('aria-haspopup')).toBe('menu')
    expect(activator?.getAttribute('aria-expanded')).toBe('false')

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(activator)
  })

  it('opens a named menu on its first item with Enter and has no axe violations', async() => {
    const dropdown = await mountButtonDropdown()

    await openWithKeyboard(dropdown)

    expect(getActivator(dropdown)?.getAttribute('aria-expanded')).toBe('true')
    expect(getMenu(dropdown)?.getAttribute('aria-label')).toBe('Actions')
    expect(getMenuItems(dropdown).map((item) => item.tabIndex)).toEqual([-1, -1, -1])
    expect(getFocusedLabel()).toBe('Edit')
    await expectNoAxeViolations(dropdown, PATTERN_AXE_OPTIONS)
  })

  it('opens on the last item with ArrowUp', async() => {
    const dropdown = await mountButtonDropdown()

    await openWithKeyboard(dropdown, '{ArrowUp}')

    expect(getFocusedLabel()).toBe('Delete')
  })

  it('moves between items with arrows, Home, End and typed characters', async() => {
    const dropdown = await mountButtonDropdown()

    await openWithKeyboard(dropdown, '{ArrowDown}')
    expect(getFocusedLabel()).toBe('Edit')

    await userEvent.keyboard('{ArrowDown}')
    expect(getFocusedLabel()).toBe('Copy')

    await userEvent.keyboard('{End}')
    expect(getFocusedLabel()).toBe('Delete')

    await userEvent.keyboard('{ArrowDown}')
    expect(getFocusedLabel()).toBe('Edit')

    await userEvent.keyboard('{ArrowUp}')
    expect(getFocusedLabel()).toBe('Delete')

    await userEvent.keyboard('{Home}')
    expect(getFocusedLabel()).toBe('Edit')

    await userEvent.keyboard('c')
    expect(getFocusedLabel()).toBe('Copy')
  })

  it('picks an item with Enter and returns focus to the button', async() => {
    const dropdown = await mountButtonDropdown()
    const onItemClick = vi.fn()
    dropdown.addEventListener('item-click', onItemClick)

    await openWithKeyboard(dropdown)
    await userEvent.keyboard('{ArrowDown}')
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(dropdown)

    expect((onItemClick.mock.lastCall?.[0] as ItemClickEvent).detail.item.id).toBe('copy')
    expect(getActivator(dropdown)?.getAttribute('aria-expanded')).toBe('false')
    expect(getDeepActiveElement()).toBe(getActivator(dropdown))
  })

  it('keeps a disabled item focusable, marks it aria-disabled and ignores picking it', async() => {
    const dropdown = await mountButtonDropdown({ items: [items[0], { ...items[1], disabled: true }, items[2]] })
    const onItemClick = vi.fn()
    dropdown.addEventListener('item-click', onItemClick)

    await openWithKeyboard(dropdown)
    expect(getMenuItems(dropdown).map((item) => item.getAttribute('aria-disabled'))).toEqual([null, 'true', null])

    await userEvent.keyboard('{ArrowDown}')
    expect(getFocusedLabel()).toBe('Copy')

    await userEvent.keyboard('{Enter}')
    getMenuItems(dropdown)[1].click()
    await waitForLitTree(dropdown)

    expect(onItemClick).not.toHaveBeenCalled()
    expect(getActivator(dropdown)?.getAttribute('aria-expanded')).toBe('true')
    expect(getFocusedLabel()).toBe('Copy')
    await expectNoAxeViolations(dropdown, PATTERN_AXE_OPTIONS)
  })

  it.each([
    { phase: 'immediately', waitForEnter: false },
    { phase: 'after entry', waitForEnter: true },
  ])('closes with Escape $phase and returns focus to the button', async({ waitForEnter }) => {
    const dropdown = await mountButtonDropdown()

    await openWithKeyboard(dropdown)
    const innerDropdown = dropdown.shadowRoot?.querySelector('alt-core-dropdown')
    const content = innerDropdown?.shadowRoot?.querySelector('.alt-core-dropdown__content')
    expect(content).toBeInstanceOf(HTMLElement)
    if (waitForEnter) {
      await vi.waitFor(() => { expect(content?.classList.contains('fade-active')).toBe(false) })
    }
    await userEvent.keyboard('{Escape}')

    // Lit rendering can finish before the CSS leave transition closes the menu.
    await vi.waitFor(() => {
      expect(getActivator(dropdown)?.getAttribute('aria-expanded')).toBe('false')
      expect(getDeepActiveElement()).toBe(getActivator(dropdown))
      expect(innerDropdown?.shadowRoot?.querySelector('.alt-core-dropdown__content')).toBeNull()
    })
  })

  it('makes no menu of custom content', async() => {
    const dropdown = await mountButtonDropdown({}, '<div slot="content"><button>Custom</button></div>')

    expect(getActivator(dropdown)?.hasAttribute('aria-haspopup')).toBe(false)
    expect(getMenu(dropdown)).toBeNull()
  })
})
