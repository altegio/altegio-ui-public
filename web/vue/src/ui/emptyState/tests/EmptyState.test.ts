import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreEmptyStateTagName as tagName } from '~shared/constants'
import { YCoreEmptyState } from '~core/ui/emptyState'
import { YEmptyState } from '~vue/ui/emptyState'
import {
  defaultTestProps,
  propDescriptionTestCases,
  propIconTestCases,
  propSizeTestCases,
  propTitleTestCases,
} from './cases/props'
import { slotActionsTestCases } from './cases/slots'

describe(
  'Vue/YEmptyState',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreEmptyState,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [...propSizeTestCases]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const wrapper = mount(
                YEmptyState,
                { props: { ...defaultTestProps, [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of [
            ...propTitleTestCases,
            ...propDescriptionTestCases,
        ]) {
          it(
              `Prop "${testCase.prop}" ${testCase.case} should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
              () => {
                const wrapper = mount(
                    YEmptyState,
                    { props: { ...defaultTestProps, [testCase.prop]: testCase.value } },
                )

                const coreElement = wrapper.find(tagName)

                expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
              },
          )
        }

        for (const testCase of [...propIconTestCases]) {
          it(
              `Prop "${testCase.prop}" ${testCase.case} should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
              () => {
                const wrapper = mount(
                    YEmptyState,
                    { props: { ...defaultTestProps, [testCase.prop]: testCase.value } },
                )

                const coreElement = wrapper.find(tagName)

                expect(coreElement.element[testCase.prop]?.name).toBe(testCase.expected)
              },
          )
        }
      },
    )

    describe(
      'Slots',
      () => {
        for (const testCase of [...slotActionsTestCases]) {
          it(
              `Slot "${testCase.slot}" should ${testCase.content ? '' : 'not'} render when ${testCase.case} and show the content`,
            () => {
              const wrapper = mount(
                YEmptyState,
                  { slots: testCase.content ? { [testCase.slot]: testCase.content } : {} },
              )

              const slotContent = wrapper.find(`${tagName} [slot="${testCase.slot}"]`)


              const isSlotExist = slotContent.exists()

              expect(isSlotExist).toBe(testCase.expected)

              if (isSlotExist) {
                expect(slotContent.text()).toBe(testCase.content)
              }
            },
          )
        }
      },
    )
  },
)
