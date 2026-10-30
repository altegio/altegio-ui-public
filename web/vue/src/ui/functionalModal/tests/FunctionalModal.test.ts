import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { AltCoreFunctionalModalTagName as tagName } from '~shared/constants'
import { AltCoreFunctionalModal } from '~core/ui/functionalModal'
import { AltFunctionalModal } from '~vue/ui/functionalModal'

import { slotsTestCases } from './cases/slots'
import {
  propsOpenTestCases,
  propsSizeTestCases,
  propsPreventEscapeTestCases,
  propsFullScreenTestCases,
  propsWidthTestCases,
  propsHideOverlayTestCases,
  propsHeadingTestCases,
  propsSubHeadingTestCases,
  propsHideFooterTestCases,
} from './cases/props'
import {
  eventOpenCases,
  eventCloseCases,
  eventOverlayClickCases,
  eventActivatorCLickCases,
  eventCloseIconCLickCases,
  eventPressEscapeCases,
  eventCancelCases,
  eventSubmitCases,
  eventUpdateModalValueCases,
} from './cases/events'

describe(
  'Vue/AltFunctionalModal',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreFunctionalModal,
        )
      }
    })

    describe(
      'Slots',
      () => {
        for (const testCase of slotsTestCases) {
          it(
            `Should render the ${testCase.slot} slot ${testCase.case}`,
            () => {
              const wrapper = mount(
                AltFunctionalModal,
                {
              slots: {
                  header: '',
                  content: '',
                  activator: '',
                  actions: '',
                  'before-actions': '',
                  footer: '',
                  'header-media': '',
                  [testCase.slot]: testCase.content,
                },
              },
              )

              expect(wrapper.html()).toContain(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propsOpenTestCases) {
          it(
            `Prop: "${testCase.prop}" ${testCase.value} should set open on the core component`,
            () => {
              const wrapper = mount(
                AltFunctionalModal,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as AltCoreFunctionalModal

              expect(coreElement.open).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of [
          // ...propsOpenTestCases,
          ...propsSizeTestCases,
          ...propsPreventEscapeTestCases,
          ...propsFullScreenTestCases,
          ...propsWidthTestCases,
          ...propsHideOverlayTestCases,
          ...propsHeadingTestCases,
          ...propsSubHeadingTestCases,
          ...propsHideFooterTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            () => {
              const modelValue = ref(false)

              const props = { [testCase.prop]: testCase.value, modelValue: modelValue.value }

              const wrapper = mount(
                AltFunctionalModal,
                { props },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        for (const testCase of [
          ...eventOpenCases,
          ...eventCloseCases,
          ...eventOverlayClickCases,
          ...eventCloseIconCLickCases,
          ...eventPressEscapeCases,
          ...eventCancelCases,
          ...eventSubmitCases,
          ...eventUpdateModalValueCases,
        ]) {
          it(
            `Should emit ${testCase.event} ${testCase.case} of the core component`,
            async() => {
              const wrapper = mount(AltFunctionalModal, { props: { modelValue: false } })

              const coreElement = wrapper.find(tagName)
              coreElement.trigger(testCase.nodeEventName)

              await wrapper.vm.$nextTick()
              expect(wrapper.emitted()).toHaveProperty(testCase.event)
            },
          )
        }

        for (const testCase of [...eventActivatorCLickCases]) {
          it(
            `Should emit ${testCase.event} ${testCase.case} of the core component`,
            async() => {
              const wrapper = mount(AltFunctionalModal, {
                props: { modelValue: false },
                slots: {
                  'header-media': '',
                  header: '',
                  content: '',
                  activator: '<button>Open</button>',
                  actions: '',
                  'before-actions': '',
                  footer: '',
                },
              })

              const activatorWrapper = wrapper.find('div')
              await activatorWrapper.trigger('click')

              await wrapper.vm.$nextTick()
              expect(wrapper.emitted()).toHaveProperty(testCase.event)
            },
          )
        }
      },
    )
  },
)
