import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCoreTipTagName } from '~shared/constants'
import { YTip } from '~ng/ui/tip'
import { type IYNgTipProps } from '~ng/ui/tip/models/types'

import {
  slotActivatorTestCases,
  slotContentTestCases,
} from './cases/slots'
import {
  propIsOpenTestCases,
  propOffsetTestCases,
  propPaddingTestCases,
  propPlacementTestCases,
  propStrategyTestCases,
  propTransitionTestCases,
  propTriggerTestCases,
  propTypeTestCases,
} from './cases/props'

const tagName = YCoreTipTagName

interface ICreateComponentArgs {
  slots?: {
    activator?: string
    content?: string
  }
  props?: Partial<IYNgTipProps>
}
const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YTip] }).compileComponents()

  @Component({
    template: `
      <YTip
        [trigger]="trigger"
        [isOpen]="isOpen"
        [offset]="offset"
        [padding]="padding"
        [placement]="placement"
        [strategy]="strategy"
        [type]="type"
        [transition]="transition"
      >
        @if (activatorSlot) {
          <div tip-activator>
            {{ activatorSlot }}
          </div>
        }

        @if (contentSlot) {
          <div tip-content>
            {{ contentSlot }}
          </div>
        }
      </YTip>
    `,
    imports: [YTip],
    standalone: true,
  })
  class TestComponent {
    trigger = props?.trigger
    isOpen = props?.isOpen
    offset = props?.offset
    padding = props?.padding
    placement = props?.placement
    strategy = props?.strategy
    type = props?.type
    transition = props?.transition
    activatorSlot = slots?.activator
    contentSlot = slots?.content
  }
  return TestComponent
}

describe(
  'Angular/YTip',
  () => {
    describe(
      'Unit',
      () => {
        describe(
          'Slots',
          () => {
            for (const testCase of [
              ...slotActivatorTestCases,
              ...slotContentTestCases,
            ]) {
              it(
                `Slot "${testCase.slot}" должен быть ${testCase.case}`,
                async() => {
                  const component = await createComponent({
                    slots: { [testCase.slot]: testCase.content },
                    props: {},
                  })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  expect((fixture.nativeElement as HTMLElement).textContent).toContain(testCase.content)
                },
              )
            }
          },
        )

        describe(
          'Props',
          () => {
            for (const testCase of [
              ...propIsOpenTestCases,
              ...propOffsetTestCases,
              ...propPaddingTestCases,
              ...propPlacementTestCases,
              ...propStrategyTestCases,
              ...propTransitionTestCases,
              ...propTriggerTestCases,
              ...propTypeTestCases,
            ]) {
              it(
                `Prop "${testCase.prop}" должен быть "${testCase.case}"`,
                async() => {
                  const component = await createComponent({ props: { [testCase.prop]: testCase.value } })
                  const fixture = TestBed.createComponent(component)
                  fixture.detectChanges()

                  await fixture.whenStable()

                  const coreElement = (fixture.nativeElement as HTMLElement).querySelector(tagName)

                  expect(JSON.stringify(coreElement?.[testCase.prop])).toBe(JSON.stringify(testCase.expected))
                },
              )
            }
          },
        )
      },
    )
  },
)
