import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreCalendarTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreCalendar } from '~core/ui/calendar'
import type { SelectEvent } from '~core/ui/calendar/models/types/events'
import { ru } from '~core/i18n'
import '~core/ui/calendar'

const mountCalendar = async(props: Partial<AltCoreCalendar> = {}) => {
  const calendar = document.createElement(tagName)
  Object.assign(calendar, { date: '2021-01-13', ...props })
  document.body.append(calendar)
  await waitForLitTree(calendar)

  return calendar
}

const getGrid = (calendar: AltCoreCalendar) => calendar.shadowRoot?.querySelector('[role="grid"]')

const getDayCells = (calendar: AltCoreCalendar) => Array.from(calendar.shadowRoot?.querySelectorAll<HTMLElement>('[role="gridcell"][aria-label]') ?? [])

const getFocusedLabel = () => getDeepActiveElement()?.getAttribute('aria-label')

const focusGrid = async(calendar: AltCoreCalendar) => {
  calendar.focusDate()
  await waitForLitTree(calendar)
}

const press = async(calendar: AltCoreCalendar, key: string) => {
  await userEvent.keyboard(key)
  await waitForLitTree(calendar)
  await vi.waitFor(() => { expect(getDeepActiveElement()?.getAttribute('role')).toBe('gridcell') })
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreCalendar/Accessibility', () => {
  it('is a named grid of weeks with full weekday column headers and has no axe violations', async() => {
    const calendar = await mountCalendar()
    const grid = getGrid(calendar)
    const rows = Array.from(grid?.querySelectorAll('[role="row"]') ?? [])

    expect(grid?.getAttribute('aria-label')).toBe('January 2021')
    expect(rows.every((row) => row.children.length === 7)).toBe(true)
    expect(Array.from(rows[0].children).map((header) => header.getAttribute('aria-label'))).toEqual([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ])
    await expectNoAxeViolations(calendar, PATTERN_AXE_OPTIONS)
  })

  it('starts the weeks on the first day of the locale week', async() => {
    const english = await mountCalendar()
    const russian = await mountCalendar({ locale: ru })

    // January 1, 2021 is a Friday
    expect(getDayCells(english)[0].parentElement?.children[5]).toBe(getDayCells(english)[0])
    expect(getDayCells(russian)[0].parentElement?.children[4]).toBe(getDayCells(russian)[0])
  })

  it('names each day with its full date and marks the selected day and today', async() => {
    const calendar = await mountCalendar({ date: '2021-01-13' })
    const selected = getDayCells(calendar).find((cell) => cell.getAttribute('aria-selected') === 'true')

    expect(selected?.getAttribute('aria-label')).toBe('Wednesday, January 13, 2021')
    expect(getDayCells(calendar).filter((cell) => cell.tabIndex === 0)).toEqual([selected])

    const today = await mountCalendar({ date: undefined })
    expect(getDayCells(today).find((cell) => cell.getAttribute('aria-current') === 'date')?.tabIndex).toBe(0)
  })

  it('hides the days of other months from screen readers', async() => {
    const calendar = await mountCalendar()
    const outOfMonth = Array.from(calendar.shadowRoot?.querySelectorAll('[role="gridcell"]:not([aria-label])') ?? [])

    expect(outOfMonth.length).toBeGreaterThan(0)
    expect(outOfMonth.every((cell) => cell.querySelector('[aria-hidden="true"]'))).toBe(true)
  })

  it('moves focus by day, week, week edge, month and year', async() => {
    const calendar = await mountCalendar()
    await focusGrid(calendar)
    expect(getFocusedLabel()).toBe('Wednesday, January 13, 2021')

    await press(calendar, '{ArrowRight}')
    expect(getFocusedLabel()).toBe('Thursday, January 14, 2021')

    await press(calendar, '{ArrowDown}')
    expect(getFocusedLabel()).toBe('Thursday, January 21, 2021')

    await press(calendar, '{ArrowLeft}')
    await press(calendar, '{ArrowUp}')
    expect(getFocusedLabel()).toBe('Wednesday, January 13, 2021')

    await press(calendar, '{Home}')
    expect(getFocusedLabel()).toBe('Sunday, January 10, 2021')

    await press(calendar, '{End}')
    expect(getFocusedLabel()).toBe('Saturday, January 16, 2021')

    await press(calendar, '{PageDown}')
    expect(getFocusedLabel()).toBe('Tuesday, February 16, 2021')
    expect(getGrid(calendar)?.getAttribute('aria-label')).toBe('February 2021')

    await press(calendar, '{Shift>}{PageUp}{/Shift}')
    expect(getFocusedLabel()).toBe('Sunday, February 16, 2020')
  })

  it('crosses into the previous month with the arrow keys', async() => {
    const calendar = await mountCalendar({ date: '2021-01-01' })
    await focusGrid(calendar)

    await press(calendar, '{ArrowLeft}')
    expect(getFocusedLabel()).toBe('Thursday, December 31, 2020')
    expect(getGrid(calendar)?.getAttribute('aria-label')).toBe('December 2020')
  })

  it('reverses ArrowLeft and ArrowRight in a right-to-left layout', async() => {
    const calendar = await mountCalendar({ dir: 'rtl' })
    await focusGrid(calendar)

    await press(calendar, '{ArrowLeft}')
    expect(getFocusedLabel()).toBe('Thursday, January 14, 2021')
  })

  it('selects the focused day with Enter and Space', async() => {
    const calendar = await mountCalendar()
    const onSelect = vi.fn()
    calendar.addEventListener('select', onSelect)
    await focusGrid(calendar)

    await press(calendar, '{ArrowRight}')
    await userEvent.keyboard('{Enter}')
    expect((onSelect.mock.lastCall?.[0] as SelectEvent).detail.value).toBe('2021-01-14')

    await press(calendar, '{ArrowRight}')
    await userEvent.keyboard(' ')
    expect((onSelect.mock.lastCall?.[0] as SelectEvent).detail.value).toBe('2021-01-15')
  })

  it('keeps disabled days focusable but not selectable', async() => {
    const calendar = await mountCalendar({ minDate: '2021-01-13' })
    const onSelect = vi.fn()
    calendar.addEventListener('select', onSelect)
    await focusGrid(calendar)

    await press(calendar, '{ArrowLeft}')
    expect(getDeepActiveElement()?.getAttribute('aria-disabled')).toBe('true')

    await userEvent.keyboard('{Enter}')
    expect(onSelect).not.toHaveBeenCalled()
  })
})
