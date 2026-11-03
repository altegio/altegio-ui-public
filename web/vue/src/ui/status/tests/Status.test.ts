import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreStatusTagName as tagName } from '~shared/constants'
import { AltStatus } from '~vue/ui/status'
import type { IAltVueStatusProps } from '~vue/ui/status/models/types'
import { EAltCoreStatusVariant } from '~core/ui/status/models/types'
import { altSmile } from '~shared/icons'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

const propTestCases: TPropTestCase<Required<IAltVueStatusProps>, keyof IAltVueStatusProps>[] = [
  { prop: 'variant', case: 'error', value: EAltCoreStatusVariant.ERROR },
  { prop: 'text', case: 'with text', value: 'Request sent' },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'icon', case: 'an icon', value: altSmile },
]

describe(
  'Vue/AltStatus',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        () => {
          const wrapper = mount(AltStatus, { props: { [testCase.prop]: testCase.value } })

          const coreElement = wrapper.find(tagName).element as HTMLElement & IAltVueStatusProps

          expect(coreElement[testCase.prop]).toEqual(testCase.value)
        },
      )
    }

    it(
      'Should pass the default slot to the core component',
      () => {
        const wrapper = mount(AltStatus, { slots: { default: '<a href="#">Details</a>' } })

        expect(wrapper.find(`${tagName} a`).text()).toBe('Details')
      },
    )
  },
)
