import { beforeAll, afterEach, describe, expect, it, afterAll } from 'vitest'
import { getShadowRootElement, getElementClasses, getWCShadowRoot, trimTextContent } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { createCoreCounterProps } from '~core/ui/counter/models/types'
import { YCoreCounterTagName } from '~shared/constants'
import '~core/ui/counter'

import {
  propDisabledTestCases,
  propSizeTestCases,
  propVariantTestCases,
  positiveValueTestCases,
  negativeValueTestCases,
  overflowedValueTestCases, propLocatorTestCases,
} from './cases/props'

const tagName = YCoreCounterTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCounterProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/YCoreCounter/Unit',
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
      'Rendering',
      () => {
        it(
          `Should render the component with the correct base class ${tagName}`,
          async() => {
            await component.updateComplete

            const rootElement = getRootElement()

            expect(rootElement).not.toBeNull()
            expect(rootElement?.classList).toContain(tagName)
          },
        )
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propLocatorTestCases) {
          it(
            `Prop "${testCase.prop}" should work ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(component[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const { prop: propName, case: propCase, value } of propSizeTestCases) {
          it(
            `Prop "${propName}" ${propCase} should apply the CSS class`,
            async() => {
              const expectedClass = `${tagName}_size_${value}`

              await updateComponent({ props: { size: value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(expectedClass)
              expect(classes).not.toContain(`${tagName}_disabled`)
            },
          )
        }

        for (const { prop: propName, case: propCase, value } of propVariantTestCases) {
          it(
            `Prop "${propName}" ${propCase} should apply the CSS class`,
            async() => {
              const expectedClass = `${tagName}_variant_${value}`

              await updateComponent({ props: { variant: value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(expectedClass)
              expect(classes).not.toContain(`${tagName}_disabled`)
            },
          )
        }

        for (const { prop: propName, case: propCase, value } of propDisabledTestCases) {
          it(
            `Prop "${propName}" ${propCase} should apply the CSS class`,
            async() => {
              await updateComponent({ props: { disabled: value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(`${tagName}_disabled`)
            },
          )
        }

        for (const { prop: propName, case: propCase, value, expected } of positiveValueTestCases) {
          it(
            `Prop "${propName}" should handle a positive number ${propCase}`,
            async() => {
              await updateComponent({ props: { value } })

              const shadowRoot = getWCShadowRoot(component)

              expect(trimTextContent(shadowRoot.textContent)).toBe(expected)
            },
          )
        }

        for (const { prop: propName, case: propCase, value, expected } of negativeValueTestCases) {
          it(
            `Prop "${propName}" should handle a negative number ${propCase}`,
            async() => {
              await updateComponent({ props: { value } })

              const shadowRoot = getWCShadowRoot(component)

              expect(trimTextContent(shadowRoot.textContent)).toBe(expected)
            },
          )
        }

        for (const { prop: propName, case: propCase, value, expected } of overflowedValueTestCases) {
          it(
            `Prop "${propName}" should handle positive number overflow ${propCase}`,
            async() => {
              await updateComponent({ props: { value } })

              const shadowRoot = getWCShadowRoot(component)

              expect(trimTextContent(shadowRoot.textContent)).toBe(expected)
            },
          )
        }
      },
    )
  },
)
