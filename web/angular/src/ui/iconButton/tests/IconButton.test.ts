import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreIconButtonTagName } from '~shared/constants'
import { yRocket } from '~shared/icons'
import { type IYNgIconButtonProps } from '~ng/ui/iconButton/models/types'
import { YIconButton } from '~ng/ui/iconButton'

interface ICreateComponentArgs {
  props?: Partial<IYNgIconButtonProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YIconButton] }).compileComponents()

  @Component({
    template: `
      <YIconButton
        [size]="size"
        [variant]="variant"
        [disabled]="disabled"
        [loading]="loading"
        [href]="href"
        [target]="target"
        [icon]="icon"
      />`,
    imports: [YIconButton],
    standalone: true,
  })
  class TestComponent {
    size = props?.size
    variant = props?.variant
    disabled = props?.disabled
    loading = props?.loading
    href = props?.href
    target = props?.target
    icon = props?.icon
  }
  return TestComponent
}

const tagName = YCoreIconButtonTagName

describe(
  'Angular/YIconButton',
  () => {
    describe(
      'Props',
      () => {
        it(
          'Изменения prop icon должно изменять CoreIconButton',
          async() => {
            const component = await createComponent({ props: { icon: yRocket } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.icon?.data).toBe(yRocket.data)
          },
        )
      },
    )
  },
)
