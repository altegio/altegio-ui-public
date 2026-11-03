import { afterEach, describe, expect, it, vi } from 'vitest'
import {
  AltCoreBrandButtonTagName,
  AltCoreButtonTagName,
  AltCoreIconButtonTagName,
  AltCoreSimpleButtonTagName,
} from '~shared/constants'
import { waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreButton } from '~core/ui/button'
import type { AltCoreSimpleButton } from '~core/ui/simpleButton'
import type { AltCoreIconButton } from '~core/ui/iconButton'
import type { AltCoreBrandButton } from '~core/ui/brandButton'
import '~core/ui/button'
import '~core/ui/iconButton'
import '~core/ui/brandButton'

type TFormButton = AltCoreButton | AltCoreSimpleButton | AltCoreIconButton | AltCoreBrandButton

const INACTIVE_CASES = [
  { case: 'disabled', props: { disabled: true } },
  { case: 'loading', props: { loading: true } },
]

const LINK_CASE = { case: 'a link', props: { href: '#' } }

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

describe.each([
  { tagName: AltCoreButtonTagName, inactiveCases: [...INACTIVE_CASES, LINK_CASE] },
  { tagName: AltCoreSimpleButtonTagName, inactiveCases: [...INACTIVE_CASES, LINK_CASE] },
  { tagName: AltCoreIconButtonTagName, inactiveCases: [...INACTIVE_CASES, LINK_CASE] },
  // AltBrandButton has no link mode
  { tagName: AltCoreBrandButtonTagName, inactiveCases: INACTIVE_CASES },
])('Core/$tagName/Form', ({ tagName, inactiveCases }) => {
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

  it.each(inactiveCases)('does not submit the form when $case', async({ props }) => {
    const { button, onSubmit } = await mountInForm(tagName, { type: 'submit', ...props })

    getNativeButton(button)?.click()
    button.shadowRoot?.querySelector('a')?.click()
    button.shadowRoot?.querySelector(AltCoreSimpleButtonTagName)?.shadowRoot?.querySelector('a')?.click()

    expect(onSubmit).not.toHaveBeenCalled()
  })
})
