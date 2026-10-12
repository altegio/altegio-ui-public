import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import {
  YCoreEmptyStateTagName as tagName, YCoreIconTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  classWithModifier,
  getElementClasses,
  getShadowRootElement,
  getWCShadowRoot,
} from '~shared/tests/utils'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase, TSlotTestCase } from '~shared/types/tests'

import '~core/ui/emptyState'
import '~core/ui/icon'

import {
  createCoreEmptyStateExternalProps,
  type IYCoreEmptyStateExternalProps,
} from '~core/ui/emptyState/models/types/external'
import { empty, text } from '~shared/tests/slotContents'
import { yMagic, yRocket } from '~shared/icons'
import type { IYCoreTooltipProps } from '~core/ui/tooltip/models/types'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreEmptyStateExternalProps(),
)

const getLocalRootElement = () => {
  return getShadowRootElement(
    component,
    tagName,
  )
}

const localClassWithModifier = (modifier: string) => classWithModifier(
  tagName,
  modifier,
)

const propSizeTestCases: TPropTestCase<IYCoreEmptyStateExternalProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: undefined },
]

const propTitleTestCases: TPropTestCase<IYCoreEmptyStateExternalProps, 'title'>[] = [
  { prop: 'title', case: 'с контентом', value: text, expected: text },
  { prop: 'title', case: 'без контента', value: empty, expected: empty },
]

const propDescriptionTestCases: TPropTestCase<IYCoreEmptyStateExternalProps, 'description'>[] = [
  { prop: 'description', case: 'с контентом', value: text, expected: text },
  { prop: 'description', case: 'без контента', value: empty, expected: empty },
]

const propIconTestCases: TPropTestCase<IYCoreEmptyStateExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'с указанной иконкой', value: yRocket, expected: yRocket.name },
  { prop: 'icon', case: 'со стандартной иконкой', value: undefined, expected: yMagic.name },
]

export const slotActionsTestCases: TSlotTestCase<string, IYCoreTooltipProps>[] = [
  { slot: 'actions', case: 'слот "actions" предоставлен', content: 'Content' },
  { slot: 'actions', case: 'слот "actions" не предоставлен', content: empty },
]

describe(
  'Core/YCoreEmptyState/Unit',
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


        for (const testCase of [
          ...propTitleTestCases,
          ...propDescriptionTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value}" должен изменить текст у EmptyState на "${String(testCase.expected)}"`,
            async() => {
              await updateComponent({ props: { title: testCase.value } })

              const rootElement = getLocalRootElement()
              expect(rootElement?.textContent?.trim()).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propIconTestCases) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.value?.name ?? 'undefined'}" должен отрендерить Icon "${testCase.case}"`,
            async() => {
              await updateComponent({ props: { icon: testCase.value } })

              const iconElement = getWCShadowRoot(component).querySelector(YCoreIconTagName)
              const icon = iconElement?.icon.name

              expect(icon).toBe(testCase.expected)
            },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of [...slotActionsTestCases]) {
          it(
            `Slot "${testCase.slot}" ${testCase.content ? '' : 'не'} должен рендериться, если ${testCase.case}`,
            async() => {
              await updateComponent({
                slots: testCase.content
                    ? { [testCase.slot]: testCase.content }
                    : {},
              })

              expect(component.textContent).toContain(testCase.content)
            },
          )
        }
      },
    )
  },
)
