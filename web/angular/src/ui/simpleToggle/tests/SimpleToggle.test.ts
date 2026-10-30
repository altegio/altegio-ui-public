import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreSimpleToggleTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgSimpleToggleProps, type IAltNgSimpleToggleProps } from '~ng/ui/simpleToggle/models/types'
import { AltSimpleToggle } from '~ng/ui/simpleToggle'
import { EAltSizes } from '~shared/types/global'

interface ICreateComponentArgs {
  props?: Partial<IAltNgSimpleToggleProps>
}

const {
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
  checked: defaultChecked,
} = createNgSimpleToggleProps()

const propSizeTestCases: TPropTestCase<IAltNgSimpleToggleProps, 'size'>[] = [
  { prop: 'size', case: EAltSizes.SMALL, value: EAltSizes.SMALL, expected: EAltSizes.SMALL },
  { prop: 'size', case: EAltSizes.MEDIUM, value: EAltSizes.MEDIUM, expected: EAltSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propDisabledTestCases: TPropTestCase<IAltNgSimpleToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propHoveredTestCases: TPropTestCase<IAltNgSimpleToggleProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

const propCheckedTestCases: TPropTestCase<IAltNgSimpleToggleProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
  { prop: 'checked', case: 'undefined', value: undefined, expected: defaultChecked },
]

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltSimpleToggle] }).compileComponents()

  @Component({
    template: `
      <AltSimpleToggle
        [size]="size"
        [disabled]="disabled"
        [hovered]="hovered"
        [checked]="checked"
      />`,
    imports: [AltSimpleToggle],
    standalone: true,
  })
  class TestComponent {
    size = props?.size
    disabled = props?.disabled
    hovered = props?.hovered
    checked = props?.checked
  }
  return TestComponent
}

describe(
  'Angular/AltSimpleToggle',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propSizeTestCases,
          ...propDisabledTestCases,
          ...propHoveredTestCases,
          ...propCheckedTestCases,
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
