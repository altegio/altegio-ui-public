import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { AltCoreLinearProgressTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { expectNoAxeViolations, PATTERN_AXE_OPTIONS } from '~shared/tests/a11y'

import '~core/ui/linearProgress'

import { createCoreLinearProgressProps } from '~core/ui/linearProgress/models/types'
import { EAltSizes } from '~shared/types/global'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  { ...createCoreLinearProgressProps(), accessibleName: 'Uploading' },
)

const getBar = () => component.shadowRoot?.querySelector<HTMLElement>(`.${tagName}__bar`)

describe(
  'Core/AltCoreLinearProgress/Unit',
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
      'Should be a named progressbar with its range and value',
      async() => {
        await updateComponent({ props: { value: 40, accessibleName: 'Uploading' } })

        expect(component.getAttribute('role')).toBe('progressbar')
        expect(component.getAttribute('aria-label')).toBe('Uploading')
        expect(component.getAttribute('aria-valuemin')).toBe('0')
        expect(component.getAttribute('aria-valuemax')).toBe('100')
        expect(component.getAttribute('aria-valuenow')).toBe('40')
        expect(getBar()?.style.width).toBe('40%')
        await expectNoAxeViolations(component, PATTERN_AXE_OPTIONS)
      },
    )

    it(
      'Should scale the bar to "max" and keep the value in range',
      async() => {
        await updateComponent({ props: { value: 1, max: 4 } })
        expect(getBar()?.style.width).toBe('25%')
        expect(component.getAttribute('aria-valuemax')).toBe('4')

        await updateComponent({ props: { value: 10 } })
        expect(component.getAttribute('aria-valuenow')).toBe('4')

        await updateComponent({ props: { value: -5 } })
        expect(component.getAttribute('aria-valuenow')).toBe('0')
      },
    )

    it(
      'Should fall back to 100 for a maximum that is not positive',
      async() => {
        await updateComponent({ props: { value: 50, max: 0 } })

        expect(component.getAttribute('aria-valuemax')).toBe('100')
        expect(getBar()?.style.width).toBe('50%')
      },
    )

    it(
      'Should drop aria-valuenow when indeterminate',
      async() => {
        await updateComponent({ props: { value: 40, indeterminate: true, valueText: 'Almost there' } })

        expect(component.hasAttribute('aria-valuenow')).toBe(false)
        expect(component.hasAttribute('aria-valuetext')).toBe(false)
        expect(getBar()?.style.width).toBe('')
      },
    )

    it(
      'Prop "valueText" should set aria-valuetext',
      async() => {
        await updateComponent({ props: { valueText: 'Step 2 of 5' } })

        expect(component.getAttribute('aria-valuetext')).toBe('Step 2 of 5')
      },
    )

    it(
      'Prop "size" should set the bar height',
      async() => {
        await updateComponent({ props: { size: EAltSizes.MEDIUM } })
        expect(getComputedStyle(component.shadowRoot!.querySelector(`.${tagName}`)!).height).toBe('8px')

        await updateComponent({ props: { size: EAltSizes.SMALL } })
        expect(getComputedStyle(component.shadowRoot!.querySelector(`.${tagName}`)!).height).toBe('4px')
      },
    )

    it(
      'Should keep an aria-label set on the host when "accessibleName" is empty',
      async() => {
        await updateComponent({ props: { accessibleName: undefined } })
        component.setAttribute('aria-label', 'Export')
        await updateComponent({ props: { value: 10 } })

        expect(component.getAttribute('aria-label')).toBe('Export')
      },
    )
  },
)
