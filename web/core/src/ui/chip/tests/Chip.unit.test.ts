import { beforeAll, afterEach, describe, expect, it, afterAll, vi } from 'vitest'
import { getShadowRootElement, getWCShadowRoot, getElementClasses } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { YCoreChipTagName, YCoreIconTagName, YCoreTextTagName } from '~shared/constants'
import '~core/ui/chip'

import { createCoreChipProps } from '~core/ui/chip/models/types'
import {
  propLabelTestCases,
  propIconLeftTestCases,
  propSizeTestCases,
  propActiveTestCases,
  propDisabledTestCases,
  chipIconLeftSizes,
  chipLabelTextSizes,
  chipIconLeftValue,
} from './cases/props'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types'

const tagName = YCoreChipTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreChipProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/YCoreChip/Unit',
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
            const classes = getElementClasses(rootElement)

            expect(rootElement).not.toBeNull()
            expect(rootElement?.tagName.toLowerCase()).toBe('div')
            expect(classes).toContain(tagName)
            expect(classes).not.toContain(`${tagName}_active`)
            expect(classes).not.toContain(`${tagName}_disabled`)
          },
        )

        it(
          'Должен рендерить text с корректным размером и вариантом',
          async() => {
            await component.updateComplete

            const shadowRoot = getWCShadowRoot(component)
            const textElement = shadowRoot.querySelector(YCoreTextTagName)

            expect(textElement).not.toBeNull()
            expect(textElement?.size).toBe(EYCoreTextSize.A2_REGULAR)
            expect(textElement?.variant).toBe(EYCoreTextVariant.PRIMARY)
          },
        )

        it(
          'Не должен рендерить иконку',
          async() => {
            await component.updateComplete

            const shadowRoot = getWCShadowRoot(component)

            expect(shadowRoot.querySelector(YCoreIconTagName)).toBeNull()
          },
        )
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" должен корректно отображать значение "${testCase.case}" и CSS класс`,
            async() => {
              await updateComponent({ props: { labelText: testCase.value } })

              const shadowRoot = getWCShadowRoot(component)
              const textElement = shadowRoot.querySelector(YCoreTextTagName)
              const textClasses = getElementClasses(textElement)

              expect(textElement).not.toBeNull()
              expect(textElement?.textContent).toContain(testCase.value)
              expect(textClasses).toContain(`${tagName}__text`)
            },
          )
        }

        for (const testCase of propIconLeftTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен рендерить иконку с корректным размером`,
            async() => {
              await updateComponent({ props: { iconLeft: testCase.value } })

              const shadowRoot = getWCShadowRoot(component)
              const iconElement = shadowRoot.querySelector(YCoreIconTagName)

              expect(iconElement).not.toBeNull()
              expect(iconElement?.icon).toBe(testCase.value)
              expect(iconElement?.size).toBe(chipIconLeftSizes.small)
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

        for (const testCase of propSizeTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять размер текста и иконки`,
            async() => {
              await updateComponent({ props: { size: testCase.value, iconLeft: chipIconLeftValue } })

              const shadowRoot = getWCShadowRoot(component)
              const iconElement = shadowRoot.querySelector(YCoreIconTagName)
              const textElement = shadowRoot.querySelector(YCoreTextTagName)

              expect(iconElement).not.toBeNull()

              if (testCase.value) {
                expect(iconElement?.size).toBe(chipIconLeftSizes[testCase.value])
                expect(textElement?.size).toBe(chipLabelTextSizes[testCase.value])
              }
            },
          )
        }

        for (const testCase of propActiveTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс`,
            async() => {
              await updateComponent({ props: { active: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              expect(classes).toContain(`${tagName}_active`)
            },
          )
        }

        for (const testCase of propDisabledTestCases) {
          it(
            `Prop "${testCase.prop}" ${testCase.case} должен корректно применять CSS класс и цвет текста`,
            async() => {
              await updateComponent({ props: { disabled: testCase.value } })

              const rootElement = getRootElement()
              const classes = getElementClasses(rootElement)

              const shadowRoot = getWCShadowRoot(component)
              const textElement = shadowRoot.querySelector(YCoreTextTagName)

              expect(classes).toContain(`${tagName}_disabled`)
              expect(textElement?.variant).toContain(EYCoreTextVariant.TERTIARY)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Должен вызывать обработчик клика при нажатии на Chip',
          () => {
            const clickHandler = vi.fn()

            component.addEventListener(
              'click',
              clickHandler,
            )

            component.dispatchEvent(new MouseEvent('click'))

            expect(clickHandler).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Не должен вызывать обработчик клика при нажатии на Chip, если disabled',
          async() => {
            const clickHandler = vi.fn()

            await updateComponent({ props: { disabled: true } })

            component.addEventListener(
              'click',
              clickHandler,
            )

            component.dispatchEvent(new MouseEvent('click'))

            expect(clickHandler).not.toBeCalled()
          },
        )
      },
    )
  },
)
