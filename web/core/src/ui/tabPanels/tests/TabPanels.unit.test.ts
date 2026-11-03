import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { AltCoreTabPanelsTagName as tagName, AltCoreTabPanelTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCoreTabPanelsProps } from '~core/ui/tabPanels/models/types'
import type { AltCoreTabPanel } from '~core/ui/tabPanel'

import '~core/ui/tabPanels'
import '~core/ui/tabPanel'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTabPanelsProps(),
)

const renderPanels = async(markup: string) => {
  component.innerHTML = markup

  const panels = Array.from(component.querySelectorAll<AltCoreTabPanel>(AltCoreTabPanelTagName))
  await Promise.all(panels.map((panel) => panel.updateComplete))

  return panels
}

const settle = async(panels: AltCoreTabPanel[]) => {
  await component.updateComplete
  await Promise.all(panels.map((panel) => panel.updateComplete))
}

const panelsMarkup = `
  <alt-core-tab-panel name="first" label="First">First</alt-core-tab-panel>
  
  <alt-core-tab-panel name="second" labelledby="second-tab">Second</alt-core-tab-panel>
`

describe(
  'Core/AltCoreTabPanels/Unit',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    it(
      'Should show only the panel whose name equals the value',
      async() => {
        const panels = await renderPanels(panelsMarkup)
        await updateComponent({ props: { value: 'second' } })
        await settle(panels)

        const [first, second] = panels

        expect(first.active).toBe(false)
        expect(getComputedStyle(first).display).toBe('none')
        expect(second.active).toBe(true)
        expect(getComputedStyle(second).display).toBe('block')
      },
    )

    it(
      'Should switch the panels when the value changes',
      async() => {
        const panels = await renderPanels(panelsMarkup)
        await updateComponent({ props: { value: 'first' } })
        await settle(panels)
        await updateComponent({ props: { value: 'second' } })
        await settle(panels)

        expect(panels.map((panel) => panel.hasAttribute('active'))).toStrictEqual([false, true])
      },
    )

    it(
      'Should match numeric values with panel names',
      async() => {
        const panels = await renderPanels('<alt-core-tab-panel name="0"></alt-core-tab-panel><alt-core-tab-panel name="1"></alt-core-tab-panel>')
        await updateComponent({ props: { value: 1 } })
        await settle(panels)

        expect(panels.map((panel) => panel.active)).toStrictEqual([false, true])
      },
    )

    it(
      'Should hide every panel when the value matches none',
      async() => {
        const panels = await renderPanels(panelsMarkup)
        await updateComponent({ props: { value: undefined } })
        await settle(panels)

        expect(panels.some((panel) => panel.active)).toBe(false)
      },
    )

    describe(
      'Accessibility',
      () => {
        it(
          'Panels should be tabpanels named by label or labelledby',
          async() => {
            const [first, second] = await renderPanels(panelsMarkup)

            expect(first.getAttribute('role')).toBe('tabpanel')
            expect(first.getAttribute('aria-label')).toBe('First')
            expect(second.getAttribute('aria-labelledby')).toBe('second-tab')
          },
        )

        it(
          'Only the visible panel should be focusable',
          async() => {
            const panels = await renderPanels(panelsMarkup)
            await updateComponent({ props: { value: 'first' } })
            await settle(panels)

            const [first, second] = panels

            expect(first.getAttribute('tabindex')).toBe('0')
            expect(second.hasAttribute('tabindex')).toBe(false)
          },
        )
      },
    )
  },
)
