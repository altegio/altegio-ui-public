import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'
import type { IAltNgSimpleRadioButtonProps } from '~ng/ui/simpleRadioButton/models/types'
import {
  propSizeTestCases,
  propDisabledTestCases,
  propHoveredTestCases,
  propErrorTestCases,
} from './cases/props'
import { AltSimpleRadioButton } from '~ng/ui/simpleRadioButton'

interface ICreateComponentArgs {
  props?: Partial<IAltNgSimpleRadioButtonProps>
}


const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltSimpleRadioButton] }).compileComponents()

  @Component({
    template: `
      <AltSimpleRadioButton
      [size]="size"
      [disabled]="disabled"
      [hovered]="hovered"
      [error]="error"
      [ngModel]="ngModel"
      />`,
    imports: [AltSimpleRadioButton],
    standalone: true,
  })
  class TestComponent {
    size = props?.size
    disabled = props?.disabled
    hovered = props?.hovered
    error = props?.error
  }
  return TestComponent
}

describe(
  'Angular/AltSimpleRadioButton',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
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
