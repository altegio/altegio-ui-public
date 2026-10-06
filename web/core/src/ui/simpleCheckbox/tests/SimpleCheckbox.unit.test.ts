import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { useCoreTests } from '~shared/tests/core'
import { YCoreSimpleCheckboxTagName as tagName } from '~shared/constants'
import { dispatchEvent, getElementClasses, getShadowRootElement } from '~shared/tests/utils'
import { EYSizes } from '~shared/types/global'
import { type TPropTestCase } from '~shared/types/tests'
import { pick } from 'radash'

import {
  createCoreSimpleCheckboxProps,
  type IYCoreSimpleCheckboxProps,
} from '~core/ui/simpleCheckbox/models/types'
import '~core/ui/simpleCheckbox'

// Unit test cases:
const booleans = [
  true,
  false,
]

const sizes = Object.values(pick(
  EYSizes,
  ['SMALL', 'MEDIUM'],
))

const propSizeTestCases: TPropTestCase<IYCoreSimpleCheckboxProps, 'size'>[] = sizes.map((size) => ({
  prop: 'size',
  value: size as IYCoreSimpleCheckboxProps['size'],
  case: size,
}))

const propCheckedTestCases: TPropTestCase<IYCoreSimpleCheckboxProps, 'checked'>[] = booleans.map((checked) => ({
  prop: 'checked',
  value: checked,
  case: 'checked',
  expected: checked,
}))


const propIndeterminateTestCases: TPropTestCase<IYCoreSimpleCheckboxProps, 'indeterminate'>[] = booleans.map((indeterminate) => ({
  prop: 'indeterminate',
  value: indeterminate,
  case: 'indeterminate',
  expected: indeterminate,
}))

const propErrorTestCases: TPropTestCase<IYCoreSimpleCheckboxProps, 'error'>[] = booleans.map((error) => ({
  prop: 'error',
  value: error,
  case: 'error',
  expected: error,
}))

const propDisabledTestCases: TPropTestCase<IYCoreSimpleCheckboxProps, 'disabled'>[] = booleans.map((disabled) => ({
  prop: 'disabled',
  value: disabled,
  case: 'disabled',
  expected: disabled,
}))

const propHoveredTestCases: TPropTestCase<IYCoreSimpleCheckboxProps, 'hovered'>[] = booleans.map((hovered) => ({
  prop: 'hovered',
  value: hovered,
  case: 'hovered',
  expected: hovered,
}))

const {
  component,
  resetComponent,
  updateComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreSimpleCheckboxProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/YCoreSimpleCheckbox/Unit',
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
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить класс у rootElement на "${expectedCssClass}"`,
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
            `Должен ${testCase.case} класс ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
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


        for (const testCase of [
          ...propCheckedTestCases,
          ...propIndeterminateTestCases,
        ]) {
          const expectedCssClass = `${tagName}_status_${testCase.prop}`

          it(
            `Должен ${testCase.case} класс ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
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
          'Должен вызывать обработчик клика при нажатии на чекбокс',
          async() => {
            await updateComponent({ props: {} })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            const testingNode = rootElement?.querySelector('div')
            if (!testingNode) throw Error('Checkbox Element не найден')

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

        // PFW-1189 - вернул возможность отлавливать события, тк потребовалась их обработка для отображения тултипа на мобилках
        it.skip(
          'Не должен вызывать обработчик клика, если чекбокс отключен',
          async() => {
            await updateComponent({ props: { disabled: true } })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            const testingNode = rootElement?.querySelector('div')
            if (!testingNode) throw Error('Checkbox Element не найден')

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
