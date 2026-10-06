import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { text, empty, number } from '~shared/tests/slotContents'
import { YCoreCheckboxTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { type IYNgCheckboxProps } from '~ng/ui/checkbox/models/types'
import { YCheckbox } from '~ng/ui/checkbox'
import { EYCoreLabelAlignment } from '~core/ui/label/models/types'
import { EYSizes } from '~shared/types/global'
import { FormsModule } from '@angular/forms'

interface ICreateComponentArgs {
  props?: Partial<IYNgCheckboxProps>
}

const propIndeterminateTestCases: TPropTestCase<IYNgCheckboxProps, 'indeterminate'>[] = [
  { prop: 'indeterminate', case: 'true', value: true, expected: true },
  { prop: 'indeterminate', case: 'false', value: false, expected: false },
  { prop: 'indeterminate', case: 'undefined', value: undefined, expected: false },
]

const propRequiredTestCases: TPropTestCase<IYNgCheckboxProps, 'required'>[] = [
  { prop: 'required', case: 'true', value: true, expected: true },
  { prop: 'required', case: 'false', value: false, expected: false },
  { prop: 'required', case: 'undefined', value: undefined, expected: false },
]

const propSizeTestCases: TPropTestCase<IYNgCheckboxProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: EYSizes.SMALL },
]

const propDisabledTestCases: TPropTestCase<IYNgCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: false },
]

const propLabelTextTestCases: TPropTestCase<IYNgCheckboxProps, 'labelText'>[] = [
  { prop: 'labelText', case: 'текст', value: text, expected: text },
  { prop: 'labelText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelTooltipTextTestCases: TPropTestCase<IYNgCheckboxProps, 'labelTooltipText'>[] = [
  { prop: 'labelTooltipText', case: 'текст', value: text, expected: text },
  { prop: 'labelTooltipText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'labelTooltipText', case: 'undefined', value: undefined, expected: empty },
]

const propAnnotationTextTestCases: TPropTestCase<IYNgCheckboxProps, 'annotationText'>[] = [
  { prop: 'annotationText', case: 'текст', value: text, expected: text },
  { prop: 'annotationText', case: 'пустая строка', value: empty, expected: empty },
  { prop: 'annotationText', case: 'undefined', value: undefined, expected: empty },
]

const propLabelOverflowDebounceTestCases: TPropTestCase<IYNgCheckboxProps, 'labelOverflowDebounce'>[] = [
  { prop: 'labelOverflowDebounce', case: 'текст', value: number, expected: number },
  { prop: 'labelOverflowDebounce', case: 'undefined', value: undefined, expected: 300 },
]

const propAlignmentTestCases: TPropTestCase<IYNgCheckboxProps, 'alignment'>[] = [
  { prop: 'alignment', case: EYCoreLabelAlignment.TOP, value: EYCoreLabelAlignment.TOP, expected: EYCoreLabelAlignment.TOP },
  { prop: 'alignment', case: EYCoreLabelAlignment.CENTER, value: EYCoreLabelAlignment.CENTER, expected: EYCoreLabelAlignment.CENTER },
  { prop: 'alignment', case: 'undefined', value: undefined, expected: EYCoreLabelAlignment.CENTER },
]

const propErrorsTestCases: TPropTestCase<IYNgCheckboxProps, 'errors'>[] = [
  { prop: 'errors', case: 'массив с ошибками', value: ['error'], expected: ['error'] },
  { prop: 'errors', case: 'пустой массив', value: [], expected: [] },
  { prop: 'errors', case: 'undefined', value: undefined, expected: undefined },
]

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YCheckbox, FormsModule] }).compileComponents()

  @Component({
    template: `
      <YCheckbox
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
    imports: [YCheckbox, FormsModule],
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
  'Angular/YCheckbox',
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
  },
)
