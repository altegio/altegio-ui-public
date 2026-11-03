import { afterEach, describe, expect, it, vi } from 'vitest'
import { h } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { AltCoreFormTagName as tagName } from '~shared/constants'
import { AltForm } from '~vue/ui/form'
import { AltTextField } from '~vue/ui/textField'
import { AltButton } from '~vue/ui/button'
import type { AltCoreForm } from '~core/ui/form'
import type { FormInvalidEvent, FormSubmitEvent } from '~core/ui/form/models/types'
import type { AltCoreTextField } from '~core/ui/textField'

let wrapper: VueWrapper | undefined

const mountForm = async(value = '', props: Record<string, unknown> = {}) => {
  wrapper = mount(AltForm, {
    props,
    slots: {
      default: () => [
        h(AltTextField, { name: 'name', required: true, labelText: 'Name', modelValue: value }),
        h(AltButton, { type: 'submit', label: 'Send' }),
      ],
    },
    attachTo: document.body,
  })

  const coreForm = wrapper.find(tagName).element as AltCoreForm
  const field = wrapper.find('alt-core-text-field').element as AltCoreTextField
  await coreForm.updateComplete
  await field.updateComplete

  return { wrapper, coreForm, field }
}

const getErrorText = (field: AltCoreTextField) => field.shadowRoot?.querySelector('alt-core-error')?.shadowRoot?.textContent.trim() ?? ''

type TExposed = Pick<AltCoreForm, 'validate' | 'resetValidation' | 'submit' | 'reset'>

afterEach(() => {
  wrapper?.unmount()
})

describe(
  'Vue/AltForm',
  () => {
    it(
      'Prop "noErrorFocus" should be set on the core component',
      async() => {
        const { coreForm } = await mountForm('', { noErrorFocus: true })

        expect(coreForm.noErrorFocus).toBe(true)
      },
    )

    it(
      'Should render the fields inside a native form that the core component wraps',
      async() => {
        const { coreForm, field } = await mountForm()

        expect(coreForm.form?.contains(field)).toBe(true)
        expect(coreForm.form?.noValidate).toBe(true)
      },
    )

    it(
      'Should emit "validation-error" and show the message when "submit()" finds invalid fields',
      async() => {
        const { wrapper, field } = await mountForm();
(wrapper.vm as unknown as TExposed).submit()

        await vi.waitFor(() => { expect(wrapper.emitted('validation-error')).toHaveLength(1) })
        expect((wrapper.emitted('validation-error')?.[0][0] as FormInvalidEvent).detail.controls).toEqual([field])
        expect(wrapper.emitted('submit')).toBeUndefined()
        await vi.waitFor(() => { expect(getErrorText(field)).toContain('Fill in this field') })
      },
    )

    it(
      'Should emit "submit" with the form data from a submit button',
      async() => {
        const { wrapper } = await mountForm('Anna')

        const button = wrapper.find('alt-core-button').element
        button.shadowRoot!.querySelector('alt-core-simple-button')!.shadowRoot!.querySelector('button')!.click()

        await vi.waitFor(() => { expect(wrapper.emitted('submit')).toHaveLength(1) })
        expect((wrapper.emitted('submit')?.[0][0] as FormSubmitEvent).detail.formData.get('name')).toBe('Anna')
      },
    )

    it(
      'Should expose "validate", "resetValidation" and "reset"',
      async() => {
        const { wrapper, field } = await mountForm()
        const exposed = wrapper.vm as unknown as TExposed

        expect(await exposed.validate()).toBe(false)
        await vi.waitFor(() => { expect(getErrorText(field)).toContain('Fill in this field') })

        exposed.resetValidation()
        await vi.waitFor(() => { expect(getErrorText(field)).toBe('') })

        exposed.reset()
        await vi.waitFor(() => { expect(wrapper.emitted('reset')).toHaveLength(1) })
      },
    )
  },
)
