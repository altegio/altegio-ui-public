import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreCardRadioTagName as tagName } from '~shared/constants'
import { AltCoreCardRadio } from '~core/index'
import { AltCardRadio } from '~vue/ui/cardRadio'

import {
  propDisabledCases,
  propSizeCases,
  propCheckedCases,
} from './cases/props'

describe(
  'Vue/AltCardRadio/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreCardRadio,
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
                AltCardRadio,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as AltCoreCardRadio

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
