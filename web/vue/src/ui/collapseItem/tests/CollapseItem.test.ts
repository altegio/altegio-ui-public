import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreCollapseItemTagName } from '~shared/constants'
import { YCollapseItem } from '~vue/ui/collapseItem'
import { YCoreCollapseItem } from '~core/ui/collapseItem'
import type {
  IYCoreCollapseItemCollapseItemClickPayload,
} from '~core/ui/collapseItem/models/types'

const tagName = YCoreCollapseItemTagName

import {
  slotBeforeTestCases,
  slotMainTestCases,
  slotLabelTestCases,
  slotAnnotationTestCases,
  slotAfterTestCases,
  slotContentTestCases,
} from './cases/slots'

import {
  propLabelCases,
  propAnnotationCases,
  propOpenedCases,
  propValueCases,
  propVariantCases,
} from './cases/props'

import {
  eventCollapseItemClickCases,
} from './cases/events'

describe(
  'Vue/YCollapseItem',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCollapseItem,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of [
              ...slotBeforeTestCases,
              ...slotMainTestCases,
              ...slotLabelTestCases,
              ...slotAnnotationTestCases,
              ...slotAfterTestCases,
              ...slotContentTestCases,
            ]) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YCollapseItem,
                    { slots: { [testCase.slot]: testCase.content } },
                  )

                  expect(wrapper.text()).toBe(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propLabelCases,
              ...propAnnotationCases,
              ...propOpenedCases,
              ...propValueCases,
              ...propVariantCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                () => {
                  const wrapper = mount(
                    YCollapseItem,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as YCoreCollapseItem

                  expect(coreElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            for (const testCase of [...eventCollapseItemClickCases]) {
              it(testCase.case, () => {
                const wrapper = mount(YCollapseItem)

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as IYCoreCollapseItemCollapseItemClickPayload

                expect(payload).toEqual(testCase.expected)
              })
            }
          },
        )
      },
    )
  },
)
