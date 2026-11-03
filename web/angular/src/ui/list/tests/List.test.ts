import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreListTagName as tagName } from '~shared/constants'
import { AltList } from '~ng/ui/list'

const createFixture = async(separator?: boolean) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltList] }).compileComponents()

  @Component({
    template: '<AltList [separator]="separator"><span>Item</span></AltList>',
    imports: [AltList],
    standalone: true,
  })
  class TestComponent {
    separator = separator
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

describe(
  'Angular/AltList',
  () => {
    it(
      'Prop "separator" should be set on the core component',
      async() => {
        const fixture = await createFixture(true)

        const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName) as HTMLElement & { separator?: boolean }

        expect(coreElement.separator).toBe(true)
      },
    )

    it(
      'Projected content should render into the core component',
      async() => {
        const fixture = await createFixture()

        expect((fixture.nativeElement as HTMLElement).querySelector(tagName)?.textContent).toBe('Item')
      },
    )
  },
)
