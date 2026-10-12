import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreRadioButtonGroupTagName as tagName } from '~shared/constants'
import { type IYNgRadioButtonGroupProps } from '~ng/ui/radioButtonGroup/models/types'
import { YRadioButtonGroup } from '~ng/ui/radioButtonGroup'

import {
  propSizeTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propDirectionTestCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IYNgRadioButtonGroupProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YRadioButtonGroup] }).compileComponents()

  @Component({
    template: `
      <YRadioButtonGroup
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [size]="size"
        [direction]="direction"
      />`,
    imports: [YRadioButtonGroup],
    standalone: true,
  })
  class TestComponent {
    labelText = props?.labelText
    labelTooltipText = props?.labelTooltipText
    size = props?.size
    direction = props?.direction
  }
  return TestComponent
}

describe(
  'Angular/YRadioButtonGroup',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propSizeTestCases,
          ...propLabelTextTestCases,
          ...propLabelTooltipTextTestCases,
          ...propDirectionTestCases,
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
