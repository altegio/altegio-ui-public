import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { YCoreCardWrapperTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getElementClasses, getShadowRootElement } from '~shared/tests/utils'
import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { createCoreCardWrapperProps } from '~core/ui/cardWrapper/models/types'
import '~core/ui/cardWrapper'

import {
  propCheckedCases,
  propDisabledCases,
  propHoverableCases,
  propFocusableCases,
  propSizeCases,
} from './cases/props'

import {
  eventClickCases,
  eventFocusCases,
  eventBlurCases,
} from './cases/events'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCardWrapperProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'с контентом', content: text },
  { slot: 'default', case: 'без контента', content: empty },
]

describe(
  'Core/YCardWrapper/Unit',
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

    describe(
      'Slots',
      () => {
        for (const testCase of slotDefaultTestCases) {
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

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propCheckedCases,
          ...propDisabledCases,
          ...propHoverableCases,
          ...propFocusableCases,
          ...propSizeCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(component[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of [
          ...propCheckedCases,
          ...propDisabledCases,
          ...propHoverableCases,
          ...propFocusableCases,
        ]) {
          const expectedCssClass = `${tagName}_${testCase.prop}`

          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const classes = getElementClasses(rootElement)

              if (testCase.value) {
                expect(classes).toContain(expectedCssClass)
              } else {
                expect(classes).not.toContain(expectedCssClass)
              }
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        for (const testCase of [
          ...eventFocusCases,
          ...eventBlurCases,
        ]) {
          it(
            `Должен генерировать событие ${testCase.event} ${testCase.case}`,
            async() => {
              await updateComponent({ props: { focusable: true } })

              const eventHandler = vi.fn()
              component.addEventListener(
                testCase.nodeEventName,
                eventHandler,
              )

              if (!component.divElement) {
                throw new Error('divElement is not defined')
              }

              component.divElement.dispatchEvent(new Event(testCase.nodeEventName))

              expect(eventHandler).toHaveBeenCalledTimes(1)
            },
          )

          it(
            `Не должен генерировать событие ${testCase.event}, если компонент отключен`,
            async() => {
              await updateComponent({ props: { disabled: true } })

              const eventHandler = vi.fn()
              component.addEventListener(
                testCase.nodeEventName,
                eventHandler,
              )

              if (!component.divElement) {
                throw new Error('divElement is not defined')
              }

              component.divElement.dispatchEvent(new Event(testCase.nodeEventName))

              expect(eventHandler).not.toHaveBeenCalled()
            },
          )
        }
        for (const testCase of [...eventClickCases]) {
          it(
            `Должен генерировать событие ${testCase.event} ${testCase.case}`,
            async() => {
              await updateComponent({ props: { focusable: true } })

              const eventHandler = vi.fn()
              component.addEventListener(
                testCase.nodeEventName,
                eventHandler,
              )

              component.dispatchEvent(new Event(testCase.nodeEventName))

              expect(eventHandler).toHaveBeenCalledTimes(1)
            },
          )

          it(
            `Не должен генерировать событие ${testCase.event}, если компонент отключен`,
            async() => {
              await updateComponent({ props: { disabled: true } })

              const eventHandler = vi.fn()
              component.addEventListener(
                testCase.nodeEventName,
                eventHandler,
              )

              component.dispatchEvent(new Event(testCase.nodeEventName))

              expect(eventHandler).not.toHaveBeenCalled()
            },
          )
        }
      },
    )
  },
)
