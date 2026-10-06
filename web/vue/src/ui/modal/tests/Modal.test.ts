import { slotDefaultTestCases } from '~vue/ui/modal/tests/cases/slots'
import { beforeAll, describe, expect, it } from 'vitest'
import {
  propsFullScreenTestCases,
  propsHideOverlayTestCases,
  propsOpenTestCases,
  propsPreventEscapeTestCases,
  propsSizeTestCases,
  propsVariantTestCases,
  propsWidthTestCases,
} from '~vue/ui/modal/tests/cases/props'
import {
  eventActivatorCLickCases,
  eventCloseCases, eventCloseIconCLickCases,
  eventOpenCases,
  eventOverlayClickCases, eventPressEscapeCases,
} from '~vue/ui/modal/tests/cases/events'
import { mount } from '@vue/test-utils'
import { YCoreModal } from '~core/index'
import { YModal } from '~vue/ui/modal'
import { YCoreModalTagName as tagName } from '~shared/constants'
import { createVueModalProps, type IYVueModalProps } from '~vue/ui/modal/models/types'

const defaultProps = createVueModalProps() as IYVueModalProps


const baseSlotsCheck = () => {
  for (const testCase of slotDefaultTestCases) {
    it(
      `Slot: "${testCase.slot}" должен быть ${testCase.case}`,
      () => {
        const wrapper = mount(
          YModal,
          {
            slots: {
              activator: () => undefined,
              close: () => undefined,
              content: () => undefined,
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
    ...propsVariantTestCases,
    ...propsSizeTestCases,
    ...propsWidthTestCases,
    ...propsPreventEscapeTestCases,
    ...propsHideOverlayTestCases,
    ...propsFullScreenTestCases,
  ]) {
    it(
      `Prop: "${testCase.prop}" ${testCase.value} ${testCase.value === undefined ? 'не' : ''} должен изменить свойство ${testCase.prop} у core компонента`,
      () => {
        const wrapper = mount(
          YModal,
          {
            props: {
              ...defaultProps,
              [testCase.prop]: testCase.value,
            },
          },
        )

        const coreElement = wrapper.find(tagName).element as YCoreModal

        expect(coreElement[testCase.prop]).toBe(testCase.expected)
      },
    )
  }
}

const baseEventsCheck = () => {
  for (const testCase of [
    ...eventOpenCases,
    ...eventCloseCases,
    ...eventOverlayClickCases,
    ...eventActivatorCLickCases,
    ...eventCloseIconCLickCases,
    ...eventPressEscapeCases,
  ]) {
    it(
      `Event: "${testCase.event}" ${testCase.case}`,
      () => {
        const wrapper = mount(YModal)

        const coreElement = wrapper.find(tagName)

        coreElement.trigger(testCase.event)

        expect(wrapper.emitted()).toHaveProperty(testCase.event)
      },
    )
  }
}

describe(
  'Vue/YCoreOrganismModal/Unit',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreModal,
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

        for (const testCase of propsOpenTestCases) {
          it(
            `Prop: "${testCase.prop}" ${testCase.value} ${testCase.value === undefined ? 'не' : ''} должен изменить свойство open у core компонента`,
            () => {
              const wrapper = mount(
                YModal,
                {
                  props: {
                    ...defaultProps,
                    [testCase.prop]: testCase.value,
                  },
                },
              )

              const coreElement = wrapper.find(tagName).element as YCoreModal

              expect(coreElement.open).toBe(testCase.expected)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        baseEventsCheck()

        it(
          'Должен вызывать событие "update:modelValue" со значением "true" при открытии модального окна',
          async() => {
            const wrapper = mount(
              YModal,
              {
                props: {
                  ...defaultProps,
                  modelValue: false,
                },
              },
            )

            const coreToggle = wrapper.find(tagName)

            coreToggle.element.dispatchEvent(new CustomEvent('open'))

            await wrapper.vm.$nextTick()

            expect(wrapper.emitted('update:modelValue')).toEqual([[true]])
          },
        )

        it(
          'Должен вызывать событие "update:modelValue" со значением "false" при закрытии модального окна',
          async() => {
            const wrapper = mount(
              YModal,
              {
                props: {
                  ...defaultProps,
                  modelValue: true,
                },
              },
            )

            const coreToggle = wrapper.find(tagName)

            coreToggle.element.dispatchEvent(new CustomEvent('close'))

            await wrapper.vm.$nextTick()

            expect(wrapper.emitted('update:modelValue')).toEqual([[false]])
          },
        )
      },
    )
  },
)
