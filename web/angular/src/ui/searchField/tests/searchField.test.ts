import { describe, expect, it, vi } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreTextFieldTagName as tagName } from '~shared/constants'
import { AltSearchField } from '~ng/ui/searchField'
import { type IAltNgSearchFieldProps } from '~ng/ui/searchField/models/types'
import {
  propPlaceholderTestCases,
  propAutofocusTestCases,
  propDisabledTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propLabelDebounceTestCases,
  propErrorTestCases,
  propErrorsTestCases,
  propSizeTestCases,
} from './cases/props'
import { FormsModule } from '@angular/forms'

interface ICreateComponentArgs {
  props?: Partial<IAltNgSearchFieldProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltSearchField, FormsModule] }).compileComponents()

  @Component({
    template: `
      <AltSearchField
        (ngModelChange)="onModelChange($event)"
        (focus)="handleFocus($event)"
        (blur)="handleBlur($event)"
        (clear)="handleClear($event)"
        [ngModel]="value"
        [name]="name"
        [placeholder]="placeholder"
        [autofocus]="autofocus"
        [disabled]="disabled"
        [readonly]="readonly"
        [maxlength]="maxlength"
        [error]="error"
        [errors]="errors"
        [size]="size"
        [required]="required"
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [labelDebounce]="labelDebounce"
        [annotationText]="annotationText"
      />`,
    imports: [AltSearchField, FormsModule],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    placeholder = props?.placeholder
    autofocus = props?.autofocus
    disabled = props?.disabled
    error = props?.error
    errors = props?.errors
    size = props?.size
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    labelDebounce = props?.labelDebounce
    annotationText = props?.annotationText

    onModelChange = vi.fn()
    handleFocus = vi.fn()
    handleBlur = vi.fn()
    handleClear = vi.fn()
  }
  return TestComponent
}

describe(
  'Angular/AltSearchField',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propPlaceholderTestCases,
          ...propAutofocusTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propLabelDebounceTestCases,
          ...propErrorTestCases,
          ...propErrorsTestCases,
          ...propSizeTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const nativeElement = fixture.nativeElement as HTMLElement | null
              if (!nativeElement) throw new Error('nativeElement is undefined')
              const coreElement = nativeElement.querySelector(tagName)

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

    // TODO: Add event tests
  },
)
