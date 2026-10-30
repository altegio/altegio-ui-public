import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreRadioButtonGroupTagName as tagName } from '~shared/constants'
import { type IAltNgRadioButtonGroupProps } from '~ng/ui/radioButtonGroup/models/types'
import { AltRadioButtonGroup } from '~ng/ui/radioButtonGroup'

import {
  propSizeTestCases,
  propLabelTextTestCases,
  propLabelTooltipTextTestCases,
  propDirectionTestCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IAltNgRadioButtonGroupProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltRadioButtonGroup] }).compileComponents()

  @Component({
    template: `
      <AltRadioButtonGroup
        [labelText]="labelText"
        [labelTooltipText]="labelTooltipText"
        [size]="size"
        [direction]="direction"
      />`,
    imports: [AltRadioButtonGroup],
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
  'Angular/AltRadioButtonGroup',
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
