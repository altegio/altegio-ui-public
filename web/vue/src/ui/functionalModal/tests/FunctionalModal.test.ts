import { beforeAll, describe, expect, it } from 'vitest'
import { ref } from 'vue'
import { mount } from '@vue/test-utils'
import { YCoreFunctionalModalTagName as tagName } from '~shared/constants'
import { YCoreFunctionalModal } from '~core/ui/functionalModal'
import { YFunctionalModal } from '~vue/ui/functionalModal'

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
  'Vue/YFunctionalModal',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreFunctionalModal,
        )
      }
    })

    describe(
      'Slots',
      () => {
        for (const testCase of slotsTestCases) {
          it(
            `Должен отрендерить ${testCase.slot} слот ${testCase.case}`,
            () => {
              const wrapper = mount(
                YFunctionalModal,
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
            `Prop: "${testCase.prop}" ${testCase.value} должен изменить свойство open у core компонента`,
            () => {
              const wrapper = mount(
                YFunctionalModal,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element as YCoreFunctionalModal

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
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            () => {
              const modelValue = ref(false)

              const props = { [testCase.prop]: testCase.value, modelValue: modelValue.value }

              const wrapper = mount(
                YFunctionalModal,
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
            `Должен вызывать событие ${testCase.event} при ${testCase.case} core компонента`,
            async() => {
              const wrapper = mount(YFunctionalModal, { props: { modelValue: false } })

              const coreElement = wrapper.find(tagName)
              coreElement.trigger(testCase.nodeEventName)

              await wrapper.vm.$nextTick()
              expect(wrapper.emitted()).toHaveProperty(testCase.event)
            },
          )
        }

        for (const testCase of [...eventActivatorCLickCases]) {
          it(
            `Должен вызывать событие ${testCase.event} при ${testCase.case} core компонента`,
            async() => {
              const wrapper = mount(YFunctionalModal, {
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
