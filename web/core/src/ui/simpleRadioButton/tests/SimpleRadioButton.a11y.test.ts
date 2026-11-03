import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS } from '~shared/tests/a11y'
import type { AltCoreSimpleRadioButton } from '~core/ui/simpleRadioButton'
import '~core/ui/simpleRadioButton'

const getControl = (element: AltCoreSimpleRadioButton) => element.shadowRoot
  ?.querySelector('button')

const mount = async(props: Partial<AltCoreSimpleRadioButton> = {}) => {
  const element = document.createElement(tagName)
  Object.assign(element, { accessibleName: 'Pay at the salon', ...props })
  document.body.append(element)
  await element.updateComplete

  return element
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreSimpleRadioButton/Accessibility', () => {
  it('exposes a named radio with its state', async() => {
    const element = await mount({ checked: true })
    const control = getControl(element)

    expect(control?.getAttribute('role')).toBe('radio')
    expect(control?.getAttribute('aria-label')).toBe('Pay at the salon')
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
