import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCorePaginationTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import '~core/ui/pagination'

const getButtons = (pagination: Element) => Array
  .from(pagination.shadowRoot?.querySelectorAll('alt-core-simple-button, alt-core-icon-button') ?? [])
  .map((element) => element.shadowRoot?.querySelector('button') ??
    element.shadowRoot?.querySelector('alt-core-simple-button')?.shadowRoot?.querySelector('button'))

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCorePagination/Accessibility', () => {
  it('is a named navigation landmark with named arrows and the current page', async() => {
    document.documentElement.lang = 'en'
    const pagination = document.createElement(tagName)
    Object.assign(pagination, { page: 2, itemsPerPage: 10, total: 30 })
    document.body.append(pagination)
    await waitForLitTree(document.body)

    const [
      previous,
      first,
      current,,
      next,
    ] = getButtons(pagination)

    expect(pagination.shadowRoot?.querySelector('nav')?.getAttribute('aria-label')).toBe('Pagination')
    expect(previous?.getAttribute('aria-label')).toBe('Previous page')
    expect(next?.getAttribute('aria-label')).toBe('Next page')
    expect(current?.getAttribute('aria-current')).toBe('page')
    expect(first?.hasAttribute('aria-current')).toBe(false)
    await expectNoAxeViolations(pagination, PATTERN_AXE_OPTIONS)
  })

  it('changes the page with the keyboard', async() => {
    const pagination = document.createElement(tagName)
    Object.assign(pagination, { page: 1, itemsPerPage: 10, total: 30 })
    const onChangePage = vi.fn()
    pagination.addEventListener('change-page', onChangePage)
    document.body.append(pagination)
    await waitForLitTree(document.body)

    // The previous arrow and the current page are disabled, so Tab reaches page 2 first
    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getButtons(pagination)[2])

    await userEvent.keyboard('{Enter}')
    expect(onChangePage).toHaveBeenCalledTimes(1)
    expect((onChangePage.mock.calls[0][0] as CustomEvent<{ page: number }>).detail.page).toBe(2)
  })
})
