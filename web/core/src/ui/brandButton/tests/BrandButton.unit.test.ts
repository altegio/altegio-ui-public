import {
  beforeAll,
  afterEach,
  afterAll,
  describe,
  expect,
  it,
} from 'vitest'
import {
  YCoreBrandButtonTagName,
  YCoreSimpleButtonTagName,
  YCoreIconTagName,
} from '~shared/constants'
import { getShadowElement } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import type { TPropTestCase } from '~shared/types/tests'
import type { IYCoreBrandButtonProps } from '../models/types'
import { createCoreBrandButtonProps, EYCoreBrandButtonVariant } from '../models/types'
import { EYSizes } from '~shared/types/global'
import type { YCoreIcon } from '~core/ui/icon'
import '../BrandButton.core'

const propVariantTestCases: TPropTestCase<IYCoreBrandButtonProps, 'variant'>[] = [{ prop: 'variant', case: 'WhatsApp', value: EYCoreBrandButtonVariant.WhatsApp }]

const propSizeTestCases: TPropTestCase<IYCoreBrandButtonProps, 'size', string>[] = [
  { prop: 'size', case: 'small', value: EYSizes.SMALL, expected: '18px' },
  { prop: 'size', case: 'medium', value: EYSizes.MEDIUM, expected: '20px' },
  { prop: 'size', case: 'large', value: EYSizes.LARGE, expected: '22px' },
]

const propTextTestCases: TPropTestCase<IYCoreBrandButtonProps, 'text'>[] = [
  { prop: 'text', case: 'with text', value: 'Sign in with WhatsApp' },
  { prop: 'text', case: 'without text', value: '' },
]

const tagName = YCoreBrandButtonTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreBrandButtonProps(),
)

const localShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

describe(
  'Core/YCoreBrandButton/Unit',
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
        for (const testCase of propVariantTestCases) {
          it(
            `Prop variant should be ${testCase.case} and passed to simple-button`,
            async() => {
              await updateComponent({ props: { variant: testCase.value } })

              const simpleButton = localShadowElement(YCoreSimpleButtonTagName)

              expect(component.variant).toBe(testCase.value)
              expect(simpleButton?.getAttribute('data-variant')).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propSizeTestCases) {
          it(
            `Prop size should set the icon size for value ${testCase.case}`,
            async() => {
              await updateComponent({ props: { variant: EYCoreBrandButtonVariant.WhatsApp, size: testCase.value } })

              const iconElement = localShadowElement(YCoreIconTagName) as YCoreIcon | null
              expect(iconElement?.size).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propTextTestCases) {
          it(
            `Prop text should be ${testCase.case}`,
            async() => {
              await updateComponent({ props: { text: testCase.value } })

              const shadow = component.shadowRoot!
              const html = shadow.innerHTML

              expect(html).toContain(testCase.value)
            },
          )
        }
      },
    )
  },
)
