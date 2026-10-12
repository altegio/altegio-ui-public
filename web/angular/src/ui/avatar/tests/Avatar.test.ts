import { describe, expect, it } from 'vitest'
import { YCoreAvatarTagName as tagName } from '~web/shared/constants'
import { TestBed } from '~ng/tests/setup'
import { YAvatar } from '~ng/ui/avatar'
import { Component } from '@angular/core'
import type { IYNgAvatarProps } from '~ng/ui/avatar/models/types'
import {
  propDisabledTestCases, propIconTestCases,
  propInitialsTestCases,
  propPhotoTestCases,
  propSizeTestCases,
} from '~ng/ui/avatar/tests/cases/props'

interface ICreateComponentArgs {
  props?: Partial<IYNgAvatarProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YAvatar] }).compileComponents()

  @Component({
    template: `
      <YAvatar
        [photo]="photo"
        [initials]="initials"
        [disabled]="disabled"
        [size]="size"
        [icon]="icon"
      />`,
    imports: [YAvatar],
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
  'Angular/YAvatar',
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
            `Prop "${testCase.prop}" со значением "${testCase.case}" должен изменить свойство ${testCase.prop} у core компонента на "${String(testCase.expected)}"`,
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
