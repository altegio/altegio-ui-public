import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreSimpleCheckboxTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS } from '~shared/tests/a11y'
import type { AltCoreSimpleCheckbox } from '~core/ui/simpleCheckbox'
import '~core/ui/simpleCheckbox'

const getControl = (element: AltCoreSimpleCheckbox) => element.shadowRoot
  ?.querySelector('button')

const mount = async(props: Partial<AltCoreSimpleCheckbox> = {}) => {
  const element = document.createElement(tagName)
  Object.assign(element, { accessibleName: 'Select the appointment', ...props })
  document.body.append(element)
  await element.updateComplete

  return element
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreSimpleCheckbox/Accessibility', () => {
  it('exposes a named checkbox with its state', async() => {
    const element = await mount({ checked: true })
    const control = getControl(element)

    expect(control?.getAttribute('role')).toBe('checkbox')
    expect(control?.getAttribute('aria-label')).toBe('Select the appointment')
    expect(control?.getAttribute('aria-checked')).toBe('true')
    await expectNoAxeViolations(element, PATTERN_AXE_OPTIONS)
  })

  it('is reached with Tab and activated with Space', async() => {
    const element = await mount()
    const onChecked = vi.fn()
    element.addEventListener('checked', onChecked)

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getControl(element))

    await userEvent.keyboard(' ')
    expect(onChecked).toHaveBeenCalledTimes(1)
  })

  it('is skipped by Tab when disabled', async() => {
    const element = await mount({ disabled: true })

    await userEvent.tab()
    expect(getDeepActiveElement()).not.toBe(getControl(element))
  })
})
