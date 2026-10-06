import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCoreCardMainTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { createCoreCardMainProps } from '~core/ui/cardMain/models/types'
import '~core/ui/cardMain'
import { getElementClasses, getShadowRootElement } from '~shared/tests/utils'

import {
  propDisabledCases,
  propSizeCases,
  propHideSpaceLeftCases,
  propHideSpaceRightCases,
} from './cases/props'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCardMainProps(),
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
  'Core/YCardMain/Unit',
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
          ...propSizeCases,
          ...propHideSpaceLeftCases,
          ...propHideSpaceRightCases,
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
          ...propHideSpaceLeftCases,
          ...propHideSpaceRightCases,
        ]) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс "${testCase.expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const classes = getElementClasses(rootElement)

              if (testCase.value) {
                expect(classes).toContain(testCase.expectedCssClass)
              } else {
                expect(classes).not.toContain(testCase.expectedCssClass)
              }
            },
          )
        }
      },
    )
  },
)
