import { describe, expect, it } from 'vitest'
import { Component, ChangeDetectionStrategy } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YGlobalProvider } from '~ng/ui/globalProvider'
import { GlobalProviderReadyEvent } from '~core/ui/globalProvider/models/types'
import { GlobalContext } from '~core/ui/globalProvider/context'
import { text, empty } from '~shared/tests/slotContents'
import type { TSlotTestCase } from '~shared/types/tests'

interface ICreateComponentArgs {
  slots?: {
    default?: string
  }
}

let readyEvent: GlobalProviderReadyEvent | null = null

const createComponent = async({ slots }: ICreateComponentArgs) => {
  readyEvent = null
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({
    imports: [YGlobalProvider],
    providers: [
      {
        provide: 'globalContext',
        useValue: new GlobalContext(),
      },
    ],
  }).compileComponents()

  @Component({
    template: '<YGlobalProvider (ready)="onReady($event)">{{content}}</YGlobalProvider>',
    imports: [YGlobalProvider],
    standalone: true,
    changeDetection: ChangeDetectionStrategy.OnPush,
  })
  class TestComponent {
    content = slots?.default || ''
    onReady(event: GlobalProviderReadyEvent) {
      readyEvent = event
    }
  }
  return TestComponent
}

// Unit test cases:
const slotDefaultTestCases: TSlotTestCase[] = [
  { slot: 'default', case: 'с контентом', content: text },
  { slot: 'default', case: 'без контента', content: empty },
]

describe(
  '🔍 YGlobalProvider',
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
                  const component = await createComponent({ slots: { [testCase.slot]: testCase.content } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  expect((fixture.nativeElement as HTMLElement).textContent).toBe(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Events',
          () => {
            it(
              'Должен обрабатывать событие ready',
              async() => {
                const component = await createComponent({})
                const fixture = TestBed.createComponent(component)
                fixture.detectChanges()

                await fixture.whenStable()

                expect(readyEvent).toBeInstanceOf(GlobalProviderReadyEvent)
              },
            )
          },
        )
      },
    )
  },
)
