import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreCardRadioTagName as tagName } from '~shared/constants'
import { YCoreCardRadio } from '~core/index'
import { YCardRadio } from '~vue/ui/cardRadio'

import {
  propDisabledCases,
  propSizeCases,
  propCheckedCases,
} from './cases/props'

describe(
  'Vue/YCardRadio/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCardRadio,
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
            `Prop: "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
            () => {
              const wrapper = mount(
                YCardRadio,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreCardRadio

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
