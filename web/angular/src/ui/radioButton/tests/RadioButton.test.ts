import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreRadioButtonTagName as tagName } from '~shared/constants'
import { type IAltNgRadioButtonProps } from '~ng/ui/radioButton/models/types'
import { AltRadioButton } from '~ng/ui/radioButton'

import {
  propRequiredTestCases,
  propSizeTestCases,
  propDisabledTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propAnnotationTextTestCases,
  propLabelOverflowDebounceTestCases,
  propAlignmentTestCases,
  propErrorsTestCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IAltNgRadioButtonProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltRadioButton] }).compileComponents()

  @Component({
    template: `
      <AltRadioButton
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [annotationText]="annotationText"
        [size]="size"
        [checked]="checked"
        [disabled]="disabled"
        [required]="required"
        [alignment]="alignment"
        [labelOverflowDebounce]="labelOverflowDebounce"
        [errors]="errors"
      />`,
    imports: [AltRadioButton],
    standalone: true,
  })
  class TestComponent {
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    annotationText = props?.annotationText
    size = props?.size
    disabled = props?.disabled
    required = props?.required
    alignment = props?.alignment
    labelOverflowDebounce = props?.labelOverflowDebounce
    errors = props?.errors
  }
  return TestComponent
}

describe(
  'Angular/AltRadioButton',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propRequiredTestCases,
          ...propSizeTestCases,
          ...propDisabledTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propAnnotationTextTestCases,
          ...propLabelOverflowDebounceTestCases,
          ...propAlignmentTestCases,
          ...propErrorsTestCases,
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
  },
)
