import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { AltCoreDropdownListTagName, AltCoreDropdownCellTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'
import '~core/ui/dropdownList'
import { getWCShadowRoot, trimTextContent } from '~shared/tests/utils'
import {
  slotTopTestCases,
  slotListTestCases,
  slotBottomTestCases,
} from './cases/slots'
import {
  propItemsTestCases,
  propItemLabelTestCases,
  propMinWidthTestCases,
} from './cases/props'

const tagName = AltCoreDropdownListTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreDropdownListProps(),
)

describe(
  'Core/AltDropdownList/Unit',
  () => {
    beforeAll(() => {
      injectComponentToBody()
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Slots',
      () => {
        for (const testCase of [
          ...slotTopTestCases,
          ...slotListTestCases,
          ...slotBottomTestCases,
        ]) {
          it(
            `Slot "${testCase.slot}" should render ${testCase.case}`,
            async() => {
              await updateComponent({ slots: { [testCase.slot]: testCase.content } })

              expect(component.textContent).toBe(testCase.content)
            },
          )
        }
      },
    )

    describe(
      'Props',
      () => {
        for (const testCase of propItemsTestCases) {
          it(
            `Prop "items" should render the list ${testCase.case}`,
            async() => {
              await updateComponent({ props: { items: testCase.value } })

              const listItems = getWCShadowRoot(component).querySelectorAll(AltCoreDropdownCellTagName)

              if (testCase.value && testCase.value.length > 0) {
                testCase.value.forEach((item, index) => {
                  expect(listItems[index].textContent).toContain(item.label)
                })
              } else {
                expect(listItems.length).toBe(0)
              }
            },
          )
        }

        for (const testCase of propItemLabelTestCases) {
          it(
            `Prop "itemLabel" should render the label ${testCase.case}`,
            async() => {
              await updateComponent({
                props: {
                  items: propItemsTestCases[0].value,
                  itemLabel: testCase.value,
                },
              })

              const listItems = getWCShadowRoot(component).querySelectorAll(AltCoreDropdownCellTagName)
              const textContent = trimTextContent(listItems[0].textContent)

              expect(Boolean(textContent)).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propMinWidthTestCases) {
          it(
            `Prop "minWidth" should apply the minimum width ${testCase.case}`,
            async() => {
              await updateComponent({
                props: {
                  items: propItemsTestCases[0].value,
                  minWidth: testCase.value,
                },
              })

              const dropdownList = getWCShadowRoot(component).querySelector(`.${tagName}`)

              if (!dropdownList) {
                throw new Error('DropdownList not found')
              }

              const minWidth = getComputedStyle(dropdownList).minWidth

              expect(minWidth).toBe(testCase.value)
            },
          )
        }
      },
    )
  },
)
