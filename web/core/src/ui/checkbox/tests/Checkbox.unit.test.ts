import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { text, empty, number } from '~shared/tests/slotContents'
import {
  YCoreCheckboxTagName as tagName,
  YCoreSimpleCheckboxTagName,
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
  trimTextContent,
} from '~shared/tests/utils'
import { type IYCoreCheckboxExternalProps, createCoreCheckboxExternalProps } from '../models/types'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { YCoreSimpleCheckbox, YCoreLabel, YCoreAnnotation, YCoreError } from '~core/index'

import '~core/ui/checkbox'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'
import { userEvent } from 'vitest/browser'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreCheckboxExternalProps(),
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

const getSimpleCheckboxElement = () => getLocalShadowElement(YCoreSimpleCheckboxTagName) as YCoreSimpleCheckbox | undefined
const getLabelElement = () => getLocalShadowElement(YCoreLabelTagName) as YCoreLabel | undefined
const getAnnotationElement = () => getLocalShadowElement(YCoreAnnotationTagName) as YCoreAnnotation | undefined
const getErrorElement = () => getLocalShadowElement(YCoreErrorTagName) as YCoreError | undefined

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

const propSizeTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: undefined },
]

const propCheckedTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
]

const propIndeterminateTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'indeterminate'>[] = [
  { prop: 'indeterminate', case: 'true', value: true, expected: true },
  { prop: 'indeterminate', case: 'false', value: false, expected: false },
]

const propDisabledTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'have', value: true, expected: true },
  { prop: 'disabled', case: 'not have', value: false, expected: false },
]

const propAlignmentTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'alignment'>[] = [
  { prop: 'alignment', case: EYCoreLabelAlignment.TOP, value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EYCoreLabelAlignment.CENTER, value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: undefined },
]

const propLabelTextTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: undefined },
]

const propLabelTooltipTextTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: undefined },
]

const propRequiredTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
]

const propAnnotationTextTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with content', value: text, expected: text },
  { prop: 'annotationText', case: 'without content', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelOverflowDebounceTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'with content', value: number, expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: undefined },
]

const propErrorsTestCases: TPropTestCase<IYCoreCheckboxExternalProps, 'errors'>[] = [
  { prop: 'errors', case: 'with an array of errors', value: ['error'], expected: true },
  { prop: 'errors', case: 'with an empty array', value: [], expected: false },
  { prop: 'errors', case: 'undefined', value: undefined, expected: false },
]

describe(
  'Core/YCoreCheckbox/Unit',
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
            `Prop "${testCase.prop}" with value "${testCase.value}" should ${testCase.value ? '' : 'not'} change the rootElement class to "${expectedCssClass}"`,
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
            `Should ${testCase.case} class ${expectedCssClass} when prop ${testCase.prop} is ${testCase.value}`,
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
          ...propIndeterminateTestCases,
          ...propDisabledTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the SimpleCheckbox prop to "${String(testCase.expected)}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const simpleCheckbox = getSimpleCheckboxElement()

              expect(simpleCheckbox?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of [
          ...propDisabledTestCases,
          ...propAlignmentTestCases,
          ...propRequiredTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the Label prop to "${String(testCase.expected)}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLabelTooltipTextTestCases) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the Label prop to "${testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.tooltipText).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLabelTextTestCases) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the Label prop to "${testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.text).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propDisabledTestCases) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the Label "tooltip-active" prop to "${!testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.tooltipActive).toBe(!testCase.value)
            },
          )
        }

        for (const testCase of propDisabledTestCases) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the Annotation prop to "${testCase.value}"`,
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
            `Prop "${testCase.prop}" with value "${testCase.value}" should ${testCase.value ? '' : 'not'} change the rootElement class to "${expectedCssClass}"`,
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
          const expectedCssClass = 'y-core-checkbox__label_hidden'

          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should ${testCase.value ? 'not ' : ''}change the Label class to "${expectedCssClass}"`,
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
            `Prop "${testCase.prop}" with value "${testCase.value}" should ${testCase.value ? '' : 'not'} change the rootElement class to "${expectedCssClass}"`,
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
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the Annotation text to "${String(testCase.expected)}"`,
            async() => {
              await updateComponent({ props: { annotationText: testCase.value } })

              const annotationElement = getAnnotationElement()

              expect(trimTextContent(annotationElement?.textContent)).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLabelOverflowDebounceTestCases) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.value}" should set the Label prop to "${testCase.value}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const labelElement = getLabelElement()

              expect(labelElement?.debounce).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propErrorsTestCases) {
          it(
            `Prop "${testCase.prop}" with value "${testCase.case}" should set the SimpleCheckbox prop to "${testCase.expected as boolean}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const simpleCheckboxElement = getSimpleCheckboxElement()

              expect(simpleCheckboxElement?.error).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propErrorsTestCases) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set the Error prop to "${testCase.case}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const errorElement = getErrorElement()

              expect(errorElement?.errors).toBe(testCase.value)
            },
          )
        }
      },
    )

    // TODO: Figure out how to test the custom events
    describe(
      'Events',
      () => {
        it(
          'Should emit "checked" on click',
          async() => {
            const handleChecked = vi.fn()

            const rootElement = getLocalRootElement()

            if (!rootElement) {
              throw new Error('Root element not found')
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
          'Should not emit "checked" on click when the component is disabled',
          async() => {
            await updateComponent({ props: { disabled: true } })

            const handleChecked = vi.fn()

            const rootElement = getLocalRootElement()

            if (!rootElement) {
              throw new Error('Root element not found')
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
