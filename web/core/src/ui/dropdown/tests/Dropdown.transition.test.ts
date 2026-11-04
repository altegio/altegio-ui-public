import { afterEach, expect, it, vi } from 'vitest'
import { waitForLitTree } from '~shared/tests/a11y'
import { EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import '~core/ui/dropdown'

afterEach(() => { document.body.replaceChildren() })

const mountDropdown = async() => {
  const dropdown = document.createElement('alt-core-dropdown')
  dropdown.trigger = EAltCoreDropdownTrigger.MANUAL
  dropdown.style.setProperty('--alt-core-fade-transition-duration', '100ms')
  dropdown.innerHTML = '<button slot="activator">Open</button><button slot="content">Content</button>'
  document.body.append(dropdown)
  dropdown.isOpen = true
  await waitForLitTree(dropdown)
  const content = dropdown.shadowRoot?.querySelector('.alt-core-dropdown__content')
  expect(content).toBeInstanceOf(HTMLElement)
  await vi.waitFor(() => { expect(content?.classList.contains('fade-active')).toBe(false) })

  return { dropdown, content }
}

it('keeps a manually reopened dropdown visible after its previous leave transition', async() => {
  const { dropdown, content } = await mountDropdown()

  dropdown.isOpen = false
  await dropdown.updateComplete
  expect(content?.classList.contains('fade-leave-to')).toBe(true)
  dropdown.isOpen = true
  await waitForLitTree(dropdown)

  // Cross the previous leave deadline: a stale completion must not hide the reopened content.
  await new Promise((resolve) => setTimeout(resolve, 200))
  expect(dropdown.shadowRoot?.querySelector('.alt-core-dropdown__content')).toBe(content)
  expect(getComputedStyle(content as HTMLElement).opacity).toBe('1')

  dropdown.isOpen = false
  await vi.waitFor(() => {
    expect(dropdown.shadowRoot?.querySelector('.alt-core-dropdown__content')).toBeNull()
  })
})

it('discards a pending leave when the dropdown disconnects and reopens', async() => {
  const { dropdown } = await mountDropdown()
  dropdown.isOpen = false
  await dropdown.updateComplete
  dropdown.remove()
  await dropdown.updateComplete
  document.body.append(dropdown)
  dropdown.isOpen = true
  await waitForLitTree(dropdown)

  await new Promise((resolve) => setTimeout(resolve, 200))
  const content = dropdown.shadowRoot?.querySelector('.alt-core-dropdown__content')
  expect(content).toBeInstanceOf(HTMLElement)
  expect(getComputedStyle(content as HTMLElement).opacity).toBe('1')
})
