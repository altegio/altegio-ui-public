import { describe, expect, it } from 'vitest'
import { AltCoreAvatarTagName as tagName } from '~web/shared/constants'
import { TestBed } from '~ng/tests/setup'
import { AltAvatar } from '~ng/ui/avatar'
import { Component } from '@angular/core'
import type { IAltNgAvatarProps } from '~ng/ui/avatar/models/types'
import {
  propDisabledTestCases, propIconTestCases,
  propInitialsTestCases,
  propPhotoTestCases,
  propSizeTestCases,
} from '~ng/ui/avatar/tests/cases/props'

interface ICreateComponentArgs {
  props?: Partial<IAltNgAvatarProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltAvatar] }).compileComponents()

  @Component({
    template: `
      <AltAvatar
        [photo]="photo"
        [initials]="initials"
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
      />`,
    imports: [AltAvatar],
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
  'Angular/AltAvatar',
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
