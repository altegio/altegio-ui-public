import { describe, expect, it, beforeAll, afterEach, afterAll } from 'vitest'

import { useVueTests } from '~shared/tests/vue'
import { YCoreTableCellTagName } from '~shared/constants'
import { YTableCell } from '~vue/ui/tableCell'
import { YCoreTableCell } from '~core/ui/tableCell'

import {
  propStickyTestCases,
  propDisabledTestCases,
  propAlignTestCases,
  propEllipsisTestCases,
  propLineclampTestCases,
  propItemTestCases,
  propItemLabelTestCases,
} from './cases/props'

const {
  wrapper,
  updateComponent,
  resetComponent,
  removeComponent,
  initCoreComponent,
} = useVueTests(YTableCell)


describe(
  'Vue/YTableCell',
  () => {
    beforeAll(() => {
      initCoreComponent(YCoreTableCellTagName, YCoreTableCell)
    })

    afterEach(async() => {
      await resetComponent()
    })

    afterAll(() => {
      removeComponent()
    })

    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propStickyTestCases,
              ...propDisabledTestCases,
              ...propEllipsisTestCases,
              ...propLineclampTestCases,
              ...propAlignTestCases,
              ...propItemTestCases,
              ...propItemLabelTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })
                  const coreElement = wrapper.find(YCoreTableCellTagName)

                  if (testCase.prop === 'item') {
                    expect(coreElement.element[testCase.prop]).toEqual(testCase.expected)
                    return
                  }

                  expect(coreElement.element[testCase.prop]).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
