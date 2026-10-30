import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreChipTagName as tagName } from '~shared/constants'
import { text } from '~shared/tests/slotContents'
import { AltCoreChip } from '~core/ui/chip'
import { AltChip } from '~vue/ui/chip'
import { propActiveTestCases, propDisabledTestCases, propIconLeftTestCases, propLabelTestCases, propSizeTestCases } from './cases/props'

const labelText = text

describe(
  'Vue/AltChip',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreChip,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
            () => {
              const wrapper = mount(
                AltChip,
                { props: { labelText: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propIconLeftTestCases) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
            () => {
              const wrapper = mount(
                AltChip,
                {
                  props: {
                    labelText,
                    [testCase.prop]: testCase.value,
                  },
                },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toStrictEqual(testCase.value)
            },
          )
        }

        for (const testCase of [
          ...propSizeTestCases,
          ...propActiveTestCases,
          ...propDisabledTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" should set ${testCase.prop} on the core component to "${testCase.case}"`,
            () => {
              const wrapper = mount(
                AltChip,
                {
                  props: {
                    labelText,
                    [testCase.prop]: testCase.value,
                  },
                },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.value)
            },
          )
        }
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Should emit "update:active" on Chip click',
          async() => {
            const wrapper = mount(
              AltChip,
              { props: { labelText } },
            )

            const chipElement = wrapper.find(tagName)

            await chipElement.trigger('click')

            await wrapper.vm.$nextTick()

            expect(wrapper.emitted()).toHaveProperty('update:active')
          },
        )
      },
    )
  },
)
