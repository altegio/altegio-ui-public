import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreFieldIconTagName as tagName } from '~shared/constants'
import { AltFieldIcon } from '~vue/ui/fieldIcon'
import { AltCoreFieldIcon } from '~core/ui/fieldIcon'
import {
  propDisabledCases,
  propHoverableCases,
  propClickableCases,
  propSizeCases,
  propIconCases,
} from '~core/ui/fieldIcon/tests/cases/props'

describe(
  'Vue/AltFieldIcon/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(tagName, AltCoreFieldIcon)
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
            `Prop "${testCase.prop}" should work ${testCase.case}`,
            () => {
              const wrapper = mount(AltFieldIcon, { props: { [testCase.prop]: testCase.value } })
              const coreElement = wrapper.find(tagName).element as AltCoreFieldIcon

              expect(coreElement[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of [...propIconCases]) {
          it(
              `Prop "${testCase.prop}" should work ${testCase.case}`,
              () => {
                const wrapper = mount(AltFieldIcon, { props: { [testCase.prop]: testCase.value } })
                const coreElement = wrapper.find(tagName).element as AltCoreFieldIcon

                expect(coreElement[testCase.prop]).toStrictEqual(testCase.value)
              },
          )
        }
      },
    )
  },
)
