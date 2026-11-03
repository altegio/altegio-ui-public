import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreSelectFieldTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreSelectField } from '~core/ui/selectField'
import type { IAltCoreSelectListItem, SelectEvent } from '~core/ui/selectField/models/types'
import '~core/ui/selectField'

const items: IAltCoreSelectListItem[] = [
  { id: 1, label: 'Haircut' },
  { id: 2, label: 'Coloring' },
  { id: 3, label: 'Manicure' },
]

/** Mounts a select that, like the framework wrappers, applies the select event to its value */
const mountSelect = async(props: Partial<AltCoreSelectField> = {}) => {
  const select = document.createElement(tagName)
  Object.assign(select, { items, labelText: 'Service', isMapOptions: true, ...props })
  select.addEventListener('select', (event) => {
    select.value = (event as SelectEvent).detail.value
  })
  document.body.append(select)
  await waitForLitTree(select)

  return select
}

const getInput = (select: AltCoreSelectField) => select.fieldInput?.inputElement

const getOptions = (select: AltCoreSelectField) => Array.from(select.shadowRoot?.querySelectorAll<HTMLElement>('[role="option"]') ?? [])

const getActiveOptionText = (select: AltCoreSelectField) => getInput(select)?.ariaActiveDescendantElement?.textContent.trim()

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreSelectField/Accessibility', () => {
  it('exposes a named combobox that controls a listbox of options', async() => {
    const select = await mountSelect({ value: 2, annotationText: 'Pick one service' })
    const input = getInput(select)
    const listbox = select.shadowRoot?.querySelector('[role="listbox"]')

    expect(input?.getAttribute('role')).toBe('combobox')
    expect(input?.getAttribute('aria-label')).toBe('Service')
    expect(input?.getAttribute('aria-description')).toBe('Pick one service.')
    expect(input?.getAttribute('aria-expanded')).toBe('false')
    expect(input?.getAttribute('aria-autocomplete')).toBe('none')
    expect(input?.ariaControlsElements).toEqual([listbox])
    expect(getOptions(select).map((option) => option.getAttribute('aria-selected'))).toEqual([
      'false',
      'true',
      'false',
    ])
  })

  it('opens on focus with the selected option active and has no axe violations', async() => {
    const select = await mountSelect({ value: 2 })

    await userEvent.tab()
    await waitForLitTree(select)

    expect(getDeepActiveElement()).toBe(getInput(select))
    expect(getInput(select)?.getAttribute('aria-expanded')).toBe('true')
    expect(getActiveOptionText(select)).toBe('Coloring')
    await expectNoAxeViolations(select, PATTERN_AXE_OPTIONS)
  })

  it('moves the active option with arrow keys, Home and End, and selects it with Enter', async() => {
    const select = await mountSelect()
    const onSelect = vi.fn()
    select.addEventListener('select', onSelect)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(select)
    expect(getActiveOptionText(select)).toBe('Haircut')

    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')
    await waitForLitTree(select)
    expect(getActiveOptionText(select)).toBe('Manicure')

    await userEvent.keyboard('{Home}')
    await waitForLitTree(select)
    expect(getActiveOptionText(select)).toBe('Haircut')

    await userEvent.keyboard('{End}{ArrowUp}')
    await waitForLitTree(select)
    expect(getActiveOptionText(select)).toBe('Coloring')

    await userEvent.keyboard('{Enter}')
    await waitForLitTree(select)
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(select.value).toBe(2)
    expect(getInput(select)?.getAttribute('aria-expanded')).toBe('false')
    expect(getInput(select)?.ariaActiveDescendantElement).toBeNull()
    expect(getDeepActiveElement()).toBe(getInput(select))
  })

  it('closes with Escape keeping focus and reopens with ArrowDown', async() => {
    const select = await mountSelect({ value: 3 })

    await userEvent.tab()
    await userEvent.keyboard('{Escape}')
    await waitForLitTree(select)
    expect(getInput(select)?.getAttribute('aria-expanded')).toBe('false')
    expect(getDeepActiveElement()).toBe(getInput(select))
    expect(select.value).toBe(3)

    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(select)
    expect(getInput(select)?.getAttribute('aria-expanded')).toBe('true')
    expect(getActiveOptionText(select)).toBe('Manicure')
  })

  it('closes the list when Tab moves focus away', async() => {
    const select = await mountSelect()
    const after = document.createElement('button')
    after.textContent = 'Next'
    document.body.append(after)

    await userEvent.tab()
    await userEvent.tab()
    await waitForLitTree(select)

    expect(getInput(select)?.getAttribute('aria-expanded')).toBe('false')
  })

  it('filters with typing in a filterable select', async() => {
    const select = await mountSelect({ isFilterable: true })

    await userEvent.tab()
    expect(getInput(select)?.getAttribute('aria-autocomplete')).toBe('list')

    await userEvent.keyboard('man')
    await waitForLitTree(select)
    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(select)

    expect(getOptions(select)).toHaveLength(1)
    expect(getActiveOptionText(select)).toBe('Manicure')

    await userEvent.keyboard('{Enter}')
    await waitForLitTree(select)
    expect(select.value).toBe(3)
  })
})
