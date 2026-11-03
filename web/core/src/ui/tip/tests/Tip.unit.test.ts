import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { AltCoreTipTagName, AltCoreDropdownTagName } from '~shared/constants'
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

const tagName = AltCoreTipTagName

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
  'Core/AltTip/Unit',
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
          'Should have an arrow for the tooltip content',
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
            `Prop "${testCase.prop}" with value ${testCase.value} should change the CSS class in shadowRoot`,
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
            `Prop "${testCase.prop}" with value ${JSON.stringify(testCase.value)} should map the prop to a class in ${AltCoreDropdownTagName}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const dropdownElement = getWCShadowRoot(component).querySelector(AltCoreDropdownTagName)

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
            `Slot "${testCase.slot}" should render ${testCase.case}`,
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
