import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCorePopoverTagName, AltCoreTooltipTagName as tagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreTooltip } from '~core/ui/tooltip'
import type { AltCorePopover } from '~core/ui/popover'
import { EAltCoreDropdownTrigger } from '~core/ui/dropdown/models/types'
import '~core/ui/tooltip'
import '~core/ui/popover'
import '~core/ui/button'

const getDropdown = (element: Element) => element.shadowRoot
  ?.querySelector('alt-core-tip')
  ?.shadowRoot
  ?.querySelector('alt-core-dropdown')

const isContentShown = (element: Element) => Boolean(getDropdown(element)?.shadowRoot?.querySelector('.alt-core-dropdown__content'))

const mountTooltip = async(props: Partial<AltCoreTooltip> = {}) => {
  const tooltip = document.createElement(tagName)
  Object.assign(tooltip, { text: 'Clients book themselves', ...props })
  tooltip.innerHTML = '<button slot="activator">Online booking</button>'
  document.body.append(tooltip)
  await waitForLitTree(tooltip)

  return { tooltip, activator: tooltip.querySelector('button') }
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreTooltip/Accessibility', () => {
  it('describes the activator with the tooltip text', async() => {
    const { tooltip, activator } = await mountTooltip()

    expect(activator?.getAttribute('aria-description')).toBe('Clients book themselves')
    expect(tooltip.shadowRoot?.querySelector('[role="tooltip"]')?.textContent.trim()).toBe('Clients book themselves')

    tooltip.text = 'Online booking settings'
    await waitForLitTree(tooltip)
    expect(activator?.getAttribute('aria-description')).toBe('Online booking settings')

    tooltip.disabled = true
    await waitForLitTree(tooltip)
    expect(activator?.hasAttribute('aria-description')).toBe(false)
  })

  it('describes the button inside a button component activator', async() => {
    const tooltip = document.createElement(tagName)
    tooltip.text = 'Clients book themselves'
    tooltip.innerHTML = '<alt-core-button slot="activator" label="Online booking"></alt-core-button>'
    document.body.append(tooltip)
    await waitForLitTree(tooltip)

    const button = tooltip.querySelector('alt-core-button')
    const nativeButton = button?.shadowRoot?.querySelector('alt-core-simple-button')?.shadowRoot?.querySelector('button')
    await vi.waitFor(() => { expect(nativeButton?.getAttribute('aria-description')).toBe('Clients book themselves') })
    expect(button?.hasAttribute('aria-description')).toBe(false)

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(nativeButton)
  })

  it('describes the button inside a wrapper activator, as the framework wrappers render it', async() => {
    const tooltip = document.createElement(tagName)
    tooltip.text = 'Clients book themselves'
    tooltip.innerHTML = '<div slot="activator"><button>Online booking</button></div>'
    document.body.append(tooltip)
    await waitForLitTree(tooltip)

    await vi.waitFor(() => { expect(tooltip.querySelector('button')?.getAttribute('aria-description')).toBe('Clients book themselves') })
  })

  it('keeps the own description of the activator', async() => {
    const tooltip = document.createElement(tagName)
    tooltip.text = 'Tooltip text'
    tooltip.innerHTML = '<button slot="activator" aria-description="Own description">Help</button>'
    document.body.append(tooltip)
    await waitForLitTree(tooltip)

    expect(tooltip.querySelector('button')?.getAttribute('aria-description')).toBe('Own description')
  })

  it('shows on keyboard focus, hides on blur and on Escape', async() => {
    const { tooltip, activator } = await mountTooltip()

    await userEvent.tab()
    await waitForLitTree(tooltip)
    expect(getDeepActiveElement()).toBe(activator)
    expect(isContentShown(tooltip)).toBe(true)
    await expectNoAxeViolations(tooltip, PATTERN_AXE_OPTIONS)

    await userEvent.keyboard('{Escape}')
    await vi.waitFor(() => { expect(isContentShown(tooltip)).toBe(false) })
    expect(getDeepActiveElement()).toBe(activator)

    await userEvent.tab({ shift: true })
    await userEvent.tab()
    await waitForLitTree(tooltip)
    expect(isContentShown(tooltip)).toBe(true)

    activator?.blur()
    await vi.waitFor(() => { expect(isContentShown(tooltip)).toBe(false) })
  })

  it('takes the first Escape away from a surrounding handler', async() => {
    const { tooltip } = await mountTooltip()
    const onWindowKeydown = vi.fn()
    window.addEventListener('keydown', onWindowKeydown)

    try {
      await userEvent.tab()
      await waitForLitTree(tooltip)
      expect(isContentShown(tooltip)).toBe(true)

      onWindowKeydown.mockClear()

      await userEvent.keyboard('{Escape}')
      expect(onWindowKeydown).not.toHaveBeenCalled()

      await userEvent.keyboard('{Escape}')
      expect(onWindowKeydown).toHaveBeenCalledTimes(1)
    } finally {
      window.removeEventListener('keydown', onWindowKeydown)
    }
  })
})

const mountPopover = async(props: Partial<AltCorePopover> = {}) => {
  const popover = document.createElement(AltCorePopoverTagName) as AltCorePopover
  Object.assign(popover, { cancelText: 'Cancel', submitText: 'Delete', accessibleName: 'Delete the appointment', ...props })
  popover.innerHTML = `
    <button slot="activator">Delete</button>
    
    <span slot="content">Delete the appointment?</span>
  `
  document.body.append(popover)
  await waitForLitTree(popover)

  return { popover, activator: popover.querySelector('button') }
}

const getDialog = (popover: AltCorePopover) => popover.shadowRoot?.querySelector('.alt-core-popover__content')

const getActionButtons = (popover: AltCorePopover) => Array.from(popover.shadowRoot?.querySelectorAll('alt-core-simple-button') ?? [])
  .map((button) => button.shadowRoot?.querySelector('button'))

describe('Core/AltCorePopover/Accessibility', () => {
  it('opens a named dialog from the activator and moves focus into it', async() => {
    const { popover, activator } = await mountPopover()

    expect(activator?.getAttribute('aria-haspopup')).toBe('dialog')
    expect(activator?.getAttribute('aria-expanded')).toBe('false')
    expect(getDialog(popover)?.getAttribute('role')).toBe('dialog')
    expect(getDialog(popover)?.getAttribute('aria-label')).toBe('Delete the appointment')

    activator?.focus()
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(popover)

    expect(activator?.getAttribute('aria-expanded')).toBe('true')
    await vi.waitFor(() => { expect(getDeepActiveElement()).toBe(getActionButtons(popover)[0]) })
    await expectNoAxeViolations(popover, PATTERN_AXE_OPTIONS)
  })

  it('focuses the dialog itself when it has nothing focusable', async() => {
    const { popover, activator } = await mountPopover({ cancelText: '', submitText: '' })

    activator?.focus()
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(popover)

    await vi.waitFor(() => { expect(getDeepActiveElement()).toBe(getDialog(popover)) })
  })

  it('returns focus to the activator after an action', async() => {
    const { popover, activator } = await mountPopover()
    const onSubmit = vi.fn()
    popover.addEventListener('submit', onSubmit)

    activator?.focus()
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(popover)
    await vi.waitFor(() => { expect(getDeepActiveElement()).toBe(getActionButtons(popover)[0]) })

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getActionButtons(popover)[1])
    await userEvent.keyboard('{Enter}')
    await waitForLitTree(popover)

    expect(onSubmit).toHaveBeenCalledTimes(1)
    await vi.waitFor(() => { expect(isContentShown(popover)).toBe(false) })
    expect(getDeepActiveElement()).toBe(activator)
    expect(activator?.getAttribute('aria-expanded')).toBe('false')
  })

  it('stays a hint without a dialog role when it opens on hover', async() => {
    const { popover, activator } = await mountPopover({ trigger: EAltCoreDropdownTrigger.HOVER })

    expect(getDialog(popover)?.hasAttribute('role')).toBe(false)
    expect(activator?.hasAttribute('aria-haspopup')).toBe(false)
  })

  it('closes with Escape and returns focus from the content to the activator', async() => {
    const popover = document.createElement(AltCorePopoverTagName) as AltCorePopover
    popover.cancelText = 'Cancel'
    popover.innerHTML = `
      <button slot="activator">Delete</button>
      
      <span slot="content">Delete the appointment?</span>
    `
    document.body.append(popover)
    await waitForLitTree(popover)
    const activator = popover.querySelector('button')

    activator?.click()
    await waitForLitTree(popover)
    expect(isContentShown(popover)).toBe(true)

    const cancel = popover.shadowRoot?.querySelector('alt-core-simple-button')
    cancel?.focus()
    expect(getDeepActiveElement()).not.toBe(activator)

    await userEvent.keyboard('{Escape}')
    await vi.waitFor(() => { expect(isContentShown(popover)).toBe(false) })
    expect(getDeepActiveElement()).toBe(activator)
  })
})
