import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreButtonDropdownTagName } from '~shared/constants'

import { YCoreButtonDropdown } from '~core/ui/buttonDropdown'

import { YButtonDropdown } from '~vue/ui/buttonDropdown'

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

const tagName = YCoreButtonDropdownTagName

describe(
  'Vue/ButtonDropdown',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreButtonDropdown,
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
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента. Case: ${testCase.case}`,
            () => {
              const wrapper = mount(
                YButtonDropdown,
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
          'Должен испускать события "item-click"',
          () => {
            const wrapper = mount(YButtonDropdown)

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
            `Slot "${testCase.slot}" должен быть ${testCase.case}`,
            () => {
              const wrapper = mount(
                YButtonDropdown,
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
