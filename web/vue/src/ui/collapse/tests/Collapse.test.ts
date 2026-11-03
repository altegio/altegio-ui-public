import { describe, expect, it, beforeAll, afterEach, afterAll } from 'vitest'

import { useVueTests } from '~shared/tests/vue'
import { AltCoreCollapseTagName } from '~shared/constants'
import { AltCollapse } from '~vue/ui/collapse'
import { AltCoreCollapse } from '~core/ui/collapse'
import type {
  IAltCoreCollapseChangePayload,
  IAltCoreCollapseMovePayload,
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
} = useVueTests(AltCollapse)


describe(
  'Vue/AltCollapse',
  () => {
    beforeAll(() => {
      initCoreComponent(AltCoreCollapseTagName, AltCoreCollapse)
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
                `Slot "${testCase.slot}" should render ${testCase.case}`,
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
                `Prop "${testCase.prop}" should be "${JSON.stringify(testCase.expected)}" for case "${testCase.case}" - "${JSON.stringify(testCase.value)}" in core "${coreTestProp}"`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  const coreElement = wrapper.find(AltCoreCollapseTagName).element as AltCoreCollapse

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

                const payload = wrapper.emitted(testCase.event)?.[0][0] as IAltCoreCollapseChangePayload | IAltCoreCollapseMovePayload

                expect(payload).toEqual(testCase.expected)
              })
            }
          },
        )
      },
    )
  },
)
