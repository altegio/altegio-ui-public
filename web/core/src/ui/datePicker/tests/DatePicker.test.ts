import { beforeAll, afterEach, afterAll, describe, expect, it, vi } from 'vitest'
import {
  AltCoreDatePickerTagName,
  AltCoreFieldWrapperTagName,
  AltCoreFieldInputTagName,
  AltCoreCalendarTagName,
  AltCoreErrorTagName,
  AltCoreAnnotationTagName,
  AltCoreLabelTagName,
} from '~shared/constants'
import { useCoreTests } from '~shared/tests/core'
import { getShadowElement, getElementClasses } from '~shared/tests/utils'
import { createCoreDatePickerProps } from '~core/ui/datePicker/models/types'
import '~core/ui/datePicker'
import type { AltCoreFieldWrapper } from '~core/ui/fieldWrapper'
import type { AltCoreFieldInput } from '~core/ui/fieldInput'
import type { AltCoreLabel } from '~core/ui/label'
import type { AltCoreCalendar } from '~core/ui/calendar'
import type { AltCoreError } from '~core/ui/error'
import type { AltCoreAnnotation } from '~core/ui/annotation'
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

const tagName = AltCoreDatePickerTagName

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
  'Core/AltDatePicker',
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
                `Prop "${prop}" should be "${propCase}" and passed to fieldWrapper`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const fieldWrapperElement = getLocalShadowElement(AltCoreFieldWrapperTagName) as AltCoreFieldWrapper | null

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
                `Prop "${prop}" should be "${propCase}" and passed to fieldInput`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const fieldInputElement = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null

                  expect(fieldInputElement?.[prop]).toBe(value)
                },
              )
            }

            for (const { prop, case: propCase, value } of [
              ...propDisabledCases,
              ...propRequiredCases,
            ]) {
              it.skip(
                `Prop "${prop}" should be "${propCase}" and passed to label`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const labelElement = getLocalShadowElement(AltCoreLabelTagName) as AltCoreLabel | null

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
                `Prop "${prop}" should be "${propCase}" and passed to label`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const labelElement = getLocalShadowElement(AltCoreLabelTagName) as AltCoreLabel | null
                  const labelProp = camel(prop.replace('label', '')) as keyof AltCoreLabel

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
                `Prop "${prop}" should be "${propCase}" and passed to Calendar`,
                async() => {
                  component.fieldInput?.inputElement?.focus()

                  await updateComponent({ props: { [prop]: value } })

                  const calendarElement = getLocalShadowElement(AltCoreCalendarTagName) as AltCoreCalendar | null

                  expect(calendarElement?.[prop]).toBe(expected)
                },
              )
            }

            for (const { prop, case: propCase, value, inputValue } of propErrorsCases) {
              it(
                `Prop "${prop}" should be "${propCase}" and passed to error and inputField`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const errorElement = getLocalShadowElement(AltCoreErrorTagName) as AltCoreError | null
                  const fieldWrapperElement = getLocalShadowElement(AltCoreFieldWrapperTagName) as AltCoreFieldWrapper | null

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
                `Prop "${prop}" should be "${propCase}" and passed to annotation`,
                async() => {
                  await updateComponent({ props: { [prop]: value } })

                  const annotationElement = getLocalShadowElement(AltCoreAnnotationTagName) as AltCoreAnnotation | null

                  if (value) {
                    expect(annotationElement?.text).toBe(value)
                  } else {
                    const annotationElementClasses = getElementClasses(annotationElement)

                    expect(annotationElementClasses).toContain('alt-core-date-picker__annotation_hide')
                  }
                },
              )
            }

            for (const { prop, case: propCase, value } of propCalendarHeaderSelectorsCases) {
              it(
                `Prop "${prop}" should be "${propCase}" and passed to Calendar`,
                async() => {
                  component.fieldInput?.inputElement?.focus()

                  await updateComponent({ props: { [prop]: value } })

                  const calendarElement = getLocalShadowElement(AltCoreCalendarTagName) as AltCoreCalendar | null

                  expect(calendarElement?.headerSelectors).toBe(value)
                },
              )
            }
          },
        )

        describe(
          'Mask',
          () => {
            it(`Should format the typed date with the mask ${FORMAT_DATE_DMY}`, async() => {
              const fieldInput = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement not found')
              }

              fieldInput.inputElement.value = '08072025'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe('08.07.2025')
            })

            it(`Should format the typed date with the mask ${FORMAT_DATE_DMY} - ${FORMAT_DATE_DMY} in range mode`, async() => {
              await updateComponent({ props: { isRange: true } })

              const fieldInput = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement not found')
              }

              fieldInput.inputElement.value = '0807202509072025'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe('08.07.2025 - 09.07.2025')
            })

            it('Should not allow invalid characters', async() => {
              const fieldInput = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement not found')
              }

              fieldInput.inputElement.value = '08asd07asdf2025'
              fieldInput.inputElement.dispatchEvent(new Event('input'))

              await sleep(0)

              expect(fieldInput.inputElement.value).toBe('08.07.2025')
            })

            it('Should clear the date range one character at a time', async() => {
              const fieldInput = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement not found')
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

            it('Should clear the date range one character at a time in range mode', async() => {
              await updateComponent({ props: { isRange: true } })

              const fieldInput = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null

              if (!fieldInput?.inputElement) {
                throw new Error('inputElement not found')
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

            it('Should limit the typed date to minDate and maxDate', async() => {
              const minDate = '01.01.2025'
              const maxDate = '31.12.2025'
              await updateComponent({ props: { minDate, maxDate } })

              const fieldInput = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null
              if (!fieldInput?.inputElement) {
                throw new Error('inputElement not found')
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
          'Should call the pick handler when a date is picked in the calendar',
          () => {
            const handleSelect = vi.fn()

            const calendarElement = getLocalShadowElement(AltCoreCalendarTagName) as AltCoreCalendar | null

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
          'Should call the pick handler when a valid date is typed in InputField',
          () => {
            const handleSelect = vi.fn()

            const fieldInputElement = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null

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
          'Should not call the pick handler when an invalid date is typed in InputField',
          () => {
            const handleSelect = vi.fn()

            const fieldInputElement = getLocalShadowElement(AltCoreFieldInputTagName) as AltCoreFieldInput | null

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
  },
)

