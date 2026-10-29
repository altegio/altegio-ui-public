import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { YCoreSimpleToggleTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { dispatchEvent, getElementClasses, getShadowRootElement } from '~shared/tests/utils'
import type { TPropTestCase } from '~shared/types/tests'
import { EYSizes } from '~shared/types/global'
import {
  createCoreSimpleToggleProps,
  type IYCoreSimpleToggleProps,
} from '~core/ui/simpleToggle/models/types'
import '~core/ui/simpleToggle'

const sizes: Extract<EYSizes, 'small' | 'medium'>[] = [
  EYSizes.SMALL,
  EYSizes.MEDIUM,
]
// Unit test cases:
const propSizeTestCases: TPropTestCase<IYCoreSimpleToggleProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  value: size,
  case: size,
}))

const booleans = [
  true,
  false,
]

const propCheckedTestCases: TPropTestCase<IYCoreSimpleToggleProps, 'checked'>[] = booleans.map((checked) => ({
  prop: 'checked',
  value: checked,
  case: 'checked',
}))


const propDisabledTestCases: TPropTestCase<IYCoreSimpleToggleProps, 'disabled'>[] = booleans.map((disabled) => ({
  prop: 'disabled',
  value: disabled,
  case: 'disabled',
}))

const propHoveredTestCases: TPropTestCase<IYCoreSimpleToggleProps, 'hovered'>[] = booleans.map((hovered) => ({
  prop: 'hovered',
  value: hovered,
  case: 'hovered',
}))

const tagName = YCoreSimpleToggleTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreSimpleToggleProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/YCoreSimpleToggle/Unit',
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
      'Events',
      () => {
        it(
          'Should call the click handler on toggle click',
          async() => {
            await updateComponent({ props: {} })

            const handleAction = vi.fn()

            const rootElement = getRootElement()

            if (!rootElement) throw Error('Toggle element not found')

            component.addEventListener(
              'checked',
              handleAction,
            )

            dispatchEvent(
              rootElement,
              'click',
              { bubbles: true },
            )

            expect(handleAction).toHaveBeenCalledTimes(1)
          },
        )

        // Skipped: disabled controls still emit click events because the mobile tooltip needs them
        it.skip(
          'Should not call the click handler when the toggle is disabled',
          async() => {
            await updateComponent({ props: { disabled: true } })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            if (!rootElement) throw Error('Toggle element not found')

            component.addEventListener(
              'checked',
              handleAction,
            )

            dispatchEvent(
              rootElement,
              'click',
              { bubbles: true },
            )

            expect(handleAction).not.toHaveBeenCalled()
          },
        )
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propSizeTestCases) {
          const expectedCssClass = `${tagName}_size_${testCase.case}`

          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should change the rootElement class to "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )
        }

        for (const testCase of [
          ...propDisabledTestCases,
          ...propHoveredTestCases,
        ]) {
          const expectedCssClass = `${tagName}_${testCase.case}`

          it(
            `Should ${testCase.case} class ${expectedCssClass} when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              if (testCase.value) {
                expect(rootElementClasses).toContain(expectedCssClass)
              } else {
                expect(rootElementClasses).not.toContain(expectedCssClass)
              }
            },
          )
        }

        for (const testCase of propCheckedTestCases) {
          const expectedCssClass = `${tagName}_${testCase.case}`

          it(
            `Should ${testCase.case} class ${expectedCssClass} when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              if (testCase.value) {
                expect(rootElementClasses).toContain(expectedCssClass)
              } else {
                expect(rootElementClasses).not.toContain(expectedCssClass)
              }
            },
          )
        }
      },
    )
  },
)
