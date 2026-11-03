import { afterEach, describe, expect, it } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreBreadcrumbsTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreBreadcrumbs } from '~core/ui/breadcrumbs'
import type { AltCoreBreadcrumbsItem } from '~core/ui/breadcrumbsItem'
import '~core/ui/breadcrumbs'
import '~core/ui/breadcrumbsItem'

const mountBreadcrumbs = async(innerHTML: string, props: Partial<AltCoreBreadcrumbs> = {}) => {
  const breadcrumbs = document.createElement(tagName)
  Object.assign(breadcrumbs, props)
  breadcrumbs.innerHTML = innerHTML
  document.body.append(breadcrumbs)
  await waitForLitTree(breadcrumbs)

  return breadcrumbs
}

const TRAIL = `
  <alt-core-breadcrumbs-item href="#settings">Settings</alt-core-breadcrumbs-item>
  
  <alt-core-breadcrumbs-item href="#staff">Team members</alt-core-breadcrumbs-item>
  
  <alt-core-breadcrumbs-item href="#anna">Anna Smith</alt-core-breadcrumbs-item>
`

const getItems = (breadcrumbs: AltCoreBreadcrumbs) => Array.from(breadcrumbs.querySelectorAll<AltCoreBreadcrumbsItem>('alt-core-breadcrumbs-item'))

const getLabel = (item: AltCoreBreadcrumbsItem) => item.shadowRoot!.querySelector<HTMLElement>('.alt-core-breadcrumbs-item__label')!

const getSeparator = (item: AltCoreBreadcrumbsItem) => item.shadowRoot!.querySelector('.alt-core-breadcrumbs-item__separator')

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreBreadcrumbs/Accessibility', () => {
  it('is a named navigation landmark with a list of items and no axe violations', async() => {
    const breadcrumbs = await mountBreadcrumbs(TRAIL)

    expect(breadcrumbs.getAttribute('role')).toBe('navigation')
    expect(breadcrumbs.getAttribute('aria-label')).toBe('Breadcrumb')
    expect(breadcrumbs.shadowRoot?.querySelector('[role="list"]')).not.toBeNull()
    expect(getItems(breadcrumbs).map((item) => item.getAttribute('role'))).toEqual(['listitem', 'listitem', 'listitem'])
    await expectNoAxeViolations(breadcrumbs, PATTERN_AXE_OPTIONS)
  })

  it('marks the last item as the current page and hides the separators', async() => {
    const breadcrumbs = await mountBreadcrumbs(TRAIL)
    const items = getItems(breadcrumbs)

    expect(items.map((item) => getLabel(item).getAttribute('aria-current'))).toEqual([null, null, 'page'])
    expect(getSeparator(items[0])).toBeNull()
    expect(getSeparator(items[1])?.getAttribute('aria-hidden')).toBe('true')
  })

  it('prefers an item marked current and follows changes to it', async() => {
    const breadcrumbs = await mountBreadcrumbs(`
      <alt-core-breadcrumbs-item href="#a">A</alt-core-breadcrumbs-item>
      
      <alt-core-breadcrumbs-item href="#b" current>B</alt-core-breadcrumbs-item>
      
      <alt-core-breadcrumbs-item href="#c">C</alt-core-breadcrumbs-item>
    `)
    const items = getItems(breadcrumbs)

    expect(items.map((item) => getLabel(item).getAttribute('aria-current'))).toEqual([null, 'page', null])

    items[1].current = false
    await waitForLitTree(breadcrumbs)

    expect(items.map((item) => getLabel(item).getAttribute('aria-current'))).toEqual([null, null, 'page'])
  })

  it('renders links with href in the tab order and plain text without it', async() => {
    const breadcrumbs = await mountBreadcrumbs(`
      <alt-core-breadcrumbs-item href="#settings">Settings</alt-core-breadcrumbs-item>
      
      <alt-core-breadcrumbs-item>Report</alt-core-breadcrumbs-item>
    `, { accessibleName: 'You are here' })
    const items = getItems(breadcrumbs)

    expect(breadcrumbs.getAttribute('aria-label')).toBe('You are here')
    expect(getLabel(items[0]).tagName).toBe('A')
    expect(getLabel(items[0]).getAttribute('href')).toBe('#settings')
    expect(getLabel(items[1]).tagName).toBe('SPAN')
    expect(getLabel(items[1]).getAttribute('aria-current')).toBe('page')

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getLabel(items[0]))
    await userEvent.tab()
    expect(getDeepActiveElement()).not.toBe(getLabel(items[1]))
  })

  it('updates separators when items are added', async() => {
    const breadcrumbs = await mountBreadcrumbs('<alt-core-breadcrumbs-item href="#a">A</alt-core-breadcrumbs-item>')
    const added = document.createElement('alt-core-breadcrumbs-item')
    added.textContent = 'B'
    breadcrumbs.append(added)
    await waitForLitTree(breadcrumbs)

    const items = getItems(breadcrumbs)

    expect(getSeparator(items[0])).toBeNull()
    expect(getSeparator(items[1])).not.toBeNull()
    expect(items.map((item) => getLabel(item).getAttribute('aria-current'))).toEqual([null, 'page'])
  })
})
