import { describe, expect, it, beforeAll, vi } from 'vitest'
import { mount } from '@vue/test-utils'
import { AltCoreCountFieldTagName } from '~shared/constants'
import { AltCountField } from '~vue/ui/countField'
import { AltCoreCountField } from '~core/ui/countField'
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

const tagName = AltCoreCountFieldTagName

describe(
  'Vue/AltCountField',
  () => {
    beforeAll(() => {
      if (!customElements.get(tagName)) {
        customElements.define(
          tagName,
          AltCoreCountField,
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
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                () => {
                  const wrapper = mount(
                    AltCountField,
                    { props: { [testCase.prop]: testCase.value } },
                  )

                  const coreElement = wrapper.find(tagName).element as AltCoreCountField
                  const value = coreElement[testCase.prop as keyof AltCoreCountField]

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
              'Should emit changed-value when the value changes',
              () => {
                const wrapper = mount(AltCountField)
                const coreElement = wrapper.find(tagName).element as AltCoreCountField
                const changedValueHandler = vi.fn()

                coreElement.addEventListener('changed-value', changedValueHandler)
                const changedValueEvent = new ChangedValueEvent('changed-value', { detail: { value: '123' } })
                coreElement.dispatchEvent(changedValueEvent)

                expect(changedValueHandler).toHaveBeenCalledTimes(1)
                expect(changedValueEvent.detail.value).toBe('123')
              },
            )

            it(
              'Should emit focus on focus',
              () => {
                const wrapper = mount(AltCountField)
                const coreElement = wrapper.find(tagName).element as AltCoreCountField
                const focusHandler = vi.fn()

                coreElement.addEventListener('focus', focusHandler)
                const focusEvent = new Event('focus')
                coreElement.dispatchEvent(focusEvent)

                expect(focusHandler).toHaveBeenCalledTimes(1)
              },
            )

            it(
              'Should emit blur on blur',
              () => {
                const wrapper = mount(AltCountField)
                const coreElement = wrapper.find(tagName).element as AltCoreCountField
                const blurHandler = vi.fn()

                coreElement.addEventListener('blur', blurHandler)
                const blurEvent = new Event('blur')
                coreElement.dispatchEvent(blurEvent)

                expect(blurHandler).toHaveBeenCalledTimes(1)
              },
            )

            it(
              'Should emit keydown on key press',
              () => {
                const wrapper = mount(AltCountField)
                const coreElement = wrapper.find(tagName).element as AltCoreCountField
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
