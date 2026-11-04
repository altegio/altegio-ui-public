import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { LitElement } from 'lit'
import { FormAssociated, registerFormResetHandler } from '~core/utils/a11y/form-associated'
import { getAssociatedControl } from '~core/utils/a11y/legacy-form-internals'
import type * as LegacyHelpers from '~core/utils/a11y/legacy-form-internals'
import type * as FormHelpers from '~core/utils/a11y/form-associated'
import { getDeepActiveElement, waitForLitTree } from '~shared/tests/a11y'
import type { FormInvalidEvent, FormSubmitEvent } from '~core/ui/form/models/types'
import { createFormData, requestFormSubmit } from '~core/utils/form-submit'
import '~core/ui/form'
import '~core/ui/textField'
import '~core/ui/selectField'
import '~core/ui/multipleSelectField'
import '~core/ui/button'

const attachInternals = Object.getOwnPropertyDescriptor(HTMLElement.prototype, 'attachInternals')!
const requestSubmit = Object.getOwnPropertyDescriptor(HTMLFormElement.prototype, 'requestSubmit')!

class CompatFileField extends FormAssociated(LitElement) {
  protected get formValue() {
    const data = new FormData()
    data.append(this.name ?? '', new File(['contents'], 'example.txt', { type: 'text/plain' }))

    return data
  }
}
customElements.define('compat-file-field', CompatFileField)

const mount = async(markup: string) => {
  const wrapper = document.createElement('alt-core-form')
  wrapper.innerHTML = `<form>${markup}</form>`
  document.body.append(wrapper)
  await waitForLitTree(wrapper)

  return { wrapper, form: wrapper.form! }
}

afterEach(() => {
  document.body.replaceChildren()
  Object.defineProperty(HTMLElement.prototype, 'attachInternals', attachInternals)
  Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', requestSubmit)
})

describe.each(['native', 'legacy'] as const)('Core/form participation/%s', (mode) => {
  beforeEach(() => {
    if (mode === 'legacy') Object.defineProperty(HTMLElement.prototype, 'attachInternals', { configurable: true, value: undefined })
  })

  it.each(['disabled', 'readonly', 'unnamed', 'fieldset'])('excludes %s fields with external errors from validation and focus', async(state) => {
    const attributes = state === 'unnamed' ? '' : `name="email" ${state === 'disabled' || state === 'readonly' ? state : ''}`
    const markup = `<alt-core-text-field ${attributes} label-text="Email" required></alt-core-text-field>`
    const { wrapper, form } = await mount(state === 'fieldset' ? `<fieldset disabled>${markup}</fieldset>` : markup)
    const field = wrapper.querySelector('alt-core-text-field')!
    field.errors = ['Server error']
    const sentinel = document.createElement('button')
    document.body.append(sentinel)
    sentinel.focus()
    const invalid = vi.fn()
    wrapper.addEventListener('form-invalid', invalid)
    await waitForLitTree(wrapper)

    expect(field.willValidate).toBe(false)
    expect(await wrapper.validate()).toBe(true)
    expect(form.checkValidity()).toBe(true)
    expect(getDeepActiveElement()).toBe(sentinel)
    expect(invalid).not.toHaveBeenCalled()
    expect(field.errors).toEqual(['Server error'])
  })

  it('validates enabled fields in document order alongside native controls', async() => {
    const { wrapper } = await mount('<fieldset disabled><alt-core-text-field name="skip" required></alt-core-text-field></fieldset><input name="native" required><alt-core-text-field name="email" required label-text="Email"></alt-core-text-field>')
    const input = wrapper.querySelector<HTMLInputElement>('input[name="native"]')!
    const fields = wrapper.querySelectorAll('alt-core-text-field')
    fields[0].errors = ['Server error']
    const invalid = vi.fn()
    wrapper.addEventListener('form-invalid', invalid)

    expect(await wrapper.validate()).toBe(false)
    expect((invalid.mock.lastCall?.[0] as FormInvalidEvent).detail.controls).toEqual([input, fields[1]])
    expect(getDeepActiveElement()).toBe(input)

    input.value = 'valid'
    expect(await wrapper.validate()).toBe(false)
    await waitForLitTree(wrapper)
    expect(getDeepActiveElement()).toBe(fields[1].fieldInput?.inputElement)
  })

  it('excludes disabled, readonly and hidden native controls, including custom validity', async() => {
    const { wrapper, form } = await mount('<input name="disabled" disabled><input name="readonly" readonly><input name="hidden" type="hidden"><fieldset disabled><input name="fieldset"></fieldset>')
    for (const input of wrapper.querySelectorAll('input')) input.setCustomValidity('External validator')

    expect(await wrapper.validate()).toBe(true)
    expect(form.checkValidity()).toBe(true)
  })

  it('preserves the first legend exception through nested disabled fieldsets', async() => {
    const { wrapper, form } = await mount('<fieldset disabled><span></span><legend><alt-core-text-field name="legend" required label-text="Legend"></alt-core-text-field></legend><fieldset><alt-core-text-field name="nested" required label-text="Nested"></alt-core-text-field></fieldset></fieldset>')
    const [legend, nested] = wrapper.querySelectorAll('alt-core-text-field')

    expect(legend.willValidate).toBe(true)
    expect(nested.willValidate).toBe(false)
    expect(form.checkValidity()).toBe(false)
    legend.value = 'kept'
    await waitForLitTree(wrapper)
    expect(form.checkValidity()).toBe(true)
    expect([...new FormData(form)]).toEqual([['legend', 'kept']])

    wrapper.querySelector('fieldset')!.disabled = false
    await waitForLitTree(wrapper)
    expect(nested.willValidate).toBe(true)
    expect(form.checkValidity()).toBe(false)
  })

  it('omits disabled values from submission and resumes validation when reenabled', async() => {
    const { wrapper, form } = await mount('<alt-core-text-field name="email" value="initial" label-text="Email" required></alt-core-text-field><input name="native" value="kept">')
    const field = wrapper.querySelector('alt-core-text-field')!
    field.value = ''
    await waitForLitTree(wrapper)
    expect(await wrapper.validate()).toBe(false)
    field.disabled = true
    field.errors = ['Previous submission']
    await waitForLitTree(wrapper)
    const submit = vi.fn()
    wrapper.addEventListener('form-submit', submit)
    wrapper.submit()
    await vi.waitFor(() => { expect(submit).toHaveBeenCalledTimes(1) })
    expect([...(submit.mock.lastCall?.[0] as FormSubmitEvent).detail.formData]).toEqual([['native', 'kept']])

    field.disabled = false
    await waitForLitTree(wrapper)
    expect(form.checkValidity()).toBe(false)
    expect(await wrapper.validate()).toBe(false)
  })

  it('resets values and validation in an ordinary native form and respects a canceled reset', async() => {
    const form = document.createElement('form')
    form.innerHTML = '<alt-core-text-field name="email" value="initial" label-text="Email" required></alt-core-text-field>'
    document.body.append(form)
    await waitForLitTree(form)
    const field = form.querySelector('alt-core-text-field')!
    field.value = ''
    await waitForLitTree(form)
    expect(field.validate()).toBe(false)
    const reset = (event: Event) => { event.preventDefault() }
    form.addEventListener('reset', reset)
    form.reset()
    await waitForLitTree(form)
    expect(field.value).toBe('')

    form.removeEventListener('reset', reset)
    const input = vi.fn()
    field.addEventListener('input', input)
    form.reset()
    await waitForLitTree(form)
    expect(field.value).toBe('initial')
    expect(field.shadowRoot?.querySelector('alt-core-error')).toBeNull()
    expect(new FormData(form).get('email')).toBe('initial')
    expect(input).toHaveBeenCalledTimes(1)
  })

  it('submits repeated select values and updates them without duplicate proxy entries', async() => {
    const { wrapper, form } = await mount('<alt-core-multiple-select-field name="cities"></alt-core-multiple-select-field>')
    const field = wrapper.querySelector('alt-core-multiple-select-field')!
    Object.assign(field, { isMapOptions: true, items: [{ id: 1, label: 'A' }, { id: 2, label: 'B' }], value: [1, 2] })
    await waitForLitTree(wrapper)
    expect(new FormData(form).getAll('cities')).toEqual(['1', '2'])
    field.value = [2]
    await waitForLitTree(wrapper)
    expect(new FormData(form).getAll('cities')).toEqual(['2'])
    field.name = 'renamed'
    await waitForLitTree(wrapper)
    expect([...new FormData(form)]).toEqual([['renamed', '2']])
    field.value = []
    await waitForLitTree(wrapper)
    expect([...new FormData(form)]).toEqual([])
  })

  it('tracks form ownership, external form attributes, removal and reconnection', async() => {
    const { wrapper, form } = await mount('<alt-core-text-field name="email" value="a" required label-text="Email"></alt-core-text-field>')
    const field = wrapper.querySelector('alt-core-text-field')!
    const other = document.createElement('form')
    other.id = 'other'
    document.body.append(other)
    field.setAttribute('form', 'other')
    await waitForLitTree(document.body)
    expect(field.form).toBe(other)
    expect([...new FormData(form)]).toEqual([])
    expect(new FormData(other).get('email')).toBe('a')

    field.removeAttribute('form')
    other.append(field)
    await waitForLitTree(document.body)
    field.value = ''
    await waitForLitTree(document.body)
    expect(form.checkValidity()).toBe(true)
    expect(other.checkValidity()).toBe(false)
    field.remove()
    expect(other.checkValidity()).toBe(true)
    other.append(field)
    await waitForLitTree(document.body)
    other.reset()
    await waitForLitTree(document.body)
    expect(field.value).toBe('a')
  })

  it('forwards native reportValidity focus and invalid events to the visible field', async() => {
    const { wrapper, form } = await mount('<alt-core-text-field name="email" required label-text="Email"></alt-core-text-field>')
    const field = wrapper.querySelector('alt-core-text-field')!
    const invalid = vi.fn()
    field.addEventListener('invalid', invalid)
    expect(form.checkValidity()).toBe(false)
    expect(invalid).toHaveBeenCalledTimes(1)
    expect(getDeepActiveElement()).not.toBe(field.fieldInput?.inputElement)
    expect(form.reportValidity()).toBe(false)
    await vi.waitFor(() => { expect(getDeepActiveElement()).toBe(field.fieldInput?.inputElement) })
  })

  it('respects cancellation of invalid events during interactive validation', async() => {
    const { wrapper, form } = await mount('<alt-core-text-field name="email" required label-text="Email"></alt-core-text-field>')
    const field = wrapper.querySelector('alt-core-text-field')!
    field.addEventListener('invalid', (event) => { event.preventDefault() })
    const sentinel = document.createElement('button')
    document.body.append(sentinel)
    sentinel.focus()
    expect(form.reportValidity()).toBe(false)
    expect(field.reportValidity()).toBe(false)
    expect(getDeepActiveElement()).toBe(sentinel)
  })

  it('keeps pointer submission working after interactive validation and removal', async() => {
    const invalid = await mount('<alt-core-text-field name="email" required label-text="Email"></alt-core-text-field>')
    const field = invalid.wrapper.querySelector('alt-core-text-field')!
    expect(invalid.form.reportValidity()).toBe(false)
    await vi.waitFor(() => { expect(getDeepActiveElement()).toBe(field.fieldInput?.inputElement) })
    invalid.wrapper.remove()

    const { wrapper } = await mount('<alt-core-text-field name="email" value="works"></alt-core-text-field><alt-core-button type="submit" label="Submit"></alt-core-button>')
    const submit = vi.fn()
    wrapper.addEventListener('form-submit', submit)
    await userEvent.click(wrapper.querySelector('alt-core-button')!)
    await vi.waitFor(() => { expect(submit).toHaveBeenCalledTimes(1) })
  })

  it('preserves File entries in FormData rather than serializing their filenames', async() => {
    const { form } = await mount('<compat-file-field name="attachment"></compat-file-field>')
    const file = new FormData(form).get('attachment')
    expect(file).toBeInstanceOf(File)
    expect((file as File).name).toBe('example.txt')
    expect(await (file as File).text()).toBe('contents')
    form.reset()
    await waitForLitTree(form)
    expect(await (new FormData(form).get('attachment') as File).text()).toBe('contents')
  })
})

describe('Core/form API compatibility', () => {
  it('uses native internals when available and also handles partially implemented internals', async() => {
    const native = vi.spyOn(HTMLElement.prototype, 'attachInternals')
    await mount('<alt-core-text-field name="native"></alt-core-text-field>')
    expect(native).toHaveBeenCalled()
    native.mockRestore()
    const internalsType = Reflect.get(globalThis, 'ElementInternals') as typeof ElementInternals
    const setFormValue = Object.getOwnPropertyDescriptor(internalsType.prototype, 'setFormValue')!
    try {
      Object.defineProperty(internalsType.prototype, 'setFormValue', { configurable: true, value: undefined })
      const { form } = await mount('<alt-core-text-field name="legacy" value="works"></alt-core-text-field>')
      expect(new FormData(form).get('legacy')).toBe('works')
    } finally {
      Object.defineProperty(internalsType.prototype, 'setFormValue', setFormValue)
    }
  })

  it('requests validation and submission through a native button without requestSubmit', async() => {
    Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', { configurable: true, value: undefined })
    const { wrapper, form } = await mount('<alt-core-text-field name="email" value="works"></alt-core-text-field><alt-core-button type="submit" label="Submit"></alt-core-button>')
    const submit = vi.fn()
    wrapper.addEventListener('form-submit', submit)
    wrapper.submit()
    await vi.waitFor(() => { expect(submit).toHaveBeenCalledTimes(1) })
    expect((submit.mock.lastCall?.[0] as FormSubmitEvent).detail.submitter).toBeNull()
    expect(new FormData(form).get('email')).toBe('works')
    expect(form.querySelector('button')).toBeNull()
    await userEvent.click(wrapper.querySelector('alt-core-button')!)
    await vi.waitFor(() => { expect(submit).toHaveBeenCalledTimes(2) })
  })

  it('still blocks invalid native submissions without requestSubmit', () => {
    Object.defineProperty(HTMLFormElement.prototype, 'requestSubmit', { configurable: true, value: undefined })
    const form = document.createElement('form')
    form.innerHTML = '<input required>'
    document.body.append(form)
    const submit = vi.fn((event: Event) => { event.preventDefault() })
    form.addEventListener('submit', submit)
    requestFormSubmit(form)
    expect(submit).not.toHaveBeenCalled()
    form.querySelector('input')!.value = 'valid'
    requestFormSubmit(form)
    expect(submit).toHaveBeenCalledTimes(1)
  })

  it('includes submitter entries once, in order, without FormData submitter support', async() => {
    const { form } = await mount('<input name="action" value="before"><button name="action" value="save">Save</button><input name="action" value="after">')
    const button = form.querySelector('button')!
    const NativeFormData = FormData
    vi.stubGlobal('FormData', class extends NativeFormData {
      constructor(...args: ConstructorParameters<typeof NativeFormData>) {
        super(args[0])
      }
    })
    try {
      expect([...createFormData(form, button)]).toEqual([['action', 'before'], ['action', 'save'], ['action', 'after']])
      expect(form.querySelectorAll('input')).toHaveLength(2)
      button.disabled = true
      expect(createFormData(form, button).getAll('action')).toEqual(['before', 'after'])
    } finally {
      vi.unstubAllGlobals()
    }
  })

  it('keeps external submitter data when SubmitEvent.submitter is unavailable', async() => {
    const { wrapper, form } = await mount('<input name="field" value="kept">')
    form.id = 'external-submit'
    const button = document.createElement('button')
    Object.assign(button, { name: 'action', value: 'save', textContent: 'Save' })
    button.setAttribute('form', form.id)
    document.body.append(button)
    const submit = vi.fn()
    wrapper.addEventListener('form-submit', submit)
    const submitEventType = Reflect.get(globalThis, 'SubmitEvent') as typeof SubmitEvent
    const submitter = Object.getOwnPropertyDescriptor(submitEventType.prototype, 'submitter')!
    try {
      Object.defineProperty(submitEventType.prototype, 'submitter', { configurable: true, value: undefined })
      button.click()
      await vi.waitFor(() => { expect(submit).toHaveBeenCalledTimes(1) })
      const detail = (submit.mock.lastCall?.[0] as FormSubmitEvent).detail
      expect(detail.submitter).toBe(button)
      expect([...detail.formData]).toEqual([['field', 'kept'], ['action', 'save']])
    } finally {
      Object.defineProperty(submitEventType.prototype, 'submitter', submitter)
    }
  })

  it('keeps a programmatic submission implicit when it runs inside a canceled button click', async() => {
    const { wrapper, form } = await mount('<input name="field" value="kept"><button name="action" value="save">Save</button>')
    const submit = vi.fn()
    wrapper.addEventListener('form-submit', submit)
    const button = form.querySelector('button')!
    button.addEventListener('click', (event) => {
      event.preventDefault()
      wrapper.submit()
    })
    button.click()
    await vi.waitFor(() => { expect(submit).toHaveBeenCalledTimes(1) })
    const detail = (submit.mock.lastCall?.[0] as FormSubmitEvent).detail
    expect(detail.submitter).toBeNull()
    expect([...detail.formData]).toEqual([['field', 'kept']])
  })

  it('does not emit reset or clear validation when a wrapped reset is canceled', async() => {
    const { wrapper, form } = await mount('<alt-core-text-field name="field" required label-text="Field"></alt-core-text-field>')
    expect(await wrapper.validate()).toBe(false)
    await waitForLitTree(wrapper)
    const reset = vi.fn()
    wrapper.addEventListener('form-reset', reset)
    wrapper.addEventListener('reset', (event) => { event.preventDefault() })
    form.reset()
    await waitForLitTree(wrapper)
    expect(reset).not.toHaveBeenCalled()
    expect(wrapper.querySelector('alt-core-text-field')!.shadowRoot?.querySelector('alt-core-error')).not.toBeNull()
  })

  it('submits and resets when native controls shadow form method names', async() => {
    const { wrapper, form } = await mount('<input name="requestSubmit" value="one"><input name="reset" value="two">')
    const input = form.querySelector('input')!
    input.value = 'edited'
    const submit = vi.fn()
    wrapper.addEventListener('form-submit', submit)
    wrapper.submit()
    await vi.waitFor(() => { expect(submit).toHaveBeenCalledTimes(1) })
    wrapper.reset()
    expect(input.value).toBe('one')
  })

  it('resolves legacy proxies through a separate bundle instance', async() => {
    Object.defineProperty(HTMLElement.prototype, 'attachInternals', { configurable: true, value: undefined })
    const { wrapper, form } = await mount('<alt-core-text-field name="field"></alt-core-text-field>')
    const field = wrapper.querySelector('alt-core-text-field')!
    const proxy = Array.from(form.elements).find((element) => element instanceof HTMLInputElement && element.type === 'text')!
    const url = new URL('../../../utils/a11y/legacy-form-internals.ts?bundle-copy', import.meta.url).href
    const copy = await import(/* @vite-ignore */ url) as typeof LegacyHelpers
    expect(copy.getAssociatedControl).not.toBe(getAssociatedControl)
    expect(copy.getAssociatedControl(proxy)).toBe(field)
  })

  it('shares and cleans up adapter reset handlers across a separate bundle instance', async() => {
    const { wrapper } = await mount('<alt-core-text-field name="field" value="initial"></alt-core-text-field>')
    const field = wrapper.querySelector('alt-core-text-field')!
    field.value = 'edited'
    await waitForLitTree(wrapper)
    const url = new URL('../../../utils/a11y/form-associated.ts?bundle-copy', import.meta.url).href
    const copy = await import(/* @vite-ignore */ url) as typeof FormHelpers
    expect(copy.registerFormResetHandler).not.toBe(registerFormResetHandler)
    const restore = vi.fn(() => true)
    const remove = copy.registerFormResetHandler(field, restore)
    field.formResetCallback()
    expect(restore).toHaveBeenCalledTimes(1)
    expect(field.value).toBe('edited')
    remove()
    field.formResetCallback()
    expect(field.value).toBe('initial')
  })
})
