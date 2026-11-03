import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { AltCoreStatusTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { expectNoAxeViolations, PATTERN_AXE_OPTIONS } from '~shared/tests/a11y'
import { altCheckCircle, altClock, altSmile, altWarningAlert } from '~shared/icons'
import type { AltCoreIcon } from '~core/ui/icon'

import '~core/ui/status'

import { createCoreStatusProps, EAltCoreStatusVariant } from '~core/ui/status/models/types'
import { EAltSizes } from '~shared/types/global'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreStatusProps(),
)

const getRoot = () => component.shadowRoot!.querySelector<HTMLElement>(`.${tagName}`)!

const getIcon = () => component.shadowRoot!.querySelector<AltCoreIcon>('alt-core-icon')!

describe(
  'Core/AltCoreStatus/Unit',
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

    for (const [variant, role, icon] of [
      [EAltCoreStatusVariant.WAITING, 'status', altClock],
      [EAltCoreStatusVariant.SUCCESS, 'status', altCheckCircle],
      [EAltCoreStatusVariant.ERROR, 'alert', altWarningAlert],
    ] as const) {
      it(
        `Variant "${variant}" should use role="${role}" and its icon`,
        async() => {
          await updateComponent({ props: { variant, text: 'Message' } })

          expect(getRoot().getAttribute('role')).toBe(role)
          expect(getRoot().classList).toContain(`${tagName}_variant-${variant}`)
          expect(getIcon().icon).toBe(icon)
          await expectNoAxeViolations(component, PATTERN_AXE_OPTIONS)
        },
      )
    }

    it(
      'Should render the text and hide the icon from assistive technologies',
      async() => {
        await updateComponent({ props: { text: 'Request sent' } })

        expect(component.shadowRoot!.querySelector(`.${tagName}__text`)?.textContent).toBe('Request sent')
        expect(getIcon().parentElement?.getAttribute('aria-hidden')).toBe('true')
      },
    )

    it(
      'Prop "icon" should replace the variant icon',
      async() => {
        await updateComponent({ props: { icon: altSmile } })

        expect(getIcon().icon).toBe(altSmile)
      },
    )

    it(
      'Prop "size" should set the padding',
      async() => {
        await updateComponent({ props: { size: EAltSizes.MEDIUM } })
        expect(getComputedStyle(getRoot()).padding).toBe('20px 24px')

        await updateComponent({ props: { size: EAltSizes.LARGE } })
        expect(getComputedStyle(getRoot()).padding).toBe('28px')
      },
    )

    it(
      'Should render slotted content',
      async() => {
        await updateComponent({ slots: { default: 'Details' } })

        const slot = component.shadowRoot!.querySelector('slot')!

        expect(slot.assignedNodes().map((node) => node.textContent).join('')).toContain('Details')
      },
    )
  },
)
