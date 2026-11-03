import axe from 'axe-core'
import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreModalTagName } from '~shared/constants'
import { getDeepActiveElement, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreModal } from '~core/ui/modal/Modal.core'
import type { AltCoreTextField } from '~core/ui/textField'
import type { AltCoreSelectField } from '~core/ui/selectField'
import '~core/ui/modal'
import '~core/ui/textField'
import '~core/ui/selectField'

let modal: AltCoreModal | undefined

afterEach(() => {
  modal?.remove()
  modal = undefined
  document.body.replaceChildren()
})

const getCloseButton = (element: AltCoreModal) => element.shadowRoot
  ?.querySelector('alt-core-icon-button')
  ?.shadowRoot
  ?.querySelector('alt-core-simple-button')
  ?.shadowRoot
  ?.querySelector('button')

/** Mounts a modal with an activator and two fields, opening it from the activator like a user would */
const mountModal = async(props: Partial<AltCoreModal> = {}) => {
  modal = document.createElement(AltCoreModalTagName) as AltCoreModal
  Object.assign(modal, { dialogLabel: 'Edit client', ...props })
  modal.innerHTML = `
    <button slot="activator">Edit</button>
    
    <div slot="content"><input aria-label="First name"><input aria-label="Last name"></div>
  `
  modal.addEventListener('close', () => {
    if (modal) modal.open = false
  })
  document.body.append(modal)
  await waitForLitTree(modal)

  const activator = modal.querySelector<HTMLButtonElement>('[slot="activator"]')
  const [firstField, lastField] = Array.from(modal.querySelectorAll('input'))

  return { modal, activator, firstField, lastField }
}

describe('Core/AltCoreModal/Accessibility', () => {
  it('exposes an accessible dialog when open', async() => {
    modal = document.createElement(AltCoreModalTagName) as AltCoreModal
    modal.dialogLabel = 'Example dialog'
    modal.open = true
    document.body.append(modal)
    await modal.updateComplete
    await modal.updateComplete

    const results = await axe.run(modal)
    expect(results.violations.map(({ id, nodes }) => ({
      id,
      targets: nodes.map(({ target }) => target),
    }))).toEqual([])
  })

  it('names the close button in the page language', async() => {
    document.documentElement.lang = 'ru'

    try {
      const { modal: element } = await mountModal({ open: true })
      await waitForLitTree(element)

      expect(getCloseButton(element)?.getAttribute('aria-label')).toBe('Закрыть')
    } finally {
      document.documentElement.lang = 'en'
    }
  })

  it('keeps Tab and Shift+Tab inside the open dialog', async() => {
    const { modal: element, activator, firstField } = await mountModal()

    activator?.focus()
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(element)
    await vi.waitFor(() => { expect(element.shadowRoot?.activeElement?.getAttribute('role')).toBe('dialog') })

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(firstField)

    await userEvent.tab({ shift: true })
    expect(getDeepActiveElement()).toBe(getCloseButton(element))

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(firstField)
  })

  it('closes with Escape and returns focus to the activator', async() => {
    const { modal: element, activator } = await mountModal()
    const onPressEscape = vi.fn()
    element.addEventListener('press-escape', onPressEscape)

    activator?.focus()
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(element)

    await userEvent.keyboard('{Escape}')
    await waitForLitTree(element)

    expect(onPressEscape).toHaveBeenCalledTimes(1)
    expect(element.shadowRoot?.querySelector('[role="dialog"]')).toBeNull()
    await vi.waitFor(() => { expect(document.activeElement).toBe(activator) })
  })

  // Text fields and a select handle keys themselves and re-dispatch them
  describe('with fields inside', () => {
    const mountModalWithFields = async() => {
      modal = document.createElement(AltCoreModalTagName) as AltCoreModal
      Object.assign(modal, { dialogLabel: 'Edit client', open: true })
      modal.innerHTML = `
        <div slot="content">
          <alt-core-text-field label-text="First name"></alt-core-text-field>
          
          <alt-core-select-field label-text="Service"></alt-core-select-field>
          
          <alt-core-text-field label-text="Last name"></alt-core-text-field>
        </div>
      `
      const select = modal.querySelector<AltCoreSelectField>('alt-core-select-field')
      if (select) select.items = [{ id: 1, label: 'Haircut' }, { id: 2, label: 'Coloring' }]
      modal.addEventListener('close', () => {
        if (modal) modal.open = false
      })
      document.body.append(modal)
      await waitForLitTree(modal)

      const [firstField, lastField] = Array.from(modal.querySelectorAll<AltCoreTextField>('alt-core-text-field'))
        .map((field) => field.fieldInput?.inputElement)

      return { modal, firstField, lastField, select }
    }

    const isDialogOpen = (element: AltCoreModal) => Boolean(element.shadowRoot?.querySelector('[role="dialog"]'))

    it('keeps Tab and Shift+Tab inside the dialog from a text field', async() => {
      const { modal: element, firstField, lastField } = await mountModalWithFields()

      lastField?.focus()
      await userEvent.tab()
      expect(getDeepActiveElement()).toBe(getCloseButton(element))

      firstField?.focus()
      await userEvent.tab({ shift: true })
      expect(getDeepActiveElement()).toBe(getCloseButton(element))
    })

    it('closes with Escape from a text field', async() => {
      const { modal: element, firstField } = await mountModalWithFields()
      const onPressEscape = vi.fn()
      element.addEventListener('press-escape', onPressEscape)

      firstField?.focus()
      await userEvent.keyboard('{Escape}')
      await waitForLitTree(element)

      expect(onPressEscape).toHaveBeenCalledTimes(1)
      expect(isDialogOpen(element)).toBe(false)
    })

    it('lets Escape close an open select list before the dialog', async() => {
      const { modal: element, select } = await mountModalWithFields()
      const input = select?.fieldInput?.inputElement

      input?.focus()
      await waitForLitTree(element)
      await vi.waitFor(() => { expect(input?.getAttribute('aria-expanded')).toBe('true') })

      await userEvent.keyboard('{Escape}')
      await waitForLitTree(element)
      expect(input?.getAttribute('aria-expanded')).toBe('false')
      expect(isDialogOpen(element)).toBe(true)

      await userEvent.keyboard('{Escape}')
      await waitForLitTree(element)
      expect(isDialogOpen(element)).toBe(false)
    })
  })

  it('stays open on Escape with preventEscape', async() => {
    const { modal: element } = await mountModal({ open: true, preventEscape: true })
    await waitForLitTree(element)

    await userEvent.keyboard('{Escape}')
    await waitForLitTree(element)

    expect(element.shadowRoot?.querySelector('[role="dialog"]')).not.toBeNull()
  })
})
