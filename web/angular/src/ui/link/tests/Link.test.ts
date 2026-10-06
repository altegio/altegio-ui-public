import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreLinkTagName } from '~shared/constants'
import { href } from '~shared/tests/mockData'
import { YLink } from '~ng/ui/link'

import { type IYNgLinkProps } from '~ng/ui/link/models/types'

interface ICreateComponentArgs {
  props?: Partial<IYNgLinkProps>
}

const createComponent = async({ props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YLink] }).compileComponents()

  @Component({
    template: `
      <YLink [href]="href" [target]="target">
        <span>{{slotContent}}</span>
      </YLink>
    `,
    imports: [YLink],
    standalone: true,
  })
  class TestComponent {
    href = props?.href
    target = props?.target
  }
  return TestComponent
}

const tagName = YCoreLinkTagName

describe(
  'Angular/YLink',
  () => {
    describe(
      'Props',
      () => {
        it(
          'Должен корректно передать href prop в Web Component',
          async() => {
            const component = await createComponent({ props: { href } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.href).toBe(href)
          },
        )

        it(
          'Должен корректно обработать undefined href prop в Web Component',
          async() => {
            const component = await createComponent({ props: { href: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.hasAttribute('href')).toBe(false)
          },
        )

        it(
          'Должен корректно передать target prop в Web Component',
          async() => {
            const target = '_blank'
            const component = await createComponent({ props: { target } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.target).toBe(target)
          },
        )

        it(
          'Должен корректно обработать undefined target prop в Web Component',
          async() => {
            const component = await createComponent({ props: { target: undefined } })
            const fixture = TestBed.createComponent(component)
            fixture.detectChanges()

            await fixture.whenStable()

            const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)
            expect(coreElement?.hasAttribute('target')).toBe(false)
          },
        )
      },
    )
  },
)
