import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { YCoreFieldInputTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCoreFieldInputProps,
} from '~core/ui/fieldInput/models/types'
import '~core/ui/fieldInput'
import {
  propAutocompleteTestCases,
  propAutofocusTestCases,
  propDisabledTestCases,
  propHideSpaceLeftTestCases,
  propHideSpaceRightTestCases,
  propMaxlengthTestCases,
  propNameTestCases,
  propPlaceholderTestCases,
  propReadonlyTestCases,
  propRequiredTestCases, propSizeTestCases,
  propTypeTestCases,
  propValueTestCases,
} from '~core/ui/fieldInput/tests/cases/props'
import { classWithModifier, getElementClasses, getShadowRootElement, getWCShadowRoot } from '~shared/tests/utils'
import {
  eventBlurCases,
  eventFocusCases,
  eventInputCases,
  eventKeydownCases, eventRenderCases,
} from '~core/ui/fieldInput/tests/cases/events'

const tagName = YCoreFieldInputTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreFieldInputProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

describe(
  'Core/YFieldInput',
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
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const { prop, case: propCase, value, attribute } of [
              ...propNameTestCases,
              ...propPlaceholderTestCases,
              ...propAutofocusTestCases,
              ...propRequiredTestCases,
              ...propDisabledTestCases,
              ...propValueTestCases,
              ...propTypeTestCases,
              ...propAutocompleteTestCases,
              ...propReadonlyTestCases,
              ...propMaxlengthTestCases,
            ]) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и корректно наложить на rootElement аттрибут "${prop}"`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  expect(component[prop]).toBe(value)
                  const rootElement = getWCShadowRoot(component).querySelector('input')

                  if (value === undefined || !attribute) {
                    expect(rootElement?.hasAttribute(prop)).toBe(false)
                  } else {
                    expect(rootElement?.[attribute]).toBe(value)
                  }
                },
              )
            }

            for (const { prop, case: propCase, value, classModifier } of [
              ...propDisabledTestCases,
              ...propHideSpaceLeftTestCases,
              ...propHideSpaceRightTestCases,
              ...propSizeTestCases,
            ]) {
              const expectedCssClass = localClassWithModifier(classModifier ?? '')

              it(
                `${value ? 'Должен' : 'Не должен'} сожержать класс ${expectedCssClass}, если проп ${prop} "${propCase}"`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const rootElement = getRootElement()
                  const rootElementClasses = getElementClasses(rootElement)

                  if (value) {
                    expect(rootElementClasses).toContain(expectedCssClass)
                  } else {
                    expect(rootElementClasses).not.toContain(expectedCssClass)
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
              ...eventInputCases,
              ...eventFocusCases,
              ...eventBlurCases,
              ...eventKeydownCases,
            ]) {
              it(
                `Должен генерировать событие ${testCase.event} ${testCase.case}`,
                () => {
                  const handler = vi.fn()
                  component.addEventListener(
                    testCase.event,
                    handler,
                  )

                  if (!component.inputElement) {
                    throw new Error('inputElement is not defined')
                  }

                  component.inputElement.dispatchEvent(new CustomEvent(testCase.nodeEventName))

                  expect(handler).toHaveBeenCalled()
                },
              )

              it(
                `Не должен генерировать событие ${testCase.event}, если поле отключено`,
                async() => {
                  await updateComponent({ props: { disabled: true } })

                  const handler = vi.fn()
                  component.addEventListener(
                    testCase.event,
                    handler,
                  )

                  if (!component.inputElement) {
                    throw new Error('inputElement is not defined')
                  }

                  component.inputElement.dispatchEvent(new Event(testCase.nodeEventName))

                  expect(handler).not.toHaveBeenCalled()
                },
              )
            }

            for (const testCase of eventRenderCases) {
              it(
                `Должен генерировать событие ${testCase.event} ${testCase.case}`,
                () => {
                  const eventHandler = vi.fn()
                  component.addEventListener(
                    testCase.event,
                    eventHandler,
                  )

                  component.dispatchEvent(new CustomEvent(testCase.nodeEventName))

                  expect(eventHandler).toHaveBeenCalledTimes(1)
                },
              )
            }
          },
        )
      },
    )
  },
)
