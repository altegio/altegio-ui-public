import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { AltCoreCounterTagName as tagName } from '~shared/constants'
import { AltCounter } from '~ng/ui/counter'
import type { TAltNgCounterProps } from '~ng/ui/counter/models/types'

const createFixture = async(props: Partial<TAltNgCounterProps>) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltCounter] }).compileComponents()

  @Component({
    template: '<AltCounter [value]="value" [max]="max" [accessibleName]="accessibleName"></AltCounter>',
    imports: [AltCounter],
    standalone: true,
  })
  class TestComponent {
    value = props.value ?? 0
    max = props.max ?? 999
    accessibleName = props.accessibleName
  }

  const fixture = TestBed.createComponent(TestComponent)
  fixture.detectChanges()
  await fixture.whenStable()

  return fixture
}

describe(
  'Angular/AltCounter',
  () => {
    it(
      'Inputs "max" and "accessibleName" should be set on the core component',
      async() => {
        const fixture = await createFixture({ value: 3, max: 99, accessibleName: '3 unread messages' })

        const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)!

        expect(coreElement.max).toBe(99)
        expect(coreElement.accessibleName).toBe('3 unread messages')
      },
    )
  },
)
