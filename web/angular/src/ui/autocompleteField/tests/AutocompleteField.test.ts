import { describe, expect, it, vi } from 'vitest'
import { YCoreAutocompleteFieldTagName as tagName } from '~shared/constants'
import { ngInputEvents } from './cases/events'
import {
  propAnnotationTextTestCases,
  propAutofocusTestCases,
  propMinSearchLengthTestCases,
  propDisabledTestCases,
  propErrorsTestCases,
  propDisabledAutocompleteTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propSearchFunctionTestCases,
  propNameTestCases,
  propPlaceholderTestCases,
  propRequiredTestCases,
  propSizeTestCases,
  propValueTestCases,
} from './cases/props'
import { TestBed } from '~ng/tests/setup'
import { YAutocompleteField } from '~ng/ui/autocompleteField'
import { Component } from '@angular/core'
import type { IYNgAutocompleteFieldProps } from '~ng/ui/autocompleteField/models/types'
import { dispatchEvent } from '~shared/tests/utils'

interface ICreateComponentArgs {
  props?: Partial<IYNgAutocompleteFieldProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YAutocompleteField] }).compileComponents()

  @Component({
    template: `
      <YAutocompleteField
          [value]="value"
          [name]="name"
          [placeholder]="placeholder"
          [autofocus]="autofocus"
          [disabled]="disabled"
          [size]="size"
          [required]="required"
          [annotationText]="annotationText"
          [minSearchLength]="minSearchLength"
          [withoutCodeSelection]="withoutCodeSelection"
          [disabledAutocomplete]="disabledAutocomplete"
          [searchFunction]="searchFunction"
          [countries]="countries"
          [defaultCountryId]="defaultCountryId"
          [labelText]="labelText"
          [labelTooltipText]="labelTooltipText"
          [annotationText]="annotationText"
          [errors]="errors"
          (selectOption)="onSelectOption($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (change)="onChange($event)"
        />`,
    imports: [YAutocompleteField],
    standalone: true,
  })
  class TestComponent {
    value = props?.value
    name = props?.name
    placeholder = props?.placeholder
    autofocus = props?.autofocus
    disabled = props?.disabled
    errors = props?.errors
    size = props?.size
    required = props?.required
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    annotationText = props?.annotationText
    minSearchLength = props?.minSearchLength
    searchFunction = props?.searchFunction
    disabledAutocomplete = props?.disabledAutocomplete

    onSelectOption = vi.fn()
    onFocus = vi.fn()
    onBlur = vi.fn()
    onChange = vi.fn()
  }
  return TestComponent
}


describe(
  'Angular/YAutocompleteField',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propValueTestCases,
          ...propNameTestCases,
          ...propPlaceholderTestCases,
          ...propAutofocusTestCases,
          ...propMinSearchLengthTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propAnnotationTextTestCases,
          ...propDisabledAutocompleteTestCases,
          ...propErrorsTestCases,
          ...propSearchFunctionTestCases,
          ...propRequiredTestCases,
          ...propSizeTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            async() => {
              const component = await createComponent({ props: { value: '', [testCase.prop]: testCase.value } })
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
        for (const { eventName, case: eventCase } of ngInputEvents) {
          it(
            `Должен вызывать событие "${eventName}" ${eventCase}`,
            async() => {
              const handleAction = vi.fn()
              const component = await createComponent({ props: {} })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()
              const coreInput = (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement

              coreInput.addEventListener(
                eventName,
                handleAction,
              )

              dispatchEvent(
                coreInput,
                eventName,
                {
                  bubbles: true,
                  cancelable: true,
                },
              )

              expect(handleAction).toHaveBeenCalled()
            },
          )
        }
      },
    )
  },
)
