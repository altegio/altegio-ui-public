import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { AltCoreIconButtonTagName, AltCoreIconTagName } from '~shared/constants'
import { altRocket } from '~shared/icons'
import { getShadowElement } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'
import type { AltCoreIcon } from '~core/ui/icon'
import type { IAltCoreIconButtonExternalProps } from '../models/types'
import { createCoreIconButtonExternalProps } from '../models/types'
import '../IconButton.core'

// Unit test cases:
const propIconTestCases: TPropTestCase<IAltCoreIconButtonExternalProps, 'icon'>[] = [
  { prop: 'icon', case: 'with an icon', value: altRocket },
  { prop: 'icon', case: 'without an icon', value: undefined },
]
const propSizeTestCases: TPropTestCase<IAltCoreIconButtonExternalProps, 'size'>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: '16px' },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM, expected: '16px' },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: '24px' },
]

const tagName = AltCoreIconButtonTagName

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
  'Core/AltCoreIconButton/Unit',
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
            `Prop icon should be ${testCase.case}`,
            async() => {
              await updateComponent({ props: { icon: testCase.value } })

              const iconElement = localShadowElement(AltCoreIconTagName)

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
              await updateComponent({ props: { icon: altRocket, size: testCase.value } })

              const iconElement = localShadowElement(AltCoreIconTagName) as AltCoreIcon | null

              expect(iconElement?.size).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
