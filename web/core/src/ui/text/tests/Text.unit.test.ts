import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'

import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase, TPropTestCase } from '~shared/types/tests'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot } from '~shared/tests/utils'
import { YCoreTextTagName } from '~shared/constants'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'
import {
  createCoreTextExternalProps,
  type IYCoreTextExternalProps,
} from '~core/ui/text/models/types'
import '~core/ui/text'

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'с контентом', content: text },
  { slot: 'default', case: 'без контента', content: empty },
]
const propSizeTestCases: TPropTestCase<IYCoreTextExternalProps, 'size'>[] = Object.values(EYCoreTextSize).map((size) => ({
  prop: 'size',
  case: size,
  value: size,
}))
const propVariantTestCases: TPropTestCase<IYCoreTextExternalProps, 'variant'>[] = Object.values(EYCoreTextVariant).map((variant) => ({
  prop: 'variant',
  case: variant,
  value: variant,
}))

const tagName = YCoreTextTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTextExternalProps(),
)

describe(
  'Core/YCoreText/Unit',
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
        for (const testCase of propSizeTestCases) {
          const expectedCssClass = `${tagName}_size_${testCase.case}`
          it(
            `Prop "${testCase.prop}" должен изменить класс у rootElement на "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getWCShadowRoot(component).querySelector('span')
              const rootElementClasses = Array.from(rootElement?.classList ?? [])

              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )
        }

        for (const testCase of propVariantTestCases) {
          const expectedCssClass = `${tagName}_variant_${testCase.case}`

          it(
            `Prop "${testCase.prop}" должен изменить класс у rootElement на "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getWCShadowRoot(component).querySelector('span')
              const rootElementClasses = Array.from(rootElement?.classList ?? [])

              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )
        }
      },
    )
  },
)
