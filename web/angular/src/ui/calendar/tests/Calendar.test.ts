import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreCalendarTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { AltCalendar } from '~ng/ui/calendar'
import type { IAltNgCalendarProps } from '~ng/ui/calendar/models/types'

const tagName = AltCoreCalendarTagName

interface ICreateComponentArgs {
  props?: Partial<IAltNgCalendarProps>
}
const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltCalendar] }).compileComponents()

  @Component({
    template: `
      <AltCalendar
        [disabled]="disabled"
        [headerSelectors]="headerSelectors"
        [date]="date"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [isRange]="isRange"
      ></AltCalendar>`,
    imports: [AltCalendar],
    standalone: true,
  })
  class TestComponent {
    disabled = props?.disabled
    headerSelectors = props?.headerSelectors
    date = props?.date
    minDate = props?.minDate
    maxDate = props?.maxDate
    isRange = props?.isRange
  }
  return TestComponent
}

// Unit test cases:
const propDisabledTestCases: TPropTestCase<IAltNgCalendarProps, 'disabled'>[] = [
  { prop: 'disabled', case: '', value: true, expected: true },
  { prop: 'disabled', case: '', value: false, expected: false },
  { prop: 'disabled', case: '', value: undefined, expected: false },
]
const propHeaderSelectorsTestCases: TPropTestCase<IAltNgCalendarProps, 'headerSelectors'>[] = [
  { prop: 'headerSelectors', case: '', value: true, expected: true },
  { prop: 'headerSelectors', case: '', value: false, expected: false },
  { prop: 'headerSelectors', case: '', value: undefined, expected: true },
]
const propDateTestCases: TPropTestCase<IAltNgCalendarProps, 'date'>[] = [
  { prop: 'date', case: '', value: text, expected: text },
  { prop: 'date', case: '', value: empty, expected: empty },
  { prop: 'date', case: '', value: undefined, expected: undefined },
]
const propMinDateTestCases: TPropTestCase<IAltNgCalendarProps, 'minDate'>[] = [
  { prop: 'minDate', case: '', value: text, expected: text },
  { prop: 'minDate', case: '', value: empty, expected: empty },
  { prop: 'minDate', case: '', value: undefined, expected: undefined },
]
const propMaxDateTestCases: TPropTestCase<IAltNgCalendarProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: '', value: text, expected: text },
  { prop: 'maxDate', case: '', value: empty, expected: empty },
  { prop: 'maxDate', case: '', value: undefined, expected: undefined },
]
const isRange: TPropTestCase<IAltNgCalendarProps, 'isRange'>[] = [
  { prop: 'isRange', case: '', value: true, expected: true },
  { prop: 'isRange', case: '', value: false, expected: false },
  { prop: 'isRange', case: '', value: undefined, expected: false },
]

describe(
  'Angular/AltCalendar',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propDisabledTestCases,
              ...propHeaderSelectorsTestCases,
              ...propDateTestCases,
              ...propMinDateTestCases,
              ...propMaxDateTestCases,
              ...isRange,
            ]) {
              it(
                `Prop "${testCase.prop}" should set ${testCase.prop} on the core component`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
                  expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
                },
              )
            }
          },
        )
      },
    )
  },
)
