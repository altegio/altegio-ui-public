import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreDatePickerTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreDatePicker } from '~core/ui/datePicker'
import type { PickEvent } from '~core/ui/datePicker/models/types'
import '~core/ui/datePicker'

const mountDatePicker = async(props: Partial<AltCoreDatePicker> = {}) => {
  const picker = document.createElement(tagName)
  Object.assign(picker, { labelText: 'Visit date', date: '2021-01-13', ...props })
  picker.addEventListener('pick', (event) => {
    picker.date = (event as PickEvent).detail.value
  })
  document.body.append(picker)
  await waitForLitTree(picker)

  return picker
}

const getInput = (picker: AltCoreDatePicker) => picker.fieldInput?.inputElement

const getDialog = (picker: AltCoreDatePicker) => picker.shadowRoot?.querySelector('[role="dialog"]')

const isFocusInGrid = () => getDeepActiveElement()?.getAttribute('role') === 'gridcell'

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreDatePicker/Accessibility', () => {
  it('makes the input a combobox that opens a named calendar dialog', async() => {
    const picker = await mountDatePicker()
    const input = getInput(picker)

    expect(input?.getAttribute('role')).toBe('combobox')
    expect(input?.getAttribute('aria-haspopup')).toBe('dialog')
    expect(input?.getAttribute('aria-expanded')).toBe('false')

    await userEvent.tab()
    await waitForLitTree(picker)

    expect(input?.getAttribute('aria-expanded')).toBe('true')
    expect(getDialog(picker)?.getAttribute('aria-label')).toBe('Choose date')
    expect(input?.ariaControlsElements).toEqual([getDialog(picker)])
    await expectNoAxeViolations(picker, PATTERN_AXE_OPTIONS)
  })

  it('moves focus into the calendar with ArrowDown and picks a date with Enter', async() => {
    const picker = await mountDatePicker()
    const onPick = vi.fn()
    picker.addEventListener('pick', onPick)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}')
    await vi.waitFor(() => { expect(isFocusInGrid()).toBe(true) })
    expect(getDeepActiveElement()?.getAttribute('aria-label')).toBe('Wednesday, January 13, 2021')

    await userEvent.keyboard('{ArrowRight}')
    await vi.waitFor(() => { expect(getDeepActiveElement()?.getAttribute('aria-label')).toBe('Thursday, January 14, 2021') })
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(picker)

    expect((onPick.mock.lastCall?.[0] as PickEvent).detail.value).toBe('2021-01-14')
    expect(getDeepActiveElement()).toBe(getInput(picker))
    expect(getInput(picker)?.getAttribute('aria-expanded')).toBe('false')
  })

  it('closes the calendar with Escape from the grid and returns focus to the input', async() => {
    const picker = await mountDatePicker()

    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}')
    await vi.waitFor(() => { expect(isFocusInGrid()).toBe(true) })

    await userEvent.keyboard('{Escape}')
    await waitForLitTree(picker)

    expect(getDeepActiveElement()).toBe(getInput(picker))
    expect(getInput(picker)?.getAttribute('aria-expanded')).toBe('false')

    await userEvent.keyboard('{ArrowDown}')
    await vi.waitFor(() => { expect(isFocusInGrid()).toBe(true) })
  })

  it('closes the calendar with Escape from the input', async() => {
    const picker = await mountDatePicker()

    await userEvent.tab()
    await waitForLitTree(picker)
    expect(getInput(picker)?.getAttribute('aria-expanded')).toBe('true')

    await userEvent.keyboard('{Escape}')
    await waitForLitTree(picker)

    expect(getInput(picker)?.getAttribute('aria-expanded')).toBe('false')
    expect(getDeepActiveElement()).toBe(getInput(picker))
  })

  it('closes the calendar when focus leaves it for the page', async() => {
    const picker = await mountDatePicker()
    const after = document.createElement('button')
    after.textContent = 'After'
    document.body.append(after)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}')
    await vi.waitFor(() => { expect(isFocusInGrid()).toBe(true) })

    after.focus()
    await waitForLitTree(picker)

    expect(getInput(picker)?.getAttribute('aria-expanded')).toBe('false')
  })
})
