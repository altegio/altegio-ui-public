import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreCardCheckboxTagName as tagName } from '~shared/constants'
import { YCoreCardCheckbox } from '~core/index'
import { YCardCheckbox } from '~vue/ui/cardCheckbox'

import {
  propDisabledCases,
  propSizeCases,
  propCheckedCases,
} from './cases/props'

describe(
  'Vue/YCardCheckbox/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCardCheckbox,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledCases,
          ...propSizeCases,
          ...propCheckedCases,
        ]) {
          it(
            `Prop: "${testCase.prop}" should set ${testCase.prop} on the core component`,
            () => {
              const wrapper = mount(
                YCardCheckbox,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreCardCheckbox

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
