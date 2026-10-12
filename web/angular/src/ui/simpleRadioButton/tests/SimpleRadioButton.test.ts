import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreSimpleRadioButtonTagName as tagName } from '~shared/constants'
import type { IYNgSimpleRadioButtonProps } from '~ng/ui/simpleRadioButton/models/types'
import {
  propSizeTestCases,
  propDisabledTestCases,
  propHoveredTestCases,
  propErrorTestCases,
} from './cases/props'
import { YSimpleRadioButton } from '~ng/ui/simpleRadioButton'

interface ICreateComponentArgs {
  props?: Partial<IYNgSimpleRadioButtonProps>
}


const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YSimpleRadioButton] }).compileComponents()

  @Component({
    template: `
      <YSimpleRadioButton
      [size]="size"
      [disabled]="disabled"
      [hovered]="hovered"
      [error]="error"
      [ngModel]="ngModel"
      />`,
    imports: [YSimpleRadioButton],
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
  'Angular/YSimpleRadioButton',
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
