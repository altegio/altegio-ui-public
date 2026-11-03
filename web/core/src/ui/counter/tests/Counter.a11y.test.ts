import { afterEach, describe, expect, it } from 'vitest'
import { AltCoreCounterTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreCounter } from '~core/ui/counter'
import '~core/ui/counter'

const mountCounter = async(props: Partial<AltCoreCounter>) => {
  const counter = document.createElement(tagName)
  Object.assign(counter, props)
  document.body.append(counter)
  await waitForLitTree(counter)

  return counter
}

const getNumber = (counter: AltCoreCounter) => counter.shadowRoot?.querySelector(`.${tagName}`)

const getAccessibleName = (counter: AltCoreCounter) => counter.shadowRoot?.querySelector(`.${tagName}__accessible-name`)

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreCounter/Accessibility', () => {
  it('reads the accessible name instead of the bare number and hides the name visually', async() => {
    const counter = await mountCounter({ value: 3, accessibleName: '3 unread messages' })

    expect(getNumber(counter)?.getAttribute('aria-hidden')).toBe('true')
    expect(getAccessibleName(counter)?.textContent).toBe('3 unread messages')
    expect(getAccessibleName(counter)?.getBoundingClientRect().width).toBeLessThanOrEqual(1)
    await expectNoAxeViolations(counter, PATTERN_AXE_OPTIONS)
  })

  it('reads the number when there is no accessible name', async() => {
    const counter = await mountCounter({ value: 3 })

    expect(getNumber(counter)?.hasAttribute('aria-hidden')).toBe(false)
    expect(getAccessibleName(counter)).toBeNull()
  })

  it('caps the number at "max"', async() => {
    const counter = await mountCounter({ value: 120, max: 99 })

    expect(getNumber(counter)?.textContent.trim()).toBe('99+')

    counter.max = 200
    await waitForLitTree(counter)
    expect(getNumber(counter)?.textContent.trim()).toBe('120')
  })
})
