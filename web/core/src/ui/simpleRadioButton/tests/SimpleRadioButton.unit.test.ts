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


        for (const testCase of [...propCheckedTestCases]) {
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
          'Должен вызывать обработчик клика при нажатии на радиобаттон',
          async() => {
            await updateComponent({ props: {} })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            const testingNode = rootElement?.querySelector('div')
            if (!testingNode) throw Error('RadioButton Element не найден')

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
          'Не должен вызывать обработчик клика, если радиобаттон отключен',
          async() => {
            await updateComponent({ props: { disabled: true } })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            const testingNode = rootElement?.querySelector('div')
            if (!testingNode) throw Error('RadioButton Element не найден')

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
          'Не должен вызывать обработчик клика, если радиобаттон в состоянии checked',
          async() => {
            await updateComponent({ props: { checked: true } })

            const handleAction = vi.fn()

            const rootElement = getRootElement()
            const testingNode = rootElement?.querySelector('div')
            if (!testingNode) throw Error('RadioButton Element не найден')

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
