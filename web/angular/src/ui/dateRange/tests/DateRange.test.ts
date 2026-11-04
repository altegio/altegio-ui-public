import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { AltCoreDateRangeTagName as tagName } from '~shared/constants'
import { AltDateRange } from '~ng/ui/dateRange'
import type { IAltNgDateRangeProps, TAltNgDateRangeValue } from '~ng/ui/dateRange/models/types'
import type { AltCoreDateRange } from '~core/ui/dateRange'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

interface ICreateFixtureArgs {
  props?: Partial<IAltNgDateRangeProps>
  onValueChange?: (value: TAltNgDateRangeValue) => void
}

const createFixture = async({ props, onValueChange }: ICreateFixtureArgs = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltDateRange] }).compileComponents()

  @Component({
    template: `
      <AltDateRange
        [value]="value"
        [labelText]="labelText"
        [annotationText]="annotationText"
        [placeholder]="placeholder"
        [name]="name"
        [required]="required"
        [disabled]="disabled"
        [readonly]="readonly"
        [error]="error"
        [errors]="errors"
        [size]="size"
        [minDate]="minDate"
        [maxDate]="maxDate"
        (valueChange)="handleValueChange($event)"
      ></AltDateRange>
    `,
    imports: [AltDateRange],
    standalone: true,
  })
  class TestComponent {
    value = props?.value
    labelText = props?.labelText
    annotationText = props?.annotationText
    placeholder = props?.placeholder
    name = props?.name
    required = props?.required
    disabled = props?.disabled
    readonly = props?.readonly
    error = props?.error
    errors = props?.errors
    size = props?.size
    minDate = props?.minDate
    maxDate = props?.maxDate
    handleValueChange = (value: TAltNgDateRangeValue) => onValueChange?.(value)
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

const getCoreElement = (fixture: { nativeElement: HTMLElement }) => fixture.nativeElement.querySelector(tagName)!

const dispatchChange = (element: HTMLElement, detail: TAltNgDateRangeValue) => {
  element.dispatchEvent(new CustomEvent('change', { detail, bubbles: true, composed: true }))
}

type TPropKey = Exclude<keyof IAltNgDateRangeProps, 'value'> & keyof AltCoreDateRange

const propTestCases: TPropTestCase<Required<IAltNgDateRangeProps>, TPropKey>[] = [
  { prop: 'labelText', case: 'with text', value: 'Period' },
  { prop: 'annotationText', case: 'with text', value: 'Hint' },
  { prop: 'placeholder', case: 'with text', value: 'Pick a period' },
  { prop: 'name', case: 'with text', value: 'period' },
  { prop: 'required', case: 'true', value: true },
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'error', case: 'true', value: true },
  { prop: 'errors', case: 'with messages', value: ['Error'] },
  { prop: 'size', case: 'small', value: EAltSizes.SMALL },
  { prop: 'minDate', case: 'a date', value: '2025-01-01' },
  { prop: 'maxDate', case: 'a date', value: '2025-12-31' },
]

describe(
  'Angular/AltDateRange',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Input "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        async() => {
          const fixture = await createFixture({ props: { [testCase.prop]: testCase.value } })

          expect(getCoreElement(fixture)[testCase.prop]).toEqual(testCase.value)
        },
      )
    }

    it(
      'Input "readonly" should set the readonly attribute',
      async() => {
        const fixture = await createFixture({ props: { readonly: true } })

        expect(getCoreElement(fixture).readonly).toBe(true)
      },
    )

    it(
      'Input "value" should set "from" and "to"',
      async() => {
        const fixture = await createFixture({ props: { value: { from: '2025-07-08', to: '2025-07-09' } } })

        const coreElement = getCoreElement(fixture)

        expect(coreElement.from).toBe('2025-07-08')
        expect(coreElement.to).toBe('2025-07-09')
      },
    )

    it(
      'The core "change" event should emit "valueChange" once',
      async() => {
        const onValueChange = vi.fn()
        const fixture = await createFixture({ onValueChange })

        const detail = { from: '2025-07-08', to: '2025-07-09' }

        dispatchChange(getCoreElement(fixture), detail)

        expect(onValueChange).toHaveBeenCalledTimes(1)
        expect(onValueChange).toHaveBeenCalledWith(detail)
      },
    )

    it(
      'Should work as a form control',
      async() => {
        TestBed.resetTestingModule()
        await TestBed.configureTestingModule({ imports: [AltDateRange, ReactiveFormsModule] }).compileComponents()

        @Component({
          template: '<AltDateRange [formControl]="control"></AltDateRange>',
          imports: [AltDateRange, ReactiveFormsModule],
          standalone: true,
        })
        class FormTestComponent {
          control = new FormControl<TAltNgDateRangeValue | null>({ from: '2025-07-08', to: '2025-07-09' })
        }

        const fixture = TestBed.createComponent(FormTestComponent)
        fixture.detectChanges()
        await fixture.whenStable()

        const coreElement = getCoreElement(fixture)

        expect(coreElement.from).toBe('2025-07-08')

        dispatchChange(coreElement, { from: '2025-08-01', to: '2025-08-10' })

        expect(fixture.componentInstance.control.value).toEqual({ from: '2025-08-01', to: '2025-08-10' })
        expect(fixture.componentInstance.control.touched).toBe(false)
        coreElement.dispatchEvent(new FocusEvent('focusout', { bubbles: true, composed: true }))
        expect(fixture.componentInstance.control.touched).toBe(true)

        fixture.componentInstance.control.disable()
        fixture.detectChanges()
        await fixture.whenStable()

        expect(coreElement.disabled).toBe(true)
      },
    )
  },
)
