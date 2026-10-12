import { beforeAll, beforeEach, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { YCoreLabelTagName as tagName, YCoreTextTagName, YCoreTooltipTagName } from '~shared/constants'
import { createComponent, useCoreTests } from '~shared/tests/core'
import { generatePropTestCases, getElementClasses, getShadowRootElement, getStyleRule, getWCShadowRoot } from '~shared/tests/utils'
import type { IYCoreLabelExternalProps, IYCoreLabelInternalProps } from '~core/ui/label/models/types'
import { createCoreLabelInternalProps, EYCoreLabelAlignment } from '~core/ui/label/models/types'
import '~core/ui/label'
import { SIZES } from '~tokens/index'
import { EYCoreTextSize, EYCoreTextVariant } from '~core/ui/text/models/types/external'
import { booleanTestValues } from '~shared/tests/mockData'
import { empty, text } from '~shared/tests/slotContents'

type IYCoreLabelProps = IYCoreLabelExternalProps & IYCoreLabelInternalProps

// Unit test cases:
const texts = [
  text,
  ' ',
  empty,
]
const propsTextTestCases = generatePropTestCases<IYCoreLabelProps, 'text'>(
  'text',
  texts,
)

const tooltipTexts = [
  text,
  ' ',
]
const propsTooltipTextTestCases = generatePropTestCases<IYCoreLabelProps, 'tooltipText'>(
  'tooltipText',
  tooltipTexts,
)

const alignments = Object.values(EYCoreLabelAlignment)
const propsAlignmentTestCases = generatePropTestCases<IYCoreLabelProps, 'alignment'>(
  'alignment',
  alignments,
)

const variants: IYCoreLabelProps['variant'][] = [
  EYCoreTextVariant.PRIMARY,
  EYCoreTextVariant.SECONDARY,
]
const propsVariantTestCases = generatePropTestCases<IYCoreLabelProps, 'variant'>(
  'variant',
  variants,
)

const sizes: IYCoreLabelProps['size'][] = [
  EYCoreTextSize.A2_REGULAR,
  EYCoreTextSize.P2_REGULAR,
]
const propsSizeTestCases = generatePropTestCases<IYCoreLabelProps, 'size'>(
  'size',
  sizes,
)

const debounceTestCaseValues = [
  10,
  0,
  50,
]
const propsDebounceTestCases = generatePropTestCases<IYCoreLabelProps, 'debounce'>(
  'debounce',
  debounceTestCaseValues,
)

const propsTooltipActiveTestCases = generatePropTestCases<IYCoreLabelProps, 'tooltipActive'>(
  'tooltipActive',
  booleanTestValues,
)
const propsDisabledTestCases = generatePropTestCases<IYCoreLabelProps, 'disabled'>(
  'disabled',
  booleanTestValues,
)

const propsRequiredTestCases = generatePropTestCases<IYCoreLabelProps, 'required'>(
  'required',
  booleanTestValues,
)

const propsWrapTestCases = generatePropTestCases<IYCoreLabelProps, 'wrap'>(
  'wrap',
  booleanTestValues,
)

// CSS test mappings:
const mapCssPropertiesToStyles: Record<string, string> = { marginLeft: String(SIZES.spacing_x.cssValue) }


type TSubComponent = typeof tagName | typeof YCoreTextTagName | typeof YCoreTooltipTagName
const getSubWC = <T extends TSubComponent>(primaryWC: HTMLElement, secondaryWC: T) => {
  const subWC = getWCShadowRoot(primaryWC).querySelector(secondaryWC)
  if (!subWC) throw new Error(`${secondaryWC} not found`)
  return subWC
}
const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreLabelInternalProps(),
)

const getRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

describe(
  'Core/YCoreLabel/Unit',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    beforeEach(() => {
      vi.useFakeTimers()
      vi.spyOn(
        window,
        'setTimeout',
      )
    })

    afterEach(async() => {
      await resetComponent()
      vi.clearAllTimers()
      vi.useRealTimers()
    })


    afterAll(() => {
      removeComponent()
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propsDisabledTestCases,
          ...propsWrapTestCases,
        ]) {
          const expectedCssClass = `${tagName}_${testCase.prop}`

          it(
            `Должен ${testCase.case}  ${testCase.value ? '' : 'не'} добавить класс ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
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

        for (const testCase of propsRequiredTestCases) {
          const expectedCssClass = `${tagName}__asterisk`

          it(
            `Должен ${testCase.case}  ${testCase.value ? '' : 'не'} добавить ноду ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getRootElement()
              const testingNode = rootElement?.querySelector(expectedCssClass)

              if (testCase.value) {
                expect(testingNode).toBeDefined()
              } else {
                expect(testingNode).toBeNull()
              }
            },
          )
        }

        for (const testCase of propsAlignmentTestCases) {
          const expectedCssClass = `${tagName}_${testCase.value}`

          it(
            `Должен ${testCase.case} добавить класс ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )
        }


        for (const testCase of [
          ...propsSizeTestCases,
          ...propsVariantTestCases,
        ]) {
          const expectedCssClass = `${tagName}_${testCase.prop}_${testCase.value}`

          it(
            `Должен ${testCase.case} добавить класс ${expectedCssClass}, если prop ${testCase.prop} ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )

          it(
            `Должен ${testCase.case} добавить передать проп ${testCase.prop} ${testCase.value} в text`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const textElement = getSubWC(
                component,
                YCoreTextTagName,
              )

              expect(textElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propsVariantTestCases) {
          it(
            `При disabled:true не должен ${testCase.case} передать проп ${testCase.prop} ${testCase.value}, вместо него ${testCase.prop} ${EYCoreTextVariant.TERTIARY} в text`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value, disabled: true } })

              const textElement = getSubWC(
                component,
                YCoreTextTagName,
              )

              expect(textElement[testCase.prop]).toBe(EYCoreTextVariant.TERTIARY)
            },
          )
        }

        for (const testCase of propsTextTestCases) {
          const expectedTextClass = `.${tagName}__content`
          it(
            `Должен ${testCase.case}  отрендерить prop ${testCase.prop} в text prop в слоте text`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const textComponent = getSubWC(
                component,
                YCoreTextTagName,
              )

              const textWrapper = textComponent.querySelector(expectedTextClass)
              if (!textWrapper) throw Error('Text Wrapper not found')

              const textContent = textWrapper.textContent

              expect(textContent).toContain(testCase.expected)
            },
          )
        }

        for (const testCase of propsTooltipTextTestCases) {
          it(
            `Должен ${testCase.case} добавить проп в ${YCoreTooltipTagName}, если prop ${testCase.prop} ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value, tooltipActive: true } })

              const tooltipElement = getSubWC(
                component,
                YCoreTooltipTagName,
              )

              expect(tooltipElement.text).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propsTooltipActiveTestCases) {
          it(
            `Должен ${testCase.case} добавить проп в ${YCoreTooltipTagName}, если prop ${testCase.prop} ${testCase.value}`,
            async() => {
              await updateComponent({ props: { tooltipText: text, [testCase.prop]: testCase.value } })

              const tooltipElement = getSubWC(
                component,
                YCoreTooltipTagName,
              )

              expect(tooltipElement.disabled).toBe(!testCase.expected)
            },
          )
        }


        for (const testCase of propsDebounceTestCases) {
          const contentClassName = `.${tagName}__content`
          // TODO: нужно починить подстановку пропсов и передачу значения в debounce
          it.skip(
            `Должен ${testCase.case} ${testCase.prop} ${testCase.value}мс при смене размера ${contentClassName}`,
            async() => {
              const component = createComponent(tagName)
              document.body.appendChild(component)
              await component.updateComplete

              const shadowRootElement = getShadowRootElement(
                component,
                tagName,
              )
              const contentElement: HTMLElement | null | undefined = shadowRootElement?.querySelector(contentClassName)
              if (!contentElement) throw Error('Content Element is not defined')

              contentElement.style.width = `${testCase.value}px`
              document.body.removeChild(component)

              // 2 - потому-что await component.updateComplete вызывает первый setTimeout
              expect(setTimeout).toHaveBeenCalledTimes(2)
              expect(setTimeout).toHaveBeenLastCalledWith(
                expect.any(Function),
                testCase.value,
              )
            },
          )
        }
      },
    )

    describe(
      'CSS',
      () => {
        describe(
          'Тестирование значений css properties',
          () => {
            beforeAll(async() => {
              await updateComponent({ props: { } })
            })
            const varMarginLeftName = '--y-core-label-margin-left-tooltip'

            it(
              'CSS классы в значениях должны содержать переменные',
              () => {
                const shadowRoot = getWCShadowRoot(component)

                const rootSizeSelector = `.${tagName}__tooltip`
                const rootSizeStyles = getStyleRule(
                  Array.from(shadowRoot.adoptedStyleSheets),
                  rootSizeSelector,
                )

                expect(rootSizeStyles.style.marginLeft).toBe(`var(${varMarginLeftName})`)
              },
            )

            it(
              'CSS переменные должны соответсвовать значениям из токенов',
              () => {
                const shadowRoot = getWCShadowRoot(component)

                const computedStyles = getComputedStyle(shadowRoot.host)

                const varMarginLeftValue = computedStyles.getPropertyValue(varMarginLeftName)

                expect(varMarginLeftValue).toBe(mapCssPropertiesToStyles.marginLeft)
              },
            )
          },
        )
      },
    )
  },
)
