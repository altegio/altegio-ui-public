import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreAutocompleteFieldTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreAutocompleteField } from '~core/ui/autocompleteField'
import type { TAltCoreAutocompleteFieldAutocompleteOption } from '~core/ui/autocompleteField/models/types'
import '~core/ui/autocompleteField'

const options: TAltCoreAutocompleteFieldAutocompleteOption[] = [
  { id: 1, value: 'Anna Smith' },
  { id: 2, value: 'Anne Brown' },
  { id: 3, value: 'Annette Black' },
]

const mountAutocomplete = async(props: Partial<AltCoreAutocompleteField> = {}) => {
  const field = document.createElement(tagName)
  Object.assign(field, { labelText: 'Client', minSearchLength: 1, searchFunction: () => options, ...props })
  document.body.append(field)
  await waitForLitTree(field)

  return field
}

const getInput = (field: AltCoreAutocompleteField) => field.fieldInput?.inputElement

const getActiveOptionText = (field: AltCoreAutocompleteField) => getInput(field)
  ?.ariaActiveDescendantElement
  ?.querySelector('alt-core-dropdown-cell-text')
  ?.getAttribute('label')

/** Types a query and waits for the debounced search to show the suggestions */
const search = async(field: AltCoreAutocompleteField, query: string) => {
  await userEvent.click(getInput(field)!)
  await userEvent.keyboard(query)
  await vi.waitFor(() => {
    expect(field.shadowRoot?.querySelectorAll('[role="option"]')).toHaveLength(options.length)
  })
  await waitForLitTree(field)
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreAutocompleteField/Accessibility', () => {
  it('exposes a named combobox with list autocomplete', async() => {
    const field = await mountAutocomplete({ annotationText: 'Name or phone' })
    const input = getInput(field)

    expect(input?.getAttribute('role')).toBe('combobox')
    expect(input?.getAttribute('aria-label')).toBe('Client')
    expect(input?.getAttribute('aria-description')).toBe('Name or phone.')
    expect(input?.getAttribute('aria-autocomplete')).toBe('list')
    expect(input?.getAttribute('aria-expanded')).toBe('false')
  })

  it('takes its name from accessibleName when there is no label', async() => {
    const field = await mountAutocomplete({ labelText: '', accessibleName: 'Search clients' })

    expect(getInput(field)?.getAttribute('aria-label')).toBe('Search clients')
  })

  it('controls a listbox of suggestions and has no axe violations', async() => {
    const field = await mountAutocomplete()

    await search(field, 'ann')

    const listbox = field.shadowRoot?.querySelector('[role="listbox"]')
    expect(getInput(field)?.getAttribute('aria-expanded')).toBe('true')
    expect(getInput(field)?.ariaControlsElements).toEqual([listbox])
    expect(listbox?.getAttribute('aria-label')).toBe('Client')
    await expectNoAxeViolations(field, PATTERN_AXE_OPTIONS)
  })

  it('moves the active suggestion with arrow keys and selects it with Enter, keeping focus', async() => {
    const field = await mountAutocomplete()
    const onSelect = vi.fn()
    field.addEventListener('select-option', onSelect)

    await search(field, 'ann')
    expect(getActiveOptionText(field)).toBeUndefined()

    await userEvent.keyboard('{ArrowDown}{ArrowDown}')
    await waitForLitTree(field)
    expect(getActiveOptionText(field)).toBe('Anne Brown')

    await userEvent.keyboard('{ArrowUp}')
    await waitForLitTree(field)
    expect(getActiveOptionText(field)).toBe('Anna Smith')

    await userEvent.keyboard('{Enter}')
    await waitForLitTree(field)
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect((onSelect.mock.calls[0][0] as CustomEvent).detail).toEqual(options[0])
    expect(getInput(field)?.getAttribute('aria-expanded')).toBe('false')
    expect(getDeepActiveElement()).toBe(getInput(field))
  })

  it('closes with Escape and reopens with ArrowDown', async() => {
    const field = await mountAutocomplete()

    await search(field, 'ann')
    await userEvent.keyboard('{Escape}')
    await waitForLitTree(field)
    expect(getInput(field)?.getAttribute('aria-expanded')).toBe('false')
    expect(getDeepActiveElement()).toBe(getInput(field))

    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(field)
    expect(getInput(field)?.getAttribute('aria-expanded')).toBe('true')
  })

  it('keeps the native meaning of Enter without an active suggestion', async() => {
    const field = await mountAutocomplete()
    const form = document.createElement('form')
    const onSubmit = vi.fn((event: Event) => { event.preventDefault() })
    form.addEventListener('submit', onSubmit)
    form.append(field)
    document.body.append(form)
    await waitForLitTree(field)

    await userEvent.click(getInput(field)!)
    const keydown = new KeyboardEvent('keydown', { key: 'Enter', bubbles: true, composed: true, cancelable: true })
    getInput(field)?.dispatchEvent(keydown)

    expect(keydown.defaultPrevented).toBe(false)
  })

  it('names the clear button', async() => {
    const field = await mountAutocomplete({ value: 'Ann' })

    const clear = field.shadowRoot?.querySelector('alt-core-field-icon')?.shadowRoot?.querySelector('[role="button"]')
    expect(clear?.getAttribute('aria-label')).toBe('Clear')
  })
})
