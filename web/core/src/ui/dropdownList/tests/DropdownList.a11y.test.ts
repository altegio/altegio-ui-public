import { afterEach, describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreDropdownListTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreDropdownList } from '~core/ui/dropdownList'
import '~core/ui/dropdownList'

const items = Array.from({ length: 30 }, (_, index) => ({ id: String(index), label: `Item ${index + 1}` }))

const mountList = async(props: Partial<AltCoreDropdownList> = {}) => {
  const list = document.createElement(tagName)
  Object.assign(list, props)
  document.body.append(list)
  await waitForLitTree(list)

  return list
}

const getScrollContainer = (list: AltCoreDropdownList) => list.shadowRoot?.querySelector<HTMLElement>(`.${tagName}`)

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreDropdownList/Accessibility', () => {
  it('makes a list that scrolls a tab stop and has no axe violations', async() => {
    const list = await mountList({ items })

    expect(getScrollContainer(list)?.getAttribute('tabindex')).toBe('0')

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getScrollContainer(list))
    await expectNoAxeViolations(list)
  })

  it('adds no tab stop to a list that fits', async() => {
    const list = await mountList({ items: items.slice(0, 2) })

    expect(getScrollContainer(list)?.hasAttribute('tabindex')).toBe(false)
  })

  it('becomes a tab stop once its content grows past the max height', async() => {
    const list = await mountList({ items: items.slice(0, 2) })

    list.items = items
    await waitForLitTree(list)

    expect(getScrollContainer(list)?.getAttribute('tabindex')).toBe('0')
  })

  it('adds no tab stop when its owner manages scrolling', async() => {
    const list = await mountList({ managedScroll: true })
    const before = document.createElement('button')
    const after = document.createElement('button')
    before.setAttribute('role', 'combobox')
    before.setAttribute('aria-label', 'Items')
    before.setAttribute('aria-expanded', 'true')
    before.setAttribute('aria-controls', 'managed-items')
    const options = items.map((item) => `<div role="option" aria-selected="false" style="height:40px">${item.label}</div>`).join('')
    list.innerHTML = `<div slot="list" id="managed-items" role="listbox" tabindex="-1" aria-label="Items">${options}</div>`
    list.before(before)
    list.after(after)
    await waitForLitTree(list)
    const listbox = list.querySelector<HTMLElement>('[role="listbox"]')!
    expect(listbox.scrollHeight).toBeGreaterThan(listbox.clientHeight)
    before.focus()

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(after)
    await expectNoAxeViolations(list)
  })
})
