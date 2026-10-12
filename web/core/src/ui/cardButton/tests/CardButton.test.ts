import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { YCoreCardButtonTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getElementClasses, getShadowRootElement } from '~shared/tests/utils'
import { createCoreCardButtonProps } from '~core/ui/cardButton/models/types'
import '~core/ui/cardButton'

import {
  propDisabledCases,
  propHoverableCases,
  propFocusableCases,
  propSizeCases,
  propHeaderTextCases,
  propTagTextCases,
  propTagVariantCases,
  propHeaderIconCases,
  propAnnotationCases,
} from './cases/props'

import {
  slotDefaultTestCases,
} from './cases/slots'

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
  createCoreCardButtonProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/YCardButton/Unit',
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
          ...propDisabledCases,
          ...propHoverableCases,
          ...propFocusableCases,
          ...propSizeCases,
          ...propHeaderTextCases,
          ...propTagTextCases,
          ...propTagVariantCases,
          ...propHeaderIconCases,
          ...propAnnotationCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(component[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propDisabledCases) {
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

        for (const testCase of propSizeCases) {
          const expectedCssClass = `${tagName}_size_${testCase.case}`

          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(expectedCssClass)
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

              const rootElement = getLocalRootElement()

              if (!rootElement) {
                throw new Error('rootElement is not defined')
              }

              rootElement.dispatchEvent(new Event(testCase.nodeEventName))

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

              const rootElement = getLocalRootElement()

              if (!rootElement) {
                throw new Error('rootElement is not defined')
              }

              rootElement.dispatchEvent(new Event(testCase.nodeEventName))

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
