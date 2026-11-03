import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreCollapseTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreCollapse } from '~core/ui/collapse'
import { EAltCoreCollapseType, type CollapseMoveEvent } from '~core/ui/collapse/models/types'
import type { AltCoreCollapseItem } from '~core/ui/collapseItem'
import '~core/ui/collapse'
import '~core/ui/collapseItem'

const mountCollapse = async() => {
  const collapse = document.createElement(tagName)
  collapse.draggable = true
  collapse.innerHTML = ['Haircut', 'Coloring', 'Manicure']
    .map((label, index) => `<alt-core-collapse-item value="${index + 1}" label="${label}"><div slot="content">${label} details</div></alt-core-collapse-item>`)
    .join('')
  document.body.append(collapse)
  await waitForLitTree(collapse)

  return collapse
}

/** Two groups: Hair (Haircut, Coloring) and Nails (Manicure), each in its own nested collapse */
const mountNestedCollapse = async(opened: string[] = ['hair', 'nails'], allowCrossLevelMove = true) => {
  const group = (items: string[]) => `<alt-core-collapse>${items
    .map((label) => `<alt-core-collapse-item value="${label.toLowerCase()}" label="${label}"><div slot="content">${label} details</div></alt-core-collapse-item>`)
    .join('')}</alt-core-collapse>`
  const root = document.createElement(tagName)
  root.type = EAltCoreCollapseType.MULTIPLE
  root.value = opened
  root.innerHTML = [['hair', 'Hair', ['Haircut', 'Coloring']], ['nails', 'Nails', ['Manicure']]]
    .map(([value, label, items]) => `<alt-core-collapse-item value="${String(value)}" label="${String(label)}"><div slot="content">${group(items as string[])}</div></alt-core-collapse-item>`)
    .join('')
  document.body.append(root)
  const groups = Array.from(root.querySelectorAll<AltCoreCollapse>(`${tagName} ${tagName}`))
  for (const collapse of groups) Object.assign(collapse, { draggable: true, allowCrossLevelMove })
  await waitForLitTree(root)

  return { root, groups }
}

const getItems = (collapse: AltCoreCollapse) => Array.from(collapse.querySelectorAll<AltCoreCollapseItem>('alt-core-collapse-item'))

const getHandle = (item: AltCoreCollapseItem) => item.querySelector<HTMLElement>(':scope > [slot="before"]')

const getOrder = (collapse: AltCoreCollapse) => getItems(collapse).map((item) => item.label)

const getItem = (collapse: Element, label: string) => collapse.querySelector<AltCoreCollapseItem>(`alt-core-collapse-item[label="${label}"]`)

const getAnnouncement = (collapse: AltCoreCollapse) => collapse.shadowRoot?.querySelector('[aria-live="polite"]')?.textContent.trim()

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreCollapse/Accessibility', () => {
  it('makes each drag handle a named button in the tab order with instructions', async() => {
    const collapse = await mountCollapse()
    const handle = getHandle(getItems(collapse)[0])

    expect(handle?.getAttribute('role')).toBe('button')
    expect(handle?.tabIndex).toBe(0)
    expect(handle?.getAttribute('aria-label')).toBe('Move Haircut')
    expect(handle?.getAttribute('aria-description')).toBe('Use the up and down arrow keys to change the order')

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(handle)
    await expectNoAxeViolations(collapse, PATTERN_AXE_OPTIONS)
  })

  it('moves an item with the arrow keys, Home and End, keeps focus on its handle and announces the position', async() => {
    const collapse = await mountCollapse()
    const onMove = vi.fn()
    collapse.addEventListener('collapse-move', onMove)
    const handle = getHandle(getItems(collapse)[0])

    handle?.focus()
    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(collapse)

    expect(getOrder(collapse)).toEqual(['Coloring', 'Haircut', 'Manicure'])
    expect(getDeepActiveElement()).toBe(handle)
    expect(getAnnouncement(collapse)).toBe('Haircut: 2 of 3')
    expect((onMove.mock.lastCall?.[0] as CollapseMoveEvent).detail.order).toEqual(['2', '1', '3'])

    await userEvent.keyboard('{End}')
    expect(getOrder(collapse)).toEqual(['Coloring', 'Manicure', 'Haircut'])

    await userEvent.keyboard('{Home}')
    expect(getOrder(collapse)).toEqual(['Haircut', 'Coloring', 'Manicure'])

    await userEvent.keyboard('{ArrowUp}')
    expect(getOrder(collapse)).toEqual(['Haircut', 'Coloring', 'Manicure'])
    expect(onMove).toHaveBeenCalledTimes(3)
  })

  it('does not move an opened item', async() => {
    const collapse = await mountCollapse()
    collapse.value = '1'
    await waitForLitTree(collapse)
    const handle = getHandle(getItems(collapse)[0])

    await vi.waitFor(() => { expect(handle?.getAttribute('aria-disabled')).toBe('true') })
    handle?.focus()
    await userEvent.keyboard('{ArrowDown}')

    expect(getOrder(collapse)).toEqual(['Haircut', 'Coloring', 'Manicure'])
  })

  it('moves an item past the end of its group into the next or previous group with allowCrossLevelMove', async() => {
    const { root, groups: [hair, nails] } = await mountNestedCollapse()
    const onMove = vi.fn()
    root.addEventListener('collapse-move', onMove)
    const coloring = getItem(root, 'Coloring')
    const handle = coloring && getHandle(coloring)

    expect(handle?.getAttribute('aria-description')).toBe('Use the up and down arrow keys to change the order and to move the item to the previous or next group')

    handle?.focus()
    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(root)

    expect(getOrder(hair)).toEqual(['Haircut'])
    expect(getOrder(nails)).toEqual(['Coloring', 'Manicure'])
    expect(getDeepActiveElement()).toBe(handle)
    expect(getAnnouncement(nails)).toBe('Coloring: Nails, 1 of 2')
    expect(onMove.mock.lastCall?.[0]).toBeInstanceOf(Event)
    expect((onMove.mock.lastCall?.[0] as CollapseMoveEvent).target).toBe(nails)
    expect((onMove.mock.lastCall?.[0] as CollapseMoveEvent).detail.order).toEqual(['coloring', 'manicure'])

    await userEvent.keyboard('{ArrowUp}')
    await waitForLitTree(root)

    expect(getOrder(hair)).toEqual(['Haircut', 'Coloring'])
    expect(getOrder(nails)).toEqual(['Manicure'])
    expect(getAnnouncement(hair)).toBe('Coloring: Hair, 2 of 2')
    expect(getDeepActiveElement()).toBe(handle)
    expect(onMove).toHaveBeenCalledTimes(2)
    await expectNoAxeViolations(root, PATTERN_AXE_OPTIONS)
  })

  it('keeps an item in its group at the edges without allowCrossLevelMove', async() => {
    const { root, groups: [hair, nails] } = await mountNestedCollapse(['hair', 'nails'], false)
    const coloring = getItem(root, 'Coloring')
    const handle = coloring && getHandle(coloring)

    expect(handle?.getAttribute('aria-description')).toBe('Use the up and down arrow keys to change the order')

    handle?.focus()
    await userEvent.keyboard('{ArrowDown}')

    expect(getOrder(hair)).toEqual(['Haircut', 'Coloring'])
    expect(getOrder(nails)).toEqual(['Manicure'])
  })

  it('skips groups inside closed items', async() => {
    const { root, groups: [hair, nails] } = await mountNestedCollapse(['hair'])
    const coloring = getItem(root, 'Coloring')
    const handle = coloring && getHandle(coloring)

    handle?.focus()
    await userEvent.keyboard('{ArrowDown}')

    expect(getOrder(hair)).toEqual(['Haircut', 'Coloring'])
    expect(getOrder(nails)).toEqual(['Manicure'])
  })
})
