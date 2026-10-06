import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { YCoreCollapseItemTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCoreCollapseItemProps,
} from '~core/ui/collapseItem/models/types'
import '~core/ui/collapseItem'

import {
  slotBeforeTestCases,
  slotMainTestCases,
  slotLabelTestCases,
  slotAnnotationTestCases,
  slotAfterTestCases,
  slotContentTestCases,
} from './cases/slots'
import {
  propLabelCases,
  propAnnotationCases,
  propOpenedCases,
  propValueCases,
  propVariantCases,
} from './cases/props'
import {
  eventCollapseItemClickCases,
} from './cases/events'

const tagName = YCoreCollapseItemTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCollapseItemProps(),
)

describe(
  'Core/YCollapseItem',
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
          'Slots',
          () => {
            for (const testCase of [
              ...slotBeforeTestCases,
              ...slotMainTestCases,
              ...slotLabelTestCases,
              ...slotAnnotationTestCases,
              ...slotAfterTestCases,
              ...slotContentTestCases,
            ]) {
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
              ...propLabelCases,
              ...propAnnotationCases,
              ...propOpenedCases,
              ...propValueCases,
              ...propVariantCases,
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
            for (const testCase of [...eventCollapseItemClickCases]) {
              it(
                `Должен генерировать событие ${testCase.event} ${testCase.case}`,
                () => {
                  const eventHandler = vi.fn()
                  component.addEventListener(
                    testCase.event,
                    eventHandler,
                  )

                  if (!component.activatorElement) {
                    throw new Error('activatorElement is not defined')
                  }

                  component.activatorElement.dispatchEvent(new Event(testCase.nodeEventName))

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
