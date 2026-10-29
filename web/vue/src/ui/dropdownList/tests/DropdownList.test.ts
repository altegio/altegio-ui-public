import { describe, expect, it, beforeAll, beforeEach, afterEach } from 'vitest'
import { mount } from '@vue/test-utils'

import { YCoreDropdownListTagName, YCoreDropdownCellTagName } from '~shared/constants'

import { YDropdownList } from '~vue/ui/dropdownList'
import { YCoreDropdownList, YCoreDropdownCell } from '~core/index'
import {
  slotTopTestCases,
  slotListTestCases,
  slotBottomTestCases,
  slotItemOuterTestCases,
  slotItemInnerTestCases,
  slotItem2OuterTestCases,
  slotItem2InnerTestCases,
} from './cases/slots'
import {
  propItemsTestCases,
  propItemLabelTestCases,
  propMinWidthTestCases,
} from './cases/props'
import { getWCShadowRoot, trimTextContent } from '~shared/tests/utils'

const tagName = YCoreDropdownListTagName

describe(
  'Vue/YDropdownList',
  () => {
    beforeAll(() => {
      // register the core component before the tests run
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreDropdownList,
        )
      }
      if (!customElements.get(YCoreDropdownCellTagName)) {
        customElements.define(
          YCoreDropdownCellTagName,
          YCoreDropdownCell,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotTopTestCases) {
              it(
                `Should render the top slot ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    { slots: { top: testCase.content } },
                  )

                  expect(wrapper.html()).toContain(testCase.content)
                },
              )
            }

            for (const testCase of slotListTestCases) {
              it(
                `Should render the list slot ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    { slots: { list: testCase.content } },
                  )

                  expect(wrapper.html()).toContain(testCase.content)
                },
              )
            }

            for (const testCase of slotBottomTestCases) {
              it(
                `Should render the bottom slot ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    { slots: { bottom: testCase.content } },
                  )

                  expect(wrapper.html()).toContain(testCase.content)
                },
              )
            }

            for (const testCase of slotItemOuterTestCases) {
              it(
                `Should render the item-outer slot ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    {
                      props: { items: propItemsTestCases[0].value },
                      slots: { 'item-outer': testCase.content },
                    },
                  )

                  expect(wrapper.html()).toContain(testCase.content)
                },
              )
            }

            for (const testCase of slotItemInnerTestCases) {
              it(
                `Should render the item-inner slot ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    {
                      props: { items: propItemsTestCases[0].value },
                      slots: { 'item-inner': testCase.content },
                    },
                  )

                  expect(wrapper.html()).toContain(testCase.content)
                },
              )
            }

            for (const testCase of slotItem2OuterTestCases) {
              it(
                `Should render the item-outer-2 slot ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    {
                      props: { items: propItemsTestCases[0].value },
                      slots: { 'item-outer-2': testCase.content },
                    },
                  )

                  expect(wrapper.html()).toContain(testCase.content)
                },
              )
            }

            for (const testCase of slotItem2InnerTestCases) {
              it(
                `Should render the item-inner-2 slot ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    {
                      props: { items: propItemsTestCases[0].value },
                      slots: { 'item-inner-2': testCase.content },
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
            // container that hosts the rendered shadow root
            let container: HTMLElement

            beforeEach(() => {
              container = document.createElement('div')
              document.body.appendChild(container)
            })

            afterEach(() => {
              document.body.removeChild(container)
            })

            for (const testCase of propItemsTestCases) {
              it(
                `Changing prop items should update CoreDropdownList ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    {
                      props: { items: testCase.value },
                      attachTo: container,
                    },
                  )

                  const coreElement = wrapper.find(tagName)

                  expect(coreElement.element.items).toEqual(testCase.expected)
                },
              )
            }

            for (const testCase of propItemLabelTestCases) {
              it(
                `Changing prop itemLabel should update CoreDropdownList ${testCase.case}`,
                async() => {
                  const wrapper = mount(
                    YDropdownList,
                    {
                      props: {
                        items: propItemsTestCases[0].value,
                        itemLabel: testCase.value,
                      },
                      attachTo: container,
                    },
                  )

                  const coreElement = wrapper.find(tagName)

                  await wrapper.vm.$nextTick()

                  const textContent = trimTextContent(getWCShadowRoot(coreElement.element).textContent)

                  expect(Boolean(textContent)).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propMinWidthTestCases) {
              it(
                `Changing prop minWidth should update CoreDropdownList ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YDropdownList,
                    {
                      props: { minWidth: testCase.value },
                      attachTo: container,
                    },
                  )

                  const coreElement = wrapper.find(tagName)

                  expect(coreElement.element.minWidth).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
