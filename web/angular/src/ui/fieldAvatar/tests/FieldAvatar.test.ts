import { describe, expect, it } from 'vitest'
import { AltCoreFieldAvatarTagName as tagName } from '~web/shared/constants'
import { TestBed } from '~ng/tests/setup'
import { AltFieldAvatar } from '~ng/ui/fieldAvatar'
import { Component } from '@angular/core'
import type { IAltNgFieldAvatarProps } from '~ng/ui/fieldAvatar/models/types'
import {
  propDisabledTestCases, propIconTestCases,
  propInitialsTestCases,
  propPhotoTestCases,
  propSizeTestCases,
} from './cases/props'

interface ICreateComponentArgs {
  props?: Partial<IAltNgFieldAvatarProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltFieldAvatar] }).compileComponents()

  @Component({
    template: `
      <AltFieldAvatar
        [photo]="photo"
        [initials]="initials"
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
      />`,
    imports: [AltFieldAvatar],
    standalone: true,
  })
  class TestComponent {
    photo = props?.photo
    initials = props?.initials
    disabled = props?.disabled
    size = props?.size
    icon = props?.icon
  }
  return TestComponent
}


describe(
  'Angular/AltFieldAvatar',
  () => {
    describe(
      'Props',
      () => {
        for (const testCase of [
          ...propDisabledTestCases,
          ...propSizeTestCases,
          ...propInitialsTestCases,
          ...propPhotoTestCases,
          ...propIconTestCases,
        ]) {
          it(
            `Prop "${testCase.prop}" (${testCase.case}) should set ${testCase.prop} on the core component to "${String(testCase.expected)}"`,
            async() => {
              const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
              const fixture = TestBed.createComponent(component)
              fixture.detectChanges()

              await fixture.whenStable()

              const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

              expect(coreElement?.[testCase.prop]).toStrictEqual(testCase.expected)
            },
          )
        }
      },
    )
  },
)
