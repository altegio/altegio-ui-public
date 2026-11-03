import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { AltCoreButtonDropdownTagName } from '~shared/constants'

import { AltCoreButtonDropdown } from '~core/ui/buttonDropdown'

import { AltButtonDropdown } from '~vue/ui/buttonDropdown'

import {
  propItemsTestCases,
  propVariantTestCases,
  propDisabledTestCases,
  propSizeCases,
  propLoadingTestCases,
  propLabelTestCases,
  propFullWidthTestCases,
  propAutoCloseTestCases,
} from './cases/props'
import {
  slotActivatorTestCases,
  slotContentTestCases,
} from './cases/slots'

const tagName = AltCoreButtonDropdownTagName

describe(
  'Vue/ButtonDropdown',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreButtonDropdown,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propItemsTestCases,
          ...propVariantTestCases,
          ...propDisabledTestCases,
          ...propSizeCases,
          ...propLoadingTestCases,
          ...propLabelTestCases,
          ...propFullWidthTestCases,
          ...propAutoCloseTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component. Case: ${testCase.case}`,
            () => {
              const wrapper = mount(
                AltButtonDropdown,
                { props: { [testCase.prop]: testCase.value } },
              )

              const coreElement = wrapper.find(tagName).element

              expect(coreElement[testCase.prop]).toEqual(testCase.expected)
            },
          )
        }
      },
    )
    describe(
      'Events',
      () => {
        it(
          'Should emit "item-click" events',
          () => {
            const wrapper = mount(AltButtonDropdown)

            wrapper.vm.$emit('item-click', { detail: { event: new Event('item-click') } })
            expect(wrapper.emitted('item-click')).toBeTruthy()
          },
        )
      },
    )
    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotActivatorTestCases,
          ...slotContentTestCases,
        ]) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            () => {
              const wrapper = mount(
                AltButtonDropdown,
                { slots: { [testCase.slot]: testCase.content } },
              )

              expect(wrapper.html()).toContain(testCase.content)
            },
          )
        }
      },
    )
  },
)
