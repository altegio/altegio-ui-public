import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { userEvent } from 'vitest/browser'
import { useCoreTests } from '~shared/tests/core'
import { AltCoreAnnotationTagName, AltCoreSimpleToggleTagName, AltCoreLabelTagName, AltCoreToggleTagName } from '~shared/constants'
import type { AltCoreSimpleToggle, AltCoreLabel } from '~core/index'
import { createCoreToggleExternalProps, type IAltCoreToggleExternalProps } from '~core/ui/toggle/models/types'
import type { TPropTestCase } from '~shared/types/tests'
import { empty, text } from '~shared/tests/slotContents'
import { getShadowElement, trimTextContent } from '~shared/tests/utils'
import { EAltSizes } from '~shared/types/global'
import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'
import '~core/ui/toggle'

// Unit test cases:
const propCheckedTestCases: TPropTestCase<IAltCoreToggleExternalProps, 'checked'>[] = [
  { prop: 'checked', case: 'enabled', value: true, expected: true },
  { prop: 'checked', case: 'disabled', value: false, expected: false },
]
const propDisabledTestCases: TPropTestCase<IAltCoreToggleExternalProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'enabled', value: true, expected: true },
  { prop: 'disabled', case: 'disabled', value: false, expected: false },
]
const propLabelTextTestCases: TPropTestCase<IAltCoreToggleExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'with content', value: text, expected: text },
  { prop: 'labelText', case: 'without content', value: empty, expected: undefined },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: undefined },
]
const propLabelTooltipTextTestCases: TPropTestCase<IAltCoreToggleExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'with content', value: text },
  { prop: 'labelTooltipText', case: 'without content', value: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined },
]
const propAnnotationTextTestCases: TPropTestCase<IAltCoreToggleExternalProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'with content', value: text, expected: text },
  { prop: 'annotationText', case: 'without content', value: empty, expected: undefined },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: undefined },
]
const propLabelOverflowDebounceCases: TPropTestCase<IAltCoreToggleExternalProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'with a delay', value: 200, expected: 200 },
  { prop: 'labelOverflowDebounce', case: 'without a delay', value: undefined, expected: undefined },
]
const propAlignmentCases: TPropTestCase<IAltCoreToggleExternalProps, 'alignment'>[] = [
  { prop: 'alignment', case: 'center alignment', value: EAltCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'top alignment', value: EAltCoreLabelAlignment.TOP },
  { prop: 'alignment', case: 'without alignment', value: undefined },
]
const propSizeCases: TPropTestCase<IAltCoreToggleExternalProps, 'size'>[] = [
  { prop: 'size', case: 'size M', value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'size S', value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: 'size not set', value: undefined, expected: undefined },
]

const tagName = AltCoreToggleTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreToggleExternalProps(),
)

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

const getSimpleToggleElement = () => getLocalShadowElement(AltCoreSimpleToggleTagName) as AltCoreSimpleToggle | undefined
const getLabelTextElement = () => getLocalShadowElement(AltCoreLabelTagName) as AltCoreLabel | undefined

describe(
  'Core/AltCoreToggle/Unit',
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
        for (const testCase of [
          ...propCheckedTestCases,
          ...propDisabledTestCases,
          ...propSizeCases,
        ]) {
          it(
            `Prop ${testCase.prop} should be ${testCase.case}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const toggleElement = getSimpleToggleElement()

              expect(toggleElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLabelTextTestCases) {
          it(
            `Prop labelText should be ${testCase.case}`,
            async() => {
              await updateComponent({ props: { labelText: testCase.value } })

              const labelTextElement = getLabelTextElement()

              if (testCase.value !== undefined) {
                expect(labelTextElement?.text).toBe(testCase.expected)
              } else {
                expect(labelTextElement?.text).toBeUndefined()
              }
            },
          )
        }

        for (const testCase of propAnnotationTextTestCases) {
          it(
            `Prop annotationText should be ${testCase.case}`,
            async() => {
              await updateComponent({ props: { annotationText: testCase.value } })

              const annotationTextElement = getLocalShadowElement(AltCoreAnnotationTagName)

              expect(trimTextContent(annotationTextElement?.textContent)).toBe(testCase.expected)
            },
          )
        }

        describe(
          'When hasInfoContent === true',
          () => {
            for (const testCase of propLabelTooltipTextTestCases) {
              it(
                `Prop labelTooltipText should be ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { labelTooltipText: testCase.value, labelText: text } })

                  const labelTooltipTextElement = getLabelTextElement()

                  if (testCase.value !== undefined) {
                    expect(labelTooltipTextElement?.tooltipText).toEqual(testCase.value)
                  } else {
                    expect(labelTooltipTextElement?.tooltipText).toBeUndefined()
                  }
                },
              )
            }

            for (const testCase of propLabelOverflowDebounceCases) {
              it(
                `Prop labelOverflowDebounce should be ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { labelOverflowDebounce: testCase.value, labelText: text } })

                  const labelTextElement = getLabelTextElement()

                  expect(labelTextElement?.debounce).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propAlignmentCases) {
              it(
                `Prop alignment should be ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { alignment: testCase.value, labelText: text } })

                  const labelTextElement = getLabelTextElement()

                  expect(labelTextElement?.alignment).toBe(testCase.value)
                },
              )
            }
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should call the click handler on component click',
          async() => {
            const handleClick = vi.fn()

            component.onclick = handleClick

            await userEvent.click(component)

            expect(handleClick).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Should call the checked handler on SimpleToggle click',
          async() => {
            const handleChecked = vi.fn()

            const simpleToggleElement = getSimpleToggleElement()

            if (!simpleToggleElement) return

            simpleToggleElement.addEventListener(
              'checked',
              handleChecked,
            )

            await userEvent.click(simpleToggleElement)

            expect(handleChecked).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Should not call the checked handler on SimpleToggle click when disabled is set',
          async() => {
            const handleChecked = vi.fn()

            const simpleToggleElement = getSimpleToggleElement()

            if (!simpleToggleElement) return

            simpleToggleElement.addEventListener(
              'checked',
              handleChecked,
            )

            await updateComponent({ props: { disabled: true } })

            await userEvent.click(simpleToggleElement)

            expect(handleChecked).not.toHaveBeenCalled()
          },
        )
      },
    )
  },
)
