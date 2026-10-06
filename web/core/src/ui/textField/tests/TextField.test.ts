import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { text } from '~shared/tests/slotContents'
import type {
  YCoreErrorTagName,
} from '~shared/constants'
import {
  YCoreTextFieldTagName as tagName,
  YCoreFieldIconTagName,
  YCoreFieldInputTagName,
  YCoreFieldWrapperTagName,
  YCoreAnnotationTagName,
  YCoreLabelTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { textWithTag } from '~shared/tests/slotContents'
import { getWCShadowRoot } from '~shared/tests/utils'
import {
  createCoreTextFieldProps,
} from '~core/ui/textField/models/types'
import '~core/ui/textField'
import {
  propValueCases,
  propNameCases,
  propTypeTestCases,
  propPlaceholderCases,
  propRequiredCases,
  propMaxlengthCases,
  propAutofocusCases,
  propDisabledCases,
  propLabelTextCases,
  propReadonlyCases,
  propSizeCases,
  propErrorsCases,
  propErrorCases,
  propAnnotationTextTestCases,
  propClearableCases,
  propLabelTooltipTextCases,
} from './cases/props'
import {
  eventClickOutsideCases,
  eventMouseEnterCases,
  eventMouseLeaveCases,
  eventInputCases,
  eventFocusCases,
  eventBlurCases,
  eventRenderInputCases,
  eventCloseCases,
} from './cases/events'
import {
  textFieldSlotsTestCases,
} from './cases/slots'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTextFieldProps(),
)

type TSubComponent = typeof YCoreFieldInputTagName | typeof YCoreAnnotationTagName | typeof YCoreErrorTagName | typeof YCoreFieldWrapperTagName | typeof YCoreLabelTagName | typeof YCoreFieldIconTagName

const getSubWC = <T extends TSubComponent>(primaryWC: HTMLElement, secondaryWC: T) => {
  const subWC = getWCShadowRoot(primaryWC).querySelector(secondaryWC)
  if (!subWC) throw new Error(`${secondaryWC} not found`)
  return subWC
}

describe(
  'Core/YCoreTextField/Unit',
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
        for (const testCase of textFieldSlotsTestCases) {
          it(
            `Должен отрендерить слот "${testCase.slot}"`,
            async() => {
              await updateComponent({ slots: { [testCase.slot]: testCase.content } })
              const slotContent = component.querySelector(`div[slot="${testCase.slot}"]`)
              expect(slotContent?.innerHTML).toBe(textWithTag)
            },
          )
        }
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propValueCases,
          ...propNameCases,
          ...propTypeTestCases,
          ...propPlaceholderCases,
          ...propRequiredCases,
          ...propMaxlengthCases,
          ...propAutofocusCases,
        ]) {
          it(
            `Проп "${testCase.prop}" должен быть "${testCase.case}" и передан в fieldInput`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const inputField = getSubWC(
                component,
                YCoreFieldInputTagName,
              )

              expect(inputField[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of [
          ...propDisabledCases,
          ...propReadonlyCases,
          ...propSizeCases,
        ]) {
          it(
            `Проп "${testCase.prop}" должен быть "${testCase.case}" и передан в fieldWrapper`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const fieldWrapper = getSubWC(
                component,
                YCoreFieldWrapperTagName,
              )

              expect(fieldWrapper[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of [
          ...propErrorsCases,
          ...propErrorCases,
        ]) {
          it(
            `Проп "${testCase.prop}" должен быть "${testCase.case}" и передан в fieldWrapper`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const fieldWrapper = getSubWC(
                component,
                YCoreFieldWrapperTagName,
              )

              expect(fieldWrapper.error).toBe(testCase.expected)
            },
          )
        }

        for (const { prop, labelProp, case: propCase, value } of propLabelTextCases) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в label`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              if (value) {
                const labelElement = getSubWC(
                  component,
                  YCoreLabelTagName,
                )
                expect(labelElement[labelProp]).toBe(value)
              } else {
                expect(() => getSubWC(
                  component,
                  YCoreLabelTagName,
                )).toThrow(`${YCoreLabelTagName} not found`)
              }
            },
          )
        }

        for (const { prop, case: propCase, value, labelProp } of propLabelTooltipTextCases) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в label`,
            async() => {
              await updateComponent({
                props: {
                  [prop]: value,
                  labelText: text,
                },
              })

              const labelElement = getSubWC(
                component,
                YCoreLabelTagName,
              )

              expect(labelElement[labelProp]).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value, annotationProp } of propAnnotationTextTestCases) {
          it(
            `Проп "${prop}" должен быть "${propCase}" и передан в annotation`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const atomAnnotation = getSubWC(
                component,
                YCoreAnnotationTagName,
              )

              expect(atomAnnotation[annotationProp]).toBe(value)
            },
          )
        }

        for (const testCase of propClearableCases) {
          it(
            `Проп "${testCase.prop}" со значением "${testCase.case}" ${testCase.value ? 'должен' : 'не должен'} показать кнопку очистки при наличии значения`,
            async() => {
              await updateComponent({
                props: {
                  [testCase.prop]: testCase.value,
                  value: 'test value',
                },
              })

              const clearIcon = getWCShadowRoot(component).querySelector(YCoreFieldIconTagName)

              if (testCase.value) {
                expect(clearIcon).not.toBeNull()
              } else {
                expect(clearIcon).toBeNull()
              }
            },
          )
        }
      },
    )

    describe('Events', () => {
      for (const testCase of [
        ...eventClickOutsideCases,
        ...eventMouseEnterCases,
        ...eventMouseLeaveCases,
        ...eventInputCases,
        ...eventFocusCases,
        ...eventBlurCases,
        ...eventRenderInputCases,
        ...eventCloseCases,
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
  },
)
