import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreCalendarTagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { YCalendar } from '~ng/ui/calendar'
import type { IYNgCalendarProps } from '~ng/ui/calendar/models/types'

const tagName = YCoreCalendarTagName

interface ICreateComponentArgs {
  props?: Partial<IYNgCalendarProps>
}
const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YCalendar] }).compileComponents()

  @Component({
    template: `
      <YCalendar
        [disabled]="disabled"
        [headerSelectors]="headerSelectors"
        [date]="date"
        [minDate]="minDate"
        [maxDate]="maxDate"
        [isRange]="isRange"
      ></YCalendar>`,
    imports: [YCalendar],
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
const propDisabledTestCases: TPropTestCase<IYNgCalendarProps, 'disabled'>[] = [
  { prop: 'disabled', case: '', value: true, expected: true },
  { prop: 'disabled', case: '', value: false, expected: false },
  { prop: 'disabled', case: '', value: undefined, expected: false },
]
const propHeaderSelectorsTestCases: TPropTestCase<IYNgCalendarProps, 'headerSelectors'>[] = [
  { prop: 'headerSelectors', case: '', value: true, expected: true },
  { prop: 'headerSelectors', case: '', value: false, expected: false },
  { prop: 'headerSelectors', case: '', value: undefined, expected: true },
]
const propDateTestCases: TPropTestCase<IYNgCalendarProps, 'date'>[] = [
  { prop: 'date', case: '', value: text, expected: text },
  { prop: 'date', case: '', value: empty, expected: empty },
  { prop: 'date', case: '', value: undefined, expected: undefined },
]
const propMinDateTestCases: TPropTestCase<IYNgCalendarProps, 'minDate'>[] = [
  { prop: 'minDate', case: '', value: text, expected: text },
  { prop: 'minDate', case: '', value: empty, expected: empty },
  { prop: 'minDate', case: '', value: undefined, expected: undefined },
]
const propMaxDateTestCases: TPropTestCase<IYNgCalendarProps, 'maxDate'>[] = [
  { prop: 'maxDate', case: '', value: text, expected: text },
  { prop: 'maxDate', case: '', value: empty, expected: empty },
  { prop: 'maxDate', case: '', value: undefined, expected: undefined },
]
const isRange: TPropTestCase<IYNgCalendarProps, 'isRange'>[] = [
  { prop: 'isRange', case: '', value: true, expected: true },
  { prop: 'isRange', case: '', value: false, expected: false },
  { prop: 'isRange', case: '', value: undefined, expected: false },
]

describe(
  'Angular/YCalendar',
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
                `Prop "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
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
