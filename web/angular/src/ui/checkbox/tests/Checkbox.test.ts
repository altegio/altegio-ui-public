import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { text, empty, number } from '~shared/tests/slotContents'
import { AltCoreCheckboxTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { type IAltNgCheckboxProps } from '~ng/ui/checkbox/models/types'
import { AltCheckbox } from '~ng/ui/checkbox'
import { EAltCoreLabelAlignment } from '~core/ui/label/models/types'
import { EAltSizes } from '~shared/types/global'
import { FormsModule } from '@angular/forms'

interface ICreateComponentArgs {
  props?: Partial<IAltNgCheckboxProps>
}

const propIndeterminateTestCases: TPropTestCase<IAltNgCheckboxProps, 'indeterminate'>[] = [
  { prop: 'indeterminate', case: 'true', value: true, expected: true },
  { prop: 'indeterminate', case: 'false', value: false, expected: false },
  { prop: 'indeterminate', case: 'undefined', value: undefined, expected: false },
]

const propRequiredTestCases: TPropTestCase<IAltNgCheckboxProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: false },
]

const propSizeTestCases: TPropTestCase<IAltNgCheckboxProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EAltSizes.SMALL },
]

const propDisabledTestCases: TPropTestCase<IAltNgCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]

const propLabelTextTestCases: TPropTestCase<IAltNgCheckboxProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'text', value: text, expected: text },
  { prop: 'labelText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelTooltipTextTestCases: TPropTestCase<IAltNgCheckboxProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'text', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'empty string', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]

const propAnnotationTextTestCases: TPropTestCase<IAltNgCheckboxProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'text', value: text, expected: text },
  { prop: 'annotationText', case: 'empty string', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelOverflowDebounceTestCases: TPropTestCase<IAltNgCheckboxProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'text', value: number, expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: 300 },
]

const propAlignmentTestCases: TPropTestCase<IAltNgCheckboxProps, 'alignment'>[] = [
  { prop: 'alignment', case: EAltCoreLabelAlignment.TOP, value: EAltCoreLabelAlignment.TOP, expected: EAltCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EAltCoreLabelAlignment.CENTER, value: EAltCoreLabelAlignment.CENTER, expected: EAltCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: EAltCoreLabelAlignment.CENTER },
]

const propErrorsTestCases: TPropTestCase<IAltNgCheckboxProps, 'errors'>[] = [
  { prop: 'errors', case: 'array with errors', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'empty array', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: undefined },
]

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltCheckbox, FormsModule] }).compileComponents()

  @Component({
    template: `
      <AltCheckbox
        [ngModel]="checked"
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [annotationText]="annotationText"
        [size]="size"
        [disabled]="disabled"
        [required]="required"
        [indeterminate]="indeterminate"
        [alignment]="alignment"
        [labelOverflowDebounce]="labelOverflowDebounce"
        [errors]="errors"
      />`,
    imports: [AltCheckbox, FormsModule],
    standalone: true,
  })
  class TestComponent {
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    annotationText = props?.annotationText
    size = props?.size
    disabled = props?.disabled
    required = props?.required
    indeterminate = props?.indeterminate
    alignment = props?.alignment
    labelOverflowDebounce = props?.labelOverflowDebounce
    errors = props?.errors
  }
  return TestComponent
}

describe(
  'Angular/AltCheckbox',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propIndeterminateTestCases,
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
