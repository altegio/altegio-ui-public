import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import {
  YCoreCardRadioTagName as tagName,
  YCoreSimpleRadioButtonTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getElementClasses, getShadowRootElement, getShadowElement } from '~shared/tests/utils'
import { createCoreCardRadioProps } from '~core/ui/cardRadio/models/types'
import type { YCoreSimpleRadioButton } from '~core/ui/simpleRadioButton'
import '~core/ui/cardRadio'

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
  createCoreCardRadioProps(),
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
  'Core/YCardRadio/Unit',
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
            `Prop "${testCase.prop}" должен быть "${testCase.case}" и передан в RadioButton`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const colorIconElement = getLocalShadowElement(YCoreSimpleRadioButtonTagName) as YCoreSimpleRadioButton | null

              expect(colorIconElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propSizeCases) {
          it(
            `Prop "${testCase.prop}" должен быть "${testCase.case}" и передан в RadioButton`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const colorIconElement = getLocalShadowElement(YCoreSimpleRadioButtonTagName) as YCoreSimpleRadioButton | null

              expect(colorIconElement?.[testCase.prop]).toBe(testCase.expectedRadioSize)
            },
          )
        }
      },
    )
  },
)
