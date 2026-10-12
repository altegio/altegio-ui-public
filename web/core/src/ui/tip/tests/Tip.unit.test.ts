import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCoreTipTagName, YCoreDropdownTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCoreTipProps,
} from '~core/ui/tip/models/types'
import '~core/ui/tip'
import { getWCShadowRoot, getElementClasses } from '~shared/tests/utils'
import {
  slotActivatorTestCases,
  slotContentTestCases,
} from './cases/slots'
import {
  propTypeTestCases,
  propIsOpenTestCases,
  propOffsetTestCases,
  propPaddingTestCases,
  propPlacementTestCases,
  propStrategyTestCases,
  propTransitionTestCases,
  propTriggerTestCases,
} from './cases/props'

const tagName = YCoreTipTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTipProps(),
)

describe(
  'Core/YTip/Unit',
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
      'Integration',
      () => {
        it(
          'Должен содержать стрелку для контента подсказки',
          () => {
            const arrowElement = getWCShadowRoot(component).querySelector(`.${tagName}__arrow`)

            expect(arrowElement).toBeDefined()
          },
        )
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propTypeTestCases) {
          it(
            `Prop "${testCase.prop}" со значением ${testCase.value} должен корректно поменять CSS класс в shadowRoot`,
            async() => {
              await updateComponent({ props: { type: testCase.value } })

              const rootElement = getWCShadowRoot(component).querySelector(`.${tagName}`)
              const rootElementClasses = getElementClasses(rootElement)
              const expectedClass = `${tagName}_${testCase.prop}_${testCase.value}`

              expect(rootElementClasses).toContain(expectedClass)
            },
          )
        }


        for (const testCase of [
          ...propIsOpenTestCases,
          ...propOffsetTestCases,
          ...propPaddingTestCases,
          ...propPlacementTestCases,
          ...propStrategyTestCases,
          ...propTransitionTestCases,
          ...propTriggerTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением ${JSON.stringify(testCase.value)} должен корректно поменять prop в класс в ${YCoreDropdownTagName}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const dropdownElement = getWCShadowRoot(component).querySelector(YCoreDropdownTagName)

              expect(dropdownElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotActivatorTestCases,
          ...slotContentTestCases,
        ]) {
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
  },
)
