import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreCardRadioTagName as tagName } from '~shared/constants'
import { YCardRadio } from '~ng/ui/cardRadio'
import type { IYNgCardRadioProps } from '~ng/ui/cardRadio/models/types'

import {
  propCheckedCases,
  propDisabledCases,
  propSizeCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IYNgCardRadioProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YCardRadio] }).compileComponents()

  @Component({
    template: `<YCardRadio
      [checked]="checked"
      [disabled]="disabled"
      [size]="size"
    ></YCardRadio>`,
    imports: [YCardRadio],
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
  'Angular/YCardRadio/Unit',
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
