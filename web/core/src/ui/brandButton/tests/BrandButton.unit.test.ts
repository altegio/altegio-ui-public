import {
  beforeAll,
  afterEach,
  afterAll,
  describe,
  expect,
  it,
} from 'vitest'
import {
  AltCoreBrandButtonTagName,
  AltCoreSimpleButtonTagName,
  AltCoreIconTagName,
} from '~shared/constants'
import { getShadowElement } from '~shared/tests/utils'
import { useCoreTests } from '~shared/tests/core'
import type { TPropTestCase } from '~shared/types/tests'
import type { IAltCoreBrandButtonProps } from '../models/types'
import { createCoreBrandButtonProps, EAltCoreBrandButtonVariant } from '../models/types'
import { EAltSizes } from '~shared/types/global'
import type { AltCoreIcon } from '~core/ui/icon'
import '../BrandButton.core'

const propVariantTestCases: TPropTestCase<IAltCoreBrandButtonProps, 'variant'>[] = [{ prop: 'variant', case: 'WhatsApp', value: EAltCoreBrandButtonVariant.WhatsApp }]

const propSizeTestCases: TPropTestCase<IAltCoreBrandButtonProps, 'size', string>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL, expected: '18px' },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM, expected: '20px' },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE, expected: '22px' },
]

const propTextTestCases: TPropTestCase<IAltCoreBrandButtonProps, 'text'>[] = [
  { prop: 'text', case: 'with text', value: 'Sign in with WhatsApp' },
  { prop: 'text', case: 'without text', value: '' },
]

const tagName = AltCoreBrandButtonTagName

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
  'Core/AltCoreBrandButton/Unit',
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

              const simpleButton = localShadowElement(AltCoreSimpleButtonTagName)

              expect(component.variant).toBe(testCase.value)
              expect(simpleButton?.getAttribute('data-variant')).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propSizeTestCases) {
          it(
            `Prop size should set the icon size for value ${testCase.case}`,
            async() => {
              await updateComponent({ props: { variant: EAltCoreBrandButtonVariant.WhatsApp, size: testCase.value } })

              const iconElement = localShadowElement(AltCoreIconTagName) as AltCoreIcon | null
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
