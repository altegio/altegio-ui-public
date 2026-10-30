import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreSimpleCheckboxTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgSimpleCheckboxProps, type IAltNgSimpleCheckboxProps } from '~ng/ui/simpleCheckbox/models/types'
import { AltSimpleCheckbox } from '~ng/ui/simpleCheckbox'
import { EAltSizes } from '~shared/types/global'

interface ICreateComponentArgs {
  props?: Partial<IAltNgSimpleCheckboxProps>
}

const {
  indeterminate: defaultIndeterminate,
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
  error: defaultError,
} = createNgSimpleCheckboxProps()

const propIndeterminateTestCases: TPropTestCase<IAltNgSimpleCheckboxProps, 'indeterminate'>[] = [
  { prop: 'indeterminate', case: 'true', value: true, expected: true },
  { prop: 'indeterminate', case: 'false', value: false, expected: false },
  { prop: 'indeterminate', case: 'undefined', value: undefined, expected: defaultIndeterminate },
]

const propSizeTestCases: TPropTestCase<IAltNgSimpleCheckboxProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propDisabledTestCases: TPropTestCase<IAltNgSimpleCheckboxProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propHoveredTestCases: TPropTestCase<IAltNgSimpleCheckboxProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false, ', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

const propErrorTestCases: TPropTestCase<IAltNgSimpleCheckboxProps, 'error'>[] = [
  { prop: 'error', case: 'true', value: true, expected: true },
  { prop: 'error', case: 'false', value: false, expected: false },
  { prop: 'error', case: 'undefined', value: undefined, expected: defaultError },
]


const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltSimpleCheckbox] }).compileComponents()

  @Component({
    template: `
      <AltSimpleCheckbox
      [indeterminate]="indeterminate"
      [size]="size"
      [disabled]="disabled"
      [hovered]="hovered"
      [error]="error"
      [checked]="checked"
      />`,
    imports: [AltSimpleCheckbox],
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
  'Angular/AltSimpleCheckbox',
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
