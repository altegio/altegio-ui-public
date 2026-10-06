import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import {
  YCoreCardCheckboxTagName as tagName,
  YCoreSimpleCheckboxTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getElementClasses, getShadowRootElement, getShadowElement } from '~shared/tests/utils'
import { createCoreCardCheckboxProps } from '~core/ui/cardCheckbox/models/types'
import type { YCoreSimpleCheckbox } from '~core/ui/simpleCheckbox'
import '~core/ui/cardCheckbox'

import {
  propDisabledCases,
  propSizeCases,
  propCheckedCases,
} from './cases/props'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCardCheckboxProps(),
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
  'Core/YCardCheckbox/Unit',
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
          ...propCheckedCases,
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
          ...propCheckedCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен быть "${testCase.case}" и передан в SimpleCheckbox`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const colorIconElement = getLocalShadowElement(YCoreSimpleCheckboxTagName) as YCoreSimpleCheckbox | null

              expect(colorIconElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propSizeCases) {
          it(
            `Prop "${testCase.prop}" должен быть "${testCase.case}" и передан в SimpleCheckbox`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const colorIconElement = getLocalShadowElement(YCoreSimpleCheckboxTagName) as YCoreSimpleCheckbox | null

              expect(colorIconElement?.[testCase.prop]).toBe(testCase.expectedCheckboxSize)
            },
          )
        }
      },
    )
  },
)
