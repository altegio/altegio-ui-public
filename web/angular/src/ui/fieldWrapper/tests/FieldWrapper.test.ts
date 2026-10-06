import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreFieldWrapperTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgFieldWrapperProps, type IYNgFieldWrapperProps } from '~ng/ui/fieldWrapper/models/types'
import { YFieldWrapper } from '~ng/ui/fieldWrapper'
import { EYSizes } from '~shared/types/global'

interface ICreateComponentArgs {
  props?: Partial<IYNgFieldWrapperProps>
}

const {
  disabled: defaultDisabled,
  error: defaultError,
  size: defaultSize,
  clickable: defaultClickable,
} = createNgFieldWrapperProps()

const propDisabledTestCases: TPropTestCase<IYNgFieldWrapperProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propErrorTestCases: TPropTestCase<IYNgFieldWrapperProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: defaultError },
]

const propSizeTestCases: TPropTestCase<IYNgFieldWrapperProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propClickableTestCases: TPropTestCase<IYNgFieldWrapperProps, 'clickable'>[] = [
  { prop: 'clickable', case: 'true', value: true, expected: true },
  { prop: 'clickable', case: 'false', value: false, expected: false },
  { prop: 'clickable', case: 'undefined', value: undefined, expected: defaultClickable },
]

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YFieldWrapper] }).compileComponents()

  @Component({
    template: `
      <YFieldWrapper
        [disabled]="disabled"
        [error]="error"
        [size]="size"
        [clickable]="clickable"
      />`,
    imports: [YFieldWrapper],
    standalone: true,
  })
  class TestComponent {
    disabled = props?.disabled
    error = props?.error
    size = props?.size
    clickable = props?.clickable
  }
  return TestComponent
}

describe(
  'Angular/YFieldWrapper',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledTestCases,
          ...propErrorTestCases,
          ...propSizeTestCases,
          ...propClickableTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              expect(coreElement?.[testCase.prop]).toBe(testCase.expected)
            },
          )
        }
      },
    )
  },
)
