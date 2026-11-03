import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreFieldWrapperTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgFieldWrapperProps, type IAltNgFieldWrapperProps } from '~ng/ui/fieldWrapper/models/types'
import { AltFieldWrapper } from '~ng/ui/fieldWrapper'
import { EAltSizes } from '~shared/types/global'

interface ICreateComponentArgs {
  props?: Partial<IAltNgFieldWrapperProps>
}

const {
  disabled: defaultDisabled,
  error: defaultError,
  size: defaultSize,
  clickable: defaultClickable,
} = createNgFieldWrapperProps()

const propDisabledTestCases: TPropTestCase<IAltNgFieldWrapperProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propErrorTestCases: TPropTestCase<IAltNgFieldWrapperProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: defaultError },
]

const propSizeTestCases: TPropTestCase<IAltNgFieldWrapperProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propClickableTestCases: TPropTestCase<IAltNgFieldWrapperProps, 'clickable'>[] = [
  { prop: 'clickable', case: 'true', value: true, expected: true },
  { prop: 'clickable', case: 'false', value: false, expected: false },
  { prop: 'clickable', case: 'undefined', value: undefined, expected: defaultClickable },
]

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltFieldWrapper] }).compileComponents()

  @Component({
    template: `
      <AltFieldWrapper
        [disabled]="disabled"
        [error]="error"
        [size]="size"
        [clickable]="clickable"
      />`,
    imports: [AltFieldWrapper],
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
  'Angular/AltFieldWrapper',
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
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
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
