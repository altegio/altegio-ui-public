import { describe, expect, it } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import type { TSlotTestCase } from '~shared/types/tests'
import { text, empty } from '~shared/tests/slotContents'
import { YDropdownCell } from '~ng/ui/dropdownCell'
import {
  type IYNgDropdownCellProps,
} from '~ng/ui/dropdownCell/models/types'

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
  props?: Partial<IYNgDropdownCellProps>
}
const createComponent = async({ slots }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YDropdownCell] }).compileComponents()

  @Component({
    template: '<YDropdownCell>{{content}}</YDropdownCell>',
    imports: [YDropdownCell],
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
  { slot: 'content', case: 'с контентом', content: text },
  { slot: 'content', case: 'без контента', content: empty },
  { slot: 'prepend', case: 'с контентом', content: text },
  { slot: 'prepend', case: 'без контента', content: empty },
  { slot: 'append', case: 'с контентом', content: text },
  { slot: 'append', case: 'без контента', content: empty },
]

describe(
  'Angular/YDropdownCell',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of slotDefaultTestCases) {
              it.skip(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
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
