import { describe, expect, it } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { AltDropdownCell } from '~ng/ui/dropdownCell'

interface ICreateComponentArgs {
  slot: string
  content: string
}
const createComponent = async({ slot, content }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [AltDropdownCell] }).compileComponents()

  @Component({
    template: `<AltDropdownCell><span ${slot}>{{content}}</span></AltDropdownCell>`,
    imports: [AltDropdownCell],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    content = content
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
              it(
                `Slot "${testCase.slot}" should render ${testCase.case}`,
                async() => {
                  const component = await createComponent({
                    slot: testCase.slot,
                    content: testCase.content,
                  })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const slotElement = (fixture.nativeElement as HTMLElement).querySelector(`[slot="${testCase.slot}"]`)

                  expect(slotElement?.textContent ?? empty).toBe(testCase.content)
                },
              )
            }
          },
        )
      },
    )
  },
)
