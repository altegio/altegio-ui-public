import { beforeAll, describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import { AltCoreTabs } from '~web/core/src'
import { AltTabs } from '~vue/ui/tabs'
import { AltCoreTabsTagName as tagName } from '~shared/constants'
import {
  propsTabsTestCases,
} from '~vue/ui/tabs/tests/cases/props.ts'
import { eventUpdateModelValue } from '~vue/ui/tabs/tests/cases/events.ts'
import { slotDefaultTestCases } from '~vue/ui/tabs/tests/cases/slots.ts'

const baseSlotsCheck = () => {
  for (const testCase of slotDefaultTestCases) {
    it(
      `Slot: "${testCase.slot}" should render ${testCase.case}`,
      () => {
        const wrapper = mount(
          AltTabs,
          {
            slots: {
              default: () => undefined,
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
  for (const testCase of [...propsTabsTestCases]) {
    it(
      `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} should ${testCase.value === undefined ? 'not' : ''} set ${testCase.prop} on the core component`,
      () => {
        const wrapper = mount(
          AltTabs,
          { props: { [testCase.prop]: testCase.value } },
        )

        const coreElement = wrapper.find(tagName).element as AltCoreTabs

        expect(coreElement[testCase.prop]).toEqual(testCase.expected)
      },
    )
  }
}

const baseEventsCheck = () => {
  for (const testCase of [...eventUpdateModelValue]) {
    it(
      `Event: "${testCase.event}" ${testCase.case}`,
      () => {
        const wrapper = mount(AltTabs)

        const coreElement = wrapper.find(tagName)

        coreElement.trigger(testCase.nodeEventName, { detail: testCase.payload })

        expect(wrapper.emitted()).toHaveProperty(testCase.event)
      },
    )
  }
}

describe(
  'Vue/AltTabs/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreTabs,
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

    describe('Events', () => {
      baseEventsCheck()
    })
  },
)
