import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { text, empty } from '~shared/tests/slotContents'
import type { TPropTestCase } from '~shared/types/tests'
import { useCoreTests } from '~shared/tests/core'
import { EYSizes } from '~shared/types/global'
import { YCoreButtonTagName, YCoreIconTagName } from '~shared/constants'
import { getShadowElement } from '~shared/tests/utils'
import { yRocket } from '~shared/icons'
import type { YCoreIcon } from '~core/ui/icon'
import {
  createCoreButtonProps,
  type IYCoreButtonProps,
} from '~core/ui/button/models/types'
import '~core/ui/button'

// Unit test cases:
const propLabelTestCases: TPropTestCase<IYCoreButtonProps, 'label'>[] = [
  { prop: 'label', case: 'with content', value: text },
  { prop: 'label', case: 'without content', value: empty },
]
const propIconLeftTestCases: TPropTestCase<IYCoreButtonProps, 'iconLeft'>[] = [
  { prop: 'iconLeft', case: 'with an icon', value: yRocket },
  { prop: 'iconLeft', case: 'without an icon', value: undefined },
]
const propIconRightTestCases: TPropTestCase<IYCoreButtonProps, 'iconRight'>[] = [
  { prop: 'iconRight', case: 'with an icon', value: yRocket },
  { prop: 'iconRight', case: 'without an icon', value: undefined },
]
const propSizeTestCases: TPropTestCase<IYCoreButtonProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: '16px' },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM, expected: '16px' },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: '24px' },
]

const tagName = YCoreButtonTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreButtonProps(),
)

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

describe(
  'Core/YCoreButton',
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
          'Props',
          () => {
            for (const testCase of propLabelTestCases) {
              it(
                `Prop label should work ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { label: testCase.value } })

                  const textElement = getLocalShadowElement(`.${tagName}__text`)

                  if (testCase.value) {
                    expect(textElement?.textContent).toBe(testCase.value)
                  } else {
                    expect(textElement).toBeNull()
                  }
                },
              )
            }

            for (const testCase of propIconLeftTestCases) {
              it(
                `Prop iconLeft should work ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { iconLeft: testCase.value } })

                  const iconElement = getLocalShadowElement(YCoreIconTagName)

                  if (testCase.value) {
                    expect(iconElement).toBeTruthy()
                  } else {
                    expect(iconElement).toBeNull()
                  }
                },
              )
            }

            for (const testCase of propIconRightTestCases) {
              it(
                `Prop iconRight should work ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { iconRight: testCase.value } })

                  const iconElement = getLocalShadowElement(YCoreIconTagName)

                  if (testCase.value) {
                    expect(iconElement).toBeTruthy()
                  } else {
                    expect(iconElement).toBeNull()
                  }
                },
              )
            }

            for (const testCase of propSizeTestCases) {
              it(
                `Prop size should set the icon size when prop size is ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { iconLeft: yRocket, size: testCase.value } })

                  const iconElement = getLocalShadowElement(YCoreIconTagName) as YCoreIcon | null

                  expect(iconElement?.size).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)

