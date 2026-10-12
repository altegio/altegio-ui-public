import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import {
  YCoreDatePickerTagName,
  YCoreFieldWrapperTagName,
  YCoreFieldInputTagName,
  YCoreCalendarTagName,
  YCoreErrorTagName,
  YCoreAnnotationTagName,
  YCoreLabelTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getShadowElement, getElementClasses } from '~shared/tests/utils'
import { createCoreDatePickerProps } from '~core/ui/datePicker/models/types'
import '~core/ui/datePicker'
import type { YCoreFieldWrapper } from '~core/ui/fieldWrapper'
import type { YCoreFieldInput } from '~core/ui/fieldInput'
import type { YCoreLabel } from '~core/ui/label'
import type { YCoreCalendar } from '~core/ui/calendar'
import type { YCoreError } from '~core/ui/error'
import type { YCoreAnnotation } from '~core/ui/annotation'
import { camel } from 'radash'
import { FORMAT_DATE_DMY } from '~shared/utils/dateTime'
import { sleep } from '~shared/tests/utils'

import {
  propDisabledCases,
  propNameCases,
  propPlaceholderCases,
  propReadonlyCases,
  propRequiredCases,
  propSizeCases,
  propLabelDebounceCases,
  propLabelTextCases,
  propLabelTooltipTextCases,
  propDateCases,
  propIsRangeCases,
  propMaxDateCases,
  propMinDateCases,
  propCalendarHeaderSelectorsCases,
  propErrorsCases,
  propAnnotationTextCases,
} from './cases/props'

const tagName = YCoreDatePickerTagName

const {
  component,
  updateComponent,
  resetComponent,
  injectComponentToBody,
  removeComponent,
} = useCoreTests(
  tagName,
  createCoreDatePickerProps(),
)

const getLocalShadowElement = (selector: string) => {
  return getShadowElement(
    component,
    selector,
  )
}

describe(
  'Core/YDatePicker',
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
            for (const { prop, case: propCase, value } of [
              ...propDisabledCases,
              ...propReadonlyCases,
              ...propSizeCases,
            ]) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в fieldWrapper`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const fieldWrapperElement = getLocalShadowElement(YCoreFieldWrapperTagName) as YCoreFieldWrapper | null

                  expect(fieldWrapperElement?.[prop]).toBe(value)
                },
              )
            }

            for (const { prop, case: propCase, value } of [
              ...propNameCases,
              ...propPlaceholderCases,
              ...propRequiredCases,
            ]) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в fieldInput`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const fieldInputElement = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null

                  expect(fieldInputElement?.[prop]).toBe(value)
                },
              )
            }

            for (const { prop, case: propCase, value } of [
              ...propDisabledCases,
              ...propRequiredCases,
            ]) {
              it.skip(
                `Проп "${prop}" должен быть "${propCase}" и передан в label`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const labelElement = getLocalShadowElement(YCoreLabelTagName) as YCoreLabel | null

                  expect(labelElement?.[prop]).toBe(value)
                },
              )
            }
            for (const { prop, case: propCase, value } of [
              ...propLabelDebounceCases,
              ...propLabelTextCases,
              ...propLabelTooltipTextCases,
            ]) {
              it.skip(
                `Проп "${prop}" должен быть "${propCase}" и передан в label`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const labelElement = getLocalShadowElement(YCoreLabelTagName) as YCoreLabel | null
                  const labelProp = camel(prop.replace('label', '')) as keyof YCoreLabel

                  expect(labelElement?.[labelProp]).toBe(value)
                },
              )
            }

            for (const { prop, case: propCase, value, expected } of [
              ...propDateCases,
              ...propIsRangeCases,
              ...propMaxDateCases,
              ...propMinDateCases,
            ]) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в Calendar`,
                async() => {
                  component.fieldInput?.inputElement?.focus()

                  await updateComponent({ props: { [prop]: value } })

                  const calendarElement = getLocalShadowElement(YCoreCalendarTagName) as YCoreCalendar | null

                  expect(calendarElement?.[prop]).toBe(expected)
                },
              )
            }

            for (const { prop, case: propCase, value, inputValue } of propErrorsCases) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в error и inputField`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const errorElement = getLocalShadowElement(YCoreErrorTagName) as YCoreError | null
                  const fieldWrapperElement = getLocalShadowElement(YCoreFieldWrapperTagName) as YCoreFieldWrapper | null

                  if (value?.length) {
                    expect(errorElement?.[prop]).toBe(value)
                    expect(fieldWrapperElement?.error).toBe(inputValue)
                  } else {
                    expect(errorElement).toBeNull()
                    expect(fieldWrapperElement?.error).toBe(inputValue)
                  }
                },
              )
            }

            for (const { prop, case: propCase, value } of propAnnotationTextCases) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в annotation`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const annotationElement = getLocalShadowElement(YCoreAnnotationTagName) as YCoreAnnotation | null

                  if (value) {
                    expect(annotationElement?.text).toBe(value)
                  } else {
                    const annotationElementClasses = getElementClasses(annotationElement)

                    expect(annotationElementClasses).toContain('y-core-date-picker__annotation_hide')
                  }
                },
              )
            }

            for (const { prop, case: propCase, value } of propCalendarHeaderSelectorsCases) {
              it(
                `Проп "${prop}" должен быть "${propCase}" и передан в Calendar`,
                async() => {
                  component.fieldInput?.inputElement?.focus()

                  await updateComponent({ props: { [prop]: value } })

                  const calendarElement = getLocalShadowElement(YCoreCalendarTagName) as YCoreCalendar | null

                  expect(calendarElement?.headerSelectors).toBe(value)
                },
              )
            }
          },
        )

        describe(
          'Mask',
          () => {
            it(`Должен автоматически форматировать вводимую дату по маске ${FORMAT_DATE_DMY}`, async() => {
              const fieldInput = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement не найден')
              }

              fieldInput.inputElement.value = '08072025'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe('08.07.2025')
            })

            it(`Должен автоматически форматировать вводимую дату по маске ${FORMAT_DATE_DMY} - ${FORMAT_DATE_DMY} в режиме range`, async() => {
              await updateComponent({ props: { isRange: true } })

              const fieldInput = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement не найден')
              }

              fieldInput.inputElement.value = '0807202509072025'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe('08.07.2025 - 09.07.2025')
            })

            it('Не должен позволять вводить невалидные символы', async() => {
              const fieldInput = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement не найден')
              }

              fieldInput.inputElement.value = '08asd07asdf2025'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe('08.07.2025')
            })

            it('Должен корректно очищать диапазон дат по одному символу', async() => {
              const fieldInput = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement не найден')
              }


              fieldInput.inputElement.value = '08.07.2025'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe('08.07.2025')

              let value = fieldInput.inputElement.value

              while (value.length > 0) {
                value = value.slice(0, -1)
                fieldInput.inputElement.value = value
                fieldInput.inputElement.dispatchEvent(new Event('input'))

                await sleep(0)

                expect(fieldInput.inputElement.value).toBe(value)
              }
            })

            it('Должен корректно очищать диапазон дат по одному символу в режиме range', async() => {
              await updateComponent({ props: { isRange: true } })

              const fieldInput = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement не найден')
              }


              fieldInput.inputElement.value = '08.07.2025 - 09.07.2025'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe('08.07.2025 - 09.07.2025')

              let value = fieldInput.inputElement.value

              while (value.length > 0) {
                value = value.slice(0, -1)
                fieldInput.inputElement.value = value
                fieldInput.inputElement.dispatchEvent(new Event('input'))

                await sleep(0)

                expect(fieldInput.inputElement.value.trimEnd().replace(/ -$/, '')).toBe(value.trimEnd().replace(/ -$/, ''))
              }
            })

            it('Должен ограничивать вводимую дату по minDate и maxDate', async() => {
              const minDate = '01.01.2025'
              const maxDate = '31.12.2025'
              await updateComponent({ props: { minDate, maxDate } })

              const fieldInput = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null
              if (!fieldInput?.inputElement) {
                throw new Error('inputElement не найден')
              }

              fieldInput.inputElement.value = '31.12.2019'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe(minDate)

              fieldInput.inputElement.value = '01.01.2026'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe(maxDate)

              await updateComponent({ props: { isRange: true } })

              fieldInput.inputElement.value = '31.12.2019 - 01.01.2026'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)
              expect(fieldInput.inputElement.value).toBe(`${minDate} - ${maxDate}`)
            })
          },
        )
      },
    )

    describe(
      'Events',
      () => {
        it(
          'Должен вызывать обработчик pick при выборе даты из календаря',
          () => {
            const handleSelect = vi.fn()

            const calendarElement = getLocalShadowElement(YCoreCalendarTagName) as YCoreCalendar | null

            if (!calendarElement) return

            component.addEventListener(
              'pick',
              handleSelect,
            )

            calendarElement.dispatchEvent(new CustomEvent(
              'select',
              { detail: { date: 'asdf' } },
            ))

            expect(handleSelect).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Должен вызывать обработчик pick при выборе вводе валидной даты в InputField',
          () => {
            const handleSelect = vi.fn()

            const fieldInputElement = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null

            if (!fieldInputElement) return

            component.addEventListener(
              'pick',
              handleSelect,
            )

            fieldInputElement.dispatchEvent(new CustomEvent(
              'input',
              { detail: { value: '10.10.2020' } },
            ))

            expect(handleSelect).toHaveBeenCalledTimes(1)
          },
        )

        it(
          'Не должен вызывать обработчик pick при выборе вводе невалидной даты в InputField',
          () => {
            const handleSelect = vi.fn()

            const fieldInputElement = getLocalShadowElement(YCoreFieldInputTagName) as YCoreFieldInput | null

            if (!fieldInputElement) return

            component.addEventListener(
              'pick',
              handleSelect,
            )

            fieldInputElement.dispatchEvent(new CustomEvent(
              'input',
              { detail: { value: '1111' } },
            ))

            expect(handleSelect).not.toHaveBeenCalled()
          },
        )
      },
    )

    describe(
      'CSS',
      () => {
        it(
          'CSS tests',
          () => {
            expect(true).toBe(true)
          },
        )
      },
    )
  },
)

