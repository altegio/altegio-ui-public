import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreEmptyStateTagName as tagName } from '~shared/constants'
import { AltCoreEmptyState } from '~core/ui/emptyState'
import { AltEmptyState } from '~vue/ui/emptyState'
import {
  defaultTestProps,
  propDescriptionTestCases,
  propIconTestCases,
  propSizeTestCases,
  propTitleTestCases,
} from './cases/props'
import { slotActionsTestCases } from './cases/slots'

describe(
  'Vue/AltEmptyState',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreEmptyState,
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
                AltEmptyState,
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
                    AltEmptyState,
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
                    AltEmptyState,
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
                AltEmptyState,
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
