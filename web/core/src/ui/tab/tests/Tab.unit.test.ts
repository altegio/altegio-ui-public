import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import {
  YCoreIconTagName,
  YCoreTabTagName as tagName,
} from '~web/shared/constants'
import { useCoreTests } from '~shared/tests/core.ts'
import {
  propsDisabledTestCases,
  propsActiveTestCases,
  propsIsTagVisibleTestCases,
  propsTagTextTestCases,
  propsIsCounterVisibleTestCases,
  propsTextTestCases,
  propsCounterValueTestCases,
  propsTagVariantTestCases,
  propsLeftIconTestCases,
  propsLeftIconSizeTestCases,
  propsLocatorTestCases,
  propsLocatorTagTestCases,
  propsLocatorCounterTestCases,
} from '~core/ui/tab/tests/cases/props.ts'
import { slotDefaultTestCases } from '~core/ui/tab/tests/cases/slots.ts'
import { createCoreTabProps } from '~core/ui/tab/models/types'
import '~core/ui/tab'
import { getShadowElement } from '~shared/tests/utils.ts'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTabProps(),
)

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

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
    ...propsDisabledTestCases,
    ...propsActiveTestCases,
    ...propsIsTagVisibleTestCases,
    ...propsTagTextTestCases,
    ...propsIsCounterVisibleTestCases,
    ...propsTextTestCases,
    ...propsCounterValueTestCases,
    ...propsTagVariantTestCases,
    ...propsLeftIconSizeTestCases,
    ...propsLocatorTestCases,
    ...propsLocatorTagTestCases,
    ...propsLocatorCounterTestCases,
  ]) {
    it(
      `Prop "${testCase.prop}" должен быть ${testCase.value}`,
      async() => {
        await updateComponent({ props: { [testCase.prop]: testCase.value } })

        expect(component[testCase.prop]).toBe(testCase.value)
      },
    )
  }
}

describe(
  'Core/YCoreTab/Unit',
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

        for (const testCase of propsLeftIconTestCases) {
          it(
            `Prop leftIcon должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { leftIcon: testCase.value } })

              const iconElement = getLocalShadowElement(YCoreIconTagName)

              if (testCase.value) {
                expect(iconElement).toBeTruthy()
              } else {
                expect(iconElement).toBeNull()
              }
            },
          )
        }
      },
    )
  },
)
