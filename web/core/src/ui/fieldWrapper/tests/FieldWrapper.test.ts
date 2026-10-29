import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCoreFieldWrapperTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getWCShadowRoot, getHostCSSVariableValue } from '~shared/tests/utils'
import {
  createCoreFieldWrapperProps,
} from '~core/ui/fieldWrapper/models/types'
import { fieldInputHtml, propsTestCases, eventsTestCases } from './cases/unit'
import { CSSVariablesHostToRootCases, CSSVariablesHostToValueCases } from './cases/css'

import '~core/ui/fieldWrapper'

const tagName = YCoreFieldWrapperTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreFieldWrapperProps(),
)

const getFieldInputInLightDOM = () => {
  return component.querySelectorAll(tagName)
}

describe(
  'Core/YInputWrapper',
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
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            it(
              'Should render the input from the default slot',
              async() => {
                const slotElement = getWCShadowRoot(component).querySelector('slot')
                await updateComponent({ slots: { default: fieldInputHtml } })
                const assignedNodes = slotElement?.assignedNodes()
                expect(assignedNodes?.[0].textContent).toBe(fieldInputHtml)
              },
            )
          },
        )
        describe(
          'Props',
          () => {
            for (const testCase of propsTestCases) {
              it(`Prop ${testCase.prop} should work ${testCase.case}`, async() => {
                component.innerHTML = fieldInputHtml
                await component.updateComplete

                await updateComponent({ props: { [testCase.prop]: testCase.value } })

                const fieldElements = getFieldInputInLightDOM()

                fieldElements.forEach((element) => {
                  expect(element).toHaveProperty(testCase.prop, testCase.value)
                })
              })
            }
          },
        )
        describe(
          'Events',
          () => {
            for (const testCase of eventsTestCases) {
              it(
                testCase.description,
                async() => {
                  if (testCase.props) {
                    await updateComponent({ props: testCase.props })
                  }

                  const handler = testCase.handler
                  component.addEventListener(
                    testCase.name,
                    handler,
                  )

                  if (testCase.name === 'click-outside') {
                    document.dispatchEvent(testCase.event)
                  } else {
                    component.dispatchEvent(testCase.event)
                  }

                  expect(handler).toHaveBeenCalledTimes(testCase.expectedCallCount)
                },
              )
            }
          },
        )
      },
    )

    describe(
      'CSS',
      () => {
        for (const { host, root } of CSSVariablesHostToRootCases) {
          it(
            `Host CSS variable ${host} should have the value of the :root CSS variable ${root} in the styles`,
            () => {
              const shadowRoot = getWCShadowRoot(component)

              const hostCSSVariableValue = getHostCSSVariableValue(
                shadowRoot.adoptedStyleSheets,
                host,
              )

              expect(hostCSSVariableValue).toBe(`var(${root})`)
            },
          )
        }

        for (const { host, value } of CSSVariablesHostToValueCases) {
          it(
            `Computed host CSS variable ${host} on the created component should have the token value: ${value}`,
            () => {
              const shadowRoot = getWCShadowRoot(component)

              const varValue = getComputedStyle(shadowRoot.host).getPropertyValue(host)

              expect(varValue).toBe(value)
            },
          )
        }
      },
    )
  },
)
