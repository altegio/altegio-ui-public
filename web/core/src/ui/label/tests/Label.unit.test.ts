import { beforeAll, beforeEach, afterEach, afterAll, describe, expect, it, vi } from 'vitest'

import { AltCoreLabelTagName as tagName, AltCoreTextTagName, AltCoreTooltipTagName } from '~shared/constants'
import { createComponent, useCoreTests } from '~shared/tests/core'
import { generatePropTestCases, getElementClasses, getShadowRootElement, getStyleRule, getWCShadowRoot } from '~shared/tests/utils'
import type { IAltCoreLabelExternalProps, IAltCoreLabelInternalProps } from '~core/ui/label/models/types'
import { createCoreLabelInternalProps, EAltCoreLabelAlignment } from '~core/ui/label/models/types'
import '~core/ui/label'
import { SIZES } from '~tokens/index'
import { EAltCoreTextSize, EAltCoreTextVariant } from '~core/ui/text/models/types/external'
import { booleanTestValues } from '~shared/tests/mockData'
import { empty, text } from '~shared/tests/slotContents'

type IAltCoreLabelProps = IAltCoreLabelExternalProps & IAltCoreLabelInternalProps

// Unit test cases:
const texts = [
  text,
  ' ',
  empty,
]
const propsTextTestCases = generatePropTestCases<IAltCoreLabelProps, 'text'>(
  'text',
  texts,
)

const tooltipTexts = [
  text,
  ' ',
]
const propsTooltipTextTestCases = generatePropTestCases<IAltCoreLabelProps, 'tooltipText'>(
  'tooltipText',
  tooltipTexts,
)

const alignments = Object.values(EAltCoreLabelAlignment)
const propsAlignmentTestCases = generatePropTestCases<IAltCoreLabelProps, 'alignment'>(
  'alignment',
  alignments,
)

const variants: IAltCoreLabelProps['variant'][] = [
  EAltCoreTextVariant.PRIMARY,
  EAltCoreTextVariant.SECONDARY,
]
const propsVariantTestCases = generatePropTestCases<IAltCoreLabelProps, 'variant'>(
  'variant',
  variants,
)

const sizes: IAltCoreLabelProps['size'][] = [
  EAltCoreTextSize.A2_REGULAR,
  EAltCoreTextSize.P2_REGULAR,
]
const propsSizeTestCases = generatePropTestCases<IAltCoreLabelProps, 'size'>(
  'size',
  sizes,
)

const debounceTestCaseValues = [
  10,
  0,
  50,
]
const propsDebounceTestCases = generatePropTestCases<IAltCoreLabelProps, 'debounce'>(
  'debounce',
  debounceTestCaseValues,
)

const propsTooltipActiveTestCases = generatePropTestCases<IAltCoreLabelProps, 'tooltipActive'>(
  'tooltipActive',
  booleanTestValues,
)
const propsDisabledTestCases = generatePropTestCases<IAltCoreLabelProps, 'disabled'>(
  'disabled',
  booleanTestValues,
)

const propsRequiredTestCases = generatePropTestCases<IAltCoreLabelProps, 'required'>(
  'required',
  booleanTestValues,
)

const propsWrapTestCases = generatePropTestCases<IAltCoreLabelProps, 'wrap'>(
  'wrap',
  booleanTestValues,
)

// CSS test mappings:
const mapCssPropertiesToStyles: Record<string, string> = { marginLeft: String(SIZES.spacing_x.cssValue) }


type TSubComponent = typeof tagName | typeof AltCoreTextTagName | typeof AltCoreTooltipTagName
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
  'Core/AltCoreLabel/Unit',
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
            `Should ${testCase.case} ${testCase.value ? '' : 'not'} add class ${expectedCssClass} when prop ${testCase.prop} is ${testCase.value}`,
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
            `Should ${testCase.case} ${testCase.value ? '' : 'not'} add node ${expectedCssClass} when prop ${testCase.prop} is ${testCase.value}`,
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
            `Should ${testCase.case} add class ${expectedCssClass} when prop ${testCase.prop} is ${testCase.value}`,
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
            `Should ${testCase.case} add class ${expectedCssClass} when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const rootElement = getRootElement()
              const rootElementClasses = getElementClasses(rootElement)

              expect(rootElementClasses).toContain(expectedCssClass)
            },
          )

          it(
            `Should ${testCase.case} pass prop ${testCase.prop} ${testCase.value} to text`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const textElement = getSubWC(
                component,
                AltCoreTextTagName,
              )

              expect(textElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propsVariantTestCases) {
          it(
            `With disabled: true, should not ${testCase.case} pass prop ${testCase.prop} ${testCase.value}; ${testCase.prop} ${EAltCoreTextVariant.TERTIARY} is passed to text instead`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value, disabled: true } })

              const textElement = getSubWC(
                component,
                AltCoreTextTagName,
              )

              expect(textElement[testCase.prop]).toBe(EAltCoreTextVariant.TERTIARY)
            },
          )
        }

        for (const testCase of propsTextTestCases) {
          const expectedTextClass = `.${tagName}__content`
          it(
            `Should ${testCase.case} render prop ${testCase.prop} as the text prop in the text slot`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const textComponent = getSubWC(
                component,
                AltCoreTextTagName,
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
            `Should ${testCase.case} add a prop to ${AltCoreTooltipTagName} when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value, tooltipActive: true } })

              const tooltipElement = getSubWC(
                component,
                AltCoreTooltipTagName,
              )

              expect(tooltipElement.text).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propsTooltipActiveTestCases) {
          it(
            `Should ${testCase.case} add a prop to ${AltCoreTooltipTagName} when prop ${testCase.prop} is ${testCase.value}`,
            async() => {
              await updateComponent({ props: { tooltipText: text, [testCase.prop]: testCase.value } })

              const tooltipElement = getSubWC(
                component,
                AltCoreTooltipTagName,
              )

              expect(tooltipElement.disabled).toBe(!testCase.expected)
            },
          )
        }


        for (const testCase of propsDebounceTestCases) {
          const contentClassName = `.${tagName}__content`
          // TODO: Fix how the props are applied and how the value reaches the debounce
          it.skip(
            `Should ${testCase.case} ${testCase.prop} ${testCase.value} ms when ${contentClassName} is resized`,
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

              // 2 calls: awaiting component.updateComplete triggers the first setTimeout
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
          'CSS property values',
          () => {
            beforeAll(async() => {
              await updateComponent({ props: { } })
            })
            const varMarginLeftName = '--alt-core-label-margin-left-tooltip'

            it(
              'CSS classes should use variables in their values',
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
              'CSS variables should match the token values',
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
