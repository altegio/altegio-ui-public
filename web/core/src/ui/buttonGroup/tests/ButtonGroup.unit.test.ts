import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { useCoreTests } from '~shared/tests/core'
import { AltCoreButtonGroupTagName, AltCoreButtonTagName } from '~shared/constants'
import { createCoreButtonGroupProps } from '~core/ui/buttonGroup/models/types'
import '~core/ui/buttonGroup'
import '~core/ui/button'
import {
  buttonsHtml,
  buttonsHtmlThree,
  propsChangeTestCases,
  propsTestCases,
  buttonRadiusTestCases,
  slotsTestCases,
} from './cases/unit'


const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  AltCoreButtonGroupTagName,
  createCoreButtonGroupProps(),
)

const getButtonsInLightDOM = () => {
  return component.querySelectorAll(AltCoreButtonTagName)
}

describe('Core/AltCoreButtonGroup', () => {
  beforeAll(() => {
    injectComponentToBody()
  })

  afterEach(async() => {
    await resetComponent()
  })

  afterAll(() => {
    removeComponent()
  })

  describe('Unit', () => {
    describe('Props', () => {
      for (const testCase of propsTestCases) {
        it(`Prop ${testCase.prop} should work ${testCase.case}`, async() => {
          component.innerHTML = buttonsHtml
          await component.updateComplete

          await updateComponent({ props: { [testCase.prop]: testCase.value } })

          const buttonElements = getButtonsInLightDOM()

          buttonElements.forEach((button) => {
            expect(button).toHaveProperty(testCase.prop, testCase.value)
          })
        })
      }
      for (const testCase of propsChangeTestCases) {
        it(`Prop ${testCase.prop} should change ${testCase.case}`, async() => {
          component.innerHTML = buttonsHtml
          await component.updateComplete

          let buttonElements
          await updateComponent({ props: { [testCase.prop]: testCase.value } })
          buttonElements = getButtonsInLightDOM()

          buttonElements.forEach((button) => {
            expect(button).toHaveProperty(testCase.prop, testCase.value)
          })

          await updateComponent({ props: { [testCase.prop]: testCase.changedValue } })

          buttonElements = getButtonsInLightDOM()

          buttonElements.forEach((button) => {
            expect(button).toHaveProperty(testCase.prop, testCase.changedValue)
          })
        })
      }
    })

    describe('Slots', () => {
      for (const testCase of slotsTestCases) {
        it(`Should render slot ${testCase.case}`, async() => {
          component.innerHTML = testCase.content
          await component.updateComplete

          if ('updatedContent' in testCase) {
            component.innerHTML = testCase.updatedContent!
            await component.updateComplete
          }

          const buttonElements = getButtonsInLightDOM()
          expect(buttonElements.length).toEqual(testCase.expected)
        })
      }

      for (const testCase of buttonRadiusTestCases) {
        it(`Should set ${testCase.case} when buttons are added to the slots`, async() => {
          component.innerHTML = buttonsHtmlThree
          await component.updateComplete

          const buttonElements = component.querySelectorAll(AltCoreButtonTagName)

          const button = buttonElements[testCase.index]
          const computedStyle = window.getComputedStyle(button)

          const radiusProperties = [
            { property: '--alt-core-simple-button-border-top-right-radius', expected: testCase.expectedTopRightRadius },
            { property: '--alt-core-simple-button-border-bottom-right-radius', expected: testCase.expectedBottomRightRadius },
            { property: '--alt-core-simple-button-border-top-left-radius', expected: testCase.expectedTopLeftRadius },
            { property: '--alt-core-simple-button-border-bottom-left-radius', expected: testCase.expectedBottomLeftRadius },
          ]

          radiusProperties.forEach(({ property, expected }) => {
            if (expected !== undefined) {
              expect(computedStyle.getPropertyValue(property).trim()).toBe(expected)
            }
          })
        })
      }
    })
  })
})
