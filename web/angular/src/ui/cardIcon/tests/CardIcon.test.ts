import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreCardIconTagName as tagName } from '~shared/constants'
import { AltCardIcon } from '~ng/ui/cardIcon'
import type { IAltNgCardIconProps } from '~ng/ui/cardIcon/models/types'

import {
  propDisabledCases,
  propSizeCases,
  propVariantCases,
  propHeaderIconCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IAltNgCardIconProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltCardIcon] }).compileComponents()

  @Component({
    template: `<AltCardIcon
      [disabled]="disabled"
      [size]="size"
      [icon]="icon"
      [variant]="variant"
    ></AltCardIcon>`,
    imports: [AltCardIcon],
    standalone: true,
  })
  class TestComponent {
    disabled = props?.disabled
    size = props?.size
    icon = props?.icon
    variant = props?.variant
  }
  return TestComponent
}

describe(
  'Angular/AltCardIcon/Unit',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledCases,
          ...propSizeCases,
          ...propVariantCases,
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
        for (const testCase of propHeaderIconCases) {
          it(
            `Prop: "${testCase.prop}" should set ${testCase.prop} on the core component`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
              expect(coreElement?.icon.name).toBe(testCase.value.name)
            },
          )
        }
      },
    )
  },
)
