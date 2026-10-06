import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import {
  YCoreCardIconTagName as tagName,
  YCoreColorIconTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { createCoreCardIconProps } from '~core/ui/cardIcon/models/types'
import type { YCoreColorIcon } from '~core/ui/colorIcon'
import '~core/ui/cardIcon'

import {
  propDisabledCases,
  propSizeCases,
  propVariantCases,
  propHeaderIconCases,
  propSizeColorIconConverterTestCases,
} from './cases/props'
import { getElementClasses, getShadowRootElement, getShadowElement } from '~shared/tests/utils'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCardIconProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

describe(
  'Core/YCardIcon/Unit',
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
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledCases,
          ...propSizeCases,
          ...propVariantCases,
          ...propHeaderIconCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(component[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propSizeCases) {
          const expectedCssClass = `${tagName}_size_${testCase.case}`

          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(expectedCssClass)
            },
          )
        }

        for (const testCase of [
          ...propDisabledCases,
          ...propVariantCases,
          ...propSizeColorIconConverterTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен быть "${testCase.case}" и передан в ColorIcon`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const colorIconElement = getLocalShadowElement(YCoreColorIconTagName) as YCoreColorIcon | null

              expect(colorIconElement?.[testCase.prop]).toBe(testCase.expected ?? testCase.value)
            },
          )
        }

        for (const testCase of propHeaderIconCases) {
          it(
            `Prop "${testCase.prop}" должен быть "${testCase.case}" и передан в ColorIcon`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const colorIconElement = getLocalShadowElement(YCoreColorIconTagName) as YCoreColorIcon | null

              expect(colorIconElement?.icon).toBe(testCase.expected ?? testCase.value)
            },
          )
        }
      },
    )
  },
)
