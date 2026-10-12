import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import {
  YCoreRadioButtonTagName as tagName,
  YCoreSimpleRadioButtonTagName,
  YCoreLabelTagName,
  YCoreAnnotationTagName,
  YCoreErrorTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  classWithModifier,
  getElementClasses,
  getShadowElement,
  getShadowRootElement,
} from '~shared/tests/utils'
import { createCoreRadioButtonExternalProps } from '../models/types'
import {
  propSizeTestCases,
  propCheckedTestCases,
  propDisabledTestCases,
  propAlignmentTestCases,
  propRequiredTestCases,
  propLabelTooltipTextTestCases,
  propLabelTextTestCases,
  propAnnotationTextTestCases,
  propLabelOverflowDebounceTestCases,
  propErrorsTestCases,
} from './cases/props'
import type { YCoreSimpleRadioButton, YCoreLabel, YCoreAnnotation, YCoreError } from '~core/index'

import '~core/ui/radioButton'
import { userEvent } from '@vitest/browser/context'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreRadioButtonExternalProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

const getSimpleRadioButtonElement = () => getLocalShadowElement(YCoreSimpleRadioButtonTagName) as YCoreSimpleRadioButton | undefined
const getLabelElement = () => getLocalShadowElement(YCoreLabelTagName) as YCoreLabel | undefined
const getAnnotationElement = () => getLocalShadowElement(YCoreAnnotationTagName) as YCoreAnnotation | undefined
const getErrorElement = () => getLocalShadowElement(YCoreErrorTagName) as YCoreError | undefined

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

describe(
  'Core/YCoreRadioButton/Unit',
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
          const expectedCssClass = localClassWithModifier(`${testCase.prop}-${testCase.case}`)

          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" ${testCase.value ? '' : 'не'} должен изменить класс у rootElement на "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              if (testCase.value) {
                expect(rootElementClasses).toContain(expectedCssClass)
              } else {
                expect(rootElementClasses).not.toContain(expectedCssClass)
              }
            },
          )
        }

        for (const testCase of propDisabledTestCases) {
          const expectedCssClass = localClassWithModifier(testCase.prop)

          it(
            `Должен ${testCase.case} класс ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
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
          ...propSizeTestCases,
          ...propCheckedTestCases,
          ...propDisabledTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить Prop у SimpleRadioButton на "${String(testCase.expected)}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const simpleRadioButtonElement = getSimpleRadioButtonElement()

              expect(simpleRadioButtonElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of [
          ...propDisabledTestCases,
          ...propAlignmentTestCases,
          ...propRequiredTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить prop у Label на "${String(testCase.expected)}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLabelTooltipTextTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить prop у Label на "${testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.tooltipText).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLabelTextTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить prop у Label на "${testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.text).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propDisabledTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить prop "tooltip-active" у Label на "${!testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.tooltipActive).toBe(!testCase.value)
            },
          )
        }

        for (const testCase of propDisabledTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить prop у Annotation на "${testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const annotationElement = getAnnotationElement()

              expect(annotationElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propAlignmentTestCases) {
          const expectedCssClass = localClassWithModifier(`${testCase.prop}-${testCase.case}`)

          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" ${testCase.value ? '' : 'не'} должен изменить класс у rootElement на "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              if (testCase.value) {
                expect(rootElementClasses).toContain(expectedCssClass)
              } else {
                expect(rootElementClasses).not.toContain(expectedCssClass)
              }
            },
          )
        }

        for (const testCase of propLabelTextTestCases) {
          const expectedCssClass = 'y-core-radio-button__label_hidden'

          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" ${testCase.value ? 'не ' : ''}должен изменить класс у Label на "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()
              const rootElementClasses = getElementClasses(labelElement)

              if (testCase.value) {
                expect(rootElementClasses).not.toContain(expectedCssClass)
              } else {
                expect(rootElementClasses).toContain(expectedCssClass)
              }
            },
          )
        }

        for (const testCase of propLabelTooltipTextTestCases) {
          const expectedCssClass = localClassWithModifier('tooltip')

          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" ${testCase.value ? '' : 'не'} должен изменить класс у rootElement на "${expectedCssClass}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getLocalRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              if (testCase.value) {
                expect(rootElementClasses).toContain(expectedCssClass)
              } else {
                expect(rootElementClasses).not.toContain(expectedCssClass)
              }
            },
          )
        }

        for (const testCase of propAnnotationTextTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить текс у Annotation на "${String(testCase.expected)}"`,
            async() => {
              await updateComponent({ props: { annotationText: testCase.value } })

              const annotationElement = getAnnotationElement()

              expect(annotationElement?.textContent?.trim()).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLabelOverflowDebounceTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить prop у Label на "${testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.debounce).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propErrorsTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить Prop у SimpleRadioButton на "${testCase.expected as boolean}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const simpleRadioButtonElement = getSimpleRadioButtonElement()

              expect(simpleRadioButtonElement?.error).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propErrorsTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить Prop у Error на "${testCase.case}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const errorElement = getErrorElement()

              expect(errorElement?.errors).toBe(testCase.value)
            },
          )
        }
      },
    )

    // TODO: разобраться с тестированием кастомных евентов - https://tracker.yandex.ru/PFW-518
    describe(
      'Events',
      () => {
        it(
          'Должен вызывать событие "checked" при клике',
          async() => {
            const handleChecked = vi.fn()

            const rootElement = getLocalRootElement()

            if (!rootElement) {
              throw new Error('Корневой элемент не найден')
            }

            component.addEventListener(
              'checked',
              handleChecked,
            )

            await userEvent.click(rootElement)
            expect(handleChecked).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Не должен вызывать событие "checked" при клике если компонент disabled',
          async() => {
            await updateComponent({ props: { disabled: true } })

            const handleChecked = vi.fn()

            const rootElement = getLocalRootElement()

            if (!rootElement) {
              throw new Error('Корневой элемент не найден')
            }

            component.addEventListener(
              'checked',
              handleChecked,
            )

            await userEvent.click(rootElement)
            expect(handleChecked).toHaveBeenCalledTimes(0)
          },
        )
      },
    )
  },
)
