import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreSkeletonTagName as tagName } from '~shared/constants'
import { AltSkeleton } from '~vue/ui/skeleton'
import type { IAltVueSkeletonProps } from '~vue/ui/skeleton/models/types'
import { EAltCoreSkeletonShape } from '~core/ui/skeleton/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

const propTestCases: TPropTestCase<Required<IAltVueSkeletonProps>, keyof IAltVueSkeletonProps>[] = [
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'shape', case: 'circle', value: EAltCoreSkeletonShape.CIRCLE },
  { prop: 'width', case: 'a number', value: 120 },
  { prop: 'height', case: 'a CSS length', value: '2rem' },
]

describe(
  'Vue/AltSkeleton',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        () => {
          const wrapper = mount(AltSkeleton, { props: { [testCase.prop]: testCase.value } })

          const coreElement = wrapper.find(tagName).element as HTMLElement & IAltVueSkeletonProps

          expect(coreElement[testCase.prop]).toBe(testCase.value)
        },
      )
    }
  },
)
