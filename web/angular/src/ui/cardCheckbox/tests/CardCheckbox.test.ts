import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreCardCheckboxTagName as tagName } from '~shared/constants'
import { AltCardCheckbox } from '~ng/ui/cardCheckbox'
import type { IAltNgCardCheckboxProps } from '~ng/ui/cardCheckbox/models/types'

import {
  propCheckedCases,
  propDisabledCases,
  propSizeCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IAltNgCardCheckboxProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltCardCheckbox] }).compileComponents()

  @Component({
    template: `<AltCardCheckbox
      [checked]="checked"
      [disabled]="disabled"
      [size]="size"
    ></AltCardCheckbox>`,
    imports: [AltCardCheckbox],
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
  'Angular/AltCardCheckbox/Unit',
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
            `Prop: "${testCase.prop}" should set ${testCase.prop} on the core component`,
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
