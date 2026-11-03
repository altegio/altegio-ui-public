import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreRadioButtonGroupTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreRadioButton } from '~core/ui/radioButton'
import '~core/ui/radioButtonGroup'
import '~core/ui/radioButton'

const getControl = (radioButton: AltCoreRadioButton) => radioButton.shadowRoot
  ?.querySelector('alt-core-simple-radio-button')
  ?.shadowRoot
  ?.querySelector('button')

const mountGroup = async({ value = '', disabledValues = [] as string[], container = document.body as HTMLElement } = {}) => {
  const group = document.createElement(tagName)
  group.labelText = 'Payment'
  group.value = value
  group.addEventListener('change', (event) => {
    group.value = (event as CustomEvent<{ value: string }>).detail.value
  })

  const radioButtons = [
    'card',
    'cash',
    'transfer',
  ].map((radioValue) => {
    const radioButton = document.createElement('alt-core-radio-button')
    radioButton.value = radioValue
    radioButton.labelText = radioValue
    radioButton.name = 'payment'
    radioButton.disabled = disabledValues.includes(radioValue)
    group.append(radioButton)

    return radioButton
  })

  container.append(group)
  await waitForLitTree(container)

  return { group, radioButtons }
}

const tabStops = (radioButtons: AltCoreRadioButton[]) => radioButtons
  .filter((radioButton) => getControl(radioButton)?.tabIndex === 0)
  .map((radioButton) => radioButton.value)

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreRadioButtonGroup/Accessibility', () => {
  it('exposes a named radio group of radio buttons', async() => {
    const { group, radioButtons } = await mountGroup({ value: 'cash' })
    const radiogroup = group.shadowRoot?.querySelector('[role="radiogroup"]')

    expect(radiogroup?.getAttribute('aria-label')).toBe('Payment')
    expect(radioButtons.map((radioButton) => getControl(radioButton)?.getAttribute('aria-checked'))).toEqual([
      'false',
      'true',
      'false',
    ])
    expect(getControl(radioButtons[0])?.getAttribute('aria-label')).toBe('card')
    await expectNoAxeViolations(group, PATTERN_AXE_OPTIONS)
  })

  it('keeps only the checked radio button in the tab order', async() => {
    const { radioButtons } = await mountGroup({ value: 'cash' })

    expect(tabStops(radioButtons)).toEqual(['cash'])

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getControl(radioButtons[1]))
  })

  it('keeps the first enabled radio button in the tab order when none is checked', async() => {
    const { radioButtons } = await mountGroup({ disabledValues: ['card'] })

    expect(tabStops(radioButtons)).toEqual(['cash'])
  })

  it('moves focus and checks the next radio button with arrow keys, wrapping around', async() => {
    const { group, radioButtons } = await mountGroup({ value: 'card' })
    const onChange = vi.fn()
    group.addEventListener('change', onChange)

    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(group)
    expect(group.value).toBe('cash')
    expect(getDeepActiveElement()).toBe(getControl(radioButtons[1]))
    expect(tabStops(radioButtons)).toEqual(['cash'])

    await userEvent.keyboard('{ArrowRight}')
    await userEvent.keyboard('{ArrowRight}')
    await waitForLitTree(group)
    expect(group.value).toBe('card')
    expect(getDeepActiveElement()).toBe(getControl(radioButtons[0]))

    await userEvent.keyboard('{ArrowUp}')
    await waitForLitTree(group)
    expect(group.value).toBe('transfer')

    await userEvent.keyboard('{ArrowLeft}')
    await waitForLitTree(group)
    expect(group.value).toBe('cash')
    expect(onChange).toHaveBeenCalledTimes(5)
  })

  it('skips disabled radio buttons', async() => {
    const { group, radioButtons } = await mountGroup({ value: 'card', disabledValues: ['cash'] })

    await userEvent.tab()
    await userEvent.keyboard('{ArrowDown}')
    await waitForLitTree(group)

    expect(group.value).toBe('transfer')
    expect(getDeepActiveElement()).toBe(getControl(radioButtons[2]))
  })

  it('checks the focused radio button with Space', async() => {
    const { group, radioButtons } = await mountGroup()

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getControl(radioButtons[0]))

    await userEvent.keyboard(' ')
    await waitForLitTree(group)
    expect(group.value).toBe('card')
  })
})

describe('Core/AltCoreRadioButton/Form', () => {
  it('submits the value of the checked radio button', async() => {
    const form = document.createElement('form')
    document.body.append(form)
    const { group } = await mountGroup({ value: 'cash', container: form })

    expect(new FormData(form).getAll('payment')).toEqual(['cash'])

    group.value = 'transfer'
    await waitForLitTree(form)
    expect(new FormData(form).getAll('payment')).toEqual(['transfer'])
  })

  it('checks the initially checked radio button again on form reset', async() => {
    const form = document.createElement('form')
    document.body.append(form)
    const { group } = await mountGroup({ value: 'cash', container: form })

    group.value = 'transfer'
    await waitForLitTree(form)
    form.reset()
    await waitForLitTree(form)

    expect(group.value).toBe('cash')
  })

  it('blocks submission of a required group until a radio button is checked', async() => {
    const form = document.createElement('form')
    document.body.append(form)
    const { group, radioButtons } = await mountGroup({ container: form })

    group.required = true
    await waitForLitTree(form)

    expect(form.checkValidity()).toBe(false)
    expect(radioButtons.every((radioButton) => radioButton.validity.valueMissing)).toBe(true)
    expect(group.shadowRoot?.querySelector('[role="radiogroup"]')?.getAttribute('aria-required')).toBe('true')

    group.value = 'card'
    await waitForLitTree(form)

    expect(form.checkValidity()).toBe(true)
    expect(radioButtons.some((radioButton) => radioButton.validity.valueMissing)).toBe(false)
  })

  it('treats radio buttons with the same name outside a group as one required group', async() => {
    const form = document.createElement('form')
    const radioButtons = ['morning', 'evening'].map((value) => {
      const radioButton = document.createElement('alt-core-radio-button')
      Object.assign(radioButton, { name: 'time', value: undefined, labelText: value, required: value === 'morning' })
      form.append(radioButton)

      return radioButton
    })
    document.body.append(form)
    await waitForLitTree(form)

    expect(form.checkValidity()).toBe(false)
    expect(radioButtons[1].validity.valueMissing).toBe(true)

    radioButtons[1].checked = true
    await waitForLitTree(form)

    expect(form.checkValidity()).toBe(true)
  })

  it('reverses ArrowLeft and ArrowRight in a right-to-left layout', async() => {
    const container = document.createElement('div')
    container.dir = 'rtl'
    document.body.append(container)
    const { group, radioButtons } = await mountGroup({ value: 'card', container })

    await userEvent.tab()
    await userEvent.keyboard('{ArrowLeft}')
    await waitForLitTree(group)
    expect(group.value).toBe('cash')
    expect(getDeepActiveElement()).toBe(getControl(radioButtons[1]))

    await userEvent.keyboard('{ArrowRight}')
    await waitForLitTree(group)
    expect(group.value).toBe('card')
  })
})
