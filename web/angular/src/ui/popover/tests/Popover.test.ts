import { describe, expect, it } from 'vitest'
import { Component } from '@angular/core'
import { TestBed } from '~ng/tests/setup'
import { YCorePopoverTagName } from '~shared/constants'
import { YPopover } from '~ng/ui/popover'
import {
  type IYNgPopoverProps,
} from '~ng/ui/popover/models/types'

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

const tagName = YCorePopoverTagName

interface ICreateComponentArgs {
  slots?: {
    activator?: string
    content?: string
  }
  props?: Partial<IYNgPopoverProps>
}
const createComponent = async({ slots, props }: ICreateComponentArgs) => {
  TestBed.resetTestingModule()
  await TestBed.configureTestingModule({ imports: [YPopover] }).compileComponents()

  @Component({
    template: `
      <YPopover
        [trigger]="trigger"
        [isOpen]="isOpen"
        [offset]="offset"
        [padding]="padding"
        [placement]="placement"
        [strategy]="strategy"
        [type]="type"
        [transition]="transition"
        [submitText]="submitText"
        [cancelText]="cancelText"
      >
        @if (activatorSlot) {
          <div popover-activator>
            {{ activatorSlot }}
          </div>
        }

        @if (contentSlot) {
          <div popover-content>
            {{ contentSlot }}
          </div>
        }
        @if (actionsSlot) {
          <div popover-content>
            {{ actions-slot }}
          </div>
        }
      </YPopover>
    `,
    imports: [YPopover],
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
  'Angular/YPopover',
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
