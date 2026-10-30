import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreFieldIconTagName as tagName } from '~shared/constants'
import { AltFieldIcon } from '~ng/ui/fieldIcon'
import type { IAltNgFieldIconProps } from '~ng/ui/fieldIcon/models/types'
import {
  propDisabledCases,
  propHoverableCases,
  propClickableCases,
  propSizeCases,
  propIconCases,
} from '~core/ui/fieldIcon/tests/cases/props'

interface ICreateComponentArgs {
  props?: Partial<IAltNgFieldIconProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltFieldIcon] }).compileComponents()

  @Component({
    template: `
      <AltFieldIcon
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
        [hoverable]="hoverable"
        [clickable]="clickable"
      ></AltFieldIcon>
    `,
    imports: [AltFieldIcon],
    standalone: true,
  })

  class TestComponent {
    disabled = props?.disabled
    size = props?.size
    icon = props?.icon
    hoverable = props?.hoverable
    clickable = props?.clickable
  }
  return TestComponent
}

describe(
  'Angular/AltFieldIcon/Unit',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledCases,
          ...propHoverableCases,
          ...propClickableCases,
          ...propSizeCases,
        ]) {
          it(
            `Prop "${testCase.prop}" should work ${testCase.case}`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toBe(testCase.value)
            },
          )
        }

        for (const testCase of [...propIconCases]) {
          it(
            `Prop "${testCase.prop}" should work ${testCase.case}`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toStrictEqual(testCase.value)
            },
          )
        }
      },
    )
  },
)
