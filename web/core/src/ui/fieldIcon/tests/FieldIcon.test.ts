import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCoreFieldIconTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getElementClasses, getShadowRootElement } from '~shared/tests/utils'
import { createCoreFieldIconProps } from '~core/ui/fieldIcon/models/types'

import '~core/ui/fieldIcon'
import '~core/ui/icon'

import {
  propDisabledCases,
  propHoverableCases,
  propClickableCases,
  propSizeCases,
  propIconCases,
} from './cases/props'

import { yMagic } from '~shared/icons'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreFieldIconProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const setIconToComponent = () => {
  component.icon = yMagic
}

describe(
  'Core/YFieldIcon/Unit',
  () => {
    beforeAll(() => {
      injectComponentToBody()
      setIconToComponent()
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
          ...propHoverableCases,
          ...propClickableCases,
          ...propSizeCases,
          ...propIconCases,
        ] as const) {
          it(
            `Prop "${testCase.prop}" должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(component[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propDisabledCases) {
          const expectedCssClass = `${tagName}_${testCase.prop}`

          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const classes = getElementClasses(rootElement)

              if (testCase.value) {
                expect(classes).toContain(expectedCssClass)
              } else {
                expect(classes).not.toContain(expectedCssClass)
              }
            },
          )
        }

        for (const testCase of propSizeCases) {
          const expectedCssClass = `${tagName}_size_${testCase.case}`

          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })
              component.icon = yMagic

              const rootElement = getLocalRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(expectedCssClass)
            },
          )
        }

        for (const testCase of propHoverableCases) {
          const expectedCssClass = `${tagName}_${testCase.prop}`

          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const classes = getElementClasses(rootElement)

              if (testCase.value) {
                expect(classes).toContain(expectedCssClass)
              } else {
                expect(classes).not.toContain(expectedCssClass)
              }
            },
          )
        }

        for (const testCase of propClickableCases) {
          const expectedCssClass = `${tagName}_${testCase.prop}`

          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const classes = getElementClasses(rootElement)

              if (testCase.value) {
                expect(classes).toContain(expectedCssClass)
              } else {
                expect(classes).not.toContain(expectedCssClass)
              }
            },
          )
        }
      },
    )
  },
)
