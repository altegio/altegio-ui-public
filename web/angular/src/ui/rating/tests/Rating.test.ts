import { describe, expect, it, vi } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { FormControl, ReactiveFormsModule } from '@angular/forms'
import { AltCoreRatingTagName as tagName } from '~shared/constants'
import { AltRating } from '~ng/ui/rating'
import type { IAltNgRatingProps } from '~ng/ui/rating/models/types'
import type { AltCoreRating } from '~core/ui/rating'
import { EAltSizes } from '~shared/types/global'
import type { TPropTestCase } from '~shared/types/tests'

interface ICreateFixtureArgs {
  props?: Partial<IAltNgRatingProps>
  onValueChange?: (value: number) => void
}

const createFixture = async({ props, onValueChange }: ICreateFixtureArgs = {}) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltRating] }).compileComponents()

  @Component({
    template: `
      <AltRating
        [value]="value"
        [max]="max"
        [name]="name"
        [readonly]="readonly"
        [disabled]="disabled"
        [required]="required"
        [size]="size"
        [accessibleName]="accessibleName"
        (valueChange)="handleValueChange($event)"
      ></AltRating>
    `,
    imports: [AltRating],
    standalone: true,
  })
  class TestComponent {
    value = props?.value
    max = props?.max ?? 5
    name = props?.name
    readonly = props?.readonly
    disabled = props?.disabled
    required = props?.required
    size = props?.size
    accessibleName = props?.accessibleName

    handleValueChange(value: number) {
      onValueChange?.(value)
    }
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

const getCoreElement = (fixture: { nativeElement: HTMLElement }) => fixture.nativeElement.querySelector(tagName)!

const dispatchChange = (element: HTMLElement, value: number) => {
  element.dispatchEvent(new CustomEvent('change', { detail: { value }, bubbles: true, composed: true }))
}

type TPropKey = Exclude<keyof IAltNgRatingProps, 'value'> & keyof AltCoreRating

const propTestCases: TPropTestCase<Required<IAltNgRatingProps>, TPropKey>[] = [
  { prop: 'max', case: 'a number', value: 10 },
  { prop: 'name', case: 'with text', value: 'score' },
  { prop: 'readonly', case: 'true', value: true },
  { prop: 'disabled', case: 'true', value: true },
  { prop: 'required', case: 'true', value: true },
  { prop: 'size', case: 'large', value: EAltSizes.LARGE },
  { prop: 'accessibleName', case: 'with text', value: 'Service rating' },
]

describe(
  'Angular/AltRating',
  () => {
    for (const testCase of propTestCases) {
      it(
        `Input "${testCase.prop}" (${testCase.case}) should be set on the core component`,
        async() => {
          const fixture = await createFixture({ props: { [testCase.prop]: testCase.value } })

          expect(getCoreElement(fixture)[testCase.prop]).toBe(testCase.value)
        },
      )
    }

    it(
      'Input "value" should set the value',
      async() => {
        const fixture = await createFixture({ props: { value: 4 } })

        expect(getCoreElement(fixture).value).toBe(4)
      },
    )

    it(
      'The core "change" event should emit "valueChange" once',
      async() => {
        const onValueChange = vi.fn()
        const fixture = await createFixture({ onValueChange })

        dispatchChange(getCoreElement(fixture), 3)

        expect(onValueChange).toHaveBeenCalledTimes(1)
        expect(onValueChange).toHaveBeenCalledWith(3)
      },
    )

    it(
      'Should work as a form control',
      async() => {
        TestBed.resetTestingModule()
        await TestBed.configureTestingModule({ imports: [AltRating, ReactiveFormsModule] }).compileComponents()

        @Component({
          template: '<AltRating [formControl]="control"></AltRating>',
          imports: [AltRating, ReactiveFormsModule],
          standalone: true,
        })
        class FormTestComponent {
          control = new FormControl<number | null>(2)
        }

        const fixture = TestBed.createComponent(FormTestComponent)
        fixture.detectChanges()
        await fixture.whenStable()

        const coreElement = getCoreElement(fixture)

        expect(coreElement.value).toBe(2)

        dispatchChange(coreElement, 5)

        expect(fixture.componentInstance.control.value).toBe(5)
        expect(fixture.componentInstance.control.touched).toBe(true)

        fixture.componentInstance.control.disable()
        fixture.detectChanges()
        await fixture.whenStable()

        expect(coreElement.disabled).toBe(true)
      },
    )
  },
)
