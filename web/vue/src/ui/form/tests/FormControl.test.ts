import { afterEach, describe, expect, it } from 'vitest'
import type { Component } from 'vue'
import { nextTick } from 'vue'
import { mount, type VueWrapper } from '@vue/test-utils'
import { userEvent } from 'vitest/browser'
import { getDeepActiveElement, waitForLitTree } from '~shared/tests/a11y'
import { AltTextField } from '~vue/ui/textField'
import { AltTextarea } from '~vue/ui/textarea'
import { AltSearchField } from '~vue/ui/searchField'
import type { AltCoreTextField } from '~core/ui/textField'

let wrapper: VueWrapper | undefined

afterEach(() => {
  wrapper?.unmount()
  document.body.replaceChildren()
})

describe('Vue/form control contract', () => {
  it.each([
    { component: AltTextField, name: 'AltTextField', tag: 'text-field' },
    { component: AltTextarea, name: 'AltTextarea', tag: 'textarea' },
    { component: AltSearchField, name: 'AltSearchField', tag: 'text-field' },
  ])('round trips controlled values, events and native reset in $name', async({ component, tag }) => {
    const form = document.createElement('form')
    document.body.append(form)
    wrapper = mount(component as Component, {
      attachTo: form,
      props: {
        modelValue: 'initial',
        name: 'field',
        'onUpdate:modelValue': (value: string) => { void wrapper?.setProps({ modelValue: value }) },
      },
    })
    await waitForLitTree(form)
    const core = wrapper.find(`alt-core-${tag}`).element as AltCoreTextField
    expect(core.value).toBe('initial')
    await wrapper.setProps({ modelValue: 'external' })
    await waitForLitTree(form)
    expect(core.value).toBe('external')
    expect(wrapper.emitted('update:modelValue')).toBeUndefined()

    core.value = 'edited'
    core.dispatchEvent(new CustomEvent('input', { detail: { value: 'edited' }, bubbles: true, composed: true }))
    await nextTick()
    await waitForLitTree(form)
    expect((wrapper.props() as { modelValue: string }).modelValue).toBe('edited')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(1)
    expect(new FormData(form).get('field')).toBe('edited')
    form.reset()
    await nextTick()
    await waitForLitTree(form)
    expect(core.value).toBe('initial')
    expect((wrapper.props() as { modelValue: string }).modelValue).toBe('initial')
    expect(wrapper.emitted('update:modelValue')).toHaveLength(2)

    await wrapper.setProps({ disabled: true })
    await waitForLitTree(form)
    expect(core.disabled).toBe(true)
    expect(new FormData(form).has('field')).toBe(false)
  })

  it('validates and submits an unset text model as an empty value', async() => {
    const form = document.createElement('form')
    document.body.append(form)
    wrapper = mount(AltTextField, { attachTo: form, props: { name: 'field', required: true } })
    await waitForLitTree(form)
    const core = wrapper.find('alt-core-text-field').element as AltCoreTextField
    expect(core.value).toBe('')
    expect(core.validate()).toBe(false)
    expect(new FormData(form).get('field')).toBe('')
  })

  it('exposes focus on the actual input and emits one model update for typing', async() => {
    wrapper = mount(AltTextField, { attachTo: document.body, props: { modelValue: '', labelText: 'Name' } })
    await waitForLitTree(wrapper.element as Element)
    const core = wrapper.find('alt-core-text-field').element as AltCoreTextField
    const exposed = wrapper.vm as unknown as { focus: () => void }
    exposed.focus()
    expect(getDeepActiveElement()).toBe(core.fieldInput?.inputElement)
    await userEvent.type(core.fieldInput!.inputElement!, 'A')
    expect(wrapper.emitted('update:modelValue')).toEqual([['A']])
  })
})
