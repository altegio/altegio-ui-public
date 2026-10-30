import { describe, expect, it } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { AltDropdownCell } from '~ng/ui/dropdownCell'
import {
  type IAltNgDropdownCellProps,
} from '~ng/ui/dropdownCell/models/types'

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
  props?: Partial<IAltNgDropdownCellProps>
}
const createComponent = async({ slots }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltDropdownCell] }).compileComponents()

  @Component({
    template: '<AltDropdownCell>{{content}}</AltDropdownCell>',
    imports: [AltDropdownCell],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    content = slots?.default || ''
  }
  return TestComponent
}

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'content', case: 'with content', content: text },
  { slot: 'content', case: 'without content', content: empty },
  { slot: 'prepend', case: 'with content', content: text },
  { slot: 'prepend', case: 'without content', content: empty },
  { slot: 'append', case: 'with content', content: text },
  { slot: 'append', case: 'without content', content: empty },
]

describe(
  'Angular/AltDropdownCell',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it.skip(
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                async() => {
                  const component = await createComponent({
                    slots: { [testCase.slot]: testCase.content },
                    props: {},
                  })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  expect((fixture.nativeElement as HTMLElement).textContent).toBe(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)
