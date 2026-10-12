import { describe, expect, it, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { YCoreCountFieldTagName } from '~shared/constants'
import { YCountField } from '~vue/ui/countField'
import { YCoreCountField } from '~core/ui/countField'
import { ChangedValueEvent } from '~core/ui/countField/models/types'
import { propMinTestCases,
  propMaxTestCases,
  propSizeTestCases,
  propDisabledTestCases,
  propReadonlyTestCases,
  propRequiredTestCases,
  propErrorTestCases,
  propPlaceholderTestCases,
  propAutofocusTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propLabelDebounceTestCases,
  propAnnotationTextTestCases,
  propErrorsTestCases,
  propNameTestCases } from '~vue/ui/countField/tests/cases/props'

const tagName = YCoreCountFieldTagName

describe(
  'Vue/YCountField',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          YCoreCountField,
        )
      }
    })

    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propMinTestCases,
              ...propMaxTestCases,
              ...propSizeTestCases,
              ...propDisabledTestCases,
              ...propReadonlyTestCases,
              ...propRequiredTestCases,
              ...propErrorTestCases,
              ...propPlaceholderTestCases,
              ...propAutofocusTestCases,
              ...propLabelTextTestCases,
              ...propLabelTooltipTextTestCases,
              ...propLabelDebounceTestCases,
              ...propAnnotationTextTestCases,
              ...propErrorsTestCases,
              ...propNameTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                () => {
                  const wrapper = mount(
                    YCountField,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as YCoreCountField
                  const value = coreElement[testCase.prop as keyof YCoreCountField]

                  if (Array.isArray(value) || typeof value === 'object' && value !== null) {
                    expect(value).toStrictEqual(testCase.value)
                  } else {
                    expect(value).toBe(testCase.value)
                  }
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            it(
              'Должен вызывать событие changed-value при изменении значения',
              () => {
                const wrapper = mount(YCountField)
                const coreElement = wrapper.find(tagName).element as YCoreCountField
                const changedValueHandler = vi.fn()

                coreElement.addEventListener('changed-value', changedValueHandler)
                const changedValueEvent = new ChangedValueEvent('changed-value', { detail: { value: '123' } })
                coreElement.dispatchEvent(changedValueEvent)

                expect(changedValueHandler).toHaveBeenCalledTimes(1)
                expect(changedValueEvent.detail.value).toBe('123')
              },
            )

            it(
              'Должен вызывать событие focus при фокусе',
              () => {
                const wrapper = mount(YCountField)
                const coreElement = wrapper.find(tagName).element as YCoreCountField
                const focusHandler = vi.fn()

                coreElement.addEventListener('focus', focusHandler)
                const focusEvent = new Event('focus')
                coreElement.dispatchEvent(focusEvent)

                expect(focusHandler).toHaveBeenCalledTimes(1)
              },
            )

            it(
              'Должен вызывать событие blur при потере фокуса',
              () => {
                const wrapper = mount(YCountField)
                const coreElement = wrapper.find(tagName).element as YCoreCountField
                const blurHandler = vi.fn()

                coreElement.addEventListener('blur', blurHandler)
                const blurEvent = new Event('blur')
                coreElement.dispatchEvent(blurEvent)

                expect(blurHandler).toHaveBeenCalledTimes(1)
              },
            )

            it(
              'Должен вызывать событие keydown при нажатии клавиши',
              () => {
                const wrapper = mount(YCountField)
                const coreElement = wrapper.find(tagName).element as YCoreCountField
                const keydownHandler = vi.fn()

                coreElement.addEventListener('keydown', keydownHandler)
                const keydownEvent = new KeyboardEvent('keydown', { code: 'ChevronUp' })
                coreElement.dispatchEvent(keydownEvent)

                expect(keydownHandler).toHaveBeenCalledTimes(1)
                expect(keydownEvent.code).toBe('ChevronUp')
              },
            )
          },
        )
      },
    )
  },
)
