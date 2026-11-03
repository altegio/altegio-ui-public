import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreFormTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreForm } from '~core/ui/form'
import type { FormInvalidEvent, FormSubmitEvent } from '~core/ui/form/models/types'
import type { AltCoreTextField } from '~core/ui/textField'
import type { AltCoreCheckbox } from '~core/ui/checkbox'
import type { AltCoreSelectField } from '~core/ui/selectField'
import type { AltCoreDateRange } from '~core/ui/dateRange'
import type { AltCoreFieldInput } from '~core/ui/fieldInput'
import '~core/ui/form'
import '~core/ui/textField'
import '~core/ui/checkbox'
import '~core/ui/button'
import '~core/ui/iconButton'
import '~core/ui/brandButton'
import '~core/ui/cardButton'
import '~core/ui/selectField'
import '~core/ui/dateRange'

const FIELDS = `
  <alt-core-text-field name="name" required></alt-core-text-field>
  
  <alt-core-text-field name="email" type="email"></alt-core-text-field>
  
  <alt-core-checkbox name="terms" required></alt-core-checkbox>
  
  <alt-core-button type="submit"></alt-core-button>
  
  <alt-core-button type="reset"></alt-core-button>
`

const mountForm = async(props: Partial<AltCoreForm> = {}) => {
  const altForm = document.createElement(tagName)
  Object.assign(altForm, props)
  altForm.innerHTML = `<form>${FIELDS}</form>`
  document.body.append(altForm)

  const [name, email] = Array.from(altForm.querySelectorAll<AltCoreTextField>('alt-core-text-field'))
  const terms = altForm.querySelector<AltCoreCheckbox>('alt-core-checkbox')!
  const [submitButton, resetButton] = Array.from(altForm.querySelectorAll<HTMLElement>('alt-core-button'))
  Object.assign(name, { labelText: 'Name' })
  Object.assign(email, { labelText: 'Email' })
  Object.assign(terms, { labelText: 'I accept the terms' })
  Object.assign(submitButton, { label: 'Send' })
  Object.assign(resetButton, { label: 'Reset' })
  await waitForLitTree(altForm)

  const onSubmit = vi.fn()
  const onInvalid = vi.fn()
  const onReset = vi.fn()
  altForm.addEventListener('form-submit', onSubmit)
  altForm.addEventListener('form-invalid', onInvalid)
  altForm.addEventListener('form-reset', onReset)

  return { altForm, name, email, terms, submitButton, resetButton, onSubmit, onInvalid, onReset }
}

const getErrorText = (field: HTMLElement) => field.shadowRoot?.querySelector('alt-core-error')?.shadowRoot?.textContent.trim() ??
  field.shadowRoot?.querySelector('alt-core-error')?.textContent.trim()

const clickButton = async(button: HTMLElement) => {
  button.shadowRoot!.querySelector('alt-core-simple-button')!.shadowRoot!.querySelector('button')!.click()
  await waitForLitTree(button.closest(tagName)!)
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreForm/Accessibility', () => {
  it('turns off the browser bubbles of the wrapped form', async() => {
    const { altForm } = await mountForm()

    expect(altForm.form?.noValidate).toBe(true)
  })

  it('shows the messages in the fields, focuses the first invalid one and reports the invalid fields', async() => {
    const { altForm, name, email, terms, submitButton, onSubmit, onInvalid } = await mountForm()

    await clickButton(submitButton)
    await vi.waitFor(() => { expect(onInvalid).toHaveBeenCalledTimes(1) })
    await waitForLitTree(altForm)

    expect((onInvalid.mock.lastCall?.[0] as FormInvalidEvent).detail.controls).toEqual([name, terms])
    expect(onSubmit).not.toHaveBeenCalled()
    expect(getErrorText(name)).toContain('Fill in this field')
    expect(getErrorText(terms)).toContain('Fill in this field')
    expect(getErrorText(email) ?? '').toBe('')
    expect(getDeepActiveElement()?.getAttribute('aria-invalid')).toBe('true')
    expect(name.shadowRoot?.contains(getDeepActiveElement()) || name.shadowRoot?.querySelector('alt-core-field-input')?.shadowRoot?.contains(getDeepActiveElement())).toBe(true)
    await expectNoAxeViolations(altForm, PATTERN_AXE_OPTIONS)
  })

  it('updates a message while the user corrects the value', async() => {
    const { altForm, name, email } = await mountForm()

    await altForm.validate()
    await waitForLitTree(altForm)
    expect(getErrorText(name)).toContain('Fill in this field')

    await userEvent.keyboard('Anna')
    await waitForLitTree(altForm)
    expect(getErrorText(name) ?? '').toBe('')

    email.value = 'not an email'
    await altForm.validate()
    await waitForLitTree(altForm)
    expect(getErrorText(email)).toBeTruthy()
  })

  it('submits valid values with Enter and with a submit button', async() => {
    const { altForm, name, terms, submitButton, onSubmit, onInvalid } = await mountForm()
    name.value = 'Anna'
    terms.checked = true
    await waitForLitTree(altForm)

    name.focus()
    await userEvent.keyboard('{Enter}')
    await vi.waitFor(() => { expect(onSubmit).toHaveBeenCalledTimes(1) })

    const { formData } = (onSubmit.mock.lastCall?.[0] as FormSubmitEvent).detail
    expect(formData.get('name')).toBe('Anna')
    expect(formData.get('terms')).toBe('on')

    await clickButton(submitButton)
    await vi.waitFor(() => { expect(onSubmit).toHaveBeenCalledTimes(2) })
    expect(onInvalid).not.toHaveBeenCalled()
  })

  it.each(['alt-core-icon-button', 'alt-core-brand-button'])('submits once through %s with type="submit"', async(buttonTagName) => {
    const { altForm, name, terms, onSubmit } = await mountForm()
    name.value = 'Anna'
    terms.checked = true
    const button = document.createElement(buttonTagName)
    Object.assign(button, { accessibleName: 'Send', text: 'Send' })
    button.setAttribute('type', 'submit')
    altForm.form!.append(button)
    await waitForLitTree(altForm)

    await clickButton(button)
    await vi.waitFor(() => { expect(onSubmit).toHaveBeenCalledTimes(1) })
    await waitForLitTree(altForm)

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('submits once through another element with the type attribute', async() => {
    const { altForm, name, terms, onSubmit } = await mountForm()
    name.value = 'Anna'
    terms.checked = true
    const cardButton = document.createElement('alt-core-card-button')
    Object.assign(cardButton, { headerText: 'Send' })
    cardButton.setAttribute('type', 'submit')
    altForm.form!.append(cardButton)
    await waitForLitTree(altForm)

    cardButton.click()
    await vi.waitFor(() => { expect(onSubmit).toHaveBeenCalledTimes(1) })
    await waitForLitTree(altForm)

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('focuses the input of the first invalid select or date field', async() => {
    const altForm = document.createElement(tagName)
    altForm.innerHTML = `
      <form>
        <alt-core-select-field name="city" required></alt-core-select-field>
        
        <alt-core-date-range name="period" required></alt-core-date-range>
        
        <alt-core-button type="submit"></alt-core-button>
      </form>
    `
    document.body.append(altForm)
    const select = altForm.querySelector<AltCoreSelectField>('alt-core-select-field')!
    const dateRange = altForm.querySelector<AltCoreDateRange>('alt-core-date-range')!
    const submitButton = altForm.querySelector<HTMLElement>('alt-core-button')!
    Object.assign(select, { items: [{ id: 1, label: 'Kyiv' }], itemLabel: 'label', labelText: 'City' })
    Object.assign(dateRange, { labelText: 'Period' })
    Object.assign(submitButton, { label: 'Send' })
    await waitForLitTree(altForm)
    const onInvalid = vi.fn()
    altForm.addEventListener('form-invalid', onInvalid)
    const getInput = (root: ParentNode | null | undefined) => root?.querySelector<AltCoreFieldInput>('alt-core-field-input')?.inputElement

    await clickButton(submitButton)
    await vi.waitFor(() => { expect(onInvalid).toHaveBeenCalledTimes(1) })
    await waitForLitTree(altForm)

    expect(getDeepActiveElement()).toBe(getInput(select.shadowRoot))
    expect(getDeepActiveElement()?.getAttribute('aria-invalid')).toBe('true')
    await expectNoAxeViolations(altForm, PATTERN_AXE_OPTIONS)

    select.value = { id: 1, label: 'Kyiv' }
    await clickButton(submitButton)
    await vi.waitFor(() => { expect(onInvalid).toHaveBeenCalledTimes(2) })
    await waitForLitTree(altForm)

    expect(getDeepActiveElement()).toBe(getInput(dateRange.shadowRoot?.querySelector('alt-core-date-picker')?.shadowRoot))
    expect(getDeepActiveElement()?.getAttribute('aria-invalid')).toBe('true')
    expect(getDeepActiveElement()?.getAttribute('aria-expanded')).toBe('false')
  })

  it('counts a field with its own errors as invalid', async() => {
    const { altForm, email } = await mountForm()
    altForm.querySelector<AltCoreTextField>('alt-core-text-field')!.value = 'Anna'
    altForm.querySelector<AltCoreCheckbox>('alt-core-checkbox')!.checked = true
    email.errors = ['This email is taken']

    expect(await altForm.validate()).toBe(false)
    await waitForLitTree(altForm)
    expect(getErrorText(email)).toContain('This email is taken')
  })

  it('leaves focus in place with noErrorFocus', async() => {
    const { altForm, resetButton } = await mountForm({ noErrorFocus: true })

    resetButton.focus()
    const focused = getDeepActiveElement()
    expect(await altForm.validate()).toBe(false)

    expect(getDeepActiveElement()).toBe(focused)
  })

  it('restores the values and hides the messages on reset', async() => {
    const { altForm, name, resetButton, onReset } = await mountForm()

    await altForm.validate()
    await userEvent.keyboard('Anna')
    await waitForLitTree(altForm)
    name.value = ''
    await waitForLitTree(altForm)
    expect(getErrorText(name)).toContain('Fill in this field')

    await clickButton(resetButton)
    await vi.waitFor(() => { expect(onReset).toHaveBeenCalledTimes(1) })
    await waitForLitTree(altForm)

    expect(getErrorText(name) ?? '').toBe('')
  })

  it('skips disabled fields', async() => {
    const { altForm, name, terms } = await mountForm()
    name.disabled = true
    terms.checked = true
    await waitForLitTree(altForm)

    expect(await altForm.validate()).toBe(true)
  })
})
