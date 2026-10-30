import { describe, expect, it, vi } from 'vitest'
import { AltCoreSelectFieldTagName as tagName } from '~web/shared/constants'
import { ngInputEvents } from './cases/events'
import {
  propAnnotationTextTestCases,
  propAutofocusTestCases,
  propDisabledTestCases,
  propErrorsTestCases, propErrorTestCases,
  propFilterCallbackTestCases, propIsCustomFilterTestCases, propIsFilterableTestCases, propIsMapOptionsTestCases,
  propItemLabelTestCases,
  propItemsTestCases,
  propItemValueTestCases, propLabelDebounceTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propNameTestCases,
  propPlaceholderTestCases,
  propReadonlyTestCases,
  propRequiredTestCases,
  propSizeTestCases,
  propValueTestCases,
} from './cases/props'
import { TestBed } from '~ng/tests/setup'
import { AltSelectField } from '~ng/ui/selectField'
import { Component } from '@angular/core'
import type { IAltNgSelectFieldProps } from '~ng/ui/selectField/models/types'
import { dispatchEvent } from '~shared/tests/utils'

interface ICreateComponentArgs {
  props?: Partial<IAltNgSelectFieldProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltSelectField] }).compileComponents()

  @Component({
    template: `
      <AltSelectField
          [value]="value"
          [name]="name"
          [placeholder]="placeholder"
          [autofocus]="autofocus"
          [disabled]="disabled"
          [readonly]="readonly"
          [required]="required"
          [errors]="errors"
          [size]="size"
          [error]="error"
          [labelDebounce]="labelDebounce"
          [isMapOptions]="isMapOptions"
          [labelText]="labelText"
          [labelTooltipText]="labelTooltipText"
          [annotationText]="annotationText"
          [items]="items"
          [itemLabel]="itemLabel"
          [itemValue]="itemValue"
          [isCustomFilter]="isCustomFilter"
          [isFilterable]="isFilterable"
          [filterCallback]="filterCallback"
          (input)="onInput($event)"
          (focus)="onFocus($event)"
          (blur)="onBlur($event)"
          (select)="onSelect($event)"
        />`,
    imports: [AltSelectField],
    standalone: true,
  })
  class TestComponent {
    value = props?.value
    name = props?.name
    placeholder = props?.placeholder
    autofocus = props?.autofocus
    disabled = props?.disabled
    readonly = props?.readonly
    required = props?.required
    errors = props?.errors
    size = props?.size
    error = props?.error
    labelDebounce = props?.labelDebounce
    isMapOptions = props?.isMapOptions
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    annotationText = props?.annotationText
    items = props?.items
    itemLabel = props?.itemLabel
    itemValue = props?.itemValue
    isCustomFilter = props?.isCustomFilter
    isFilterable = props?.isFilterable
    filterCallback = props?.filterCallback

    onSelect = vi.fn()
    onFocus = vi.fn()
    onBlur = vi.fn()
    onInput = vi.fn()
  }
  return TestComponent
}


describe(
  'Angular/AltSelectField',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propValueTestCases,
          ...propNameTestCases,
          ...propPlaceholderTestCases,
          ...propAutofocusTestCases,
          ...propItemLabelTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propAnnotationTextTestCases,
          ...propItemValueTestCases,
          ...propErrorsTestCases,
          ...propItemsTestCases,
          ...propReadonlyTestCases,
          ...propFilterCallbackTestCases,
          ...propRequiredTestCases,
          ...propSizeTestCases,
          ...propIsCustomFilterTestCases,
          ...propIsFilterableTestCases,
          ...propIsMapOptionsTestCases,
          ...propErrorTestCases,
          ...propLabelDebounceTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toStrictEqual(testCase.expected)
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
            `Should emit "${eventName}" ${eventCase}`,
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
