import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreSimpleToggleTagName as tagName } from '~shared/constants'
import type { TPropTestCase } from '~shared/types/tests'
import { createNgSimpleToggleProps, type IYNgSimpleToggleProps } from '~ng/ui/simpleToggle/models/types'
import { YSimpleToggle } from '~ng/ui/simpleToggle'
import { EYSizes } from '~shared/types/global'

interface ICreateComponentArgs {
  props?: Partial<IYNgSimpleToggleProps>
}

const {
  size: defaultSize,
  disabled: defaultDisabled,
  hovered: defaultHovered,
  checked: defaultChecked,
} = createNgSimpleToggleProps()

const propSizeTestCases: TPropTestCase<IYNgSimpleToggleProps, 'size'>[] = [
  { prop: 'size', case: EYSizes.SMALL, value: EYSizes.SMALL, expected: EYSizes.SMALL },
  { prop: 'size', case: EYSizes.MEDIUM, value: EYSizes.MEDIUM, expected: EYSizes.MEDIUM },
  { prop: 'size', case: 'undefined', value: undefined, expected: defaultSize },
]

const propDisabledTestCases: TPropTestCase<IYNgSimpleToggleProps, 'disabled'>[] = [
  { prop: 'disabled', case: 'true', value: true, expected: true },
  { prop: 'disabled', case: 'false', value: false, expected: false },
  { prop: 'disabled', case: 'undefined', value: undefined, expected: defaultDisabled },
]

const propHoveredTestCases: TPropTestCase<IYNgSimpleToggleProps, 'hovered'>[] = [
  { prop: 'hovered', case: 'true', value: true, expected: true },
  { prop: 'hovered', case: 'false', value: false, expected: false },
  { prop: 'hovered', case: 'undefined', value: undefined, expected: defaultHovered },
]

const propCheckedTestCases: TPropTestCase<IYNgSimpleToggleProps, 'checked'>[] = [
  { prop: 'checked', case: 'true', value: true, expected: true },
  { prop: 'checked', case: 'false', value: false, expected: false },
  { prop: 'checked', case: 'undefined', value: undefined, expected: defaultChecked },
]

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YSimpleToggle] }).compileComponents()

  @Component({
    template: `
      <YSimpleToggle
        [size]="size"
        [disabled]="disabled"
        [hovered]="hovered"
        [checked]="checked"
      />`,
    imports: [YSimpleToggle],
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
  'Angular/YSimpleToggle',
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
