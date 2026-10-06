import { slotDefaultTestCases } from '~vue/ui/tab/tests/cases/slots.ts'
import { beforeAll, describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import { YCoreTab } from '~web/core/src'
import { YTab } from '~vue/ui/tab'
import { YCoreTabTagName as tagName } from '~shared/constants'
import {
  propsActiveTestCases,
  propsCounterValueTestCases,
  propsDisabledTestCases,
  propsIsCounterVisibleTestCases,
  propsIsTagVisibleTestCases,
  propsLeftIconSizeTestCases,
  propsTagTextTestCases,
  propsTagVariantTestCases,
  propsTextTestCases,
  propsLeftIconTestCases,
  propsLocatorTestCases,
  propsLocatorTagTestCases,
  propsLocatorCounterTestCases,
} from '~vue/ui/tab/tests/cases/props.ts'

const baseSlotsCheck = () => {
  for (const testCase of slotDefaultTestCases) {
    it(
      `Slot: "${testCase.slot}" должен быть ${testCase.case}`,
      () => {
        const wrapper = mount(
          YTab,
          {
            slots: {
              before: () => undefined,
              default: () => undefined,
              after: () => undefined,
              [testCase.slot]: testCase.content,
            },
          },
        )

        expect(wrapper.text()).toBe(testCase.content)
      },
    )
  }
}

const basePropsCheck = () => {
  for (const testCase of [
    ...propsDisabledTestCases,
    ...propsActiveTestCases,
    ...propsIsTagVisibleTestCases,
    ...propsTagTextTestCases,
    ...propsIsCounterVisibleTestCases,
    ...propsTextTestCases,
    ...propsCounterValueTestCases,
    ...propsTagVariantTestCases,
    ...propsLeftIconSizeTestCases,
    ...propsLeftIconTestCases,
    ...propsLocatorTestCases,
    ...propsLocatorTagTestCases,
    ...propsLocatorCounterTestCases,
  ]) {
    it(
      `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} ${testCase.value === undefined ? 'не' : ''} должен изменить свойство ${testCase.prop} у core компонента`,
      () => {
        const wrapper = mount(
          YTab,
          { props: { [testCase.prop]: testCase.value } },
        )

        const coreElement = wrapper.find(tagName).element as YCoreTab

        expect(coreElement[testCase.prop]).toEqual(testCase.expected)
      },
    )
  }
}

describe(
  'Vue/YTab/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreTab,
        )
      }
    })

    describe(
      'Slots',
      () => {
        baseSlotsCheck()
      },
    )

    describe(
      'Props',
      () => {
        basePropsCheck()
      },
    )
  },
)
