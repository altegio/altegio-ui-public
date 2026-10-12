import { beforeAll, afterEach, describe, expect, it, afterAll } from 'vitest'
import { getShadowRootElement, getWCShadowRoot, getElementClasses } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { YCoreTagTagName, YCoreIconTagName } from '~shared/constants'
import '~core/ui/tag'

import { createCoreTagProps } from '~core/ui/tag/models/types'
import {
  propSizeTestCases,
  propVariantTestCases,
  propDisabledTestCases,
  propIconLeftTestCases,
  propLocatorTestCases,
} from './cases/props'

const tagName = YCoreTagTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreTagProps(),
)

describe(
  'Core/YCoreTag/Unit',
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
      'Рендеринг',
      () => {
        it(
          'Должен рендерить div с корректным базовым классом',
          async() => {
            await component.updateComplete

            const rootElement = getRootElement()
            expect(rootElement).not.toBeNull()
            expect(rootElement?.tagName.toLowerCase()).toBe('div')
            expect(rootElement?.classList.contains(tagName)).toBe(true)
          },
        )

        it(
          'Должен отображать содержимое <slot>',
          async() => {
            const slotContent = 'Тестовый тег'
            component.innerHTML = slotContent

            await component.updateComplete

            const slotElement = getRootElement()?.querySelector('slot')
            const slotAssignedNodes = slotElement?.assignedNodes({ flatten: true })

            const displayedContent = slotAssignedNodes
              ?.map((node) => node.nodeType === Node.TEXT_NODE ? node.textContent : '')
              .join('')
              .trim()

            expect(displayedContent).toBe(slotContent)
          },
        )
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propLocatorTestCases) {
          it(
            `Prop "${testCase.prop}" должен быть ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(component[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propSizeTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс`,
            async() => {
              await updateComponent({ props: { size: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(`${tagName}_size_${testCase.value}`)
            },
          )
        }

        for (const testCase of propVariantTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс`,
            async() => {
              await updateComponent({ props: { variant: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(`${tagName}_variant_${testCase.value}`)
            },
          )
        }

        for (const testCase of propDisabledTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс`,
            async() => {
              await updateComponent({ props: { disabled: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              if (testCase.value) {
                expect(classes).toContain(`${tagName}_disabled`)
              } else {
                expect(classes).not.toContain(`${tagName}_disabled`)
              }
            },
          )
        }

        for (const testCase of propIconLeftTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс with-icon`,
            async() => {
              await updateComponent({ props: { iconLeft: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(`${tagName}_with-icon`)
            },
          )
        }

        for (const testCase of propIconLeftTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен рендерить иконку`,
            async() => {
              await updateComponent({ props: { iconLeft: testCase.value } })

              const shadowRoot = getWCShadowRoot(component)
              const iconElement = shadowRoot.querySelector(YCoreIconTagName)

              expect(iconElement).not.toBeNull()
            },
          )
        }
      },
    )
  },
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}
