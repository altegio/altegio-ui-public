import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreCardCheckboxTagName as tagName } from '~shared/constants'
import { YCardCheckbox } from '~ng/ui/cardCheckbox'
import type { IYNgCardCheckboxProps } from '~ng/ui/cardCheckbox/models/types'

import {
  propCheckedCases,
  propDisabledCases,
  propSizeCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IYNgCardCheckboxProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YCardCheckbox] }).compileComponents()

  @Component({
    template: `<YCardCheckbox
      [checked]="checked"
      [disabled]="disabled"
      [size]="size"
    ></YCardCheckbox>`,
    imports: [YCardCheckbox],
    standalone: true,
  })
  class TestComponent {
    checked = props?.checked
    disabled = props?.disabled
    size = props?.size
  }
  return TestComponent
}

describe(
  'Angular/YCardCheckbox/Unit',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propCheckedCases,
          ...propDisabledCases,
          ...propSizeCases,
        ]) {
          it(
            `Prop: "${testCase.prop}" должен изменить свойство ${testCase.prop} у core компонента`,
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
