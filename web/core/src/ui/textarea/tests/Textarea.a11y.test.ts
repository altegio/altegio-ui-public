import { afterEach, describe, expect, it } from 'vitest'
import { AltCoreTextareaTagName, AltCoreTextFieldTagName } from '~shared/constants'
import { expectNoAxeViolations, PATTERN_AXE_OPTIONS, waitForLitTree } from '~shared/tests/a11y'
import type { AltCoreTextarea } from '~core/ui/textarea'
import type { AltCoreTextField } from '~core/ui/textField'
import '~core/ui/textarea'
import '~core/ui/textField'

const mount = async<T extends HTMLElement>(tagName: string, props: Partial<T>) => {
  const element = document.createElement(tagName) as T
  Object.assign(element, props)
  document.body.append(element)
  await waitForLitTree(element)

  return element
}

const getTextarea = (element: AltCoreTextarea) => element.shadowRoot
  ?.querySelector('alt-core-field-textarea')
  ?.shadowRoot
  ?.querySelector('textarea')

afterEach(() => {
  document.body.replaceChildren()
})

describe('Core/AltCoreTextarea/Accessibility', () => {
  it('takes its name from the label and has no axe violations', async() => {
    const textarea = await mount<AltCoreTextarea>(AltCoreTextareaTagName, { labelText: 'Comment' })

    expect(getTextarea(textarea)?.getAttribute('aria-label')).toBe('Comment')
    await expectNoAxeViolations(textarea, PATTERN_AXE_OPTIONS)
  })

  it('takes its name from accessibleName when there is no label', async() => {
    const textarea = await mount<AltCoreTextarea>(AltCoreTextareaTagName, { accessibleName: 'Comment for the master' })

    expect(getTextarea(textarea)?.getAttribute('aria-label')).toBe('Comment for the master')
    await expectNoAxeViolations(textarea, PATTERN_AXE_OPTIONS)
  })

  it('describes the errors it shows and marks itself invalid', async() => {
    const textarea = await mount<AltCoreTextarea>(AltCoreTextareaTagName, { labelText: 'Comment', error: true, errors: ['Too long'] })

    expect(getTextarea(textarea)?.getAttribute('aria-description')).toBe('Too long.')
    expect(getTextarea(textarea)?.getAttribute('aria-invalid')).toBe('true')
  })

  it('names the clear button', async() => {
    const textarea = await mount<AltCoreTextarea>(AltCoreTextareaTagName, { labelText: 'Comment', value: 'Text', clearable: true })

    const clear = textarea.shadowRoot?.querySelector('alt-core-field-icon')?.shadowRoot?.querySelector('[role="button"]')
    expect(clear?.getAttribute('aria-label')).toBe('Clear')
  })
})

describe('Core/AltCoreTextField/Accessibility', () => {
  it('takes its name from accessibleName ahead of the label', async() => {
    const field = await mount<AltCoreTextField>(AltCoreTextFieldTagName, { labelText: 'Phone', accessibleName: 'Client phone' })

    expect(field.fieldInput?.inputElement?.getAttribute('aria-label')).toBe('Client phone')
  })

  it('takes its name from accessibleName without a label and has no axe violations', async() => {
    const field = await mount<AltCoreTextField>(AltCoreTextFieldTagName, { accessibleName: 'Search' })

    expect(field.fieldInput?.inputElement?.getAttribute('aria-label')).toBe('Search')
    await expectNoAxeViolations(field, PATTERN_AXE_OPTIONS)
  })
})
