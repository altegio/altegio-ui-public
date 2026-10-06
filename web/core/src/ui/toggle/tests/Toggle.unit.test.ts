import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import { userEvent } from '@vitest/browser/context'
import { useCoreTests } from '~shared/tests/core'
import { YCoreAnnotationTagName, YCoreSimpleToggleTagName, YCoreLabelTagName, YCoreToggleTagName } from '~shared/constants'
import type { YCoreSimpleToggle, YCoreLabel } from '~core/index'
import { createCoreToggleExternalProps, type IYCoreToggleExternalProps } from '~core/ui/toggle/models/types'
import type { TPropTestCase } from '~shared/types/tests'
import { empty, text } from '~shared/tests/slotContents'
import { getShadowElement } from '~shared/tests/utils'
import { EYSizes } from '~shared/types/global'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'
import '~core/ui/toggle'

// Unit test cases:
const propCheckedTestCases: TPropTestCase<IYCoreToggleExternalProps, 'checked'>[] = [
  { prop: 'checked', case: 'включен', value: true, expected: true },
  { prop: 'checked', case: 'выключен', value: false, expected: false },
]
const propDisabledTestCases: TPropTestCase<IYCoreToggleExternalProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'включен', value: true, expected: true },
  { prop: 'disabled', case: 'выключен', value: false, expected: false },
]
const propLabelTextTestCases: TPropTestCase<IYCoreToggleExternalProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'с контентом', value: text, expected: text },
  { prop: 'labelText', case: 'без контента', value: empty, expected: undefined },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: undefined },
]
const propLabelTooltipTextTestCases: TPropTestCase<IYCoreToggleExternalProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'с контентом', value: text },
  { prop: 'labelTooltipText', case: 'без контента', value: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined },
]
const propAnnotationTextTestCases: TPropTestCase<IYCoreToggleExternalProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'с контентом', value: text, expected: text },
  { prop: 'annotationText', case: 'без контента', value: empty, expected: undefined },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: undefined },
]
const propLabelOverflowDebounceCases: TPropTestCase<IYCoreToggleExternalProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'с задержкой', value: 200, expected: 200 },
  { prop: 'labelOverflowDebounce', case: 'без задержки', value: undefined, expected: undefined },
]
const propAlignmentCases: TPropTestCase<IYCoreToggleExternalProps, 'alignment'>[] = [
  { prop: 'alignment', case: 'выравнивание по центру', value: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'выравнивание по верху', value: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: 'без выравнивания', value: undefined },
]
const propSizeCases: TPropTestCase<IYCoreToggleExternalProps, 'size'>[] = [
  { prop: 'size', case: 'размер M', value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'размер S', value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: 'размер не указан', value: undefined, expected: undefined },
]

const tagName = YCoreToggleTagName

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

const getSimpleToggleElement = () => getLocalShadowElement(YCoreSimpleToggleTagName) as YCoreSimpleToggle | undefined
const getLabelTextElement = () => getLocalShadowElement(YCoreLabelTagName) as YCoreLabel | undefined

describe(
  'Core/YCoreToggle/Unit',
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
            `Prop ${testCase.prop} должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              const toggleElement = getSimpleToggleElement()

              expect(toggleElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLabelTextTestCases) {
          it(
            `Prop labelText должен быть ${testCase.case}`,
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
            `Prop annotationText должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { annotationText: testCase.value } })

              const annotationTextElement = getLocalShadowElement(YCoreAnnotationTagName)

              expect(annotationTextElement?.textContent?.trim()).toBe(testCase.expected)
            },
          )
        }

        describe(
          'Если hasInfoContent === true',
          () => {
            for (const testCase of propLabelTooltipTextTestCases) {
              it(
                `Prop labelTooltipText должен быть ${testCase.case}`,
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
                `Prop labelOverflowDebounce должен быть ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { labelOverflowDebounce: testCase.value, labelText: text } })

                  const labelTextElement = getLabelTextElement()

                  expect(labelTextElement?.debounce).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propAlignmentCases) {
              it(
                `Prop alignment должен быть ${testCase.case}`,
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
          'Должен вызывать обработчик клика при нажатии на компонент',
          async() => {
            const handleClick = vi.fn()

            component.onclick = handleClick

            await userEvent.click(component)

            expect(handleClick).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Должен вызывать обработчик checked при нажатии на SimpleToggle',
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
          'Не должен вызывать обработчик checked при нажатии на SimpleToggle, если установлено свойство disabled',
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
