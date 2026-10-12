import { beforeAll, describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreChipTagName as tagName } from '~shared/constants'
import { text } from '~shared/tests/slotContents'
import { YCoreChip } from '~core/ui/chip'
import { YChip } from '~vue/ui/chip'
import { propActiveTestCases, propDisabledTestCases, propIconLeftTestCases, propLabelTestCases, propSizeTestCases } from './cases/props'

const labelText = text

describe(
  'Vue/YChip',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreChip,
        )
      }
    })

    describe(
      'Props',
      () => {
        for (const testCase of propLabelTestCases) {
          it(
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
            () => {
              const wrapper = mount(
                YChip,
                { props: { labelText: testCase.value } },
              )

              const coreElement = wrapper.find(tagName)

              expect(coreElement.element[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of propIconLeftTestCases) {
          it(
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
            () => {
              const wrapper = mount(
                YChip,
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
            `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента на "${testCase.case}"`,
            () => {
              const wrapper = mount(
                YChip,
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
          'Должен вызывать событие "update:active" при клике на Chip',
          async() => {
            const wrapper = mount(
              YChip,
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
