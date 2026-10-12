import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreSimpleCheckboxTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgSimpleCheckboxProps, type IYNgSimpleCheckboxProps } from '~ng/ui/simpleCheckbox/models/types'
import { YSimpleCheckbox } from '~ng/ui/simpleCheckbox'
import { EYSizes } from '~shared/types/global'

interface ICreateComponentArgs {
  props?: Partial<IYNgSimpleCheckboxProps>
}

const {
  indeterminate: defaultIndeterminate,
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
  error: defaultError,
} = createNgSimpleCheckboxProps()

const propIndeterminateTestCases: TPropTestCase<IYNgSimpleCheckboxProps, 'indeterminate'>[] = [
  { prop: 'indeterminate', case: 'true', value: true, expected: true },
  { prop: 'indeterminate', case: 'false', value: false, expected: false },
  { prop: 'indeterminate', case: 'undefined', value: undefined, expected: defaultIndeterminate },
]

const propSizeTestCases: TPropTestCase<IYNgSimpleCheckboxProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propDisabledTestCases: TPropTestCase<IYNgSimpleCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propHoveredTestCases: TPropTestCase<IYNgSimpleCheckboxProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false, ', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

const propErrorTestCases: TPropTestCase<IYNgSimpleCheckboxProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: defaultError },
]


const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YSimpleCheckbox] }).compileComponents()

  @Component({
    template: `
      <YSimpleCheckbox
      [indeterminate]="indeterminate"
      [size]="size"
      [disabled]="disabled"
      [hovered]="hovered"
      [error]="error"
      [checked]="checked"
      />`,
    imports: [YSimpleCheckbox],
    standalone: true,
  })
  class TestComponent {
    checked = props?.checked
    indeterminate = props?.indeterminate
    size = props?.size
    disabled = props?.disabled
    hovered = props?.hovered
    error = props?.error
  }
  return TestComponent
}

describe(
  'Angular/YSimpleCheckbox',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propIndeterminateTestCases,
          ...propSizeTestCases,
          ...propDisabledTestCases,
          ...propHoveredTestCases,
          ...propErrorTestCases,

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
