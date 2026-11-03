import { afterEach, describe, expect, it, vi } from 'vitest'
import { AltCoreButtonTagName, AltCoreSimpleButtonTagName } from '~shared/constants'
import { waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreButton } from '~core/ui/button'
import type { AltCoreSimpleButton } from '~core/ui/simpleButton'
import '~core/ui/button'

type TFormButton = AltCoreButton | AltCoreSimpleButton

const mountInForm = async(tagName: string, props: Partial<TFormButton>) => {
  const form = document.createElement('form')
  const input = document.createElement('input')
  input.name = 'name'
  input.defaultValue = 'Anna'
  const button = document.createElement(tagName) as TFormButton
  Object.assign(button, { label: 'Send' }, props)
  button.textContent = 'Send'
  form.append(input, button)
  document.body.append(form)
  await waitForLitTree(document.body)

  const onSubmit = vi.fn((event: Event) => { event.preventDefault() })
  const onReset = vi.fn()
  form.addEventListener('submit', onSubmit)
  form.addEventListener('reset', onReset)

  return { button, input, onSubmit, onReset }
}

const getNativeButton = (button: TFormButton): HTMLButtonElement | null | undefined => {
  const simpleButton = button.localName === AltCoreSimpleButtonTagName
    ? button
    : button.shadowRoot?.querySelector(AltCoreSimpleButtonTagName)

  return simpleButton?.shadowRoot?.querySelector('button')
}

afterEach(() => {
  document.body.replaceChildren()
})

describe.each([AltCoreButtonTagName, AltCoreSimpleButtonTagName])('Core/%s/Form', (tagName) => {
  it('does nothing in a form by default', async() => {
    const { button, onSubmit, onReset } = await mountInForm(tagName, {})

    expect(button.type).toBe('button')
    getNativeButton(button)?.click()

    expect(onSubmit).not.toHaveBeenCalled()
    expect(onReset).not.toHaveBeenCalled()
  })

  it('submits the form once with type="submit"', async() => {
    const { button, onSubmit } = await mountInForm(tagName, { type: 'submit' })

    getNativeButton(button)?.click()

    expect(onSubmit).toHaveBeenCalledTimes(1)
  })

  it('resets the form with type="reset"', async() => {
    const { button, input, onReset } = await mountInForm(tagName, { type: 'reset' })
    input.value = 'Maria'

    getNativeButton(button)?.click()

    expect(onReset).toHaveBeenCalledTimes(1)
    expect(input.value).toBe('Anna')
  })

  it.each([
    { case: 'disabled', props: { disabled: true } },
    { case: 'loading', props: { loading: true } },
    { case: 'a link', props: { href: '#' } },
  ])('does not submit the form when $case', async({ props }) => {
    const { button, onSubmit } = await mountInForm(tagName, { type: 'submit', ...props })

    getNativeButton(button)?.click()
    button.shadowRoot?.querySelector('a')?.click()
    button.shadowRoot?.querySelector(AltCoreSimpleButtonTagName)?.shadowRoot?.querySelector('a')?.click()

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
