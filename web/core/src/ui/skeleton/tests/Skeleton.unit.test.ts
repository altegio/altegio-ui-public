import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest'
import { AltCoreSkeletonTagName as tagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import type { TPropTestCase } from '~shared/types/tests'

import '~core/ui/skeleton'

import {
  createCoreSkeletonProps,
  EAltCoreSkeletonShape,
  type IAltCoreSkeletonProps,
} from '~core/ui/skeleton/models/types'
import { EAltSizes } from '~shared/types/global'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreSkeletonProps(),
)

const propSizeTestCases: TPropTestCase<IAltCoreSkeletonProps, 'size', string>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: '12px' },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: '24px' },
  { prop: 'size', case: EAltSizes.LARGE, value: EAltSizes.LARGE, expected: '32px' },
]

const propLengthTestCases: TPropTestCase<IAltCoreSkeletonProps, 'width' | 'height', string>[] = [
  { prop: 'width', case: 'a number of pixels', value: 120, expected: '120px' },
  { prop: 'width', case: 'a CSS length', value: '50%', expected: '50%' },
  { prop: 'height', case: 'a number of pixels', value: 40, expected: '40px' },
  { prop: 'height', case: 'a CSS length', value: '2rem', expected: '2rem' },
]

describe(
  'Core/AltCoreSkeleton/Unit',
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

    it(
      'Should be hidden from assistive technologies',
      () => {
        expect(component.getAttribute('aria-hidden')).toBe('true')
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propSizeTestCases) {
          it(
            `Prop "size" with value "${testCase.case}" should set the height to ${testCase.expected}`,
            async() => {
              await updateComponent({ props: { size: testCase.value, height: undefined } })

              expect(getComputedStyle(component).height).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propLengthTestCases) {
          it(
            `Prop "${testCase.prop}" with ${testCase.case} should set the CSS variable to "${testCase.expected}"`,
            async() => {
              await updateComponent({ props: { [testCase.prop]: testCase.value } })

              expect(component.style.getPropertyValue(`--alt-core-skeleton-${testCase.prop}`)).toBe(testCase.expected)
            },
          )
        }

        it(
          'Prop "height" should override the "size" height',
          async() => {
            await updateComponent({ props: { size: EAltSizes.SMALL, height: 40 } })

            expect(getComputedStyle(component).height).toBe('40px')
          },
        )

        it(
          'Prop "width" reset to undefined should remove the CSS variable',
          async() => {
            await updateComponent({ props: { width: 120 } })
            await updateComponent({ props: { width: undefined } })

            expect(component.style.getPropertyValue('--alt-core-skeleton-width')).toBe('')
          },
        )

        it(
          'Prop "shape" set to "circle" should keep a 1:1 ratio',
          async() => {
            await updateComponent({ props: { shape: EAltCoreSkeletonShape.CIRCLE, size: EAltSizes.LARGE, width: undefined } })

            const { width, height } = getComputedStyle(component)

            expect(width).toBe(height)
          },
        )
      },
    )
  },
)
