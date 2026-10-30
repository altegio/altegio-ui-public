import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { text } from '~shared/tests/slotContents'
import type {
  AltCoreErrorTagName,
} from '~shared/constants'
import {
  AltCoreTextFieldTagName as tagName,
  AltCoreFieldIconTagName,
  AltCoreFieldInputTagName,
  AltCoreFieldWrapperTagName,
  AltCoreAnnotationTagName,
  AltCoreLabelTagName,
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

type TSubComponent = typeof AltCoreFieldInputTagName | typeof AltCoreAnnotationTagName | typeof AltCoreErrorTagName | typeof AltCoreFieldWrapperTagName | typeof AltCoreLabelTagName | typeof AltCoreFieldIconTagName

const getSubWC = <T extends TSubComponent>(primaryWC: HTMLElement, secondaryWC: T) => {
  const subWC = getWCShadowRoot(primaryWC).querySelector(secondaryWC)
  if (!subWC) throw new Error(`${secondaryWC} not found`)
  return subWC
}

describe(
  'Core/AltCoreTextField/Unit',
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
            `Should render the "${testCase.slot}" slot`,
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
            `Prop "${testCase.prop}" should be "${testCase.case}" and passed to fieldInput`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const inputField = getSubWC(
                component,
                AltCoreFieldInputTagName,
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
            `Prop "${testCase.prop}" should be "${testCase.case}" and passed to fieldWrapper`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const fieldWrapper = getSubWC(
                component,
                AltCoreFieldWrapperTagName,
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
            `Prop "${testCase.prop}" should be "${testCase.case}" and passed to fieldWrapper`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const fieldWrapper = getSubWC(
                component,
                AltCoreFieldWrapperTagName,
              )

              expect(fieldWrapper.error).toBe(testCase.expected)
            },
          )
        }

        for (const { prop, labelProp, case: propCase, value } of propLabelTextCases) {
          it(
            `Prop "${prop}" should be "${propCase}" and passed to label`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              if (value) {
                const labelElement = getSubWC(
                  component,
                  AltCoreLabelTagName,
                )
                expect(labelElement[labelProp]).toBe(value)
              } else {
                expect(() => getSubWC(
                  component,
                  AltCoreLabelTagName,
                )).toThrow(`${AltCoreLabelTagName} not found`)
              }
            },
          )
        }

        for (const { prop, case: propCase, value, labelProp } of propLabelTooltipTextCases) {
          it(
            `Prop "${prop}" should be "${propCase}" and passed to label`,
            async() => {
              await updateComponent({
                props: {
                  [prop]: value,
                  labelText: text,
                },
              })

              const labelElement = getSubWC(
                component,
                AltCoreLabelTagName,
              )

              expect(labelElement[labelProp]).toBe(value)
            },
          )
        }

        for (const { prop, case: propCase, value, annotationProp } of propAnnotationTextTestCases) {
          it(
            `Prop "${prop}" should be "${propCase}" and passed to annotation`,
            async() => {
              await updateComponent({ props: { [prop]: value } })

              const atomAnnotation = getSubWC(
                component,
                AltCoreAnnotationTagName,
              )

              expect(atomAnnotation[annotationProp]).toBe(value)
            },
          )
        }

        for (const testCase of propClearableCases) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.case}" ${testCase.value ? 'should' : 'should not'} show the clear button when there is a value`,
            async() => {
              await updateComponent({
                props: {
                  [testCase.prop]: testCase.value,
                  value: 'test value',
                },
              })

              const clearIcon = getWCShadowRoot(component).querySelector(AltCoreFieldIconTagName)

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
  },
)
