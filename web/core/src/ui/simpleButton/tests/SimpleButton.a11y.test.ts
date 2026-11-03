import { afterEach, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { AltCoreIconButtonTagName, AltCoreSimpleButtonTagName } from '~shared/constants'
import { expectNoAxeViolations, getDeepActiveElement, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import { altSearch } from '~shared/icons'
import '~core/ui/simpleButton'
import '~core/ui/iconButton'

const getSimpleControl = (element: Element) => element.shadowRoot?.querySelector<HTMLElement>('button, a')

const getIconControl = (element: Element) => {
  const simpleButton = element.shadowRoot?.querySelector(AltCoreSimpleButtonTagName)

  return simpleButton
    ? getSimpleControl(simpleButton)
    : undefined
}

const mountSimpleButton = async(props: Record<string, unknown> = {}, text = 'Save') => {
  const button = document.createElement(AltCoreSimpleButtonTagName)
  Object.assign(button, props)
  button.textContent = text
  document.body.append(button)
  await waitForLitTree(document.body)

  return button
}

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreSimpleButton/Accessibility', () => {
  it('is named by its content and activated with Enter and Space', async() => {
    const button = await mountSimpleButton()
    const onClick = vi.fn()
    button.addEventListener('click', onClick)

    await expectNoAxeViolations(button, PATTERN_AXE_OPTIONS)

    await userEvent.tab()
    expect(getDeepActiveElement()).toBe(getSimpleControl(button))

    await userEvent.keyboard('{Enter}')
    await userEvent.keyboard(' ')
    expect(onClick).toHaveBeenCalledTimes(2)
  })

  it('keeps its name and reports busy while loading', async() => {
    const button = await mountSimpleButton({ loading: true })

    expect(getSimpleControl(button)?.getAttribute('aria-busy')).toBe('true')
    await expectNoAxeViolations(button, PATTERN_AXE_OPTIONS)
  })

  it('uses accessibleName for a link without text', async() => {
    const button = await mountSimpleButton({ href: '/help', accessibleName: 'Help' }, '')

    expect(getSimpleControl(button)?.getAttribute('aria-label')).toBe('Help')
    await expectNoAxeViolations(button, PATTERN_AXE_OPTIONS)
  })

  it('is skipped by Tab when disabled', async() => {
    const button = await mountSimpleButton({ disabled: true })

    await userEvent.tab()
    expect(getDeepActiveElement()).not.toBe(getSimpleControl(button))
  })
})

describe('Core/AltCoreIconButton/Accessibility', () => {
  it('is named by accessibleName and hides its icon', async() => {
    const button = document.createElement(AltCoreIconButtonTagName)
    button.icon = altSearch
    button.accessibleName = 'Search'
    document.body.append(button)
    await waitForLitTree(document.body)

    const control = getIconControl(button)
    expect(control?.getAttribute('aria-label')).toBe('Search')
    expect(button.shadowRoot?.querySelector('alt-core-icon')?.shadowRoot?.querySelector('div')?.getAttribute('aria-hidden')).toBe('true')
    await expectNoAxeViolations(button, PATTERN_AXE_OPTIONS)

    button.focus()
    expect(getDeepActiveElement()).toBe(control)
  })
})
