import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreCardCheckboxTagName as tagName } from '~shared/constants'
import { AltCoreCardCheckbox } from '~core/index'
import { AltCardCheckbox } from '~vue/ui/cardCheckbox'

import {
  propDisabledCases,
  propSizeCases,
  propCheckedCases,
} from './cases/props'

describe(
  'Vue/AltCardCheckbox/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreCardCheckbox,
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
                AltCardCheckbox,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as AltCoreCardCheckbox

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
