import { describe, expect, it, beforeAll, afterEach, afterAll } from 'vitest'

import { useVueTests } from '~shared/tests/vue'
import { YCoreCollapseTagName } from '~shared/constants'
import { YCollapse } from '~vue/ui/collapse'
import { YCoreCollapse } from '~core/ui/collapse'
import type {
  IYCoreCollapseChangePayload,
  IYCoreCollapseMovePayload,
} from '~core/ui/collapse/models/types'

import {
  slotDefaultTestCases,
} from './cases/slots'

import {
  propModelValueCases,
  propTypeCases,
  propDraggableCases,
  propVariantCases,
} from './cases/props'

import {
  eventCollapseChangeCases,
  eventCollapseMoveCases,
} from './cases/events'

const {
  wrapper,
  updateComponent,
  resetComponent,
  removeComponent,
  initCoreComponent,
} = useVueTests(YCollapse)


describe(
  'Vue/YCollapse',
  () => {
    beforeAll(() => {
      initCoreComponent(YCoreCollapseTagName, YCoreCollapse)
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
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                async() => {
                  await updateComponent({ slots: { default: testCase.content } })

                  expect(wrapper.text()).toBe(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propModelValueCases,
              ...propTypeCases,
              ...propDraggableCases,
              ...propVariantCases,
            ]) {
              const coreTestProp = testCase.prop === 'modelValue' ? 'value' : testCase.prop
              it(
                `Prop "${testCase.prop}" должен быть "${JSON.stringify(testCase.expected)}" получая в случае "${testCase.case}" - "${JSON.stringify(testCase.value)}" в core "${coreTestProp}"`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  const coreElement = wrapper.find(YCoreCollapseTagName).element as YCoreCollapse

                  expect(JSON.stringify(coreElement[coreTestProp])).toBe(JSON.stringify(testCase.expected))
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            for (const testCase of [...eventCollapseChangeCases, ...eventCollapseMoveCases]) {
              it(testCase.case, () => {
                wrapper.vm.$emit(testCase.event, testCase.payload)

                const payload = wrapper.emitted(testCase.event)?.[0][0] as IYCoreCollapseChangePayload | IYCoreCollapseMovePayload

                expect(payload).toEqual(testCase.expected)
              })
            }
          },
        )
      },
    )
  },
)
