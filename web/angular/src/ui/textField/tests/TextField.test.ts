import { describe, expect, it } from 'vitest'
import { AltCoreTextFieldTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup'
import { AltTextField } from '~ng/ui/textField/TextField.component'
import { Component } from '@angular/core'
import type { IAltNgTextFieldProps } from '~ng/ui/textField/models/types'

import {
  propNameTestCases,
  propPlaceholderTestCases,
  propAnnotationTextTestCases,
  propLabelTooltipTextTestCases,
  propLabelTextTestCases,
  propsDisabledTestCases,
  propsRequiredTestCases,
  propsMaxlengthTestCases,
  propsLabelDebounceTestCases,
  propsAutofocusTestCases,
  propsClearableTestCases,
  propsSizeTestCases,
  propsTypeTestCases,
} from './cases/props'
import { FormsModule } from '@angular/forms'

interface ICreateComponentArgs {
  props?: Partial<IAltNgTextFieldProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltTextField, FormsModule] }).compileComponents()

  @Component({
    template: `
      <AltTextField
        [ngModel]="value"
        [name]="name"
        [placeholder]="placeholder"
        [autofocus]="autofocus"
        [type]="type"
        [disabled]="disabled"
        [readonly]="readonly"
        [maxlength]="maxlength"
        [errors]="errors"
        [clearable]="clearable"
        [size]="size"
        [required]="required"
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [labelDebounce]="labelDebounce"
        [annotationText]="annotationText"
      >
      </AltTextField>
    `,
    imports: [AltTextField, FormsModule],
    standalone: true,
  })
  class TestComponent {
    modelValue = ''
    name = props?.name
    placeholder = props?.placeholder
    autofocus = props?.autofocus
    type = props?.type
    disabled = props?.disabled
    readonly = props?.readonly
    maxlength = props?.maxlength
    errors = props?.errors
    clearable = props?.clearable
    size = props?.size
    required = props?.required
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    labelDebounce = props?.labelDebounce
    annotationText = props?.annotationText
  }
  return TestComponent
}

describe('Angular/AltTextField/Unit', () => {
  describe(
    'Props',
    () => {
      for (const testCase of [
        ...propNameTestCases,
        ...propPlaceholderTestCases,
        ...propAnnotationTextTestCases,
        ...propLabelTooltipTextTestCases,
        ...propLabelTextTestCases,
        ...propsDisabledTestCases,
        ...propsRequiredTestCases,
        ...propsMaxlengthTestCases,
        ...propsLabelDebounceTestCases,
        ...propsAutofocusTestCases,
        ...propsClearableTestCases,
        ...propsSizeTestCases,
        ...propsTypeTestCases,
      ]) {
        it(
          `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
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
})
