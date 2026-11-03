import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreToggleTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS } from '~shared/tests/a11y'
import type { AltCoreToggle } from '~core/ui/toggle'
import '~core/ui/toggle'

const getControl = (toggle: AltCoreToggle) => toggle.shadowRoot
  ?.querySelector('alt-core-simple-toggle')
  ?.shadowRoot
  ?.querySelector('button')

/** Mounts a switch that, like the framework wrappers, applies the checked event to its own state */
const mountToggle = async(props: Partial<AltCoreToggle> = {}, container: HTMLElement = document.body) => {
  const toggle = document.createElement(tagName)
  Object.assign(toggle, { labelText: 'Online booking', ...props })
  toggle.addEventListener('checked', (event) => {
    toggle.checked = (event as CustomEvent<{ checked: boolean }>).detail.checked
  })
  container.append(toggle)
  await toggle.updateComplete

  return toggle
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreToggle/Accessibility', () => {
  it('exposes a named switch with its state', async() => {
    const toggle = await mountToggle({ annotationText: 'Clients book themselves' })
    const control = getControl(toggle)

    expect(control?.getAttribute('role')).toBe('switch')
    expect(control?.getAttribute('aria-label')).toBe('Online booking')
    expect(control?.getAttribute('aria-checked')).toBe('false')
    expect(control?.getAttribute('aria-description')).toBe('Clients book themselves.')
    await expectNoAxeViolations(toggle, PATTERN_AXE_OPTIONS)
  })

  it('prefers accessibleName over the label', async() => {
    const toggle = await mountToggle({ labelText: '', accessibleName: 'Notifications' })

    expect(getControl(toggle)?.getAttribute('aria-label')).toBe('Notifications')
  })

  it('is reached with Tab and switched with Space and Enter', async() => {
    const toggle = await mountToggle()
    const onChecked = vi.fn()
    toggle.addEventListener('checked', onChecked)

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getControl(toggle))

    await userEvent.keyboard(' ')
    await toggle.updateComplete
    expect(toggle.checked).toBe(true)
    expect(getControl(toggle)?.getAttribute('aria-checked')).toBe('true')

    await userEvent.keyboard('{Enter}')
    await toggle.updateComplete
    expect(toggle.checked).toBe(false)
    expect(onChecked).toHaveBeenCalledTimes(2)
  })
})

describe('Core/AltCoreToggle/Form', () => {
  it('submits its value while on and resets with the form', async() => {
    const form = document.createElement('form')
    document.body.append(form)
    const toggle = await mountToggle({ name: 'booking', value: 'enabled' }, form)

    expect(new FormData(form).get('booking')).toBeNull()

    toggle.checked = true
    await toggle.updateComplete
    expect(new FormData(form).get('booking')).toBe('enabled')

    form.reset()
    await toggle.updateComplete
    expect(toggle.checked).toBe(false)
    expect(new FormData(form).get('booking')).toBeNull()
  })

  it('is disabled by a disabled fieldset', async() => {
    const fieldset = document.createElement('fieldset')
    fieldset.disabled = true
    document.body.append(fieldset)
    const toggle = await mountToggle({ name: 'booking' }, fieldset)
    await toggle.updateComplete

    expect(getControl(toggle)?.disabled).toBe(true)
  })
})
