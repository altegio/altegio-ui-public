import { describe, expect, it, beforeAll } from 'vitest'
import { mount } from '@vue/test-utils'

import {
  AltCoreTableTagName,
  AltCoreTableBarTagName,
  AltCoreTableCellTagName,
  AltCoreTablePaginationTagName,
  AltCoreTableRowTagName,
  AltCoreTableHeadCellTagName,
  AltCoreSkeletonTableTagName,
  AltCoreSimpleCheckboxTagName,
} from '~shared/constants'
import type { AltCoreSimpleCheckbox } from '~core/index'
import {
  AltCoreTable,
  AltCoreTableBar,
  AltCoreTableCell,
  AltCoreTablePagination,
  AltCoreTableRow,
  AltCoreTableHeadCell,
  AltCoreSkeletonTable,
} from '~core/index'
import { defineCustomElement } from '~shared/utils/components'

import { AltTable } from '~vue/ui/table'

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
  type TAltSortPayload,
  type TAltUpdateSelectedPayload,
  type TAltUpdatePagePayload,
  type TAltUpdateItemsPerPagePayload,
} from './cases/events'

describe(
  'Vue/AltTable',
  () => {
    beforeAll(() => {
      defineCustomElement(AltCoreTableTagName, AltCoreTable)
      defineCustomElement(AltCoreTableBarTagName, AltCoreTableBar)
      defineCustomElement(AltCoreTableCellTagName, AltCoreTableCell)
      defineCustomElement(AltCoreTablePaginationTagName, AltCoreTablePagination)
      defineCustomElement(AltCoreTableRowTagName, AltCoreTableRow)
      defineCustomElement(AltCoreTableHeadCellTagName, AltCoreTableHeadCell)
      defineCustomElement(AltCoreSkeletonTableTagName, AltCoreSkeletonTable)
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
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                () => {
                  const wrapper = mount(
                    AltTable,
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
                `Prop "${testCase.prop}" should set the same property on the core component ${AltCoreTableTagName}`,
                () => {
                  const wrapper = mount(
                    AltTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreTableElement = wrapper.find(AltCoreTableTagName).element

                  expect(coreTableElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propLoadingTestCases]) {
              it(
                `Prop "${testCase.prop}" should set the same property on the core component ${AltCoreTableTagName}`,
                () => {
                  const wrapper = mount(
                    AltTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreTableElement = wrapper.find(AltCoreTableTagName).element

                  expect(coreTableElement[testCase.prop]).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propPluginsTestCases]) {
              it(
                `Prop "${testCase.prop}" should set the same property on the core component ${AltCoreTableTagName}`,
                () => {
                  const wrapper = mount(
                    AltTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreTableElement = wrapper.find(AltCoreTableTagName).element

                  expect(JSON.stringify(coreTableElement[testCase.prop])).toBe(JSON.stringify(testCase.expected))
                },
              )
            }

            for (const testCase of [...propHideHeaderTestCases]) {
              it(
                `Prop "${testCase.prop}" should set "hideHead" and "hideBar" on the core component ${AltCoreTableTagName}`,
                () => {
                  const wrapper = mount(
                    AltTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreTableElement = wrapper.find(AltCoreTableTagName).element

                  expect(coreTableElement.hideHead).toBe(testCase.expected)
                  expect(coreTableElement.hideBar).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propCounterTextTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(AltCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.counterText).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propHeadersTestCases]) {
              it(
                `Prop "${testCase.prop}" should set the properties on the core components ${AltCoreSkeletonTableTagName} and ${AltCoreTableHeadCellTagName}`,
                () => {
                  const wrapper = mount(
                    AltTable,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const cols = Object.values(testCase.value ?? {}).map((header) => ({
                    align: header.align,
                    width: header.width,
                  }))


                  const coreSkeletonTableElement = wrapper.find(AltCoreSkeletonTableTagName).element
                  const coreTableHeadCellElements = wrapper.findAll(AltCoreTableHeadCellTagName)

                  expect(JSON.stringify(coreSkeletonTableElement.columns)).toEqual(JSON.stringify(cols))
                  expect(coreTableHeadCellElements.length).toBe(cols.length)
                },
              )
            }

            for (const testCase of [...propItemLabelTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(AltCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.itemLabel).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propItemValueTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(AltCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.itemValue).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propItemsPerPageTestCases]) {
              it(
                `Prop "${testCase.prop}" should set the property on the core components ${AltCoreSkeletonTableTagName} and ${AltCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreSkeletonTableElement = wrapper.find(AltCoreSkeletonTableTagName).element
                  const coreTablePaginationElement = wrapper.find(AltCoreTablePaginationTagName).element

                  expect(coreSkeletonTableElement.rows).toBe(testCase.expected)
                  expect(coreTablePaginationElement.itemsPerPage).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propItemsTestCases]) {
              it(
                `Prop "${testCase.prop}" should change the number of rows ${AltCoreTableRowTagName} and cells ${AltCoreTableCellTagName}. Case: "${testCase.case}"`,
                () => {
                  const props = {
                    [testCase.prop]: testCase.value,
                    ...testCase.additionalProps || {},
                  }
                  const wrapper = mount(AltTable, { props })

                  const coreTableRowElements = wrapper.findAll(`${AltCoreTableRowTagName}[slot="body"]`)
                  const coreTableCellElements = wrapper.findAll(AltCoreTableCellTagName)

                  expect(coreTableRowElements.length).toBe(testCase.expected?.rows)
                  expect(coreTableCellElements.length).toBe(testCase.expected?.cells)
                },
              )
            }

            for (const testCase of [...propOptionsItemsPerPageTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(AltCoreTablePaginationTagName).element

                  expect(JSON.stringify(coreTablePaginationElement.optionsItemsPerPage)).toBe(JSON.stringify(testCase.expected))
                },
              )
            }

            for (const testCase of [...propPageTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(AltCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.page).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propShowPaginationTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(AltTable, { props: { [testCase.prop]: testCase.value } })

                  const coreTablePaginationElement = wrapper.find(AltCoreTablePaginationTagName)

                  expect(coreTablePaginationElement.exists()).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propTotalTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTablePaginationTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      showPagination: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTablePaginationElement = wrapper.find(AltCoreTablePaginationTagName).element

                  expect(coreTablePaginationElement.total).toBe(testCase.expected)
                },
              )
            }

            for (const testCase of [...propStickyTestCases]) {
              it(
                `Prop "${testCase.prop}" should set the property on the core components ${AltCoreTableHeadCellTagName}, ${AltCoreTableRowTagName} and ${AltCoreTableCellTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      headers: testHeaders,
                      items: testItems,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTableHeadCellFirstElement = wrapper.findAll(AltCoreTableHeadCellTagName)[0].element
                  const coreTableRowElements = wrapper.findAll<AltCoreTableRow>(`${AltCoreTableRowTagName}[slot="body"]`)
                  const coreTableCellElements = coreTableRowElements
                    .map((element) => element.findAll(AltCoreTableCellTagName)[0])

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
                `Prop "${testCase.prop}" should set the property on the core components ${AltCoreSkeletonTableTagName} and ${AltCoreTableRowTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      headers: testHeaders,
                      items: testItems,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreSkeletonTableElement = wrapper.find(AltCoreSkeletonTableTagName).element
                  const coreTableRowElements = wrapper.findAll<AltCoreTableRow>(`${AltCoreTableRowTagName}[slot="body"]`)

                  expect(coreSkeletonTableElement.stripe).toBe(testCase.expected)
                  coreTableRowElements.forEach(({ element }) => {
                    expect(element.stripe).toBe(testCase.expected)
                  })
                },
              )
            }

            for (const testCase of [...propSelectableTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTableRowTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      headers: testHeaders,
                      items: testItems,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTableRowElements = wrapper.findAll(AltCoreTableRowTagName)

                  coreTableRowElements.forEach(({ element }) => {
                    expect(element.selectable).toBe(testCase.expected)
                  })
                },
              )
            }

            for (const testCase of [...propSelectedTestCases]) {
              it(
                `Prop "${testCase.prop}" should update the core component ${AltCoreTableRowTagName}`,
                () => {
                  const wrapper = mount(AltTable, {
                    props: {
                      headers: testHeaders,
                      items: testItems,
                      selectable: true,
                      [testCase.prop]: testCase.value,
                    },
                  })

                  const coreTableRowElements = wrapper.findAll<AltCoreTableRow>(`${AltCoreTableRowTagName}[slot="body"]`)

                  const coreHeadCheckboxElement = wrapper.find<AltCoreSimpleCheckbox>(`${AltCoreTableRowTagName}[slot="head"] ${AltCoreSimpleCheckboxTagName}[slot="cell"]`).element

                  expect(coreHeadCheckboxElement.checked).toBe(testCase.expected?.head.checked)
                  expect(coreHeadCheckboxElement.indeterminate).toBe(testCase.expected?.head.indeterminate)

                  coreTableRowElements.forEach((_, index) => {
                    const coreBodyCheckboxElement = wrapper.findAll<AltCoreSimpleCheckbox>(`${AltCoreTableRowTagName}[slot="body"] ${AltCoreSimpleCheckboxTagName}[slot="cell"]`)[index].element

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
                const wrapper = mount(AltTable, {
                  props: {
                    headers: testHeaders,
                    items: testItems,
                  },
                })

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as TAltSortPayload

                const headId = payload.headId
                const direction = payload.event.direction

                expect(headId).toEqual(testCase.expected?.headId)
                expect(direction).toEqual(testCase.expected?.direction)
              })
            }

            for (const testCase of [...eventUpdateSelectedTestCases]) {
              it(testCase.case, () => {
                const wrapper = mount(AltTable, {
                  props: {
                    selectable: true,
                    headers: testHeaders,
                    items: testItems,
                  },
                })

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as TAltUpdateSelectedPayload

                expect(payload).toEqual(testCase.expected)
              })
            }

            for (const testCase of [...eventUpdatePageTestCases]) {
              it(testCase.case, () => {
                const wrapper = mount(AltTable, {
                  props: {
                    showPagination: true,
                    headers: testHeaders,
                    items: testItems,
                  },
                })

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as TAltUpdatePagePayload

                expect(payload).toEqual(testCase.expected)
              })
            }

            for (const testCase of [...eventUpdateItemsPerPageTestCases]) {
              it(testCase.case, () => {
                const wrapper = mount(AltTable, {
                  props: {
                    headers: testHeaders,
                    items: testItems,
                    showPagination: true,
                  },
                })

                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as TAltUpdateItemsPerPagePayload

                expect(payload).toEqual(testCase.expected)
              })
            }
          },
        )
      },
    )
  },
)
