import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreCheckboxTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS } from '~shared/tests/a11y'
import type { AltCoreCheckbox } from '~core/ui/checkbox'
import '~core/ui/checkbox'

const getControl = (checkbox: AltCoreCheckbox) => checkbox.shadowRoot
  ?.querySelector('alt-core-simple-checkbox')
  ?.shadowRoot
  ?.querySelector('button')

/** Mounts a checkbox that, like the framework wrappers, applies the checked event to its own state */
const mountCheckbox = async(props: Partial<AltCoreCheckbox> = {}, container: HTMLElement = document.body) => {
  const checkbox = document.createElement(tagName)
  Object.assign(checkbox, { labelText: 'Accept the terms', ...props })
  checkbox.addEventListener('checked', (event) => {
    checkbox.checked = (event as CustomEvent<{ checked: boolean }>).detail.checked
  })
  container.append(checkbox)
  await checkbox.updateComplete

  return checkbox
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreCheckbox/Accessibility', () => {
  it('exposes a named checkbox with its state', async() => {
    const checkbox = await mountCheckbox({ annotationText: 'Required to continue', errors: ['Accept the terms first'], required: true })
    const control = getControl(checkbox)

    expect(control?.getAttribute('role')).toBe('checkbox')
    expect(control?.getAttribute('aria-label')).toBe('Accept the terms')
    expect(control?.getAttribute('aria-checked')).toBe('false')
    expect(control?.getAttribute('aria-required')).toBe('true')
    expect(control?.getAttribute('aria-invalid')).toBe('true')
    expect(control?.getAttribute('aria-description')).toBe('Accept the terms first. Required to continue.')
    await expectNoAxeViolations(checkbox, PATTERN_AXE_OPTIONS)
  })

  it('reports the mixed state', async() => {
    const checkbox = await mountCheckbox({ indeterminate: true })

    expect(getControl(checkbox)?.getAttribute('aria-checked')).toBe('mixed')
  })

  it('takes the accessible name from accessibleName or the label slot', async() => {
    const named = await mountCheckbox({ labelText: '', accessibleName: 'Select row' })
    expect(getControl(named)?.getAttribute('aria-label')).toBe('Select row')

    const slotted = document.createElement(tagName)
    slotted.innerHTML = '<span slot="label">Slotted <b>label</b></span>'
    document.body.append(slotted)
    await slotted.updateComplete
    await slotted.updateComplete
    expect(getControl(slotted)?.getAttribute('aria-label')).toBe('Slotted label')
  })

  it('is reached with Tab and toggled with Space', async() => {
    const checkbox = await mountCheckbox()
    const onChecked = vi.fn()
    checkbox.addEventListener('checked', onChecked)

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getControl(checkbox))

    await userEvent.keyboard(' ')
    await checkbox.updateComplete
    expect(onChecked).toHaveBeenCalledTimes(1)
    expect(checkbox.checked).toBe(true)
    expect(getControl(checkbox)?.getAttribute('aria-checked')).toBe('true')
  })

  it('moves focus to the control when focused programmatically', async() => {
    const checkbox = await mountCheckbox()

    checkbox.focus()

    expect(getDeepActiveElement()).toBe(getControl(checkbox))
  })

  it('cannot be reached or toggled when disabled', async() => {
    const checkbox = await mountCheckbox({ disabled: true })
    const onChecked = vi.fn()
    checkbox.addEventListener('checked', onChecked)

    await userEvent.tab()
    expect(getDeepActiveElement()).not.toBe(getControl(checkbox))
    expect(getControl(checkbox)?.disabled).toBe(true)
    expect(onChecked).not.toHaveBeenCalled()
  })
})

describe('Core/AltCoreCheckbox/Form', () => {
  const mountInForm = async(props: Partial<AltCoreCheckbox>) => {
    const form = document.createElement('form')
    document.body.append(form)
    const checkbox = await mountCheckbox(props, form)

    return { form, checkbox }
  }

  it('submits its value while checked', async() => {
    const { form, checkbox } = await mountInForm({ name: 'terms', value: 'yes' })

    expect(new FormData(form).get('terms')).toBeNull()

    checkbox.checked = true
    await checkbox.updateComplete
    expect(new FormData(form).get('terms')).toBe('yes')
    expect(checkbox.form).toBe(form)
  })

  it('submits "on" without a value and nothing without a name', async() => {
    const { form, checkbox } = await mountInForm({ name: 'terms', checked: true })
    expect(new FormData(form).get('terms')).toBe('on')

    checkbox.name = undefined
    await checkbox.updateComplete
    expect([...new FormData(form).keys()]).toEqual([])
  })

  it('reports valueMissing while required and unchecked', async() => {
    const { checkbox } = await mountInForm({ name: 'terms', required: true })

    expect(checkbox.validity.valueMissing).toBe(true)
    expect(checkbox.validationMessage).not.toBe('')
    expect(checkbox.checkValidity()).toBe(false)

    checkbox.checked = true
    await checkbox.updateComplete
    expect(checkbox.checkValidity()).toBe(true)
  })

  it('does not block forms when it has no name', async() => {
    const { checkbox } = await mountInForm({ required: true })

    expect(checkbox.checkValidity()).toBe(true)
  })

  it('restores the initial state on form reset', async() => {
    const { form, checkbox } = await mountInForm({ name: 'terms' })
    const onChecked = vi.fn()
    checkbox.addEventListener('checked', onChecked)

    checkbox.checked = true
    await checkbox.updateComplete
    form.reset()
    await checkbox.updateComplete

    expect(checkbox.checked).toBe(false)
    expect(onChecked).toHaveBeenCalledWith(expect.objectContaining({ detail: { checked: false } }))
  })

  it('is disabled by a disabled fieldset', async() => {
    const fieldset = document.createElement('fieldset')
    document.body.append(fieldset)
    const checkbox = await mountCheckbox({ name: 'terms' }, fieldset)

    fieldset.disabled = true
    await checkbox.updateComplete

    expect(getControl(checkbox)?.disabled).toBe(true)
  })
})
