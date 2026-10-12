import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import {
  YCoreTableTagName,
  YCoreTableBarTagName,
  YCoreTableCellTagName,
  YCoreTablePaginationTagName,
  YCoreTableRowTagName,
  YCoreTableHeadCellTagName,
  YCoreSkeletonTableTagName,
  YCoreSimpleCheckboxTagName,
} from '~shared/constants'
import type { YCoreSimpleCheckbox } from '~core/index'
import {
  YCoreTable,
  YCoreTableBar,
  YCoreTableCell,
  YCoreTablePagination,
  YCoreTableRow,
  YCoreTableHeadCell,
  YCoreSkeletonTable,
} from '~core/index'
import { defineCustomElement } from '~shared/utils/components'

import { YTable } from '~vue/ui/table'

import {
  slotCellColDynamicTestCases,
  slotCellOuterColDynamicTestCases,
  slotCellOuterDynamicTestCases,
  slotCellOuterTestCases,
  slotCellTestCases,
  slotHeadCellDynamicTestCases,
  slotHeadCellTestCases,
  slotHeadFirstTestCases,
  slotHeadHintDynamicTestCases,
  slotHeadLastTestCases,
  slotRowFirstDynamicTestCases,
  slotRowFirstTestCases,
  slotRowLastDynamicTestCases,
  slotRowLastTestCases,
  slotRowOuterTestCases,
  slotRowOuterDynamicTestCases,
  slotRowInnerTestCases,
  slotRowInnerDynamicTestCases,
} from './cases/slots'

import {
  testHeaders,
  testItems,
  propCounterTextTestCases,
  propDisabledTestCases,
  propHeadersTestCases,
  propHideHeaderTestCases,
  propItemLabelTestCases,
  propItemValueTestCases,
  propItemsPerPageTestCases,
  propItemsTestCases,
  propLoadingTestCases,
  propOptionsItemsPerPageTestCases,
  propPageTestCases,
  propPluginsTestCases,
  propSelectableTestCases,
  propSelectedTestCases,
  propShowPaginationTestCases,
  propStickyTestCases,
  propStripeTestCases,
  propTotalTestCases,
} from './cases/props'

import {
  eventSortTestCases,
  eventUpdateSelectedTestCases,
  eventUpdatePageTestCases,
  eventUpdateItemsPerPageTestCases,
  type TYSortPayload,
  type TYUpdateSelectedPayload,
  type TYUpdatePagePayload,
  type TYUpdateItemsPerPagePayload,
} from './cases/events'

describe(
  'Vue/YTable',
  () => {
    beforeAll(() => {
      defineCustomElement(YCoreTableTagName, YCoreTable)
      defineCustomElement(YCoreTableBarTagName, YCoreTableBar)
      defineCustomElement(YCoreTableCellTagName, YCoreTableCell)
      defineCustomElement(YCoreTablePaginationTagName, YCoreTablePagination)
      defineCustomElement(YCoreTableRowTagName, YCoreTableRow)
      defineCustomElement(YCoreTableHeadCellTagName, YCoreTableHeadCell)
      defineCustomElement(YCoreSkeletonTableTagName, YCoreSkeletonTable)
    })

    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of [
              ...slotCellColDynamicTestCases,
              ...slotCellOuterColDynamicTestCases,
              ...slotCellOuterDynamicTestCases,
              ...slotCellOuterTestCases,
              ...slotCellTestCases,
              ...slotHeadCellDynamicTestCases,
              ...slotHeadCellTestCases,
              ...slotHeadFirstTestCases,
              ...slotHeadHintDynamicTestCases,
              ...slotHeadLastTestCases,
              ...slotRowFirstDynamicTestCases,
              ...slotRowFirstTestCases,
              ...slotRowLastDynamicTestCases,
              ...slotRowLastTestCases,
              ...slotRowOuterTestCases,
              ...slotRowOuterDynamicTestCases,
              ...slotRowInnerTestCases,
              ...slotRowInnerDynamicTestCases,
            ]) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    YTable,
                    {
                      props: {
                        items: testItems,
                        headers: testHeaders,
                      },
                      slots: { [testCase.slot]: testCase.content },
                    },
                  )

                  wrapper.findAll(`slot[name="${testCase.slot}"]`).forEach((element) => {
                    expect(element.text()).toBe(testCase.content)
                  })
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of [...propDisabledTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить такое же свойство у core компонента ${YCoreTableTagName}`,
                () => {
                  const wrapper = mount(
                    YTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreTableElement = wrapper.find(YCoreTableTagName).element

                  expect(coreTableElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propLoadingTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить такое же свойство у core компонента ${YCoreTableTagName}`,
                () => {
                  const wrapper = mount(
                    YTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreTableElement = wrapper.find(YCoreTableTagName).element

                  expect(coreTableElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propPluginsTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить такое же свойство у core компонента ${YCoreTableTagName}`,
                () => {
                  const wrapper = mount(
                    YTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreTableElement = wrapper.find(YCoreTableTagName).element

                  expect(JSON.stringify(coreTableElement[testCase.prop])).toBe(JSON.stringify(testCase.expected))
                },
              )
            }

            for (const testCase of [...propHideHeaderTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство "hideHead" и "hideBar" у core компонента ${YCoreTableTagName}`,
                () => {
                  const wrapper = mount(
                    YTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreTableElement = wrapper.find(YCoreTableTagName).element

                  expect(coreTableElement.hideHead).toBe(testCase.expected)
                  expect(coreTableElement.hideBar).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propCounterTextTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(YCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.counterText).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propHeadersTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойства у core компонентов ${YCoreSkeletonTableTagName} и ${YCoreTableHeadCellTagName}`,
                () => {
                  const wrapper = mount(
                    YTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const cols = Object.values(testCase.value ?? {}).map((header) => ({
                    align: header.align,
                    width: header.width,
                  }))


                  const coreSkeletonTableElement = wrapper.find(YCoreSkeletonTableTagName).element
                  const coreTableHeadCellElements = wrapper.findAll(YCoreTableHeadCellTagName)

                  expect(JSON.stringify(coreSkeletonTableElement.columns)).toEqual(JSON.stringify(cols))
                  expect(coreTableHeadCellElements.length).toBe(cols.length)
                },
              )
            }

            for (const testCase of [...propItemLabelTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(YCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.itemLabel).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propItemValueTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(YCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.itemValue).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propItemsPerPageTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонентов ${YCoreSkeletonTableTagName} и ${YCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreSkeletonTableElement = wrapper.find(YCoreSkeletonTableTagName).element
                  const coreTablePaginationElement = wrapper.find(YCoreTablePaginationTagName).element

                  expect(coreSkeletonTableElement.rows).toBe(testCase.expected)
                  expect(coreTablePaginationElement.itemsPerPage).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propItemsTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить количество строк ${YCoreTableRowTagName} и ячеек ${YCoreTableCellTagName}. Кейс: "${testCase.case}"`,
                () => {
                  const props = {
                    [testCase.prop]: testCase.value,
                    ...testCase.additionalProps || {},
                  }
                  const wrapper = mount(YTable, { props })

                  const coreTableRowElements = wrapper.findAll(`${YCoreTableRowTagName}[slot="body"]`)
                  const coreTableCellElements = wrapper.findAll(YCoreTableCellTagName)

                  expect(coreTableRowElements.length).toBe(testCase.expected?.rows)
                  expect(coreTableCellElements.length).toBe(testCase.expected?.cells)
                },
              )
            }

            for (const testCase of [...propOptionsItemsPerPageTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(YCoreTablePaginationTagName).element

                  expect(JSON.stringify(coreTablePaginationElement.optionsItemsPerPage)).toBe(JSON.stringify(testCase.expected))
                },
              )
            }

            for (const testCase of [...propPageTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(YCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.page).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propShowPaginationTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(YTable, { props: { [testCase.prop]: testCase.value } })

                  const coreTablePaginationElement = wrapper.find(YCoreTablePaginationTagName)

                  expect(coreTablePaginationElement.exists()).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propTotalTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(YCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.total).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propStickyTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTableHeadCellTagName}, ${YCoreTableRowTagName} и ${YCoreTableCellTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      headers: testHeaders,
                      items: testItems,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTableHeadCellFirstElement = wrapper.findAll(YCoreTableHeadCellTagName)[0].element
                  const coreTableRowElements = wrapper.findAll<YCoreTableRow>(`${YCoreTableRowTagName}[slot="body"]`)
                  const coreTableCellElements = coreTableRowElements
                    .map((element) => element.findAll(YCoreTableCellTagName)[0])

                  expect(coreTableHeadCellFirstElement.sticky).toBe(testCase.expected)
                  coreTableRowElements.forEach(({ element }) => {
                    expect(element.sticky).toBe(testCase.expected)
                  })
                  coreTableCellElements.forEach(({ element }) => {
                    expect(element.sticky).toBe(testCase.expected)
                  })
                },
              )
            }

            for (const testCase of [...propStripeTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreSkeletonTableTagName} и ${YCoreTableRowTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      headers: testHeaders,
                      items: testItems,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreSkeletonTableElement = wrapper.find(YCoreSkeletonTableTagName).element
                  const coreTableRowElements = wrapper.findAll<YCoreTableRow>(`${YCoreTableRowTagName}[slot="body"]`)

                  expect(coreSkeletonTableElement.stripe).toBe(testCase.expected)
                  coreTableRowElements.forEach(({ element }) => {
                    expect(element.stripe).toBe(testCase.expected)
                  })
                },
              )
            }

            for (const testCase of [...propSelectableTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTableRowTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      headers: testHeaders,
                      items: testItems,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTableRowElements = wrapper.findAll(YCoreTableRowTagName)

                  coreTableRowElements.forEach(({ element }) => {
                    expect(element.selectable).toBe(testCase.expected)
                  })
                },
              )
            }

            for (const testCase of [...propSelectedTestCases]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство у core компонента ${YCoreTableRowTagName}`,
                () => {
                  const wrapper = mount(YTable, {
                    props: {
                      headers: testHeaders,
                      items: testItems,
                      selectable: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTableRowElements = wrapper.findAll<YCoreTableRow>(`${YCoreTableRowTagName}[slot="body"]`)

                  const coreHeadCheckboxElement = wrapper.find<YCoreSimpleCheckbox>(`${YCoreTableRowTagName}[slot="head"] ${YCoreSimpleCheckboxTagName}[slot="cell"]`).element

                  expect(coreHeadCheckboxElement.checked).toBe(testCase.expected?.head.checked)
                  expect(coreHeadCheckboxElement.indeterminate).toBe(testCase.expected?.head.indeterminate)

                  coreTableRowElements.forEach((_, index) => {
                    const coreBodyCheckboxElement = wrapper.findAll<YCoreSimpleCheckbox>(`${YCoreTableRowTagName}[slot="body"] ${YCoreSimpleCheckboxTagName}[slot="cell"]`)[index].element

                    expect(coreBodyCheckboxElement.checked).toBe(testCase.expected?.rows[index])
                  })
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            for (const testCase of [...eventSortTestCases]) {
              it(testCase.case, () => {
                const wrapper = mount(YTable, {
                  props: {
                    headers: testHeaders,
                    items: testItems,
                  },
                })

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as TYSortPayload

                const headId = payload.headId
                const direction = payload.event.direction

                expect(headId).toEqual(testCase.expected?.headId)
                expect(direction).toEqual(testCase.expected?.direction)
              })
            }

            for (const testCase of [...eventUpdateSelectedTestCases]) {
              it(testCase.case, () => {
                const wrapper = mount(YTable, {
                  props: {
                    selectable: true,
                    headers: testHeaders,
                    items: testItems,
                  },
                })

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as TYUpdateSelectedPayload

                expect(payload).toEqual(testCase.expected)
              })
            }

            for (const testCase of [...eventUpdatePageTestCases]) {
              it(testCase.case, () => {
                const wrapper = mount(YTable, {
                  props: {
                    showPagination: true,
                    headers: testHeaders,
                    items: testItems,
                  },
                })

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as TYUpdatePagePayload

                expect(payload).toEqual(testCase.expected)
              })
            }

            for (const testCase of [...eventUpdateItemsPerPageTestCases]) {
              it(testCase.case, () => {
                const wrapper = mount(YTable, {
                  props: {
                    headers: testHeaders,
                    items: testItems,
                    showPagination: true,
                  },
                })

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as TYUpdateItemsPerPagePayload

                expect(payload).toEqual(testCase.expected)
              })
            }
          },
        )
      },
    )
  },
)
