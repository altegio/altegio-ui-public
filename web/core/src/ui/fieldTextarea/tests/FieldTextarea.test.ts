import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { YCoreFieldTextareaTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCoreFieldTextareaProps,
} from '~core/ui/fieldTextarea/models/types'
import '~core/ui/fieldTextarea'

import {
  propDisabledCases,
  propSizeCases,
  propReadonlyCases,
  propValueCases,
  propNameCases,
  propAutocompleteCases,
  propMaxlengthCases,
  propRequiredCases,
  propAutofocusCases,
  propHideSpaceLeftCases,
  propHideSpaceRightCases,
  propRowsCases,
  propResizeCases,
} from './cases/props'

import {
  eventInputCases,
  eventFocusCases,
  eventBlurCases,
  eventKeydownCases,
  eventRenderCases,
} from './cases/events'

const tagName = YCoreFieldTextareaTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreFieldTextareaProps(),
)

describe(
  'Core/YFieldTextarea',
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
              ...propAutocompleteCases,
              ...propMaxlengthCases,
              ...propRequiredCases,
              ...propAutofocusCases,
              ...propHideSpaceLeftCases,
              ...propHideSpaceRightCases,
              ...propRowsCases,
              ...propResizeCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен быть ${testCase.case}`,
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
              ...eventKeydownCases,
            ]) {
              it(
                `Должен генерировать событие ${testCase.event} ${testCase.case}`,
                () => {
                  const eventHandler = vi.fn()
                  component.addEventListener(
                    testCase.nodeEventName,
                    eventHandler,
                  )

                  if (!component.textareaElement) {
                    throw new Error('textareaElement is not defined')
                  }

                  component.textareaElement.dispatchEvent(new Event(testCase.nodeEventName))

                  expect(eventHandler).toHaveBeenCalledTimes(1)
                },
              )

              it(
                `Не должен генерировать событие ${testCase.event} при вводе текста, если поле отключено`,
                async() => {
                  await updateComponent({ props: { disabled: true } })

                  const eventHandler = vi.fn()
                  component.addEventListener(
                    testCase.nodeEventName,
                    eventHandler,
                  )

                  if (!component.textareaElement) {
                    throw new Error('textareaElement is not defined')
                  }

                  component.textareaElement.dispatchEvent(new Event(testCase.nodeEventName))

                  expect(eventHandler).not.toHaveBeenCalled()
                },
              )
            }

            for (const testCase of eventRenderCases) {
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
          },
        )
      },
    )
  },
)
