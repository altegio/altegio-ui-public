import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { AltCoreFunctionalModalTagName as tagName, AltCoreModalTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCoreFunctionalModalProps } from '~core/ui/functionalModal/models/types'
import { getShadowElement, trimTextContent } from '~shared/tests/utils'
import '~core/ui/functionalModal'
import type { AltCoreModal } from '~core/ui/modal'

import { slotsTestCases } from './cases/slots'
import {
  propsOpenTestCases,
  propsSizeTestCases,
  propsPreventEscapeTestCases,
  propsFullScreenTestCases,
  propsWidthTestCases,
  propsHideOverlayTestCases,
  propsHeadingTestCases,
  propsSubHeadingTestCases,
  propsHideFooterTestCases,
} from './cases/props'
import {
  eventActivatorCLickCases,
  eventCloseCases,
  eventCloseIconCLickCases,
  eventOpenCases,
  eventOverlayClickCases,
  eventPressEscapeCases,
  eventCancelCases,
  eventSubmitCases,
} from './cases/events'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreFunctionalModalProps(),
)

describe('Core/AltCoreFunctionalModal/Unit', () => {
  beforeAll(() => {
    injectComponentToBody()
  })

  afterEach(async() => {
    await resetComponent()
  })

  afterAll(() => {
    removeComponent()
  })

  const getLocalShadowElement = (selector: string) => {
    return getShadowElement(
      component,
      selector,
    )
  }

  describe(
    'Slots',
    () => {
      for (const testCase of slotsTestCases) {
        it(
          `Slot "${testCase.slot}" should render ${testCase.case}`,
          async() => {
            await updateComponent({ slots: { [testCase.slot]: testCase.content } })

            expect(component.textContent).toBe(testCase.content)
          },
        )
      }
    },
  )

  describe('Props', () => {
    for (const testCase of [
      ...propsOpenTestCases,
      ...propsSizeTestCases,
      ...propsPreventEscapeTestCases,
    ]) {
      it(
        `Prop "${testCase.prop}" should be "${testCase.case}" and passed to Modal`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const modalElement = getLocalShadowElement(AltCoreModalTagName) as AltCoreModal | null

          if (!modalElement) {
            throw new Error('modalElement not found')
          }

          expect(modalElement[testCase.prop]).toBe(testCase.expected)
        },
      )
    }

    for (const testCase of [
      ...propsWidthTestCases,
      ...propsHideOverlayTestCases,
      ...propsFullScreenTestCases,
    ]) {
      it(
        `Prop "${testCase.prop}" should be "${testCase.case}" and passed to Modal`,
        async() => {
          Object.defineProperty(component, 'breakpoints', { value: { smallerOrEqual: () => false } })

          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const modalElement = getLocalShadowElement(AltCoreModalTagName) as AltCoreModal | null

          if (!modalElement) {
            throw new Error('modalElement not found')
          }

          expect(modalElement[testCase.prop]).toBe(testCase.expected)
        },
      )
    }

    for (const testCase of propsHeadingTestCases) {
      it(
        `Prop "${testCase.prop}" should be "${testCase.case}" and shown in the header`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const header = getLocalShadowElement(`.${tagName}__header`)
          expect(header).not.toBeNull()

          const altCoreText = header?.querySelector('alt-core-text')
          expect(altCoreText).not.toBeNull()
          expect(trimTextContent(altCoreText?.textContent)).toBe(testCase.expected)
        },
      )
    }

    for (const testCase of propsSubHeadingTestCases) {
      it(
        `Prop "${testCase.prop}" should be "${testCase.case}" and shown in the header`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const header = getLocalShadowElement(`.${tagName}__header`)
          expect(header).not.toBeNull()

          const altCoreTexts = header?.querySelectorAll('alt-core-text')

          expect(trimTextContent(altCoreTexts?.[1]?.textContent)).toBe(testCase.expected)
        },
      )
    }

    for (const testCase of propsHideFooterTestCases) {
      it(
        `Prop "${testCase.prop}" should ${testCase.case} when its value is ${testCase.value}`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const footer = getLocalShadowElement('footer')

          if (testCase.value) {
            expect(footer).toBeNull()
          } else {
            expect(footer).not.toBeNull()
          }
        },
      )
    }
  })

  describe('Events', () => {
    for (const testCase of [
      ...eventOpenCases,
      ...eventCloseCases,
      ...eventOverlayClickCases,
      ...eventActivatorCLickCases,
      ...eventCloseIconCLickCases,
      ...eventPressEscapeCases,
      ...eventCancelCases,
      ...eventSubmitCases,
    ]) {
      it(
        `Should emit ${testCase.event} ${testCase.case}`,
        () => {
          const eventHandler = vi.fn()
          component.addEventListener(
            testCase.nodeEventName,
            eventHandler,
          )

          component.dispatchEvent(new Event(testCase.nodeEventName))

          expect(eventHandler).toHaveBeenCalledTimes(1)
        },
      )
    }
  })
})
