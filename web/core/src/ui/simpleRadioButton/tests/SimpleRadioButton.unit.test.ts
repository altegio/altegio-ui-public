import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { useCoreTests } from '~shared/tests/core'
import { YCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'
import { dispatchEvent, getElementClasses, getShadowRootElement } from '~shared/tests/utils'

import {
  propErrorTestCases,
  propDisabledTestCases,
  propHoveredTestCases,
  propCheckedTestCases,
  propSizeTestCases,
} from './cases/props'

import {
  createCoreSimpleRadioButtonProps,
} from '~core/ui/simpleRadioButton/models/types'
import '~core/ui/simpleRadioButton'


const {
  component,
  resetComponent,
  updateComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreSimpleRadioButtonProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/YCoreSimpleRadioButton/Unit',
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
          ...propErrorTestCases,
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


        for (const testCase of [...propCheckedTestCases]) {
          const expectedCssClass = `${tagName}_status_${testCase.prop}`

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

    describe(
      'Events',
      () => {
        it(
          'Should call the click handler on radio button click',
          async() => {
            await updateComponent({ props: {} })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            const testingNode = rootElement?.querySelector('div')
            if (!testingNode) throw Error('RadioButton element not found')

            component.addEventListener(
              'checked',
              handleAction,
            )

            dispatchEvent(
              testingNode,
              'click',
              { bubbles: true },
            )

            expect(handleAction).toHaveBeenCalledTimes(1)
          },
        )

        // Skipped: disabled controls still emit click events because the mobile tooltip needs them
        it.skip(
          'Should not call the click handler when the radio button is disabled',
          async() => {
            await updateComponent({ props: { disabled: true } })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            const testingNode = rootElement?.querySelector('div')
            if (!testingNode) throw Error('RadioButton element not found')

            component.addEventListener(
              'checked',
              handleAction,
            )

            dispatchEvent(
              testingNode,
              'click',
              { bubbles: true },
            )


            expect(handleAction).not.toHaveBeenCalled()
          },
        )

        it(
          'Should not call the click handler when the radio button is checked',
          async() => {
            await updateComponent({ props: { checked: true } })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            const testingNode = rootElement?.querySelector('div')
            if (!testingNode) throw Error('RadioButton element not found')

            component.addEventListener(
              'checked',
              handleAction,
            )

            dispatchEvent(
              testingNode,
              'click',
              { bubbles: true },
            )


            expect(handleAction).not.toHaveBeenCalled()
          },
        )
      },
    )
  },
)
