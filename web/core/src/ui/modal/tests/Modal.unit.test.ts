import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import {
  YCoreModalTagName as tagName,
} from '~web/shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCoreModalProps } from '~core/ui/modal/models/types'
import { classWithModifier, getElementClasses, getShadowRootElement } from '~shared/tests/utils'
import {
  propsFullScreenTestCases,
  propsHideOverlayTestCases,
  propsOpenTestCases,
  propsPreventEscapeTestCases,
  propsSizeTestCases,
  propsVariantTestCases,
  propsWidthTestCases,
} from '~core/ui/modal/tests/cases/props'
import { slotDefaultTestCases } from '~core/ui/modal/tests/cases/slots'
import {
  eventActivatorCLickCases,
  eventCloseCases, eventCloseIconCLickCases,
  eventOpenCases,
  eventOverlayClickCases, eventPressEscapeCases,
} from '~core/ui/modal/tests/cases/events'
import { attributeAriaCases } from '~core/ui/modal/tests/cases/attributes'
import '~core/ui/modal'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreModalProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

const baseSlotsCheck = () => {
  for (const testCase of slotDefaultTestCases) {
    it(
      `Slot "${testCase.slot}" должен быть ${testCase.case}`,
      async() => {
        await updateComponent({ slots: { [testCase.slot]: testCase.content } })

        expect(component.textContent).toBe(testCase.content)
      },
    )
  }
}

const basePropsCheck = () => {
  for (const testCase of [
    ...propsOpenTestCases,
    ...propsVariantTestCases,
    ...propsWidthTestCases,
    ...propsPreventEscapeTestCases,
    ...propsHideOverlayTestCases,
    ...propsFullScreenTestCases,
  ]) {
    it(
      `Prop "${testCase.prop}" должен быть ${testCase.case}`,
      async() => {
        await updateComponent({ props: { [testCase.prop]: testCase.value } })

        expect(component[testCase.prop]).toBe(testCase.value)
      },
    )
  }
}

const baseEventsCheck = () => {
  for (const testCase of [
    ...eventOpenCases,
    ...eventCloseCases,
    ...eventOverlayClickCases,
    ...eventActivatorCLickCases,
    ...eventCloseIconCLickCases,
    ...eventPressEscapeCases,
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
}

describe(
  'Core/YCoreModal/Unit',
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
        baseSlotsCheck()
      },
    )

    describe(
      'Props',
      () => {
        basePropsCheck()

        for (const testCase of [...propsSizeTestCases, ...propsVariantTestCases]) {
          const expectedCssClass = localClassWithModifier(`${testCase.prop}_${testCase.expected as string}`)

          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить класс у rootElement на "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { open: true, [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )
        }

        for (const testCase of propsFullScreenTestCases) {
          const expectedCssClass = localClassWithModifier('full-screen')

          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" ${testCase.value ? '' : 'не'} должен добавить класс rootElement'у "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { open: true, [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              if (testCase.value) expect(rootElementClasses).toContain(expectedCssClass)
              else expect(rootElementClasses).not.toContain(expectedCssClass)
            },
          )
        }

        for (const testCase of propsOpenTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" ${testCase.value ? '' : 'не'} должен отобразить rootElement`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()

              expect(Boolean(rootElement)).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propsWidthTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен отобразить rootElement со стилем min-width: ${testCase.value}`,
            async() => {
              await updateComponent({ props: { open: true, [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()

              if (!rootElement) throw Error('Modal Element не найден')

              expect(rootElement).toHaveStyle(`max-width: ${testCase.value}`)
            },
          )
        }
      },
    )

    describe(
      'Attributes',
      () => {
        for (const testCase of attributeAriaCases) {
          it(
            `Attribute "${testCase.attr}" должен быть доступен со значением "${testCase.expected}"`,
            async() => {
              await updateComponent({ props: { open: true } })

              const rootElement = getLocalRootElement()

              if (!rootElement) throw Error('Modal Element не найден')

              expect(rootElement).toHaveAttribute(testCase.attr, testCase.expected)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        baseEventsCheck()
      },
    )
  },
)
