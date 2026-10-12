import { describe, expect, it, vi } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreTextFieldTagName as tagName } from '~shared/constants'
import { YSearchField } from '~ng/ui/searchField'
import { type IYNgSearchFieldProps } from '~ng/ui/searchField/models/types'
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
  props?: Partial<IYNgSearchFieldProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YSearchField, FormsModule] }).compileComponents()

  @Component({
    template: `
      <YSearchField
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
    imports: [YSearchField, FormsModule],
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
  'Angular/YSearchField',
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
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
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

    // TODO: Написать тесты для событий
  },
)
