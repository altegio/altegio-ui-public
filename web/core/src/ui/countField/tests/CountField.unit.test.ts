import { afterAll, afterEach, beforeAll, describe, expect, it, vi } from 'vitest'
import { YCoreCountFieldTagName } from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import {
  ChangedValueEvent,
  createCoreCountFieldProps,
} from '~core/ui/countField/models/types'
import '~core/ui/countField'
import { propMinTestCases, propMaxTestCases,
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
  propNameTestCases } from '~core/ui/countField/tests/cases/props'

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  YCoreCountFieldTagName,
  createCoreCountFieldProps(),
)

describe(
  'Core/YCountField',
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
                `Prop "${testCase.prop}" должен быть ${testCase.case}`,
                async() => {
                  await updateComponent({ props: { [testCase.prop]: testCase.value } })

                  expect(component[testCase.prop]).toBe(testCase.value)
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
                const changedValueHandler = vi.fn()
                component.addEventListener('changed-value', changedValueHandler)

                const changedValueEvent = new ChangedValueEvent('changed-value', { detail: { value: '123' } })
                component.dispatchEvent(changedValueEvent)

                expect(changedValueHandler).toHaveBeenCalledTimes(1)
                expect(changedValueEvent.detail.value).toBe('123')
              },
            )

            it(
              'Должен вызывать событие focus при фокусе',
              () => {
                const focusHandler = vi.fn()
                component.addEventListener('focus', focusHandler)

                const focusEvent = new Event('focus')
                component.dispatchEvent(focusEvent)

                expect(focusHandler).toHaveBeenCalledTimes(1)
              },
            )

            it(
              'Должен вызывать событие blur при потере фокуса',
              () => {
                const blurHandler = vi.fn()
                component.addEventListener('blur', blurHandler)

                const blurEvent = new Event('blur')
                component.dispatchEvent(blurEvent)

                expect(blurHandler).toHaveBeenCalledTimes(1)
              },
            )

            it(
              'Должен вызывать событие keydown при нажатии клавиши',
              () => {
                const keydownHandler = vi.fn()
                component.addEventListener('keydown', keydownHandler)

                const keydownEvent = new KeyboardEvent('keydown', { code: 'ChevronUp' })
                component.dispatchEvent(keydownEvent)

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
