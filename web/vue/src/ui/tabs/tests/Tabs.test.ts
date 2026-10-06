import { beforeAll, describe, expect, it } from 'vitest'

import { mount } from '@vue/test-utils'
import { YCoreTabs } from '~web/core/src'
import { YTabs } from '~vue/ui/tabs'
import { YCoreTabsTagName as tagName } from '~shared/constants'
import {
  propsTabsTestCases,
} from '~vue/ui/tabs/tests/cases/props.ts'
import { eventUpdateModelValue } from '~vue/ui/tabs/tests/cases/events.ts'
import { slotDefaultTestCases } from '~vue/ui/tabs/tests/cases/slots.ts'

const baseSlotsCheck = () => {
  for (const testCase of slotDefaultTestCases) {
    it(
      `Slot: "${testCase.slot}" должен быть ${testCase.case}`,
      () => {
        const wrapper = mount(
          YTabs,
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
      `Prop: "${testCase.prop}" ${typeof testCase.value === 'object' ? JSON.stringify(testCase.value) : testCase.value} ${testCase.value === undefined ? 'не' : ''} должен изменить свойство ${testCase.prop} у core компонента`,
      () => {
        const wrapper = mount(
          YTabs,
          { props: { [testCase.prop]: testCase.value } },
        )

        const coreElement = wrapper.find(tagName).element as YCoreTabs

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
        const wrapper = mount(YTabs)

        const coreElement = wrapper.find(tagName)

        coreElement.trigger(testCase.nodeEventName, { detail: testCase.payload })

        expect(wrapper.emitted()).toHaveProperty(testCase.event)
      },
    )
  }
}

describe(
  'Vue/YTabs/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreTabs,
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
