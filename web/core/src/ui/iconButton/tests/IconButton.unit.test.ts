import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCoreIconButtonTagName, YCoreIconTagName } from '~shared/constants'
import { yRocket } from '~shared/icons'
import { getShadowElement } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { EYSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { YCoreIcon } from '~core/ui/icon'
import type { IYCoreIconButtonExternalProps } from '../models/types'
import { createCoreIconButtonExternalProps } from '../models/types'
import '../IconButton.core'

// Unit test cases:
const propIconTestCases: TPropTestCase<IYCoreIconButtonExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'с иконкой', value: yRocket },
  { prop: 'icon', case: 'без иконки', value: undefined },
]
const propSizeTestCases: TPropTestCase<IYCoreIconButtonExternalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: '16px' },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM, expected: '16px' },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: '24px' },
]

const tagName = YCoreIconButtonTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreIconButtonExternalProps(),
)

const localShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

describe(
  'Core/YCoreIconButton/Unit',
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
        for (const testCase of propIconTestCases) {
          it(
            `Prop icon должен быть ${testCase.case}`,
            async() => {
              await updateComponent({ props: { icon: testCase.value } })

              const iconElement = localShadowElement(YCoreIconTagName)

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
            `Prop size должен корректно выставить размер иконки при выставление prop size значение ${testCase.case}`,
            async() => {
              await updateComponent({ props: { icon: yRocket, size: testCase.value } })

              const iconElement = localShadowElement(YCoreIconTagName) as YCoreIcon | null

              expect(iconElement?.size).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
