import { describe, expect, it, vi } from 'vitest'
import { YCorePhoneFieldTagName as tagName } from '~shared/constants'
import { ngInputEvents } from './cases/events'
import {
  propAnnotationTextTestCases,
  propAutofocusTestCases, propMinSearchLengthTestCases,
  propDisabledTestCases, propErrorsTestCases,
  propDisabledAutocompleteTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases, propWithoutCodeSelectionTestCases, propSearchFunctionTestCases,
  propDefaultCountryIdTestCases,
  propNameTestCases,
  propPlaceholderTestCases, propReadonlyTestCases, propRequiredTestCases, propSizeTestCases,
  propValueTestCases,
} from './cases/props'
import { TestBed } from '~ng/tests/setup'
import { YPhoneField } from '~ng/ui/phoneField'
import { Component } from '@angular/core'
import type { IYNgPhoneFieldProps } from '~ng/ui/phoneField/models/types'
import { dispatchEvent } from '~shared/tests/utils'

interface ICreateComponentArgs {
  props?: Partial<IYNgPhoneFieldProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YPhoneField] }).compileComponents()

  @Component({
    template: `
      <YPhoneField
          [value]="value"
          [name]="name"
          [placeholder]="placeholder"
          [autofocus]="autofocus"
          [disabled]="disabled"
          [readonly]="readonly"
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
    imports: [YPhoneField],
    standalone: true,
  })
  class TestComponent {
    value = props?.value
    name = props?.name
    placeholder = props?.placeholder
    autofocus = props?.autofocus
    disabled = props?.disabled
    readonly = props?.readonly
    errors = props?.errors
    size = props?.size
    required = props?.required
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    annotationText = props?.annotationText
    minSearchLength = props?.minSearchLength
    searchFunction = props?.searchFunction
    disabledAutocomplete = props?.disabledAutocomplete
    countries = props?.countries
    defaultCountryId = props?.defaultCountryId
    withoutCodeSelection = props?.withoutCodeSelection

    onSelectOption = vi.fn()
    onFocus = vi.fn()
    onBlur = vi.fn()
    onChange = vi.fn()
  }
  return TestComponent
}


describe(
  'Angular/YPhoneField',
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
          ...propWithoutCodeSelectionTestCases,
          ...propReadonlyTestCases,
          ...propSearchFunctionTestCases,
          ...propRequiredTestCases,
          ...propSizeTestCases,
          ...propDefaultCountryIdTestCases,
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
