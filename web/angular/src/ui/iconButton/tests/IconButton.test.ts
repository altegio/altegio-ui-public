import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreIconButtonTagName } from '~shared/constants'
import { altRocket } from '~shared/icons'
import { type IAltNgIconButtonProps } from '~ng/ui/iconButton/models/types'
import { AltIconButton } from '~ng/ui/iconButton'

interface ICreateComponentArgs {
  props?: Partial<IAltNgIconButtonProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltIconButton] }).compileComponents()

  @Component({
    template: `
      <AltIconButton
        [size]="size"
        [variant]="variant"
        [disabled]="disabled"
        [loading]="loading"
        [href]="href"
        [target]="target"
        [icon]="icon"
        [accessibleName]="accessibleName"
        [type]="type"
      />`,
    imports: [AltIconButton],
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
    accessibleName = props?.accessibleName
    type = props?.type
  }
  return TestComponent
}

const tagName = AltCoreIconButtonTagName

describe(
  'Angular/AltIconButton',
  () => {
    describe(
      'Props',
      () => {
        it(
          'Prop accessibleName should set accessibleName on the core component',
          async() => {
            const component = await createComponent({ props: { icon: altRocket, accessibleName: 'Search' } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.accessibleName).toBe('Search')
          },
        )

        it.each([
          { case: 'submit', value: 'submit' as const, expected: 'submit' },
          { case: 'without a value', value: undefined, expected: 'button' },
        ])(
          'Prop type ($case) should set type on the core component',
          async({ value, expected }) => {
            const component = await createComponent({ props: { icon: altRocket, type: value } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.type).toBe(expected)
          },
        )

        it(
          'Changing prop icon should update CoreIconButton',
          async() => {
            const component = await createComponent({ props: { icon: altRocket } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.icon?.data).toBe(altRocket.data)
          },
        )
      },
    )
  },
)
