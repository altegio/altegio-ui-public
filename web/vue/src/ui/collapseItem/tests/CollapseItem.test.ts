import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreCollapseItemTagName } from '~shared/constants'
import { AltCollapseItem } from '~vue/ui/collapseItem'
import { AltCoreCollapseItem } from '~core/ui/collapseItem'
import type {
  IAltCoreCollapseItemCollapseItemClickPayload,
} from '~core/ui/collapseItem/models/types'

const tagName = AltCoreCollapseItemTagName

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
  'Vue/AltCollapseItem',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreCollapseItem,
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
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    AltCollapseItem,
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
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                () => {
                  const wrapper = mount(
                    AltCollapseItem,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as AltCoreCollapseItem

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
                const wrapper = mount(AltCollapseItem)

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as IAltCoreCollapseItemCollapseItemClickPayload

                expect(payload).toEqual(testCase.expected)
              })
            }
          },
        )
      },
    )
  },
)
