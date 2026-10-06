import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { YCoreFunctionalModalTagName as tagName, YCoreModalTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCoreFunctionalModalProps } from '~core/ui/functionalModal/models/types'
import { getShadowElement } from '~shared/tests/utils'
import '~core/ui/functionalModal'
import type { YCoreModal } from '~core/ui/modal'

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

describe('Core/YCoreFunctionalModal/Unit', () => {
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
          `Slot "${testCase.slot}" должен быть ${testCase.case}`,
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
        `Проп "${testCase.prop}" должен быть "${testCase.case}" и передан в Modal`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const modalElement = getLocalShadowElement(YCoreModalTagName) as YCoreModal | null

          if (!modalElement) {
            throw new Error('modalElement не найден')
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
        `Проп "${testCase.prop}" должен быть "${testCase.case}" и передан в Modal`,
        async() => {
          Object.defineProperty(component, 'breakpoints', { value: { smallerOrEqual: () => false } })

          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const modalElement = getLocalShadowElement(YCoreModalTagName) as YCoreModal | null

          if (!modalElement) {
            throw new Error('modalElement не найден')
          }

          expect(modalElement[testCase.prop]).toBe(testCase.expected)
        },
      )
    }

    for (const testCase of propsHeadingTestCases) {
      it(
        `Проп "${testCase.prop}" должен быть "${testCase.case}" и отображаться в header`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const header = getLocalShadowElement(`.${tagName}__header`)
          expect(header).not.toBeNull()

          const yCoreText = header?.querySelector('y-core-text')
          expect(yCoreText).not.toBeNull()
          expect(yCoreText?.textContent?.trim()).toBe(testCase.expected)
        },
      )
    }

    for (const testCase of propsSubHeadingTestCases) {
      it(
        `Проп "${testCase.prop}" должен быть "${testCase.case}" и отображаться в header`,
        async() => {
          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const header = getLocalShadowElement(`.${tagName}__header`)
          expect(header).not.toBeNull()

          const yCoreTexts = header?.querySelectorAll('y-core-text')

          expect(yCoreTexts?.[1]?.textContent?.trim()).toBe(testCase.expected)
        },
      )
    }

    for (const testCase of propsHideFooterTestCases) {
      it(
        `Проп "${testCase.prop}" должен ${testCase.case} если его значение ${testCase.value} `,
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
        `Должен генерировать событие ${testCase.event} ${testCase.case}`,
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
