import { describe, expect, it, beforeAll, afterEach, afterAll } from 'vitest'

import { useVueTests } from '~shared/tests/vue'
import { AltCoreTableCellTagName } from '~shared/constants'
import { AltTableCell } from '~vue/ui/tableCell'
import { AltCoreTableCell } from '~core/ui/tableCell'

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
} = useVueTests(AltTableCell)


describe(
  'Vue/AltTableCell',
  () => {
    beforeAll(() => {
      initCoreComponent(AltCoreTableCellTagName, AltCoreTableCell)
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
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })
                  const coreElement = wrapper.find(AltCoreTableCellTagName)

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
