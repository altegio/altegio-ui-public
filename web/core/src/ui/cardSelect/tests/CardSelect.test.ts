import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { AltCoreCardSelectTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getShadowRootElement } from '~shared/tests/utils'
import { createCoreCardSelectProps } from '~core/ui/cardSelect/models/types'
import '~core/ui/cardSelect'

import {
  propCheckedCases,
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
  createCoreCardSelectProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/AltCardSelect/Unit',
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
            `Slot "${testCase.slot}" should render ${testCase.case}`,
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
          ...propHeaderTextCases,
          ...propTagTextCases,
          ...propTagVariantCases,
          ...propHeaderIconCases,
          ...propAnnotationCases,
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
          ...eventFocusCases,
          ...eventBlurCases,
        ]) {
          it(
            `Should emit ${testCase.event} ${testCase.case}`,
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
            `Should not emit ${testCase.event} when the component is disabled`,
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
            `Should emit ${testCase.event} ${testCase.case}`,
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
            `Should not emit ${testCase.event} when the component is disabled`,
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
