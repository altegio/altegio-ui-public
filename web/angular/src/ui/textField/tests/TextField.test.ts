import { describe, expect, it } from 'vitest'
import { YCoreTextFieldTagName as tagName } from '~shared/constants'
import { TestBed } from '~ng/tests/setup'
import { YTextField } from '~ng/ui/textField/TextField.component'
import { Component } from '@angular/core'
import type { IYNgTextFieldProps } from '~ng/ui/textField/models/types'

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
  props?: Partial<IYNgTextFieldProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YTextField, FormsModule] }).compileComponents()

  @Component({
    template: `
      <YTextField
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
      </YTextField>
    `,
    imports: [YTextField, FormsModule],
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

describe('Angular/YTextField/Unit', () => {
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
          `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
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
