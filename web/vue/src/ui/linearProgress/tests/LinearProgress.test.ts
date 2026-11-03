import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreLinearProgressTagName as tagName } from '~shared/constants'
import { AltLinearProgress } from '~vue/ui/linearProgress'
import type { IAltVueLinearProgressProps } from '~vue/ui/linearProgress/models/types'
import { EAltCoreLinearProgressVariant } from '~core/ui/linearProgress/models/types'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

const propTestCases: TPropTestCase<Required<IAltVueLinearProgressProps>, keyof IAltVueLinearProgressProps>[] = [
  { prop: 'value', case: 'a number', value: 40 },
  { prop: 'max', case: 'a number', value: 5 },
  { prop: 'indeterminate', case: 'true', value: true },
  { prop: 'size', case: 'medium', value: EAltSizes.MEDIUM },
  { prop: 'variant', case: 'positive', value: EAltCoreLinearProgressVariant.POSITIVE },
  { prop: 'accessibleName', case: 'with text', value: 'Uploading' },
  { prop: 'valueText', case: 'with text', value: 'Step 2 of 5' },
]

describe(
  'Vue/AltLinearProgress',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Prop "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        () => {
          const wrapper = mount(AltLinearProgress, { props: { [testCase.prop]: testCase.value } })

          const coreElement = wrapper.find(tagName).element as HTMLElement & IAltVueLinearProgressProps

          expect(coreElement[testCase.prop]).toBe(testCase.value)
        },
      )
    }
  },
)
