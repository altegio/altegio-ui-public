import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreFieldIconTagName as tagName } from '~shared/constants'
import { YFieldIcon } from '~vue/ui/fieldIcon'
import { YCoreFieldIcon } from '~core/ui/fieldIcon'
import {
  propDisabledCases,
  propHoverableCases,
  propClickableCases,
  propSizeCases,
  propIconCases,
} from '~core/ui/fieldIcon/tests/cases/props'

describe(
  'Vue/YFieldIcon/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(tagName, YCoreFieldIcon)
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledCases,
          ...propHoverableCases,
          ...propClickableCases,
          ...propSizeCases,
        ]) {
          it(
            `Prop "${testCase.prop}" должен быть ${testCase.case}`,
            () => {
              const wrapper = mount(YFieldIcon, { props: { [testCase.prop]: testCase.value } })
              const coreElement = wrapper.find(tagName).element as YCoreFieldIcon

              expect(coreElement[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of [...propIconCases]) {
          it(
              `Prop "${testCase.prop}" должен быть ${testCase.case}`,
              () => {
                const wrapper = mount(YFieldIcon, { props: { [testCase.prop]: testCase.value } })
                const coreElement = wrapper.find(tagName).element as YCoreFieldIcon

                expect(coreElement[testCase.prop]).toStrictEqual(testCase.value)
              },
          )
        }
      },
    )
  },
)
