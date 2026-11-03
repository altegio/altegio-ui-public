import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCorePhoneFieldTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCorePhoneField } from '~core/ui/phoneField'
import type { PhoneFieldChangeEvent } from '~core/ui/phoneField/models/types'
import '~core/ui/phoneField'

const mountPhoneField = async(props: Partial<AltCorePhoneField> = {}) => {
  const field = document.createElement(tagName)
  Object.assign(field, { labelText: 'Phone', ...props })
  document.body.append(field)
  await waitForLitTree(field)

  return field
}

const getPhoneCode = (field: AltCorePhoneField) => field.shadowRoot?.querySelector<HTMLElement>('alt-core-phone-code')

const getActiveCountryId = (field: AltCorePhoneField) => getPhoneCode(field)
  ?.ariaActiveDescendantElement
  ?.getAttribute('locator')
  ?.replace('alt-core-dropdown-cell_', '')

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCorePhoneField/Accessibility', () => {
  it('makes the phone number input a named combobox for the suggestions', async() => {
    const field = await mountPhoneField()
    const input = field.fieldInput?.inputElement

    expect(input?.getAttribute('role')).toBe('combobox')
    expect(input?.getAttribute('aria-label')).toBe('Phone')
    expect(input?.getAttribute('aria-autocomplete')).toBe('list')
    expect(input?.getAttribute('aria-expanded')).toBe('false')
  })

  it('makes the country code a named select-only combobox in the tab order', async() => {
    const field = await mountPhoneField()
    const phoneCode = getPhoneCode(field)

    expect(phoneCode?.getAttribute('role')).toBe('combobox')
    expect(phoneCode?.getAttribute('aria-label')).toBe('Country code')
    expect(phoneCode?.getAttribute('aria-haspopup')).toBe('listbox')
    expect(phoneCode?.getAttribute('aria-expanded')).toBe('false')
    expect(phoneCode?.tabIndex).toBe(0)

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(phoneCode)
    await expectNoAxeViolations(field, PATTERN_AXE_OPTIONS)
  })

  it('opens the countries with the current one active and picks another with the keyboard', async() => {
    const field = await mountPhoneField()
    const onChange = vi.fn()
    field.addEventListener('change', onChange)

    getPhoneCode(field)?.focus()
    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(field)

    const listbox = field.shadowRoot?.querySelector('[role="listbox"]')
    const initialId = getActiveCountryId(field)
    expect(getPhoneCode(field)?.getAttribute('aria-expanded')).toBe('true')
    expect(getPhoneCode(field)?.getAttribute('aria-controls')).toBe(listbox?.id)
    expect(initialId).toBeDefined()
    expect(getPhoneCode(field)?.ariaActiveDescendantElement?.getAttribute('aria-selected')).toBe('true')
    await expectNoAxeViolations(field, PATTERN_AXE_OPTIONS)

    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(field)
    const nextId = getActiveCountryId(field)
    expect(nextId).not.toBe(initialId)

    await userEvent.keyboard('{Enter}')
    await waitForLitTree(field)
    expect(getPhoneCode(field)?.getAttribute('aria-expanded')).toBe('false')
    expect(String((onChange.mock.lastCall?.[0] as PhoneFieldChangeEvent).detail.meta.country?.id)).toBe(nextId)
    expect(getDeepActiveElement()).toBe(getPhoneCode(field))
  })

  it('moves to a country by typing its code and closes with Escape', async() => {
    const field = await mountPhoneField()

    getPhoneCode(field)?.focus()
    await userEvent.keyboard('44')
    await waitForLitTree(field)
    const activeCountry = getPhoneCode(field)?.ariaActiveDescendantElement?.querySelector<HTMLElement & { label?: string }>('alt-core-dropdown-cell-text')
    expect(activeCountry?.label).toMatch(/^\+44\b/)

    await userEvent.keyboard('{Escape}')
    await waitForLitTree(field)
    expect(getPhoneCode(field)?.getAttribute('aria-expanded')).toBe('false')
    expect(getDeepActiveElement()).toBe(getPhoneCode(field))
  })

  it('keeps a disabled country code out of the tab order', async() => {
    const field = await mountPhoneField({ disabled: true })

    expect(getPhoneCode(field)?.tabIndex).toBe(-1)
    expect(getPhoneCode(field)?.getAttribute('aria-disabled')).toBe('true')
  })
})
