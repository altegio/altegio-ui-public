import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import {
  AltCoreAutocompleteFieldTagName,
  AltCoreCountFieldTagName,
  AltCorePhoneFieldTagName,
  AltCoreTextareaTagName,
  AltCoreTextFieldTagName,
} from '~shared/constants'
import { getDeepActiveElement, waitForLitTree } from '~shared/tests/a11y'
import '~core/ui/textField'
import '~core/ui/textarea'
import '~core/ui/countField'
import '~core/ui/autocompleteField'
import '~core/ui/phoneField'

type TFormField = HTMLElement & {
  name?: string
  value?: string
  required?: boolean
  readonly validity: ValidityState
  readonly form: HTMLFormElement | null
}

const fields: [string, string][] = [
  ['TextField', AltCoreTextFieldTagName],
  ['Textarea', AltCoreTextareaTagName],
  ['CountField', AltCoreCountFieldTagName],
  ['AutocompleteField', AltCoreAutocompleteFieldTagName],
  ['PhoneField', AltCorePhoneFieldTagName],
]

const mountInForm = async(tagName: string, props: Partial<TFormField>) => {
  const form = document.createElement('form')
  const field = document.createElement(tagName) as TFormField
  Object.assign(field, { labelText: 'Field', ...props })
  form.append(field)
  document.body.append(form)
  await waitForLitTree(form)

  return { form, field }
}

const nativeAttachInternals = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'attachInternals')!

afterEach(() => {
  document.body.replaceChildren()
  Object.defineProperty(HTMLElement.prototype, 'attachInternals', nativeAttachInternals)
})

describe.each(['native', 'legacy'])('Core/text fields/Form/%s', (mode) => {
  beforeEach(() => {
    if (mode === 'legacy') Object.defineProperty(HTMLElement.prototype, 'attachInternals', { configurable: true, value: undefined })
  })
  for (const [
    name,
    tagName,
  ] of fields) {
    describe(name, () => {
      it('submits its value under its name', async() => {
        const { form, field } = await mountInForm(tagName, { name: 'field', value: '12' })

        expect(field.form).toBe(form)
        expect(new FormData(form).get('field')).toBe('12')

        field.value = '3'
        await waitForLitTree(form)
        expect(new FormData(form).get('field')).toBe('3')
      })

      it('submits nothing and never blocks submission without a name', async() => {
        // PhoneField has a default name, so the test clears it
        const { form } = await mountInForm(tagName, { name: '', required: true, value: '' })

        expect([...new FormData(form).keys()]).toEqual([])
        expect(form.checkValidity()).toBe(true)
      })

      it('blocks submission while it is required and empty', async() => {
        const { form, field } = await mountInForm(tagName, { name: 'field', required: true, value: '' })

        expect(field.validity.valueMissing).toBe(true)
        expect(form.checkValidity()).toBe(false)

        field.value = '5'
        await waitForLitTree(form)
        expect(form.checkValidity()).toBe(true)
      })

      it('focuses its visible input when a native form reports initial invalidity', async() => {
        const { form } = await mountInForm(tagName, { name: 'field', required: true, value: '' })

        expect(form.reportValidity()).toBe(false)
        expect(getDeepActiveElement()?.tagName).toMatch(/^(INPUT|TEXTAREA)$/)
      })

      it('restores its initial value on form reset', async() => {
        const { form, field } = await mountInForm(tagName, { name: 'field', value: '1' })

        field.value = '4'
        await waitForLitTree(form)
        form.reset()
        await waitForLitTree(form)

        expect(field.value).toBe('1')
      })

      it('is left out of submission and validation inside a disabled fieldset', async() => {
        const { form, field } = await mountInForm(tagName, { name: 'field', required: true, value: '' })
        const fieldset = document.createElement('fieldset')
        form.append(fieldset)
        fieldset.append(field)
        fieldset.disabled = true
        await waitForLitTree(form)

        expect(form.checkValidity()).toBe(true)
        expect([...new FormData(form).keys()]).toEqual([])
      })
    })
  }

  it('reports the type mismatch of an email text field', async() => {
    const { form, field } = await mountInForm(AltCoreTextFieldTagName, { name: 'email', type: 'email', value: 'not-an-email' } as Partial<TFormField>)

    expect(field.validity.typeMismatch).toBe(true)
    expect(form.checkValidity()).toBe(false)
  })

  it('emits input when a form reset restores a text field typed into', async() => {
    const { form, field } = await mountInForm(AltCoreTextFieldTagName, { name: 'field', value: '' })
    const onInput = vi.fn()
    const input = field.shadowRoot?.querySelector('alt-core-field-input')?.shadowRoot?.querySelector('input')

    await userEvent.type(input!, 'abc')
    field.addEventListener('input', onInput)
    form.reset()
    await waitForLitTree(form)

    expect(field.value).toBe('')
    expect(onInput).toHaveBeenCalledTimes(1)
  })
})
