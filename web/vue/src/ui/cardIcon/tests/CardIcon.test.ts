import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreCardIconTagName as tagName } from '~shared/constants'
import { YCoreCardIcon } from '~core/index'
import { YCardIcon } from '~vue/ui/cardIcon'

import {
  propDisabledCases,
  propSizeCases,
  propVariantCases,
  propHeaderIconCases,
  defaultTestProps,
} from './cases/props'

describe(
  'Vue/YCardIcon/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCardIcon,
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
            `Prop: "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
            () => {
              const wrapper = mount(
                YCardIcon,
                { props: { ...defaultTestProps, [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreCardIcon

              expect(coreElement[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propHeaderIconCases) {
          it(
            `Prop: ${testCase.prop} должен быть ${testCase.case} для core компонента`,
            () => {
              const wrapper = mount(
                YCardIcon,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreCardIcon

              expect(coreElement.icon.name).toBe(testCase.value.name)
            },
          )
        }
      },
    )
  },
)
