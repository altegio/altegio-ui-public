import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreCounterTagName as tagName } from '~shared/constants'
import { AltCounter } from '~vue/ui/counter'
import type { IAltVueCounterProps } from '~vue/ui/counter/models/types'
import { EAltCoreCounterVariant } from '~core/ui/counter/models/types'
import type { TPropTestCase } from '~shared/types/tests'

type TPropKey = Exclude<keyof IAltVueCounterProps, 'value' | 'variant'>

const propTestCases: TPropTestCase<Required<IAltVueCounterProps>, TPropKey>[] = [
  { prop: 'max', case: 'a number', value: 99 },
  { prop: 'accessibleName', case: 'with text', value: '3 unread messages' },
  { prop: 'withPlusSign', case: 'true', value: true },
  { prop: 'disabled', case: 'true', value: true },
]

describe(
  'Vue/AltCounter',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        () => {
          const wrapper = mount(AltCounter, { props: { value: 3, variant: EAltCoreCounterVariant.PRIMARY, [testCase.prop]: testCase.value } })

          const coreElement = wrapper.find(tagName).element as HTMLElement & IAltVueCounterProps

          expect(coreElement[testCase.prop]).toBe(testCase.value)
        },
      )
    }
  },
)
