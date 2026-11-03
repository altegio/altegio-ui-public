import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { AltCoreTextareaTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'

import {
  createCoreTextareaProps,
} from '~core/ui/textarea/models/types'
import '~core/ui/textarea'

const tagName = AltCoreTextareaTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTextareaProps(),
)

import {
  propDisabledCases,
  propSizeCases,
  propReadonlyCases,
  propValueCases,
  propNameCases,
  propMaxlengthCases,
  propRequiredCases,
  propAutofocusCases,
  propRowsCases,
  propResizeCases,
} from './cases/props'

import {
  eventInputCases,
  eventFocusCases,
  eventBlurCases,
} from './cases/events'

describe(
  'Core/AltTextarea',
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
            for (const testCase of [
              ...propDisabledCases,
              ...propSizeCases,
              ...propReadonlyCases,
              ...propValueCases,
              ...propNameCases,
              ...propMaxlengthCases,
              ...propRequiredCases,
              ...propAutofocusCases,
              ...propRowsCases,
              ...propResizeCases,
            ]) {
              it(
                `Prop "${testCase.prop}" should work ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  expect(component[testCase.prop]).toBe(testCase.value)
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
            ]) {
              it(
                `Should emit ${testCase.event} ${testCase.case}`,
                () => {
                  const eventHandler = vi.fn()
                  component.addEventListener(
                    testCase.nodeEventName,
                    eventHandler,
                  )

                  const textareaElement = component.fieldTextarea?.textareaElement

                  if (!textareaElement) {
                    throw new Error('textareaElement is not defined')
                  }

                  textareaElement.dispatchEvent(new Event(testCase.nodeEventName))

                  expect(eventHandler).toHaveBeenCalledTimes(1)
                },
              )

              it(
                `Should not emit ${testCase.event} on text input when the field is disabled`,
                async() => {
                  await updateComponent({ props: { disabled: true } })

                  const eventHandler = vi.fn()
                  component.addEventListener(
                    testCase.nodeEventName,
                    eventHandler,
                  )

                  const textareaElement = component.fieldTextarea?.textareaElement

                  if (!textareaElement) {
                    throw new Error('textareaElement is not defined')
                  }

                  textareaElement.dispatchEvent(new Event(testCase.nodeEventName))

                  expect(eventHandler).not.toHaveBeenCalled()
                },
              )
            }
          },
        )
        describe(
          'Counter',
          () => {
            it(
              'Should show the counter when maxlength is set',
              async() => {
                await updateComponent({ props: { maxlength: 50, value: 'test' } })

                const counter = component.shadowRoot?.querySelector('.alt-core-textarea__counter')
                expect(counter).toBeTruthy()
                expect(counter?.textContent).toBe('4 / 50')
              },
            )

            it(
              'Should not show the counter when maxlength is not set',
              async() => {
                await updateComponent({ props: { maxlength: undefined, value: 'test' } })

                const counter = component.shadowRoot?.querySelector('.alt-core-textarea__counter')
                expect(counter).toBeFalsy()
              },
            )

            it(
              'The counter should update when value changes',
              async() => {
                await updateComponent({ props: { maxlength: 100, value: 'test' } })

                let counter = component.shadowRoot?.querySelector('.alt-core-textarea__counter')
                expect(counter?.textContent).toBe('4 / 100')

                await updateComponent({ props: { value: 'test test' } })

                counter = component.shadowRoot?.querySelector('.alt-core-textarea__counter')
                expect(counter?.textContent).toBe('9 / 100')
              },
            )

            it(
              'The counter should show 0 when value is empty',
              async() => {
                await updateComponent({ props: { maxlength: 50, value: '' } })

                const counter = component.shadowRoot?.querySelector('.alt-core-textarea__counter')
                expect(counter?.textContent).toBe('0 / 50')
              },
            )
          },
        )
      },
    )
  },
)
