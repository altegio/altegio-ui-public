import { afterEach, describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreMultipleSelectFieldTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreMultipleSelectField } from '~core/ui/multipleSelectField'
import type { IAltCoreSelectListItem } from '~core/ui/selectField/models/types'
import '~core/ui/multipleSelectField'

const items: IAltCoreSelectListItem[] = [
  { id: 1, label: 'Haircut' },
  { id: 2, label: 'Coloring' },
  { id: 3, label: 'Manicure' },
]

const mountSelect = async(props: Partial<AltCoreMultipleSelectField> = {}) => {
  const select = document.createElement(tagName)
  Object.assign(select, { items, labelText: 'Services', value: [], ...props })
  document.body.append(select)
  await waitForLitTree(select)

  return select
}

const getInput = (select: AltCoreMultipleSelectField) => select.fieldInput?.inputElement

const getOptions = (select: AltCoreMultipleSelectField) => Array.from(select.shadowRoot?.querySelectorAll<HTMLElement>('[role="option"]') ?? [])

const selectedTexts = (select: AltCoreMultipleSelectField) => getOptions(select)
  .filter((option) => option.getAttribute('aria-selected') === 'true')
  .map((option) => option.textContent.trim())

const getActiveOptionText = (select: AltCoreMultipleSelectField) => getInput(select)?.ariaActiveDescendantElement?.textContent.trim()

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreMultipleSelectField/Accessibility', () => {
  it('exposes a named combobox that controls a multi-select listbox', async() => {
    const select = await mountSelect({ value: [items[1]] })
    const input = getInput(select)
    const listbox = select.shadowRoot?.querySelector('[role="listbox"]')

    expect(input?.getAttribute('role')).toBe('combobox')
    expect(input?.getAttribute('aria-label')).toBe('Services')
    expect(input?.getAttribute('aria-expanded')).toBe('false')
    expect(input?.ariaControlsElements).toEqual([listbox])
    expect(listbox?.getAttribute('aria-multiselectable')).toBe('true')
    expect(getOptions(select).map((option) => option.getAttribute('aria-selected'))).toEqual([
      'false',
      'true',
      'false',
    ])
  })

  it('toggles options with Enter and Space while the list stays open', async() => {
    const select = await mountSelect()

    await userEvent.tab()
    await waitForLitTree(select)
    expect(getInput(select)?.getAttribute('aria-expanded')).toBe('true')
    await expectNoAxeViolations(select, PATTERN_AXE_OPTIONS)

    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(select)
    expect(getActiveOptionText(select)).toBe('Haircut')

    await userEvent.keyboard('{Enter}{ArrowDown}{ArrowDown} ')
    await waitForLitTree(select)
    expect(selectedTexts(select)).toEqual([
      'Haircut',
      'Manicure',
    ])
    expect(getInput(select)?.getAttribute('aria-expanded')).toBe('true')
    expect(getActiveOptionText(select)).toBe('Manicure')

    await userEvent.keyboard(' ')
    await waitForLitTree(select)
    expect(selectedTexts(select)).toEqual(['Haircut'])
  })

  it('closes with Escape keeping focus', async() => {
    const select = await mountSelect()

    await userEvent.tab()
    await userEvent.keyboard('{Escape}')
    await waitForLitTree(select)

    expect(getInput(select)?.getAttribute('aria-expanded')).toBe('false')
    expect(getDeepActiveElement()).toBe(getInput(select))
  })
})
