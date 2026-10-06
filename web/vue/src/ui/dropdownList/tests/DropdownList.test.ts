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
import { getWCShadowRoot } from '~shared/tests/utils'

const tagName = YCoreDropdownListTagName

describe(
  'Vue/YDropdownList',
  () => {
    beforeAll(() => {
      // настройка перед запуском тестов
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
                `Должен отрендерить top слот ${testCase.case}`,
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
                `Должен отрендерить list слот ${testCase.case}`,
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
                `Должен отрендерить bottom слот ${testCase.case}`,
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
                `Должен отрендерить item-outer слот ${testCase.case}`,
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
                `Должен отрендерить item-inner слот ${testCase.case}`,
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
                `Должен отрендерить item-outer-2 слот ${testCase.case}`,
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
                `Должен отрендерить item-inner-2 слот ${testCase.case}`,
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
            // контейнер для рендера ShadowRoot
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
                `Изменения prop items должно изменять CoreDropdownList ${testCase.case}`,
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
                `Изменения prop itemLabel должно изменять CoreDropdownList ${testCase.case}`,
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

                  const textContent = (getWCShadowRoot(coreElement.element).textContent ?? '').trim()

                  expect(Boolean(textContent)).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of propMinWidthTestCases) {
              it(
                `Изменения prop minWidth должно изменять CoreDropdownList ${testCase.case}`,
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
