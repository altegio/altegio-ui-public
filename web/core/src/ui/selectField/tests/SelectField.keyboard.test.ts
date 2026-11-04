import { afterEach, expect, it, vi } from 'vitest'
import { waitForLitTree } from '~shared/tests/a11y'
import '~core/ui/selectField'

afterEach(() => { document.body.replaceChildren() })

it('does not select a listbox option for composing or already canceled Enter keys', async() => {
  const field = document.createElement('alt-core-select-field')
  Object.assign(field, { items: [{ id: 1, label: 'A' }], isMapOptions: true, itemLabel: 'label', itemValue: 'id', labelText: 'City' })
  document.body.append(field)
  await waitForLitTree(field)
  const input = field.fieldInput!.inputElement!
  const press = async(key: string, composing = false, prevented = false) => {
    const event = new KeyboardEvent('keydown', { key, isComposing: composing, bubbles: true, composed: true, cancelable: true })
    if (prevented) event.preventDefault()
    input.dispatchEvent(event)
    await waitForLitTree(field)
  }
  const select = vi.fn()
  field.addEventListener('select', select)
  await press('ArrowDown')
  await press('ArrowDown')
  await press('Enter', true)
  await press('Enter', false, true)
  expect(select).not.toHaveBeenCalled()
  expect(input.getAttribute('aria-expanded')).toBe('true')
  await press('Enter')
  expect(select).toHaveBeenCalledTimes(1)
  expect(field.value).toBe(1)
})
