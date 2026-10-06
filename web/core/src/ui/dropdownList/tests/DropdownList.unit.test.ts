import { beforeAll, afterEach, afterAll, describe, expect, it } from 'vitest'
import { YCoreDropdownListTagName, YCoreDropdownCellTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  createCoreDropdownListProps,
} from '~core/ui/dropdownList/models/types'
import '~core/ui/dropdownList'
import { getWCShadowRoot } from '~shared/tests/utils'
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

const tagName = YCoreDropdownListTagName

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
  'Core/YDropdownList/Unit',
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
            `Slot "${testCase.slot}" должен быть ${testCase.case}`,
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
            `Prop "items" должен корректно отображать список ${testCase.case}`,
            async() => {
              await updateComponent({ props: { items: testCase.value } })

              const listItems = getWCShadowRoot(component).querySelectorAll(YCoreDropdownCellTagName)

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
            `Prop "itemLabel" должен корректно отображать метку ${testCase.case}`,
            async() => {
              await updateComponent({
                props: {
                  items: propItemsTestCases[0].value,
                  itemLabel: testCase.value,
                },
              })

              const listItems = getWCShadowRoot(component).querySelectorAll(YCoreDropdownCellTagName)
              const textContent = (listItems[0].textContent ?? '').trim()

              expect(Boolean(textContent)).toBe(testCase.expected)
            },
          )
        }

        for (const testCase of propMinWidthTestCases) {
          it(
            `Prop "minWidth" должен корректно отображать минимальную ширину ${testCase.case}`,
            async() => {
              await updateComponent({
                props: {
                  items: propItemsTestCases[0].value,
                  minWidth: testCase.value,
                },
              })

              const dropdownList = getWCShadowRoot(component).querySelector(`.${tagName}`)

              if (!dropdownList) {
                throw new Error('DropdownList не найден')
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
