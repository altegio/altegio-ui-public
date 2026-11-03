import { afterEach, describe, expect, it, vi } from 'vitest'
import { page, userEvent } from 'vitest/browser'
import { AltCoreTabsTagName as tagName, AltCoreTabTagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreTabs } from '~core/ui/tabs'
import type { AltCoreTab } from '~core/ui/tab'
import type { ChangeActiveTabEvent, IAltCoreTabsItem } from '~core/ui/tabs/models/types'
import { createCoreTabExternalProps } from '~core/ui/tab/models/types'
import '~core/ui/tabs'
import '~core/ui/tab'

const createItems = (texts: string[], disabledTexts: string[] = []): IAltCoreTabsItem[] => texts.map((text) => ({
  ...createCoreTabExternalProps(),
  text,
  disabled: disabledTexts.includes(text),
}))

/** Mounts tabs that, like the framework wrappers, apply the change-active-tab event to their value */
const mountTabs = async({ texts = ['Visits', 'Payments', 'Notes', 'Files'], disabledTexts = [] as string[], value = 0 } = {}) => {
  const tabs = document.createElement(tagName)
  tabs.tabs = createItems(texts, disabledTexts)
  tabs.value = value
  tabs.accessibleName = 'Client card'
  tabs.addEventListener('change-active-tab', (event) => {
    tabs.value = (event as ChangeActiveTabEvent).detail.value
  })
  document.body.append(tabs)
  await waitForLitTree(tabs)

  return tabs
}

const getTabs = (tabs: AltCoreTabs) => Array.from(tabs.shadowRoot?.querySelectorAll<AltCoreTab>(AltCoreTabTagName) ?? [])

const getTablist = (tabs: AltCoreTabs) => tabs.shadowRoot?.querySelector('[role="tablist"]')

const tabStops = (tabElements: AltCoreTab[]) => tabElements
  .filter((tab) => tab.tabIndex === 0)
  .map((tab) => tab.text)

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreTabs/Accessibility', () => {
  it('exposes a named tab list of tabs with their selected and disabled states', async() => {
    const tabs = await mountTabs({ value: 1, disabledTexts: ['Notes'] })
    const tabElements = getTabs(tabs)

    expect(getTablist(tabs)?.getAttribute('aria-label')).toBe('Client card')
    expect(tabElements.map((tab) => tab.getAttribute('role'))).toEqual([
      'tab',
      'tab',
      'tab',
      'tab',
    ])
    expect(tabElements.map((tab) => tab.getAttribute('aria-selected'))).toEqual([
      'false',
      'true',
      'false',
      'false',
    ])
    expect(tabElements[2].getAttribute('aria-disabled')).toBe('true')
    expect(tabElements[1].hasAttribute('aria-disabled')).toBe(false)
    await expectNoAxeViolations(tabs, PATTERN_AXE_OPTIONS)
  })

  it('keeps only the active tab in the tab order', async() => {
    const tabs = await mountTabs({ value: 2 })
    const tabElements = getTabs(tabs)

    expect(tabStops(tabElements)).toEqual(['Notes'])

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(tabElements[2])
  })

  it('keeps the first enabled tab in the tab order when the active tab is disabled', async() => {
    const tabs = await mountTabs({ value: 0, disabledTexts: ['Visits'] })

    expect(tabStops(getTabs(tabs))).toEqual(['Payments'])
  })

  it('moves focus with arrow keys, Home and End without activating, skipping disabled tabs', async() => {
    const tabs = await mountTabs({ disabledTexts: ['Payments'] })
    const tabElements = getTabs(tabs)
    const onChange = vi.fn()
    tabs.addEventListener('change-active-tab', onChange)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    expect(getDeepActiveElement()).toBe(tabElements[2])

    await userEvent.keyboard('{End}')
    expect(getDeepActiveElement()).toBe(tabElements[3])

    await userEvent.keyboard('{ArrowRight}')
    expect(getDeepActiveElement()).toBe(tabElements[0])

    await userEvent.keyboard('{ArrowLeft}')
    expect(getDeepActiveElement()).toBe(tabElements[3])

    await userEvent.keyboard('{Home}')
    expect(getDeepActiveElement()).toBe(tabElements[0])
    expect(onChange).not.toHaveBeenCalled()
    expect(tabs.value).toBe(0)
  })

  it('activates the focused tab with Enter and Space', async() => {
    const tabs = await mountTabs()
    const tabElements = getTabs(tabs)
    const onChange = vi.fn()
    tabs.addEventListener('change-active-tab', onChange)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(tabs)

    expect(tabs.value).toBe(1)
    expect(tabElements[1].getAttribute('aria-selected')).toBe('true')
    expect(tabStops(tabElements)).toEqual(['Payments'])

    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard(' ')
    await waitForLitTree(tabs)

    expect(tabs.value).toBe(2)
    expect(onChange).toHaveBeenCalledTimes(2)
  })

  it('gives the tab role and roving focus to slotted tabs', async() => {
    const tabs = document.createElement(tagName)
    tabs.tabs = []
    tabs.value = 1
    const tabElements = [
      'Day',
      'Week',
      'Month',
    ].map((text, index) => {
      const tab = document.createElement(AltCoreTabTagName)
      tab.text = text
      tab.active = index === 1
      tabs.append(tab)

      return tab
    })
    document.body.append(tabs)
    await waitForLitTree(document.body)

    expect(tabElements.map((tab) => tab.getAttribute('role'))).toEqual([
      'tab',
      'tab',
      'tab',
    ])
    expect(tabStops(tabElements)).toEqual(['Week'])

    await userEvent.tab()
    await userEvent.keyboard('{ArrowLeft}')
    expect(getDeepActiveElement()).toBe(tabElements[0])
    await expectNoAxeViolations(tabs, PATTERN_AXE_OPTIONS)
  })

  it('names the scroll buttons', async() => {
    // The scroll buttons are hidden on small screens
    await page.viewport(1024, 768)
    const tabs = await mountTabs({ texts: Array.from({ length: 12 }, (_, index) => `Section ${index + 1}`), value: 6 })
    tabs.style.display = 'block'
    tabs.style.width = '240px'

    await vi.waitFor(() => {
      expect(tabs.shadowRoot?.querySelectorAll('alt-core-icon-button')).toHaveLength(2)
    })

    const names = Array.from(tabs.shadowRoot?.querySelectorAll('alt-core-icon-button') ?? [])
      .map((button) => button.accessibleName)
    expect(names).toEqual([
      'Scroll left',
      'Scroll right',
    ])
  })
})

describe('Core/AltCoreTab/Accessibility', () => {
  it('adds no tab semantics outside tabs', async() => {
    const tab = document.createElement(AltCoreTabTagName)
    tab.text = 'Standalone'
    document.body.append(tab)
    await tab.updateComplete

    expect(tab.hasAttribute('role')).toBe(false)
    expect(tab.hasAttribute('tabindex')).toBe(false)
  })

  it('reverses ArrowLeft and ArrowRight in a right-to-left layout', async() => {
    const tabs = await mountTabs()
    tabs.dir = 'rtl'
    const tabElements = getTabs(tabs)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowLeft}')
    expect(getDeepActiveElement()).toBe(tabElements[1])

    await userEvent.keyboard('{ArrowRight}')
    expect(getDeepActiveElement()).toBe(tabElements[0])
  })
})
