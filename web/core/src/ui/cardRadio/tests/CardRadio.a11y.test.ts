import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreCardRadioTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS } from '~shared/tests/a11y'
import type { AltCoreCardRadio } from '~core/ui/cardRadio'
import '~core/ui/cardRadio'

const getControl = (element: AltCoreCardRadio) => element.shadowRoot
  ?.querySelector('alt-core-simple-radio-button')
  ?.shadowRoot
  ?.querySelector('button')

const mount = async(props: Partial<AltCoreCardRadio> = {}) => {
  const element = document.createElement(tagName)
  Object.assign(element, { accessibleName: 'Haircut', ...props })
  document.body.append(element)
  await element.updateComplete
  await element.updateComplete

  return element
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreCardRadio/Accessibility', () => {
  it('exposes a named radio with its state', async() => {
    const element = await mount({ checked: true })
    const control = getControl(element)

    expect(control?.getAttribute('role')).toBe('radio')
    expect(control?.getAttribute('aria-label')).toBe('Haircut')
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
