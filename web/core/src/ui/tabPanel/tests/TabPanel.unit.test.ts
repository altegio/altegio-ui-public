import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { AltCoreTabPanelTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCoreTabPanelProps } from '~core/ui/tabPanel/models/types'
import { text } from '~shared/tests/slotContents'

import '~core/ui/tabPanel'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTabPanelProps(),
)

describe(
  'Core/AltCoreTabPanel/Unit',
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
      'Should stay hidden outside alt-core-tab-panels',
      async() => {
        await updateComponent({ props: { name: 'panel' }, slots: { default: text } })

        expect(component.active).toBe(false)
        expect(getComputedStyle(component).display).toBe('none')
      },
    )

    it(
      'Props "label" and "labelledby" should be removed from the host when cleared',
      async() => {
        await updateComponent({ props: { label: 'Label', labelledby: 'tab' } })
        await updateComponent({ props: { label: undefined, labelledby: undefined } })

        expect(component.hasAttribute('aria-label')).toBe(false)
        expect(component.hasAttribute('aria-labelledby')).toBe(false)
      },
    )

    it(
      'Should keep a role set by the consumer',
      () => {
        const panel = document.createElement(tagName)
        panel.setAttribute('role', 'region')
        document.body.appendChild(panel)

        expect(panel.getAttribute('role')).toBe('region')

        panel.remove()
      },
    )
  },
)
