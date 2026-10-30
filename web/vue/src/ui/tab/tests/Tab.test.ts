import { slotDefaultTestCases } from '~vue/ui/tab/tests/cases/slots.ts'
import { beforeAll, describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import { AltCoreTab } from '~web/core/src'
import { AltTab } from '~vue/ui/tab'
import { AltCoreTabTagName as tagName } from '~shared/constants'
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
      `Slot: "${testCase.slot}" should render ${testCase.case}`,
      () => {
        const wrapper = mount(
          AltTab,
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
      `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} should ${testCase.value === undefined ? 'not' : ''} set ${testCase.prop} on the core component`,
      () => {
        const wrapper = mount(
          AltTab,
          { props: { [testCase.prop]: testCase.value } },
        )

        const coreElement = wrapper.find(tagName).element as AltCoreTab

        expect(coreElement[testCase.prop]).toEqual(testCase.expected)
      },
    )
  }
}

describe(
  'Vue/AltTab/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreTab,
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
