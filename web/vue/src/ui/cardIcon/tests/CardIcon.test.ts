import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreCardIconTagName as tagName } from '~shared/constants'
import { AltCoreCardIcon } from '~core/index'
import { AltCardIcon } from '~vue/ui/cardIcon'

import {
  propDisabledCases,
  propSizeCases,
  propVariantCases,
  propHeaderIconCases,
  defaultTestProps,
} from './cases/props'

describe(
  'Vue/AltCardIcon/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreCardIcon,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledCases,
          ...propSizeCases,
          ...propVariantCases,
        ]) {
          it(
            `Prop: "${testCase.prop}" should set ${testCase.prop} on the core component`,
            () => {
              const wrapper = mount(
                AltCardIcon,
                { props: { ...defaultTestProps, [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as AltCoreCardIcon

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propHeaderIconCases) {
          it(
            `Prop: ${testCase.prop} should work ${testCase.case} for the core component`,
            () => {
              const wrapper = mount(
                AltCardIcon,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as AltCoreCardIcon

              expect(coreElement.icon.name).toBe(testCase.value.name)
            },
          )
        }
      },
    )
  },
)
