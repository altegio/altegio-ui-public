import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreDatePickerTagName } from '~shared/constants'
import { YDatePicker } from '~ng/ui/datePicker'
import { type IYNgDatePickerProps } from '~ng/ui/datePicker/models/types'
import {
  propDateCases,
  propNameCases,
  propPlaceholderCases,
  propDisabledCases,
  propRequiredCases,
  propSizeTestCases,
  propLabelDebounceCases,
  propLabelTextCases,
  propLabelTooltipTextCases,
  propIsRangeCases,
  propMaxDateCases,
  propMinDateCases,
  propAnnotationTextCases,
  propCalendarHeaderSelectorsCases,
  propErrorsCases,
} from './cases/props'
import { dispatchEvent } from '~shared/tests/utils'

const tagName = YCoreDatePickerTagName

interface ICreateComponentArgs {
  props?: Partial<IYNgDatePickerProps>
}
const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YDatePicker] }).compileComponents()

  @Component({
    template: `<YDatePicker
      [date]="date"
      [isRange]="isRange"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [disabled]="disabled"
      [calendarHeaderSelectors]="calendarHeaderSelectors"
      [annotationText]="annotationText"
      [name]="name"
      [placeholder]="placeholder"
      [required]="required"
      [size]="size"
      [labelText]="labelText"
      [labelTooltipText]="labelTooltipText"
      [labelDebounce]="labelDebounce"
      [error]="error"
      [errors]="errors"
      (pick)="pickEvent($event)"></YDatePicker>`,
    imports: [YDatePicker],
    standalone: true,
  })
  class TestComponent {
    date = props?.date
    isRange = props?.isRange
    minDate = props?.minDate
    maxDate = props?.maxDate
    disabled = props?.disabled
    calendarHeaderSelectors = props?.calendarHeaderSelectors
    annotationText = props?.annotationText
    name = props?.name
    placeholder = props?.placeholder
    required = props?.required
    readonly = props?.readonly
    size = props?.size
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    labelDebounce = props?.labelDebounce
    error = props?.error
    errors = props?.errors

    pickEvent = vi.fn()
  }
  return TestComponent
}

describe(
  'Angular/YDatePicker',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propDateCases,
              ...propNameCases,
              ...propPlaceholderCases,
              ...propDisabledCases,
              ...propRequiredCases,
              ...propSizeTestCases,
              ...propLabelDebounceCases,
              ...propLabelTextCases,
              ...propLabelTooltipTextCases,
              ...propIsRangeCases,
              ...propMaxDateCases,
              ...propMinDateCases,
              ...propAnnotationTextCases,
              ...propCalendarHeaderSelectorsCases,
              ...propErrorsCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

                  if (Array.isArray(testCase.value)) {
                    expect(coreElement?.[testCase.prop]).toStrictEqual(testCase.expected)
                  } else {
                    expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
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
              'Должен вызывать событие pickEvent" при выборе даты',
              async() => {
                const handleAction = vi.fn()
                const component = await createComponent({ props: {} })
                const fixture = TestBed.createComponent(component)
                fixture.detectChanges()

                await fixture.whenStable()
                const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement

                coreElement.addEventListener(
                  'pick',
                  handleAction,
                )

                dispatchEvent(
                  coreElement,
                  'pick',
                  {
                    bubbles: true,
                    cancelable: true,
                  },
                )

                expect(handleAction).toHaveBeenCalled()
              },
            )
          },
        )
      },
    )
  },
)
