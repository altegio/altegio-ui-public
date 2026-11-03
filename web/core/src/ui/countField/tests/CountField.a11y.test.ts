import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreCountFieldTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreCountField } from '~core/ui/countField'
import '~core/ui/countField'

const mountCountField = async(props: Partial<AltCoreCountField> = {}) => {
  const field = document.createElement(tagName)
  Object.assign(field, { labelText: 'Guests', value: '2', min: 1, max: 5, ...props })
  document.body.append(field)
  await waitForLitTree(field)

  return field
}

const getInput = (field: AltCoreCountField) => field.textField?.fieldInput?.inputElement

const getButtons = (field: AltCoreCountField) => Array.from(field.shadowRoot?.querySelectorAll('alt-core-field-icon') ?? [])
  .map((icon) => icon.shadowRoot?.querySelector<HTMLElement>('[role="button"]'))

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreCountField/Accessibility', () => {
  it('exposes a named spinbutton with its value and limits', async() => {
    const field = await mountCountField()
    const input = getInput(field)

    expect(input?.getAttribute('role')).toBe('spinbutton')
    expect(input?.getAttribute('aria-label')).toBe('Guests')
    expect(input?.getAttribute('aria-valuenow')).toBe('2')
    expect(input?.getAttribute('aria-valuemin')).toBe('1')
    expect(input?.getAttribute('aria-valuemax')).toBe('5')
    await expectNoAxeViolations(field, PATTERN_AXE_OPTIONS)
  })

  it('takes its name from accessibleName when there is no label', async() => {
    const field = await mountCountField({ labelText: '', accessibleName: 'Number of guests' })

    expect(getInput(field)?.getAttribute('aria-label')).toBe('Number of guests')
    await expectNoAxeViolations(field, PATTERN_AXE_OPTIONS)
  })

  it('steps the value with arrow keys and jumps to the limits with Home and End', async() => {
    const field = await mountCountField()
    const onChange = vi.fn()
    field.addEventListener('changed-value', onChange)

    await userEvent.click(getInput(field)!)
    await userEvent.keyboard('{ArrowUp}')
    await waitForLitTree(field)
    expect(field.value).toBe('3')
    expect(getInput(field)?.getAttribute('aria-valuenow')).toBe('3')

    await userEvent.keyboard('{ArrowDown}{ArrowDown}{ArrowDown}')
    await waitForLitTree(field)
    expect(field.value).toBe('1')

    await userEvent.keyboard('{End}')
    await waitForLitTree(field)
    expect(field.value).toBe('5')

    await userEvent.keyboard('{ArrowUp}')
    await waitForLitTree(field)
    expect(field.value).toBe('5')

    await userEvent.keyboard('{Home}')
    await waitForLitTree(field)
    expect(field.value).toBe('1')
    expect(onChange).toHaveBeenCalled()
  })

  it('does not step a readonly field', async() => {
    const field = await mountCountField({ readonly: true })

    getInput(field)?.focus()
    await userEvent.keyboard('{ArrowUp}')
    await waitForLitTree(field)

    expect(field.value).toBe('2')
  })

  it('names the step buttons and keeps them out of the tab order', async() => {
    const field = await mountCountField({ value: '1' })
    const [decrease, increase] = getButtons(field)

    expect(decrease?.getAttribute('aria-label')).toBe('Decrease')
    expect(decrease?.getAttribute('aria-disabled')).toBe('true')
    expect(increase?.getAttribute('aria-label')).toBe('Increase')
    expect(increase?.hasAttribute('aria-disabled')).toBe(false)
    expect(increase?.tabIndex).toBe(-1)
  })

  it('steps once when assistive technology clicks a button', async() => {
    const field = await mountCountField()
    const [, increase] = getButtons(field)

    // A screen reader activates a button with a click that has no mouse press before it, so detail is 0
    increase?.dispatchEvent(new MouseEvent('click', { bubbles: true, composed: true, detail: 0 }))
    await waitForLitTree(field)

    expect(field.value).toBe('3')
  })
})
